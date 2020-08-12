<template>
	<view style="line-height: 50rpx; padding: 20rpx;">
		<view class="h1">{{txt1}}</view>
		<!-- <view class="txt" v-html="context1"></view> -->
		<rich-text  :nodes="context1"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt1:'',
				txt2:'',
				context1:'',
				context2:'',
			}
		},
		onShow(){
			this.$requestApi.getagreement().then(res => {
				console.log(res)
			  //id: 1, name: "包铺小程序服务协议", content: "<h2 style="margin-top:0;margin-right:0;margin
			  this.txt1=res.data.list[0].name;
			  this.context1=res.data.list[0].content;
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
 .h1 {
	font-size:32upx;
	font-weight: bold;
	 text-align: center;
	 line-height: 37upx;
 }
 .txt {
	 font-size:26upx;
	 padding:10upx;
 }
</style>
