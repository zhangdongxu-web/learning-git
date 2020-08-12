<template>
  <view class="content" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">

    <view class="big-img">
      <view class="a" ref="elememt" :animation='animationData' v-for="(item,index) in list" :key="index">
        <image :src="item" mode=""></image>
      </view>
    </view>
    <view class="smila-img">
      <view class="aa" :animation='animationDataa' v-for="(item,index) in listb" :key="index">
        <image :src="item" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        animationData: {},
        animationDataa: {},
        flag: 0,
        text: '',
        lastX: 0,
        lastY: 0,
        goLength: 0,
        goLengthq: 0,
        goLengtha: 0,
        goLengthqq: 0,
        gogogotop: 500,
        gogogobottom: 500,
        list: ["../../static/mote7.jpg", "../../static/mote1.jpg", "../../static/mote2.jpg", "../../static/mote3.jpg",
          "../../static/mote4.jpg", "../../static/mote5.jpg", "../../static/mote6.jpg", "../../static/mote7.jpg",
          "../../static/mote8.jpg", "../../static/mote9.jpg", "../../static/mote10.jpg"
        ],
        listb: ["../../static/mote1.jpg", "../../static/mote2.jpg", "../../static/mote3.jpg",
          "../../static/mote4.jpg", "../../static/mote5.jpg", "../../static/mote6.jpg", "../../static/mote7.jpg",
          "../../static/mote8.jpg", "../../static/mote9.jpg", "../../static/mote10.jpg"
        ]


      }
    },
    onUnload() {
      this.animationData = {},
        this.animationDataa = {}
    },
    onload() {

    },
    onShow() {
      this.animation = uni.createAnimation({
        timingFunction: "ease-in"
      })
      // 创建动画实例-
    },
    mounted() {
      // 进入界面获取要执行动画的view高度
      var that = this;
      console.log(that.goLengthq);
      uni.getSystemInfo({
        success: function(res) { // res - 各种参数
          let obj = uni.createSelectorQuery().select('.a');
          let objb = uni.createSelectorQuery().select('.aa');
          obj.boundingClientRect(function(data) { // data - 各种参数
              console.log(data.height);
              that.goLengthq = data.height;
            }).exec(),
            objb.boundingClientRect(function(data) { // data - 各种参数
              console.log(data.height);
              that.goLengthqq = data.height;
            }).exec()
        }
      })
    },
    methods: {
      running() {
        // console.log(88)
        this.animation.translateY(this.goLength).step({
          duration: this.gogogotop
        })
        this.animationData = this.animation.export()
      },
      runninga() {
        // console.log(88)
        this.animation.translateY(this.goLengtha).step({
          duration: this.gogogobottom
        })
        this.animationDataa = this.animation.export()
      },
      handletouchmove: function(event) {
        // console.log(event)
        if (this.flag !== 0) {
          return;
        }
        let currentX = event.touches[0].pageX;
        let currentY = event.touches[0].pageY;
        let tx = currentX - this.lastX;
        let ty = currentY - this.lastY;
        let text = '';
        this.mindex = -1;
        if (Math.abs(tx) > Math.abs(ty)) {
          if (tx < 0) {
            text = '向左滑动';
            this.flag = 1;
          } else if (tx > 0) {
            text = '向右滑动';
            this.flag = 2;
          }
        } else {
          if (ty < 0) {
            text = '向上滑动';
            this.flag = 3;
            this.gogogobottom = 100;
            this.gogogotop = 500;
            // console.log(this.goLengthq);
            if (-this.goLength == this.goLengthq * (this.list.length - 1)) {
              this.goLength = 0;
              this.goLengtha = 0;
            } else {
              this.goLength += -this.goLengthq;
              this.goLengtha += -this.goLengthqq;
            }

            this.running();
            this.runninga();
          } else if (ty > 0) {
            text = '向下滑动';
            this.flag = 4;
            this.gogogobottom = 700;
            this.gogogotop = 400;
            if (this.goLengtha == 0) {

            } else {
              this.goLength += this.goLengthq;
              this.goLengtha += this.goLengthqq;
            }

            this.running();
            this.runninga();
          }
        }
        this.lastX = currentX;
        this.lastY = currentY;
        this.text = text;
      },
      handletouchstart: function(event) {
        // console.log(event)
        this.lastX = event.touches[0].pageX;
        this.lastY = event.touches[0].pageY;
      },
      handletouchend: function(event) {
        this.flag = 0;
        this.text = '没有滑动';
      }

    },
    computed: {

    }

  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100vh;
    /* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
    /* padding-top: 200rpx; */
    overflow: hidden;
    position: relative;
    /* z-index: 10; */
  }

  .big-img {
    width: 100%;
    height: 800rpx;
    position: absolute;
    top: 0;
    z-index: 1;
    overflow: hidden;
  }

  .a {
    width: 100%;
    height: 800rpx;
    /* 		background-image: url(../../static/aa.png);
		background-repeat: no-repeat;
		background-size: 100%; */
    /* border: 1rpx #4CD964 solid; */
  }

  .a image {
    width: 100%;
    height: 100%;
  }

  .smila-img {
    width: 100%;
    height: 660rpx;
    position: absolute;
    top: 800rpx;
    z-index: 2;
    overflow: hidden;
    /* background-image: url(../../static/xiatian.jpg);
		background-repeat: no-repeat;
		background-size: 100%; */
  }

  .aa {
    width: 100%;
    height: 150rpx;
    /* background-color: #007AFF; */
    /* background-image: url(../../static/aa.png);
		background-repeat: no-repeat;
		background-size: 100%; */
    /* border: 1rpx #333333 solid; */
    overflow: hidden;
  }

  .aa image {
    width: 100%;
  }
</style>
