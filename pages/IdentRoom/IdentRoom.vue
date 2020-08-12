<template>
  <view class="identRoom" v-if="loadings">
    <view class="identRoom_title">
      <text>鉴定室</text>
    </view>
    <view class="identRoom_good">
      <text>第{{datainfo.noid}}号</text>
      <text>{{datainfo.mode}}</text>
      <text>{{datainfo.genre}}</text>
      <text>{{datainfo.brand}}</text>
    </view>
    <!-- 鉴定列表商品图片 -->
    <view class="identRoom_list_img">
      <view class="identRoom_list_res">
        <!-- <text v-if="orderState == '' ">已提交待指派鉴定师</text> -->
        <text v-if="orderState == 'wait'">已提交等待鉴定</text>
        <text v-if="orderState == 'start'">已提交鉴定开始</text>
        <text v-if="orderState == 'doing' && datainfo.over != 1">已提交鉴定中</text>
        <text v-if="orderState == 'over' || datainfo.over == 1">已提交鉴定完成</text>
      </view>
      <view class="identRoom_list_good">
        <view class="identRoom_list_good_item" v-for="(item,i) in toBeIdentifiedList" :key="i">
          <image :src="item.image" @click="$previewImage(item.image)" mode="aspectFit"></image>
          <view>{{item.name}}</view>
        </view>
      </view>

      <block v-if="attach.images.length>0">
        <view class="identRoom_list_res">
          <text>用户额外添加图片</text>
        </view>
        <view class="identRoom_list_good">
          <view class="identRoom_list_good_item" v-for="(item,i) in attach.images" :key="i">
            <image :src="item.image" @click="$previewImage(item.image)" mode="aspectFill"></image>
            <!-- <view>{{item.name}}</view> -->
          </view>
        </view>
      </block>

      <block v-if="attach.text.length>0">
        <view class="identRoom_list_res">
          <text>用户发送信息</text>
        </view>
        <view class="identRoom_list_good">
          <view class="theTitle">发送的文字内容:{{attach.text}}</view>
          <!-- <view class="voice_list" v-if="item.assayer.voice != ''">
            	<view class="playVoice" @click="playVoice(1,i,item.assayer)">
            	  {{item.assayer.seconds}}
            	  <image src="../../static/voice.gif" v-if="item.assayer.voicePlay"></image>
            	  <image src="../../static/voice_b.png" v-else></image>
            	</view>
            </view> -->
        </view>
      </block>


    </view>
    <!-- 响应状态为1 -->
    <!-- 鉴定师开始 -->
    <view class="identRoom_teacher common_bj">
      <!-- <view class="identRoom_teacher_l">
				<view class="start">等待指派鉴定师</view>
				<view class="respoend">鉴定师已响应，正在为您指派鉴定师</view>
			</view> -->
      <view v-if="orderState == 'wait'" class="identRoom_teacher_l">
        <view class="start">等待鉴定</view>
        <view class="respoend">鉴定师已响应，等待鉴定中</view>
      </view>
      <view v-if="orderState == 'start'" class="identRoom_teacher_l">
        <view class="start">鉴定开始</view>
        <view class="respoend">鉴定师已响应，开始为您鉴定</view>
      </view>
      <view v-if="orderState == 'doing'" class="identRoom_teacher_l">
        <view class="start">鉴定中</view>
        <view class="respoend">鉴定师已响应，正在为您鉴定中</view>
      </view>
      <view v-if="orderState == 'over'" class="identRoom_teacher_l">
        <view class="start">鉴定完成</view>
        <view class="respoend">鉴定师已响应，已经鉴定完成</view>
      </view>
      <view class="identRoom_teacher_r">
        <image mode="aspectFill" src="../../static/sl_start.png"></image>
      </view>
    </view>
    <!-- 对话 -->
    <view class="common_bj">

      <!-- 对话列表 -->
      <view class="title" v-for="(item,i) in toBePersonTeacherList" :key="i">

        <!-- 鉴定师 -->
        <block v-if="sort == 1 || item.user || item.id">
          <view class="dialogue">
            <view class="dialogue_teacher">
              <view class="dialogue_teacher_title">鉴定师回复</view>
              <view class="dialogue_teacher_text">
                <view class="identRoom_list_good">
                  <block v-for="(teacher,index) in  item.assayer.images" :key="index">
                    <block v-if="teacher.image == '' ">
                      <view style="width:100%;height:40rpx;">
                        <view>{{teacher.name}}</view>
                      </view>
                    </block>
                    <block v-else>
                      <view class="identRoom_list_good_item">
                        <image :src="teacher.image" @click="$previewImage(teacher.image)" mode="aspectFill"></image>
                        <view>{{teacher.name}}</view>
                      </view>
                    </block>
                  </block>
                  <view style="width:100%;height:40rpx;" v-if="item.assayer.text">
                    <view style="line-height: 35rpx;">{{item.assayer.text}}</view>
                  </view>
                </view>

                <view class="voice_list" v-if="item.assayer.voice != ''">
                  <view class="playVoice" @click="playVoice(0,i,item.assayer)">
                    {{item.assayer.seconds}}
                    <image src="../../static/voice.gif" v-if="item.assayer.voicePlay"></image>
                    <image src="../../static/voice_b.png" v-else></image>
                  </view>
                </view>


              </view>
            </view>
          </view>
          <!-- 用户 -->
          <view class="dialogue_user" v-if="item.user">
            <view class="dialogue">
              <view class="dialogue_user_name">用户回复</view>
              <view class="dialogue_teacher_text">
                <view class="identRoom_list_good">
                  <block v-for="(user,index) in  item.user.images" :key="index">
                    <block v-if="user.image == '' ">
                      <view style="width:100%;height:40rpx;">
                        <view>{{user.text}}</view>
                      </view>
                    </block>
                    <block v-else>
                      <view class="identRoom_list_good_item">
                        <image mode="aspectFill" :src="user.image" @click="$previewImage(user.image)"></image>
                        <view>{{item.assayer.images[index].name}}</view>
                      </view>
                    </block>
                  </block>
                  <view style="width:100%;height:40rpx;" v-if="item.user.text">
                    <view style="line-height: 35rpx;">{{item.user.text}}</view>
                  </view>
                </view>
                <view class="voice_list" v-if="item.user.voice != ''">
                  <view class="playVoice" @click="playVoice(1,i,item.user)">
                    {{item.user.seconds}}
                    <image src="../../static/voice.gif" v-if="item.user.voicePlay"></image>
                    <image src="../../static/voice_b.png" v-else></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </block>

        <!-- 回复消息模块 -->
        <!-- 鉴定师回复 -->
        <view class="dialogue_hf" v-if="sort == 0 && i == toBePersonTeacherList.length - 1 && item.user == null && item.assayer == '' && datainfo.over != 1">
          <view class="dialogue_user_name">鉴定师要求补拍</view>
          <view class="dialogue_user_img_message">图片消息</view>
          <view class="dialogue_user_img_message_list">
            <block v-if="choselist.length > 0">
              <view class="dialogue_user_img_change" v-for="(item,index) in choselist" :key="index">
                <view style="width:180rpx; height:180rpx;">
                  <image :src="item.image" @click="$previewImage(item.image)" mode="aspectFill"></image>
                </view>
                <!-- <image :src="item.image" @click="imagess(item.image)"></image> -->
				<view>{{item.name}}</view>
              </view>
            </block>
            <view class="dialogue_user_img_change" @click="AddImgMessage">+</view>
          </view>
          <view class="dialogue_user_img_message_text">文字消息</view>
          <view class="voice_list" v-if="voicePath != '' && istext == 1">
            <view class="playVoice" @click="playVoice">
              {{voiceNum}}
              <image src="../../static/voice.gif" v-if="voicePlay"></image>
              <image src="../../static/voice_b.png" v-else></image>
            </view>
          </view>
          <input v-model="jtext" v-if="istext == 2" placeholder="请输入文字" class="user_text" />
          <view v-if="istext == 1 && !replaysuccess" class="user_text user_text_mouse" :class="{revoic: voicePath != ''}" @touchstart="startRecord"
            @touchend="endRecord">{{voicePath != ''?"重新录制":"按住说话"}}</view>
          <view v-if="istext == 2 && !replaysuccess" class="user_text_voice" @click="change_text(1)">
            <image mode="aspectFill" src="../../static/voice.png"></image>
            <text>切换语音</text>
          </view>
          <view v-if="istext == 1 && !replaysuccess" class="user_text_voice" @click="change_text(2)">
            <image mode="aspectFill" src="../../static/icon_message.png"></image>
            <text>切换文字</text>
          </view>
          <view v-if="!replaysuccess" class="user_text_hf" @click="reply()">
            回复消息
          </view>
        </view>
        <!-- 用户回复 -->
        <view class="dialogue_hf" v-if="sort == 1 && i == toBePersonTeacherList.length - 1 && !item.user && datainfo.over != 1">
          <view class="dialogue_user_name">用户回复</view>
          <view class="dialogue_user_img_message">图片消息</view>
          <view class="dialogue_user_img_message_list">
            <block v-if="choselist.length > 0">
              <view class="dialogue_user_img_change" v-for="(item,index) in choselist" :key="index" @tap="changeImage(index)">
                <view style="width:180rpx; height:180rpx">
                  <image :src="item.image" mode="aspectFill"></image>
                </view>
				<view>{{item.name}}</view>
              </view>
            </block>
            <view v-if="datainfo.over != 1 && choselist.length<toBePersonTeacherList[i].assayer.images.length" class="dialogue_user_img_change" @tap="userAddImgMessage(i)">+</view>
          </view>
          <view class="dialogue_user_img_message_text">文字消息</view>
          <view class="voice_list" v-if="voicePath != '' && istext == 1">
            <view class="playVoice" @click="playVoice()">
              {{voiceNum}}
              <image src="../../static/voice.gif" v-if="voicePlay"></image>
              <image src="../../static/voice_b.png" v-else></image>
            </view>
          </view>
          <view v-if="datainfo.over != 1 ">
            <input v-model="jtext" v-if="istext == 2" placeholder="请输入文字" class="user_text" />
            <view v-if="istext == 1 && !replaysuccess" class="user_text user_text_mouse" :class="{revoic: voicePath != ''}" @touchstart="startRecord"
              @touchend="endRecord">{{voicePath != ''?"重新录制":"按住说话"}}</view>
            <view v-if="istext == 2 && !replaysuccess" class="user_text_voice" @click="change_text(1)">
              <image mode="widthFix" src="../../static/voice.png"></image>
              <text>切换语音</text>
            </view>
            <view v-if="istext == 1 && !replaysuccess" class="user_text_voice" @click="change_text(2)">
              <image mode="widthFix" src="../../static/icon_message.png"></image>
              <text>切换文字</text>
            </view>
            <view v-if="!replaysuccess" class="user_text_hf" @click="userReply(item)">
              回复消息
            </view>
			<!-- <view class="user_text_hf">			<button open-type="contact" bindcontact="handleContact">222</button></view> -->
          </view>
        </view>
      </view>
    </view>

    <view class="scoreBox" v-if="sort == 0 && datainfo.over != 1 ">
      <view class="scoreBtn" @click="goScore">开始打分</view>
    </view>

    <!-- 鉴定成功 -->
    <view class="ident_success common_bj" v-if="orderState=='over'">
      <view class="ident_success_icon">
        <image mode="widthFix" src="../../static/ident_success_icon.png"></image>
        <view>鉴定完毕</view>
      </view>
      <view class="ident_success_btn" :class="{active:ident_success_btn_show == 1}">
        <view @click="openPopup" v-if="datainfo.eval != 1 && sort==1">立即评价</view>
        <view class="back" @click="appraisalProductReport">查看鉴定报告</view>
      </view>
    </view>
    <!-- 弹框 -->
    <!-- 选择补拍 -->
    <uni-popup ref="choseimg">
      <view class="brand-title">
        选择需要补拍的图片
        <view @click="closeBrand" class="css-icon icon-close"></view>
        <!-- <text @click="closeBrand" class="css-icon">完成</text> -->
      </view>
      <view class="chose_img">
        <!-- <view class="h3">示例图片</view>
				<scroll-view scroll-x="true" class="ohterlist">
					<view v-for="(item,index) in choseImgList.exp" :key="index" class="scroll-img" @click="clickImg(item)">
						<image :src="item.image"></image>
						<view class="p">{{item.name}}</view>
						<view class="chose_success" v-if="item.succ"></view>
					</view>
				</scroll-view> -->
        <view class="h3">用户图片</view>
        <scroll-view scroll-x="true" class="ohterlist">
          <view v-for="(item,index) in choseImgList.upload" :key="index" class="scroll-img">
            <image :src="item.image" @click="$previewImage(item.image)" mode="aspectFill"></image>
            <!-- <image :src="item.image"></image> -->
            <view class="p">{{item.name}}</view>
            <view class="chose_success" v-if="item.succ"></view>
          </view>
        </scroll-view>
        <view class="h3">拍照或上传本地图片</view>
        <scroll-view scroll-x="true" class="ohterlist">
          <view v-for="(item,index) in choseImgList.upload" :key="index" class="scroll-img">
            <!-- teacher  img -->
            <image :src="imgaaa[index]" @tap="appraiserAddImgMessage(index,item.name)" mode="aspectFill"></image>
            <view class="p">{{item.name}}</view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    <uni-popup ref="popup" type="center" :custom="true" :maskClick="false">
        <view class="ident_popup">
        <view class="css-icon icon-close" @click="closePopup"></view>
        <view class="title">对本次鉴定进行评价</view>
        <view class="message">感谢您对包铺鉴定的支持，您的认可是我们前进的动力</view>
        <view class="start">
          <block v-for="(item,i) in start" :key="i">
            <block v-if="i+1 <= activeStartIndex ">
              <image @tap="startActive(i+1)" mode="widthFix" src="../../static/wjx.png"></image>
            </block>
            <block v-else>
              <image @tap="startActive(i+1)" mode="widthFix" src="../../static/wjx_active.png"></image>
            </block>
          </block>
        </view>
        <input class="start_text" v-model="activeStartText" placeholder="文字评价" />
        <button class="click_btn" @click="startBtn">评价</button>
      </view>
    </uni-popup>
    <view v-if="record" class="record">
      <image src="../../static/record.gif" mode=""></image>
    </view>
  </view>
