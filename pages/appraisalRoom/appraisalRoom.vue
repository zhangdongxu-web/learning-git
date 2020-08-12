<template>
  <view class="appraisalRoom" v-if="loadings">
    <view class="room-title">
      <view class="h1">
        鉴定室
        <view class="a">
          <image src="../../static/kf.png" mode=""></image>客服
          <button class="user_kf" open-type='contact'>联系客服</button>
        </view>
      </view>
      <view class="p">第{{data.noid}}号 {{data.level}} {{data.genre}} {{data.name}}</view>
    </view>

    <view class="room-swiper">
      <swiper class="swiper" :current="current" :indicator-dots="false" @change="swiperChange" previous-margin="50rpx"
        next-margin="50rpx">
        <swiper-item v-for="(item,index) in photoList" :key="index">
          <view class="end-item" v-if="end && index == photoList.length-1">
            <view class="h1">添加额外照片（可选）</view>
            <view class="imglist">
              <view class="other-img" v-for="(ite,idx) in otherList" :key="idx" @click="changeOtherList(ite,idx)">
                <image :src="ite.image" mode="aspectFill"></image>
              </view>
              <view v-if="otherList.length < 3" class="other-upload" @click="otherImg">+</view>
            </view>
            <view class="h1">文字消息（可选）</view>
            <block v-if="textFlag">
              <textarea rows='50' cols='3' class="other-txt" type="text" v-model="text" :placeholder="placeholder" />
            </block>
            <block v-else>
              <block v-if="voicePath != ''">
                <view class="playVoice" @click="playVoice">
                  {{voiceNum}}
                  <image src="../../static/voice.gif" v-if="voicePlay"></image>
                  <image src="../../static/voice_b.png" v-else></image>
                </view>
              </block>
              <view class="voice-btn" :class="{revoic: voicePath != ''}" @touchstart="startRecord" @touchend="endRecord">{{voicePath != ''?"重新录制":"按住说话"}}</view>
            </block>

            <view class="cut-wrap">
              <view class="cut-btn" @click="textFlag = !textFlag">
                <image src="../../static/voice.png" mode="" v-if="textFlag"></image>
                <image src="../../static/icon_message.png" mode="widthFix" v-else></image>
                {{textFlag?"切换语音":"切换文本"}}
              </view>
            </view>
          </view>
          <view class="swiper-item" @click="previewImg(item,index)" v-else>
            <image :src="item.image" mode="aspectFill"></image>
              <span class="see-big" v-if="index != photoList.length-1 && detailsImage[index].image == photoList[index].image"></span>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <block v-if="!end">
      <view class="camera-wrap" @click="takePhoto">
        <image src="../../static/camera_play.png" mode="aspectFill"></image>
      </view>
      <view class="finish-wrap">请拍摄【{{current+1}}/{{photoList.length-1}}{{name}}】</view>
    </block>


    <view class="desc">左右滑动可跳过或重拍</view>

    <block v-if="!end">
      <view class="watchvideo" @click="showVideo">
        <image src="../../static/watch_video.png" mode="aspectFill"></image>
      </view>
    </block>

    <block v-if="end">
      <view class="submit-btn" @click="submitInfo">提交鉴定</view>
    </block>

    <uni-popup ref="popupVideo" type="center">
      <video src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4" type="video/mp4" controls></video>
    </uni-popup>

    <uni-popup ref="popupSuccess" :maskClick="false" type="center" class="successMasker">
      <view class="success-wrap">
        <view class="circle-success">
          <view class="css-icon icon-check"></view>
        </view>
        <view class="h1">提交成功</view>
        <view class="p">常规响应时间为10:00~20:30，<br>非常规工作时间响应速度可能有所延长，<br>请注意查收进度收推送通知</view>
      </view>
      <view class="success-btn">
        <navigator class="a" open-type="switchTab" url="/pages/index/index">返回首页</navigator>
        <navigator class="a black" :url="'/pages/IdentRoom/IdentRoom?id=' + id">回鉴定室</navigator>
      </view>
    </uni-popup>
    <view v-if="record" class="record">
      <image src="../../static/record.gif" mode="scaleToFill"></image>
    </view>
  </view>
</template>

