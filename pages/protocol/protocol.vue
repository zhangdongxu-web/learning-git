<template>
	<view>
		<view class="h1">{{txt1}}</view>
		<view class="txt" v-html="context1"></view>
		<view class="h1">{{txt2}}</view>
		<view class="txt" v-html="context2"></view>
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
			  this.txt1=res.data.list[0].name;
			  this.txt2=res.data.list[1].name;
			  this.context1=res.data.list[0].content;
			  this.context2=res.data.list[1].content;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
 .h1 {
	font-size:32upx;
	font-weight: bold;
	 text-align: center;
	 line-height: 40upx;
 }
 .txt {
	 font-size:26upx;
	 padding:20upx;
   line-height: 40rpx;

 }
</style>