</template>

<script>
  import uniPopup from "@/components/uni-popup/uni-popup.vue";
  import utils from "../../utils/util.js";
  import {
    recordPointsFun,
    startTouch,
    drawBack
  } from "../../utils/paint.js";
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  export default {
    data() {
      return {
        imgaaa: ['../../static/camera_play.png', '../../static/camera_play.png', '../../static/camera_play.png',
          '../../static/camera_play.png', '../../static/camera_play.png'
        ],
        quanju: false,
        id: "",
        state: '',
        auth: '',
        identTab: '',
        exId: [], //鉴定师回复消息的id
        jtext: "",
        orderState: '',
        choselist: [],
        datainfo: {},
        voicePlay: false,
        record: false,
        start: 5, //评价
        activeStartIndex: null, //评价
        activeStartText: '',
        goodsInfo: { //用户信息

        },
        istext: '2', //录音相关
        voicePath: '', //录音相关
        timer: '', //录音相关
        voiceNum: '', //录音相关
        voiceLength: '', //录音相关
        toBeIdentifiedList: [], //待鉴定列表
        toBePersonTeacherList: [], //对话列表 assayer 鉴定师 user 用户
        attach: [], //获取到的用户额外添加的图片、文字、语音
        appraisalSuccess: 1, //0,未鉴定 1鉴定成功
        ident_success_btn_show: 0, //1表示评价成功 0 未成功
        sort: getApp().globalData.sort,
        choseImgList: {
          exp: [],
          upload: []
        },
		flag:false,
		replaysuccess:false,
    loadings:false,
      };
    },
    onLoad(option) {
      
      uni.showLoading({
          title: '加载中'  
      });
      // console.log('option', option);
      this.id = option.id
      this.state = option.type
      this.auth = option.auth
      this.identTab = option.identTab
      this.goodsInfo = uni.getStorageSync('userinfo') || '';
      // 监听错误
      recorderManager.onError((res) => {
        // 录音失败的回调处理
        // console.log('#######录音失败############');
      });
      // 监听停止
      recorderManager.onStop(res => {
        // console.log('录音结束----------------------------', res.tempFilePath);
        // this.voicePath = res.tempFilePath; //停止时 跟新音频
        this.voiceNum = Math.round(res.duration / 1000) //  计算语音时长
        this.voiceLength = Math.round(res.duration / 1000) // 计算语音时长
  
        uni.uploadFile({
          url: this.$upLoadUrl,
          filePath: res.tempFilePath,
          name: 'file',
          header: {
            "content-type": "multipart/form-data"
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'pathname': 'lisence',
          },
          success: (res) => {
            // console.log(res)
            if (res.statusCode != 200) {
              uni.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var data = JSON.parse(res.data);
            console.log('*****data', data)
            this.voicePath = data.data
            uni.hideToast(); //隐藏Toast
          },
          fail: (err) => {
            console.log(err)
            uni.hideLoading()
            uni.hideToast(); //隐藏Toast
            uni.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          }
        })
      });
      // 音频停止事件
      innerAudioContext.onEnded(res => {
        this.voicePlay = false
        if (this.timer) {
          this.voiceNum = this.voiceLength
          clearInterval(this.timer)
        }
        this.toBePersonTeacherList.forEach(x => {
          x.assayer.voicePlay = false
          x.assayer.seconds = x.assayer.len
          clearInterval(x.assayer.timer)
          if (x.user) {
            x.user.voicePlay = false
            x.user.seconds = x.user.len
            clearInterval(x.user.timer)
          }
        })
      });
    },
    onShow() {
		// uni.showLoading({
		// 	title:'加载中',
		// 	mask:true
		// })
      let params = {
        id: this.id
      }
      this.$requestApi.getBeIdentifiedList(params).then((res) => {
        console.log(res, '获取用户信息');
		// uni.hideLoading()
        this.orderState = res.data.orderState;
      })
      this.sort = getApp().globalData.sort
      this.getBeIdentifiedListHand()
      this.getChoseImg()
    },
    methods: {
		// handleContact (e) {
		//         console.log(e.detail.path)
		//         console.log(e.detail.query)
		//     },
		authuser(){
			var that = this;
				  wx.getSetting({
					  withSubscriptions: true,
					  success(res){
						  let setinfo = res.subscriptionsSetting;
						  if(!setinfo.mainSwitch){
							  uni.showModal({
								  title:'提示',
								  content:'授权时请勾选总是保持以上选择，否则只能接收到一条消息',
								  showCancel:false,
							  })
						  }else{
							  that.flag = true;
						  }
						  wx.requestSubscribeMessage({
						    tmplIds: ['OkcKfDcOjrVi9P5_5wtD_b13c1y6oRBsSLTO8SCs1Cs'],
						    success (res) { 
								console.log(res,'success')
						  				if(res['OkcKfDcOjrVi9P5_5wtD_b13c1y6oRBsSLTO8SCs1Cs']!='accept'){
											uni.showModal({
												title:'提示',
												content:'请允许消息通知，否则接收不到消息提醒'
											})
										}
										that.flag = true;
						  			},
						  			fail(res){
						  				console.log(res,'fail')
						  			},
						  }); 
					  }
				  })
				  
		},
      // 用户回复
      userReply(item) {
		  this.authuser();
        let params = {
          id: this.id,
          tid: item.id,
          talk: {
            images: "",
            text: this.jtext,
            voice: this.voicePath,
            seconds: this.voiceNum
          }
        }
        if (this.choselist.length < item.assayer.images.length) {
          uni.showToast({
            icon: "none",
            title: "请上传补拍图片"
          })
          return
        }
        params.talk.images = this.choselist.map(x => JSON.stringify(x))
        params.talk = JSON.stringify(params.talk)
        // params.talk.id = 
        this.$requestApi.roomtalk(params).then(res => {
          if (res.code == 1000) {
			  
            uni.showToast({
              icon: "none",
              title: "回复成功，等待鉴定师确认"
            })
			this.replaysuccess = !this.replaysuccess
            setTimeout(() => {
              uni.navigateBack()
            }, 300)
          } else {
            uni.showToast({
              icon: "none",
              title: res.message
            })
          }
        })
      },
      // 鉴定师回复
      reply() {
		  this.authuser();
		  
        let params = {
          id: this.id,
          tid: "",
          talk: {
            images: "",
            text: this.jtext,
            voice: this.voicePath,
            seconds: this.voiceNum
          }
        }
        if (this.choselist.length == 0) {
          uni.showToast({
            icon: "none",
            title: "请选择补拍图片"
          })
          return
        }
        params.talk.images = this.choselist.map(x => JSON.stringify(x))
        params.talk = JSON.stringify(params.talk)
        this.$requestApi.roomtalk(params).then(res => {
          if (res.code == 1000) {
            uni.showToast({
              icon: "none",
              title: "回复成功"
            })
			this.replaysuccess = !this.replaysuccess
            setTimeout(() => {
              uni.navigateBack()
            }, 300)
          } else {
            uni.showToast({
              icon: "none",
              title: res.message
            })
          }
        })
      },
      // clickImg(item) {
      // 	// item.succ = !item.succ
      // 	this.choseImgList.exp.push({})
      // 	this.choseImgList.upload.push({})
      // 	this.choseImgList.exp.pop()
      // 	this.choseImgList.upload.pop()
      // 	console.log(this.choseImgList, 'qwertyuiop');
      // 	var arr1 = this.choseImgList.exp.filter(x => x.succ == true)
      // 	var arr2 = this.choseImgList.upload.filter(x => x.succ == true)
      // 	this.choselist = [...arr1, ...arr2]
      // 	this.choselist.push({})
      // 	this.choselist.pop()
      // },
      closeBrand() {
        this.$refs.choseimg.close()
      },
      AddImgMessage() {
        this.$refs.choseimg.open()
      },
      getChoseImg() {
        let params = {
          id: this.id
        }
        this.$requestApi.chooseimg(params).then(res => {
          this.choseImgList = res.data
        })
      },
      // 评价函数
      startActive(i) {
        this.activeStartIndex = i;
      },
      // 评价
      async startBtn() {
        let params = {
          id: this.id,
          star: this.activeStartIndex,
          memo: this.activeStartText
        }
        let res = await this.$requestApi.postevaluate(params)
        if (res.code == 1000) {
          this.$refs.popup.close();
          uni.showToast({
            icon: "none",
            title: "评价成功"
          })
          this.ident_success_btn_show = 1;
        }
      },
      //跳转到鉴定报告页面
      appraisalProductReport() {
        uni.navigateTo({
          url: '/pages/appraisalProductReport/appraisalProductReport?id=' + this.id
        })
      },
      // 切换语音
      change_text(i) {
        this.istext = i;
        if (i == 2) {
          this.voicePath = '';
        }
      },
      // 开始录音
      startRecord() {
        console.log('开始录音');
        this.record = true
        recorderManager.start({
          duration: 60000, //录音时长：一分钟
          format: 'mp3', //音频格式 ：mp3格式
        });
      },
      // 结束录音
      endRecord() {
        this.record = false
        console.log('录音结束');
        recorderManager.stop();
      },
      // 播放录音
      playVoice(type, index, item) {
        // 判断是否显示回复,还是回复消息
        let types = type && type == 1 ? 'user' : 'assayer'
        if (type == 0 || type == 1) {
          this.toBePersonTeacherList[index][types]['voicePlay'] = true
          this.toBePersonTeacherList[index][types]['len'] = item.seconds
          console.log('this.toBePersonTeacherList[index]', this.toBePersonTeacherList[index])
          innerAudioContext.src = item.voice
          innerAudioContext.play()
          this.toBePersonTeacherList[index][types]['timer'] = setInterval(() => {
            if (this.toBePersonTeacherList[index][types].seconds >= 1) {
              this.toBePersonTeacherList[index][types].seconds--
            }
          }, 1000)
        } else {
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
        }
      },

      // 弹出层
      openPopup() {
        this.$refs.popup.open()
      },
      // 获取鉴定列表
      async getBeIdentifiedListHand() {
        let params = {
          id: this.id
        }
        let res = await this.$requestApi.getBeIdentifiedList(params);
        if (res.code == 1000) {
          this.datainfo = res.data.info
          this.toBeIdentifiedList = res.data.list
          this.attach = res.data.attach
          uni.hideLoading()
          this.loadings = true
          // console.log('11111111111', this.attach)
          res.data.exchange.forEach(x => {
            x.assayer.images.forEach((q, i) => {
              x.assayer.images[i] = JSON.parse(q)
              x.assayer.len = x.assayer.seconds
            })
            if (x.user) {
              x.user.images.forEach((q, i) => {
                x.user.images[i] = JSON.parse(q)
                x.user.len = x.user.seconds
              })
            }
          })
          console.log('sort', this.sort)
          if (this.sort == 0) {
            this.toBePersonTeacherList = res.data.exchange.length == 0 ? [{
                assayer: "",
                user: null
              }] : res.data.exchange,
              console.log(this.toBePersonTeacherList)
            if (this.toBePersonTeacherList[this.toBePersonTeacherList.length - 1].user) {
              this.toBePersonTeacherList.push({
                assayer: "",
                user: null
              })
            }
            console.log('toBePersonTeacherList', this.toBePersonTeacherList)
          } else {
            this.toBePersonTeacherList = res.data.exchange
          }

        }
      },
      closePopup() {
        this.$refs.popup.close()
      },
	  changeImage(index){
		uni.showActionSheet({
			itemList: ['拍照', '相册'],
			success:res => {
				let type = res.tapIndex
				let album = ['camera','album']
				 album = [album[type]]
				 this.$uploadPhoto(album,(data)=>{
					this.choselist[index].image = data.data 
				 })
			}
		})
	  },
      userAddImgMessage(index) {
        uni.showActionSheet({
          itemList: ['拍照', '相册'],
          success: res => {
            let type = res.tapIndex
            let album = ['camera', 'album']
            album = [album[type]]
            this.$uploadPhoto(album, (data) => {
              console.log(this.toBePersonTeacherList[index].assayer.images.length)
              if (this.choselist.length >= this.toBePersonTeacherList[index].assayer.images.length) {
                setTimeout(() => {
                  uni.showToast({
                    icon: "none",
                    title: "不得超过鉴定师补拍数量"
                  })
                }, 200)
                return
              }
			  let choseIndex = this.choselist.length;
			  let name = this.toBePersonTeacherList[index].assayer.images[choseIndex].name;
              this.choselist.push({
                image: data.data,
				name:name
              })
			  console.log(this.choselist, 'choselist')
            });
          },
          fail: function(res) {
            console.log(res.errMsg);
          }
        });
      },
      appraiserAddImgMessage(index,name) {
        // console.log(index, 'indexindex')

        uni.showActionSheet({
          itemList: ['拍照', '相册'],
          success: res => {
            let type = res.tapIndex
            let album = ['camera', 'album']
            album = [album[type]]
            this.$uploadPhoto(album, (data) => {
              // console.log(this.toBePersonTeacherList[index].assayer.images.length)
              // if (this.choselist.length >= this.toBePersonTeacherList[index].assayer.images.length) {
              // 	setTimeout(() => {
              // 		uni.showToast({
              // 			icon: "none",
              // 			title: "不得超过鉴定师补拍数量"
              // 		})
              // 	}, 200)
              // 	return
              // }
			  console.log(this.choselist.hasOwnProperty(index),'existkey')
			  var appendflag = true;
			  for(var i=0;i<this.choselist.length;i++){
				  if(this.choselist[i].name==name){
					  var newindex = i;
					  appendflag = false;
				  }
			  }
			  if(appendflag){
				  this.choselist.push({
					image: data.data,
					name:name
				  })
			  }else{
				  this.choselist.splice(newindex,1,{image:data.data,name:name})
			  }
              this.imgaaa.splice(index, 1, data.data)
            });
          },
          fail: function(res) {
            console.log(res.errMsg);
          },
        });
      },
      goScore() {
        console.log(this);
        console.log(this.id + "&&type=" + this.state + "&&auth=" + this.auth + "&&identTab=" + this.identTab);
        uni.navigateTo({
          url: "../onlineAppraisalDetail/onlineAppraisalDetail?id=" + this.id + "&type=3&auth=1&identTab=" + this.identTab
        })
      }
    },
    computed: {
      ismode() {
        let mode = this.goodsInfo.mode
        if (mode == 1) {
          return '标准鉴定'
        } else if (mode == 2) {
          return '精细鉴定'
        } else if (mode == 3) {
          return '专家鉴定'
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .theTitles {
    background: red;
  }

  .theTitle {
    width: 100%;
    font: 14px/30px '微软雅黑';
  }

  .chose_success {
    position: absolute;
    width: 36upx;
    height: 36upx;
    background: url(../../static/ident_success_icon.png) no-repeat center;
    background-size: cover;
    right: 20upx;
    top: 20upx;
  }

  /deep/ .uni-popup__wrapper-box {
    border-radius: 16upx;
  }

  .ohterlist {
    white-space: nowrap;
    height: 240upx;
    margin-bottom: 30upx;
  }

  .scroll-img {
    width: 180upx;
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin-right: 20upx;
    .other-upload {
      text-align: center;
      width: 120upx;
      line-height: 120upx;
      overflow: hidden;
      background: #FFFFFF;
      font-size: 48upx;
      color: #C1C1C1;
    }
  }

  .chose_img {
    .h3 {
      font-size: 30upx;
      margin-bottom: 30upx;
    }

    image {
      width: 180upx;
      height: 180upx;
    }

    .p {
      line-height: 60upx;
      text-align: center;
      background: #F5F5F5;
    }
  }

  .brand-title {
    text-align: center;
    line-height: 40upx;
    font-size: 32upx;
    color: #BE9F62;
    font-weight: bold;
    margin-bottom: 40upx;

    .icon-close {
      float: right;
      font-size: 40upx;
    }
  }

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
      height: 200upx;
    }
  }

  .identRoom_list_good {
    width: 100%;
    padding-top: 30upx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .identRoom_list_good_item {
      width: 180upx;
      height: 200upx;
      margin-right: 20upx;
      margin-bottom: 50upx;
      border-radius: 8upx;

      image {
        height: 180upx;
        width: 100%;
      }

      view {
        height: 50upx;
        line-height: 50upx;
        font-size: 24upx;
        font-weight: 400;
        color: #666666;
        background: #F5F5F5;
        text-align: center;
      }
    }

    & .identRoom_list_good_item:nth-child(3n) {
      margin-right: 0;
    }
  }

  .identRoom {
    border-top: 1upx solid #eeeeee;
    padding: 0 50upx;
    padding-top: 50upx;

    .identRoom_title {
      text {
        font-size: 48upx;
        color: #202022;
        font-weight: bold;
      }
    }

    .identRoom_good {
      margin-top: 20upx;
      margin-bottom: 50upx;

      text {
        font-size: 28upx;
        color: rgba(153, 154, 155, 1);
        margin-right: 10upx;
      }
    }

    .identRoom_list_img {
      width: 100%;
      height: auto;
      padding: 40upx 30upx;
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0upx 10upx 30upx rgba(0, 0, 0, 0.08);
      border-radius: 8upx;

      .identRoom_list_res {
        font-size: 32upx;
        font-weight: bold;
        color: rgba(201, 171, 121, 1);
      }
    }

    // 鉴定师
    .identRoom_teacher {
      width: 100%;
      height: 200upx;

    }
  }

  .common_bj {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0upx 10upx 30upx rgba(0, 0, 0, 0.08);
    border-radius: 8upx;
    margin-top: 30upx;
	padding-bottom: 15upx;
    .title {
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.18);
      opacity: 1;
      margin-top: 30upx;
      background: rgba(255, 255, 255, 1);
      border-radius: 10upx;
    }
  }

  .identRoom_teacher {
    margin-top: 30upx;
    height: 200upx;
    padding: 60upx 30upx;
    box-sizing: border-box;
    display: flex;

    .identRoom_teacher_l {
      width: 70%;

      .start {
        font-size: 32upx;
        color: #C9AB79;
        font-weight: bold;
      }

      .respoend {
        font-size: 22upx;
        font-weight: 400;
        color: #999999;
        margin-top: 20upx;
      }
    }

    .identRoom_teacher_r {
      width: 30%;

      image {
        width: 65upx;
        height: 65upx;
      }
    }
  }

  // 对话
  .dialogue {
    padding: 30upx 30upx;
    margin-top: 30upx;
  }

  .dialogue_teacher_title {
    font-size: 32upx;
    font-weight: bold;
    color: #C9AB79;
  }

  .dialogue_user {
    border-top: 0.1upx solid #eeeeee;
    margin-bottom: 30upx;

    .dialogue_user_name {
      font-size: 32upx;
      font-weight: bold;
      color: #C9AB79;
    }

    .dialogue_user_img_message {
      font-size: 30upx;
      font-weight: bold;
      color: #35363B;
      margin-top: 20upx;
    }
  }

  // 回复模块
  .dialogue_hf {
    padding: 30upx 30upx;

    .dialogue_user_name {
      font-size: 32upx;
      font-weight: bold;
      color: #C9AB79;
      margin-bottom: 10upx;
    }

    .dialogue_user_img_message_list {
      margin-top: 15upx;
      display: flex;
      flex-wrap: wrap;

      .dialogue_user_img_change {
        width: 180upx;
        height: 180upx;
        margin-right: 20upx;
        margin-bottom: 50upx;
        // display: flex;
        // align-items: center;
        background: #F5F5F5;
        // justify-content: center;
        line-height:180upx;
        text-align:center;
        font-size: 67upx;
        color: #C1C1C1;

        &:nth-of-type(3n) {
          margin-right: 0;
        }

        image {
          width: 100%;
          height: 100%;
        }
		view {
		  height: 50upx;
		  line-height: 50upx;
		  font-size: 24upx;
		  font-weight: 400;
		  color: #666666;
		  background: #F5F5F5;
		  text-align: center;
		}
      }
    }

    .user_text {
      height: 90upx;
      margin-top: 20upx;
      background: #F8F8F8;
      border-radius: 8upx;
      padding-left: 10upx;
      display: flex;
      align-items: center;
    }

    .user_text_mouse {
      background: #C9AB79;
      justify-content: center;
      color: #FFFFFF;

      &.revoic {
        background: #35363B;
        color: #C9AB79;
      }
    }

    .dialogue_user_img_message_text {
      margin-top: 20upx;
    }

    .user_text_voice {
      height: 90upx;
      border-radius: 8upx;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        width: 22upx;
        height: 28upx;
        vertical-align: middle;
        margin: 0upx 7upx 0 0;
      }

      text {
        font-size: 28upx;
        color: #999999;
        vertical-align: middle;
        display: inline-block;
        margin-left: 10upx;

      }
    }

    .user_text_hf {
      height: 90upx;
      border-radius: 45upx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #c9ab79;
      font-size: 36upx;
      font-weight: bold;
      color: #FFFFFF;
    }
  }

  .scoreBox {
    padding-top: 50upx;
    padding-bottom: 50upx;

    .scoreBtn {
      height: 90upx;
      border-radius: 8upx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
      font-size: 36upx;
      font-weight: bold;
      color: #C9AB79;
    }
  }


  // 鉴定成功模块
  .ident_success {
    height: 355upx;
    margin-top: 30upx;
    padding: 60upx 30upx;
    box-sizing: border-box;

    .ident_success_icon {
      text-align: center;

      image {
        width: 64upx;
        height: 64upx;
      }

      view {
        text-align: center;
        font-size: 28upx;
        font-weight: bold;
        margin-top: 10upx;
        color: #202022;
      }
    }

    .ident_success_btn {
      margin-top: 30upx;
      display: flex;
      justify-content: space-around;

      view {
        width: 48%;
        height: 100upx;
        background: #C9AB79;
        font-size: 30upx;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8upx;
      }

      view.back {
        background: #35363B;
      }
    }

    .ident_success_btn.active {
      view {
        display: none;
        width: 100%;
      }

      view.back {
        display: 100%;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // 弹层实例
  .ident_popup {
    height: 640upx;
    padding: 70upx 40upx;
    padding-bottom: 0;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    border-radius: 24upx 24upx 0upx 0upx;
    position: relative;

    .css-icon {
      position: absolute;
      width: 28upx;
      height: 28upx;
      top: 60upx;
      right: 46upx;
    }

    .title {
      font-size: 48upx;
      font-weight: bold;
      color: rgba(32, 32, 34, 1);
    }

    .message {
      font-size: 24upx;
      font-weight: 400;
      color: rgba(153, 154, 155, 1);
      margin-top: 30upx;
      margin-bottom: 45upx;
    }

    .start {
      image {
        width: 50upx;
        height: 50upx;
        margin-right: 15upx;
        vertical-align: middle;
      }
    }

    .start_text {
      height: 80upx;
      margin: 50upx 0;
      line-height: 80upx;
      background: rgba(245, 245, 245, 1);
      padding-left: 30upx;
      border-radius: 8upx;
      font-size: 28upx;
      color: rgba(153, 154, 155, 1);
    }

    .click_btn {
      height: 100upx;
      line-height: 100upx;
      background: rgba(53, 54, 59, 1);
      border-radius: 8upx;
      text-align: center;
      color: #C9AB79;
    }
  }

  .voice_list {
    margin-top: 10rpx;

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
  }
</style>
