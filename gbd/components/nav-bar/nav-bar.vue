<template>
	<view class="footer-nav">
	  <view class="item" @click = "goaaa">
	    <text>首页</text>
	  </view>
    <view class="item" @click = "gobbb">
      <text>二页</text>
    </view>
    <view class="item" @click = "goccc">
      <text>三页</text>
    </view>
    <view class="item" @click = 'goddd'>
      <text>四页</text>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			
		},
		props: {
			
		},
		methods: {
      goaaa() {
        // console.log(888)
        uni.switchTab({
          url: '../../pages/index/index',
          // success: res => {},
          // fail: () => {},
          // complete: () => {}
        });
      },
      gobbb() {
        // console.log(888)
        uni.switchTab({
          url: '../../pages/yingbinlu/yingbinlu',
          // success: res => {},
          // fail: () => {},
          // complete: () => {}
        });
      },
      goccc() {
        uni.switchTab({
          url: '../../pages/tuanjielu/tuanjielu',
          // success: res => {},
          // fail: () => {},
          // complete: () => {}
        });
      },
      goddd() {
        uni.navigateTo({
          url: '../../pages/aaa/aaa',
          success: res => {},
          fail: () => {},
          complete: () => {}
        });
      }
		}
	}
</script>

<style lang="less" scoped>
	.footer-nav {
    border-radius:30rpx;
		position: fixed;
		width: 80%;
		height: 133upx;
		bottom: 30rpx;
		left: 10%;
		z-index: 99;
    background:pink;
    opacity:0.7;
		// background: url('../../static/logo.png') no-repeat center;
		// background-size: cover;
		display: flex;
		justify-content: space-around;
    align-items:center;
    .item {
      box-sizing: border-box;
      width:100rpx;
      height:100rpx;
      border-radius:50%;
      background:red;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
      padding-bottom:10rpx;
      text {
        
        text-align:center;
        // margin: auto;
        
      }
    }
		
	}
</style>
