<template>
	<view>
		<!-- 获取积分 -->
		<view class="get_integral_main">
	<!-- 		<view class="get_integral_title">
				如何获取积分
			</view> -->
			<view class="get_integral_item" 
			v-for="(item,i) in integralDetails"
			:key="i">
				<!-- <view class="get_integral_item_l">
					<block v-if=" item.name == '首次注册登录' ">
					   <image src="../../static/login_first.png"></image>
					</block>
					<block v-else-if=" item.name == '推荐好友' ">
						 <image src="../../static/tj_img.png"></image>
					</block>
					<block v-else>
						<image :src="item.url"></image>
					</block>
				</view> -->
				<view class="get_integral_item_z">
					<view class="get_integral_item_title">{{item.name}}</view>
					<view class="get_integral_item_text">
						{{item.time}}
					</view>
				</view>
				<view>
					<view class="get_integral_item_r" :class="{active: item.score > 0}">
						{{item.score}}
					</view>
					<view class="item-time">余额 {{item.balance}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integralDetails:[],
			};
		},
		methods:{
      getLocalTime(dataStr) {
        var time = new Date(dataStr*1000);
        function timeAdd0(str) {
          if (str < 10) {
            str = '0' + str;
          }
          return str
        }
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
      },
			async getIntegralDetailsHand() {
				let userId = uni.getStorageSync('userinfo').userid;
				let res = await this.$requestApi.getIntegralDetails({userId:userId});
        res.data.list.map(x=> x.time = this.getLocalTime(x.time))
				this.integralDetails = res.data.list;
			}
		},
		onLoad() {
			this.getIntegralDetailsHand();
		}
	}
</script>

<style lang="less" scoped>
.get_integral_main{
	padding:0 30rpx;
	
	.get_integral_title{
		font-size:32rpx;
		color:#202022;
		font-weight:bold;
		height:100rpx;
		line-height:100rpx;
	}
	.get_integral_item{
		height:180rpx;
		background:#F8F8F8;
		padding:0 30rpx;
		padding-top:50rpx;
		margin-bottom:30rpx;
		box-sizing:border-box;
		border-radius:8rpx;
		display:flex;
		.get_integral_item_l{
			width:80rpx;
			height:80rpx;
			// background:rgba(201,171,121,1);
			// border-radius:50%;
			// display:flex;
			// justify-content:center;
			// align-items:center;
			image{
				width:80rpx;
				height:80rpx;
			}
		}
		.get_integral_item_z{
			flex:1;
			padding-left:20rpx;
			.get_integral_item_title{
				padding-top:5rpx;
				font-size:32rpx;
				font-weight:bold;
				color:rgba(32,32,34,1);
			}
			.get_integral_item_text{
				padding-top:20rpx;
				image{
					width:30rpx;
					height:32rpx;
				}
				font-size:32rpx;
				color:rgba(193,193,193,1);
			}
		}
		.get_integral_item_r{
			width:140rpx;
			height:70rpx;
			display:flex;
			font-size:40rpx;
			justify-content:center;
			align-items:center;
			color:#202022;
		}
		.get_integral_item_r.active{
			color:#BE9F62;
		}
	}
}
</style>
