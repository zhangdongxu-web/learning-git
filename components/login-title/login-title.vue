<template>
	<view>
		<view class="baopu_logo" v-if="title.title == '' ">
			<image mode="widthFix" src="../../static/baopu_logo.png"></image>
		</view>
		<view class="from_common" v-if="title.title != '' ">
			<view>
				<view class="from_common_title">
					<slot name="title"></slot>
				</view>
				<view class="from_common_messge">
					<slot name="message"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title: {
				type: Object,
				default: {
					title:'',
					message:''
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.baopu_logo{
	  display:flex;
	  height:350upx;
	  justify-content:center;
	  align-items:center;
	  image{
		  width:252upx;
		  height:155upx;
	  }
  }
  .from_common{
  		 display:flex;
  		 height:350upx;
  		 align-items:center;
		 flex-wrap:wrap;
  		 
  		.from_common_title{
			width:100%;
  			font-size:60upx;
  			font-weight:bold;
  			color:rgba(53,54,59,1);
  		}
  		.from_common_messge{
			margin-top:20upx;
			width:100%;
  			font-size:28upx;
  			color:rgba(193,193,193,1);
  		}
  }
</style>
