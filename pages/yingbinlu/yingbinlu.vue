<template>
	<view>
		<view class="content" >
		  <image src="../../static/bizhi-img.jpg" mode=""></image>
		</view>
    <view class="content" >
      <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3736465548,670437358&fm=26&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img0.imgtn.bdimg.com/it/u=4250058738,780121024&fm=11&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img4.imgtn.bdimg.com/it/u=1963304009,2816364381&fm=26&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img4.imgtn.bdimg.com/it/u=2853553659,1775735885&fm=26&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img3.imgtn.bdimg.com/it/u=1542609117,2286902976&fm=26&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img5.imgtn.bdimg.com/it/u=3135198947,3455805190&fm=26&gp=0.jpg"></image>
    </view>
    <view class="content" >
      <image src="http://img2.imgtn.bdimg.com/it/u=1846231234,1182038932&fm=26&gp=0.jpg"></image>
    </view>
    <nav-bar :navlist='navlist' :sort='sort'></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
    onLoad() {
     // uni.startPullDownRefresh(); // 首次进入界面 调用下拉刷新
    },
    onPullDownRefresh() {
      console.log(898989);
      uni.stopPullDownRefresh();
      
      //这里模拟数据请求延迟 
      // setTimeout(function(){
      //   uni.stopPullDownRefresh();
      // },2000);
    },
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
  .content {
    width:100%;
    height:400rpx;
    margin:20rpx auto;
    image {
      width:100%; 
      height:100%;
    }
  }
</style>
