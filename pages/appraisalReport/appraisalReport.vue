<template>
  <view class="report">
    <image :src="canvasImg" :style="{height: cheight / 2 + 'px'}" mode="widthFix"></image>
    <canvas class="canvas_img" :style="{width: cwidth + 'px', height:cheight + 'px'}" canvas-id="firstCanvas"></canvas>
    <view class="start-btn" @click="savePhoto">保存到手机</view>
	<!-- <cover-view class="saveBox" v-if="show">
		<cover-view class="saveTie">{{text}}</cover-view>
	</cover-view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        err: "",
        canvasImg: "",
		// show:false,
		// text:'',
        cwidth: 690 * 2, //放大四倍保持真机清晰度
        cheight: 980 * 2, //放大四倍保持真机清晰度
        data: {
          // title: "实物鉴定评估报告",
          // stitle: "PHYSICAL APPRAISAL REPORT",
          // classItem: "香奈儿",
          // productItem: "精细鉴定",
          // certificate: "第12346号",
          // basis: ["QB/T 1333-2004/ISO1717313131"],
          // result: "该商品符合该产品工艺制造工艺",
          // imgList: ["https://raw.githubusercontent.com/xh747364/blog-photolist/master/photos/2019-08-03_timg.jpg",
          // "https://raw.githubusercontent.com/xh747364/blog-photolist/master/photos/2019-08-03_timg.jpg",
          // ],
          // person: "张先生",
          // company: "北京包铺鉴定有限公司",
          // desc: ["1、实物鉴定结论不可作为司法用途", "2、本电子证书对该商品负责，一旦该商品的电子吊牌，防伪贴纸，挂绳任意一件损坏，此证书立即失效", "3、若对鉴定结果有异议，需要在5日内提出，逾期不予受理"]
        }
      };
    },
    onLoad(option) {
      this.id = option.id
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        let params = {
          id: this.id
        }
        this.$requestApi.goodsOver(params).then(res => {
			
			if(res.data.report==""){
				
          this.data = {
            title: "实物鉴定评估报告",
            stitle: "PHYSICAL APPRAISAL REPORT",
            classItem: res.data.brand,
            // productItem: "精细鉴定",
            certificate: res.data.cate,
            basis: [res.data.basis],
            result: res.data.result,
            imgList: res.data.image,
            person: "张先生",
            company: "北京包铺鉴定有限公司",
            desc: ["1、实物鉴定结论不可作为司法用途", "2、本电子证书对该商品负责，一旦该商品的电子吊牌，防伪贴纸，挂绳任意一件损坏，此证书立即失效", "3、若对鉴定结果有异议，需要在5日内提出，逾期不予受理"]
            // certificate: res.data.cate,
            // basis: [res.data.basis],
            // result: res.data.result,
            // imgList: res.data.image,
          }
          console.log(res.data)
          this.createReport()
		  }else{
			  this.canvasImg = res.data.report
		  }
        })
      },
      savePhoto() {
		  let that = this;
        uni.saveImageToPhotosAlbum({
          filePath: this.canvasImg,
          success: (res) => {
            uni.showToast({
            	title:'下载成功',
				duration:2000,
            })
            console.log('save success',res);
          },
          fail: (err) => {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              uni.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: (res) =>{
                  uni.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        uni.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        uni.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        });
      },
      // 绘制图片封装
      async drawImg(imgsrc) {
        var promise = new Promise((resolve, reject) => {
          uni.getImageInfo({
            src: imgsrc,
            success: resolve,
            fail: resolve
          })
        })
        return promise
      },
      // 多行文字封装
      drawText(_paint, str, initHeight, titleHeight, offleft, _fontStyle) {
        var canvasWidth = this.cwidth - 140 * 2
        var lineWidth = 0;
        _paint.font = _fontStyle ? _fontStyle : "400 40px 微软雅黑";
        _paint.fillStyle = "#35363B";
        var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        for (let i = 0; i < str.length; i++) {
          lineWidth += _paint.measureText(str[i]).width;
          if (lineWidth > canvasWidth) {
            _paint.fillText(str.substring(lastSubStrIndex, i), offleft, initHeight); //绘制截取部分
            initHeight += 40 * 2; //40为字体的高度
            lineWidth = 0;
            lastSubStrIndex = i;
            titleHeight += 40 * 2;
          }
          if (i == str.length - 1) { //绘制剩余部分
            _paint.fillText(str.substring(lastSubStrIndex, i + 1), offleft, initHeight);
          }
        }

      },
      //居中文字封装
      canvas_text(_paint, _text, _fontSzie, _color, _height) {
        _paint.font = _fontSzie;
        _paint.fillStyle = _color;
        _paint.textAlign = "center";
        _paint.textBaseline = "middle";
        _paint.fillText(_text, this.cwidth / 2, _height);
      },
      async createReport() {
        //When I wrote this, only God and I understood what I was doing. Now, only God knows.
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        var context = uni.createCanvasContext('firstCanvas');
        // context.scale(0.5, 0.5)
        // 背景颜色
        context.rect(0, 0, this.cwidth, this.cheight);
        context.setFillStyle('#FFFFFF');
        context.fill();
        //边框
        context.strokeStyle = '#C1C1C1';
        context.save()
        context.lineWidth = 4 * 2;
        context.strokeRect(4 * 2, 4 * 2, this.cwidth - 8 * 2, this.cheight - 8 * 2);
        context.restore()
        // 内边框
        context.save()
        context.lineWidth = 1 * 2;
        context.setLineDash([5, 5]);
        // context.strokeStyle = '#C1C1C1';
        context.strokeRect(16 * 2, 16 * 2, this.cwidth - 32 * 2, this.cheight - 32 * 2);
        context.restore()

        // 四个边角
        // 左上角
        context.save()
        context.lineWidth = 3 * 2;
        context.moveTo(15 * 2, 15 * 2)
        context.lineTo(40 * 2, 15 * 2)
        context.stroke()
        context.moveTo(15 * 2, 14 * 2)
        context.lineTo(15 * 2, 40 * 2)
        context.stroke()
        // 右上角
        context.moveTo(this.cwidth - 40 * 2, 15 * 2)
        context.lineTo(this.cwidth - 15 * 2, 15 * 2)
        context.stroke()
        context.moveTo(this.cwidth - 15 * 2, 14 * 2)
        context.lineTo(this.cwidth - 15 * 2, 40 * 2)
        context.stroke()
        // 左下角
        context.moveTo(15 * 2, this.cheight - 40 * 2)
        context.lineTo(15 * 2, this.cheight - 15 * 2)
        context.stroke()
        context.moveTo(15 * 2, this.cheight - 15 * 2)
        context.lineTo(40 * 2, this.cheight - 15 * 2)
        context.stroke()
        // 右下角
        context.moveTo(this.cwidth - 15 * 2, this.cheight - 40 * 2)
        context.lineTo(this.cwidth - 15 * 2, this.cheight - 15 * 2)
        context.stroke()
        context.moveTo(this.cwidth - 40 * 2, this.cheight - 15 * 2)
        context.lineTo(this.cwidth - 15 * 2, this.cheight - 15 * 2)
        context.stroke()
        context.restore()

        // 标题
        context.save()
        this.canvas_text(context, this.data.title, "bold 80px 微软雅黑", "#C9AB79", 80 * 2)
        context.restore()
        
        // 装饰
        var cl = await this.drawImg( getApp().globalData.img_src + '/assets/bpimg/canvas_l.png')
        context.drawImage(cl.path, 110 * 2, 65 * 2, 56 * 2, 15 * 2)
        var cr = await this.drawImg( getApp().globalData.img_src + '/assets/bpimg/canvas_r.png')
        context.drawImage(cr.path, 520 * 2, 65 * 2, 56 * 2, 15 * 2)
        
        // 副标题
        context.save()
        this.canvas_text(context, this.data.stitle, "400 32px 微软雅黑", "#C9AB79", 120 * 2)
        context.restore()
        // 基本信息
        context.save()
        let infoTextHeight = 160
        // 图片
        var imgx = (this.cwidth - 160 * 2 * this.data.imgList.length - 40 * 2) / 2
        for (var i = 0; i < this.data.imgList.length; i++) {
          imgx = imgx + 160 * 2 * i + 40 * 2 * i
          var a1 = await this.drawImg(this.data.imgList[i])
          context.drawImage(a1.path, imgx, infoTextHeight * 2, 160 * 2, 160 * 2)
        }
        //记录文字高度
        infoTextHeight += 100 * 2
        let classItem = '商品品牌：' + this.data.classItem
        let productItem = '商品品类：' + this.data.productItem
        let certificate = '证书编号：' + this.data.certificate
        let result = '结       论：' + this.data.result
        this.drawText(context, classItem, (infoTextHeight) * 2, 40 * 2, 60 * 2)
        this.drawText(context, productItem, (infoTextHeight + 40) * 2, 40 * 2, 60 * 2)
        this.drawText(context, certificate, (infoTextHeight + 80) * 2, 40 * 2, 60 * 2)
        var rheight = 210 * 2
        var offleft = 60 * 2
        infoTextHeight += 80
        this.data.basis.map((x, y) => {
          if (y == 0) {
            x = "鉴定依据：" + x
          } else {
            offleft = 160 * 2
          }
          this.drawText(context, x, (infoTextHeight + 40 * (y + 1)) * 2, 40 * 2, offleft)
        })
        this.drawText(context, result, infoTextHeight * 2 + (40 * (this.data.basis.length + 1)) * 2, 40 * 2, 60 * 2)
        infoTextHeight = rheight + (40 * (this.data.basis.length + 1)) * 2
        context.restore()
        infoTextHeight += 160 * 2
        //文字
        infoTextHeight += 80 * 2
        // context.save()
        // this.drawText(context, "检验方：", infoTextHeight, 40 * 2, 60 * 2, "bold 44px 微软雅黑", "#000000")
        // context.restore()
        // context.save()
        // this.drawText(context, this.data.person, infoTextHeight + 40 * 2, 40 * 2, 60 * 2, "0 40px 微软雅黑", "#636365")
        // context.restore()
        // context.save()
        // this.drawText(context, "鉴定方：", infoTextHeight, 40 * 2, 360 * 2, "bold 44px 微软雅黑", "#000000")
        // context.restore()
        context.save()
        this.drawText(context, this.data.company, infoTextHeight + 80 * 2, 40 * 2, 360 * 2, "0 40px 微软雅黑", "#636365")
        context.restore()
        // 已鉴定图片
        var a = getApp().globalData.img_src + "/assets/bpimg/yijianding.png"
        var yijianding = await this.drawImg(a)
        context.drawImage(yijianding.path, imgx + 30 * 2, infoTextHeight - 60 * 2, 158 * 2, 157 * 2)
        // 备注
        infoTextHeight += (40 * 2 + 80 * 2)
        context.save()
        this.drawText(context, "备注：", infoTextHeight, 40 * 2, 90 * 2, "400 36px 微软雅黑", "#666666")
        infoTextHeight += 40 * 2
        context.restore()
        context.save()
        this.drawText(context, this.data.desc[0], infoTextHeight, 40 * 2, 90 * 2, "400 36px 微软雅黑", "#666666")
        infoTextHeight += 40 * 2
        this.drawText(context, this.data.desc[1], infoTextHeight, 40 * 2 * 2, 90 * 2, "400 36px 微软雅黑", "#666666")
        infoTextHeight += 40 * 2 * 2
        this.drawText(context, this.data.desc[2], infoTextHeight, 40 * 2, 90 * 2, "400 36px 微软雅黑", "#666666")
        context.restore()
        console.log(infoTextHeight)
        //渲染
        context.draw(false, () => {
          // 隐藏canvas使用image显示图片
          setTimeout(() => {
            console.log(1123213);
            uni.canvasToTempFilePath({
              x: 0,
              y: 0,
              canvasId: 'firstCanvas',
              fileType: 'jpg',
              quality: 1,
              destWidth: this.cwidth / 2,
              destHeight: this.cheight / 2,
              success: (res) => {
                this.canvasImg = res.tempFilePath;
                uni.hideLoading();
              },
              fail: (res) => {
                uni.hideLoading();
				
                uni.showToast({
                  icon: 'none',
                  title: '生成失败,请重试'
                });
                this.err = JSON.stringify(res)
                console.log(res)
              }
            })
          }, 2000)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .report {
    position: relative;
    width: 690upx;
    margin: 40upx auto;
    overflow: hidden;
    padding-bottom: 120upx;
    canvas {
      position: absolute;
      right: -66666px;
	  visibility: hidden;
    }

    image {
      width: 100%;
      height: 980upx;
    }

    .start-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 99999;
      width: 100%;
      line-height: 100upx;
      text-align: center;
      background: #35363B;
      color: #D5BD94;
      font-size: 30upx;
      font-weight: bold;
      margin: 0 auto;
    }
  }
  .saveBox {
	  position: fixed;
	  left:0;
	  right:0;
	  top:0;
	  bottom:0;
	  display:flex;
	  justify-content: center;
	  align-items: center;
	  .saveTie {
		  background-color: rgba(0,0,0,0.3);
		  color:#FFFFFF;
		  font-size: 14upx;
		  width:300upx;
		  height:200upx;
		  line-height: 200upx;
	  }
  }
</style>