<script>
  // 录音
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  export default {
    data() {
      return {
        current: 0,
        photoList: [], //循环图
        otherList: [], //其他图
        detailsImage:[], //获取示例图
        previewImgList: [], //预览图
        finishImg: [], //上传完成后的图，用于表单提交
        end: false, //是否最后一个slide
        textFlag: true, //切换文本语音开关
        text: '', //文本
        voicePath: '', //语音地址
        voiceUrl: '',
        voiceNum: 0,
        voiceLength: 0,
        timer: '',
        record: false,
        voicePlay: false,
        data: {},
        id: '',
        name: '整体照',
		placeholder:'请输入文字回复',
    loadings:false
      };
    },
    onLoad(option) {
      uni.showLoading({
          title: '加载中'  
      });
      this.id = option.id
      this.$requestApi.authdetails({id:this.id}).then((res)=>{
        this.detailsImage = res.data.details
      })
      this.getData()
      recorderManager.onError((res) => {
        // 录音失败的回调处理
        console.log('#######录音失败############');
        // uni.showModal({
        //   title: "提示",
        //   content: "录音失败"
        // })
      });
      recorderManager.onStop((res) => {
        console.log('recorder stop' + JSON.stringify(res));
        this.voicePath = res.tempFilePath;
        this.voiceNum = Math.round(res.duration / 1000) //四舍五入秒数
        this.voiceLength = Math.round(res.duration / 1000) //四舍五入秒数
        uni.uploadFile({
          url: this.$upLoadUrl,
          filePath: this.voicePath,
          name: 'avatar',
          header: {
            "content-type": "multipart/form-data"
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'pathname': 'lisence',
          },
          success: res => {
            console.log(res)
          }
        })
      });
      innerAudioContext.onEnded(res => {
        console.log("播放完毕")
        this.voicePlay = false
        if (this.timer) {
          this.voiceNum = this.voiceLength
          clearInterval(this.timer)
        }
      })
    },
    methods: {
      getData() {
        let params = {
          id: this.id
        }
        this.$requestApi.authdetails(params).then(res => {
          this.data = res.data
          uni.hideLoading()
          this.loadings = true
          this.photoList = res.data.details
          this.photoList.push({})
          this.name = res.data.details[0].name
        })
      },
	  authuser(){
	  		  wx.requestSubscribeMessage({
	  		    tmplIds: ['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU'],
	  		    success (res) { 
					console.log(res,'success')
	  					if(res['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU']!='accept'){
	  													uni.showModal({
	  														title:'提示',
	  														content:'请允许消息通知，否则接收不到消息提醒'
	  													})
	  												}
	  		  			},
	  		  			fail(res){
	  		  				console.log(res,'fail')
	  		  			},
	  		  }); 
	  		  
	  },
      submitInfo() {
		  this.authuser();
        let params = {
          id: this.id,
          details: this.finishImg,
          attach: {
            images: this.otherList,
            text: this.text,
            voice: this.voiceUrl
          }
        }
        let len1 = this.photoList.length - 1
        let len2 = params.details.length
		
        if (len1 != len2) {
          uni.showModal({
            title: '提示',
            content: "还剩 " + (len1 - len2) + " 张照片没有上传",
            showCancel: false
          })
          return;
        }
        params.attach = JSON.stringify(params.attach)
        console.log(params)
        this.$requestApi.submitAppraisal(params).then(res => {
          console.log(res.data)
		  this.placeholder = '';
		  this.text = '';
          this.$refs.popupSuccess.open()
		  
        })
      },
      playVoice() {
        console.log(this.voicePath, '播放')
        this.voicePlay = true
        if (this.timer) {
          clearInterval(this.timer)
        }
        if (this.voicePath) {
          innerAudioContext.src = this.voicePath;
          innerAudioContext.play();
          this.timer = setInterval(() => {
            if (this.voiceNum >= 1) {
              this.voiceNum--
            }
          }, 1000)
        }
      },
      startRecord() {
        console.log('开始录音');
        this.record = true
        recorderManager.start({
          duration: 60000, //录音时长：一分钟
          format: 'mp3', //音频格式 ：mp3格式
        });
        // recorderManager.start();
      },
      endRecord() {
        console.log('录音结束');
        this.record = false
        recorderManager.stop();
      },
      //额外照片
      otherImg() {
        uni.showActionSheet({
          itemList: ['相机拍照', '从相册中选择图片'],
          success: res => {
            let type = res.tapIndex
            var album = ['camera', 'album']
            album = [album[type]]
            this.$uploadPhoto(album, (data) => {
              if (this.otherList.length <= 3) {
                this.otherList.push({
                  image: data.data
                })
              } else {
                uni.showModal({
                  title: '提示',
                  content: '最多上传三张',
                  showCancel: false
                })
              }
            })
          }
        })
      },
      //显示视频
      showVideo() {
        this.$refs.popupVideo.open()
      },
      //判断最后一个swiper
      swiperChange(e) {
        this.current = e.detail.current
        this.name = this.photoList[this.current].name
        this.end = false
        if (e.detail.current == this.photoList.length - 1) {
          this.end = true
        }
      },
	  changeOtherList(item,index) {
	    // console.log(index, 'indexindex')
	  
	    uni.showActionSheet({
	      itemList: ['拍照', '相册'],
	      success: res => {
	        let type = res.tapIndex
	        let album = ['camera', 'album']
	        album = [album[type]]
	        this.$uploadPhoto(album, (data) => {
				this.otherList.splice(index,1,{image: data.data})
	  			 console.log(this.otherList);  
	  			 
	        });
	      },
	      fail: function(res) {
	        console.log(res.errMsg);
	      },
	    });
	  },
      // 拍照
      takePhoto(e) {
        uni.showActionSheet({
          itemList: ['相机拍照', '从相册中选择图片'],
          success: res => {
            let type = res.tapIndex;//tapIndex: 1==>相册选择  tapIndex: 0==》相机拍照
            var album = ['camera', 'album']
            album = [album[type]]
            this.$uploadPhoto(album, (data) => {
              console.log(data.data,'232323232');
              console.log(this.current,'数字下表');
              this.photoList[this.current].image = data.data;
			  var name = this.photoList[this.current].name;
              // this.finishImg.push(JSON.stringify(this.photoList[this.current]))
              var appendflag = true;
              for(var i=0;i<this.finishImg.length;i++){
					let data = JSON.parse(this.finishImg[i])
              				  if(data.name==name){
              					  var newindex = i;
              					  appendflag = false;
              				  }
              }
              if(appendflag){
				   this.finishImg.push(JSON.stringify(this.photoList[this.current]))
              }else{
				  this.finishImg.splice(newindex,1,JSON.stringify(this.photoList[this.current]))
              }
              console.log(this.finishImg);
            })
            // this.uploadPhoto(album,true)
          }
        })
      },
      //预览图片
      previewImg(item,index) {
        console.log(item,'item');
        this.previewImgList = [item.image]
        uni.previewImage({
          urls: this.previewImgList,
          longPressActions:{
            success:function(index){
              console.log(index);
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .record {
    position: fixed;
    right: 20upx;
    bottom: 20upx;
    background: rgba(0, 0, 0, .6);
    width: 300upx;
    height: 340upx;
    text-align: center;
    border-radius: 10upx;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 200upx;
      height: 170upx;
    }
  }

  .successMasker {
    /deep/ .uni-popup__wrapper-box {
      border-radius: 16upx;
      padding: 0 !important;
    }
	z-index:99999;
  }

  .appraisalRoom {
    .success-btn {
      display: flex;

      .a {
        flex: 1;
        text-align: center;
        line-height: 100upx;
        background: #BE9F62;
        color: #FFFFFF;

        &.black {
          background: #35363B;
        }
      }
    }

    .success-wrap {
      width: 620upx;
      padding: 60upx 30upx 30upx;
      box-sizing: border-box;
      text-align: center;
	  z-index:99999;
      .h1 {
        font-size: 42upx;
        font-weight: bold;
        margin-bottom: 20upx;
      }

      .p {
        color: #999999;
        line-height: 44upx;
      }

      .circle-success {
        width: 120upx;
        height: 120upx;
        margin: 0 auto 30upx;
        text-align: center;
        line-height: 120upx;
        border-radius: 120upx;
        background: #BE9F62;

        .icon-check {
          margin-top: -10upx;

          &::before {
            border-color: #FFFFFF;
            height: 20upx;
            width: 36upx;
          }
        }
      }
    }

    .playVoice {
      line-height: 90upx;
      text-align: center;
      background: #C9AB79;
      margin-bottom: 20upx;
      border-radius: 8upx;
      font-size: 26upx;
      color: #FFFFFF;
      text-align: right;
      padding: 0 30upx;

      image {
        width: 29upx;
        height: 27upx;
        margin-left: 10upx;
        vertical-align: middle;
      }
    }

    .voice-btn {
      line-height: 90upx;
      text-align: center;
      background: #C9AB79;
      border-radius: 8upx;
      color: #FFFFFF;
      font-size: 26upx;

      &.revoic {
        background: #35363B;
        color: #C9AB79;
      }
    }

    .cut-wrap {
      margin-top: 30upx;
      text-align: center;

      .cut-btn {
        display: inline-block;
        color: #999999;
        font-size: 26upx;

        image {
          width: 22upx;
          height: 28upx;
          vertical-align: middle;
          margin: -3upx 7upx 0 0;
        }
      }
    }

    .other-txt {
      width: 100%;
      height: 150upx;
      box-sizing: border-box;
      padding: 25upx 20upx;
      line-height: 40upx;
      font-size: 26upx;
      background: #FFFFFF;
      letter-spacing: 5px;
    }

    .submit-btn {
      width: 622upx;
      line-height: 100upx;
      text-align: center;
      background: #35363B;
      border-radius: 8upx;
      color: #C9AB79;
      font-size: 32upx;
      margin: 90upx auto 0;
    }

    .watchvideo {
      text-align: center;

      image {
        width: 236upx;
        height: 60upx;
      }
    }

    .desc {
      text-align: center;
      color: #C1C1C1;
      margin-bottom: 20upx;
    }

    .finish-wrap {
      text-align: center;
      font-size: 32upx;
      color: #333333;
      line-height: 40upx;
      margin-bottom: 10upx;
    }

    .camera-wrap {
      text-align: center;
      margin-bottom: 30upx;

      image {
        width: 160upx;
        height: 160upx;
      }
    }

    .room-swiper {
      padding: 0 0 0 0;

      .swiper {
        height: 620upx;
        margin-bottom: 20upx;
      }

      .end-item {
        width: 620upx;
        height: 620upx;
        background: #F8F8F8;
        border-radius: 8upx;
        margin: 0 auto;
        padding: 30upx;
        box-sizing: border-box;

        .h1 {
          font-size: 30upx;
          font-weight: bold;
          margin-bottom: 20upx;
        }

        .other-upload {
          text-align: center;
          width: 120upx;
          line-height: 120upx;
          overflow: hidden;
          background: #FFFFFF;
          font-size: 48upx;
          color: #C1C1C1;
        }

        .imglist {
          display: flex;
          margin-bottom: 30upx;

          .other-img {
            width: 120upx;
            height: 120upx;
            border-radius: 10upx;
            overflow: hidden;
            margin-right: 20upx;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .swiper-item {
        position: relative;
        margin: 0 auto;
        width: 620upx;
        height: 620upx;
        border-radius: 20upx;
        overflow: hidden;

        .see-big {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 280upx;
          height: 48upx;
          background: url(../../static/big_img.png) no-repeat center;
          background-size: cover;
        }

        image {
          width: 620upx;
          height: 620upx;
        }
      }
    }

    .room-title {
      padding: 50upx 64upx 0;

      .p {
        font-size: 28upx;
        line-height: 40upx;
        color: #999A9B;
        margin-bottom: 40upx;
      }

      .h1 {
        display: flex;
        justify-content: space-between;
        font-size: 48upx;
        font-weight: bold;
        line-height: 60upx;
        margin-bottom: 10upx;

        .a {
          position: relative;
          font-size: 28upx;

          image {
            width: 39upx;
            height: 43upx;
            vertical-align: middle;
            margin: -3upx 10upx 0 0;
          }
          .user_kf {
          	width: 100%;
          	height: 100%;
          	position: absolute;
          	top: 0;
          	left: 0;
          	opacity: 0;
          }
        }
      }
    }
  }
</style>
