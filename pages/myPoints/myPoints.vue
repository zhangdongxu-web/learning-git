<template>
	<view class="page">
		<navtop-hide title="我的主页" :goback="true"></navtop-hide>
		<!-- 可用积分 -->
		<view class="my_points_top">
			<view class="available_points">可用积分</view>
			<view class="points_num">{{integral.score}}</view>
			<view class="points_detail_main">
				<view class="points_detail" @tap="getIntegralDetail">
					<text>积分明细</text>
				</view>
			</view>
		</view>
		<!-- 收支 -->
		<view class="points_budget_main">
			<view class="points_budget">
				<view class="points_budget_l">
					<view class="points_budget_title">今日获得:</view>
					<view class="points_budget_text">{{integral.todayscore}}积分</view>
				</view>
				<view class="points_budget_r">
					<view class="points_budget_title">累计已获:</view>
					<view class="points_budget_text">{{integral.totalscore}}积分</view>
				</view>
			</view>
		</view>
		<!-- 获取积分 -->
		<view class="get_integral_main">
			<view class="get_integral_title">
				如何获取积分
			</view>
			<view class="get_integral_item" 
			v-for="(item,i) in integral.scorelist"
			:key="i">
				<view class="get_integral_item_l">
					<block v-if=" item.name == '首次注册登录' ">
					   <image src="../../static/get_integral.png"></image>
					</block>
					<block v-else-if=" item.name == '推荐好友' ">
						 <image src="../../static/get_integral.png"></image>
					</block>
					<block v-else>
						<image src="../../static/get_integral.png"></image>
					</block>
				</view>
				<view class="get_integral_item_z">
					<view class="get_integral_item_title">{{item.name}}</view>
					<view class="get_integral_item_text">
						<image src="../../static/bao.png"></image>
						+{{item.score}}积分奖励
					</view>
				</view>
				<view class="get_integral_item_r" :class="{active: i != 0}">
					<text v-if="i==0">已领取</text>
          <text v-if="i==1" @click="goVisited()">去邀请</text>
          <text v-if="i==2" @click="onlineappraisal()">去鉴定</text>
					<!-- <text v-show="item.istrue == false" @click="addPoints(item)">待领取</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integral:{
					score: 0,
					todayscore: 0,
					totalscore: 0,
				    getIntegral:[]
				},
			};
		},
		methods:{
			getIntegralDetail() {
				uni.navigateTo({
					url: '../IntegralDetails/IntegralDetails',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 获取积分
			async getMyPointsHand() {
				let res = await this.$requestApi.getMyPoints();
				this.integral = res.data;
			},
      goVisited(){
        getApp().globalData.visited = true
        uni.switchTab({
          url: '../mine/mine'
        })
      },
      onlineappraisal(){
        uni.navigateTo({
          url: '../onlineappraisal/onlineappraisal'
        })
      },
			// 领取积分
			// async addPoints(item) {
			// 	let userId = uni.getStorageSync('userinfo').userid;
			// 	let res = await this.$requestApi.getMyPoints({userId:userId,type:1});
			// 	this.integral = res.data.integral;
			// 	item.istrue = true;
				
			// }
		},
	    onShow() {
			this.getMyPointsHand();
		}
	}
</script>

<style lang="less" scoped>
.page{
	background-size: 100% 690rpx;
}
.my_points_top{
	width:100%;
	height:502rpx;
	overflow:hidden;
}
.available_points,.points_num,.points_detail{
	text-align: center;
}
.available_points{
	color:#FFFFFF;
	font-size:26rpx;
	padding-top:50rpx;
}
.points_num{
	color:#C9AB79;
	padding-top:20rpx;
	font-size:60rpx;
	font-weight:600;
}
.points_detail_main{
	display:flex;
	justify-content:center;
	padding-top:30rpx;
	.points_detail{
		display:inline-block;
		width:230rpx;
		height:70rpx;
		line-height:70rpx;
		background:#FFFFFF;
		color:#C9AB79;
		border-radius:40rpx;
		text{
			font-size:26rpx;
		}
	}
}
// 收支
.points_budget_main{
	width:100%;
	box-sizing:border-box;
	padding:0 30rpx;
    height:200rpx;
	overflow:hidden;
	margin-top:-199rpx;
	.points_budget{
		display:flex;
		background:#C9AB79;
		color:#FFFFFF;
		height:220rpx;
		padding:30rpx 0;
		box-sizing:border-box;
		border-radius:20rpx;
		&>view{
			flex:1;
			box-sizing:border-box;
			padding-left:80rpx;
		}
	}
	.points_budget_title{
		font-size:30rpx;
		color:#FFFFFF;
	}
	.points_budget_text{
		padding-top:30rpx;
		font-size:46rpx;
		color:#FFFFFF;
	}
}
// 获取积分
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
			background:rgba(201,171,121,1);
			border-radius:50%;
			display:flex;
			justify-content:center;
			align-items:center;
			image{
				width:36rpx;
				height:34rpx;
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
				padding-top:10rpx;
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
			background:rgba(193,193,193,1);
			border-radius:99rpx;
			display:flex;
			justify-content:center;
			align-items:center;
			color:#FFFFFF;
		}
		.get_integral_item_r.active{
			background:rgba(201,171,121,1)
		}
	}
	
	
	
	
}
</style>
