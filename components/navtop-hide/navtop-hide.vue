<template>
	<view class="navtop-hide" :style="opacity">
	  <view class="status-height" :style="{height: statusBarHeight+'px'}"></view>
    <view class="nav-title">
      <view @click="goBack" v-if="goback" class="goback"><view class="css-icon icon-arrow-left"></view></view>
      <view v-if="title!=''" class="navtitle">{{title}}</view>
    </view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
        statusBarHeight: getApp().globalData.statusBarHeight
			}
		},
    props:{
      title: {
        type: String,
        default: () => ""
      },
      goback: {
        type: Boolean,
        default: false
      },
      opacity: {
        type: String,
        default: () => ""
      }
    },
		created() {
			
		},
		methods:{
			goBack(){
        uni.navigateBack()
      }
		}
	}
</script>

<style lang="less" scoped>
  .navtop-hide{
    position: sticky;
    top: 0;
    z-index: 9;
    .nav-title{
      display: flex;
      height: 100upx;
      position: relative;
      .goback{
        position: absolute;
        height: 100upx;
        left: 40upx;
        display: flex;
        align-items: center;
        .icon-arrow-left::before{
          border-color: #FFFFFF;
        }
      }
      .navtitle{
        flex: 1;
        text-align: center;
        line-height: 100upx;
        text-align: center;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 28upx;
        letter-spacing: 2upx;
      }
    }
    
  }
</style>
