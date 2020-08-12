<template>
	<view class="page" :class="{fullScreen: fullScreen}">
		<navtop-hide :opacity="opacity"></navtop-hide>
		<view class="userinfo-wrap">
			<view class="userinfo">
				<view class="userinfo-avatar">
					<image :src="userinfo.avatar"></image>
				</view>
				<view class="userinfo-info">
					<view class="h1 text-hidden1">{{userinfo.name}}</view>
					<view class="p text-hidden1">专注于：{{userinfo.describe}}</view>
				</view>
			</view>
			<!-- <view class="userinfo">
        <view class="userinfo-avatar">
          <image :src="userinfo.avatar"></image>
        </view>
        <view class="userinfo-info">
          <view class="h1"><text class="text-hidden1">{{userinfo.name}}</text><view class="mine_user_up" @click="exitInfo"></view></view>
          <view class="level text-hidden1">
            <text v-if="userinfo.level == 1">初级鉴定师</text>
            <text v-else-if="userinfo.level == 2">中级鉴定师</text>
            <text v-else>高级鉴定师</text>
          </view>
          <view class="p">{{userinfo.describe}}</view>
          
        </view>
      </view> -->
		</view>

		<view class="user-result" :class="classLevel">
			<view class="star"></view>
			<view class="level text-hidden1">
				<text>{{userinfo.level}}</text>
				<!-- <text v-if="userinfo.level == 1">初级鉴定师</text>
				<text v-else-if="userinfo.level == 2">中级鉴定师</text>
				<text v-else>高级鉴定师</text> -->
			</view>
			<view class="items-box">
				<view class="item">总鉴定单数<p>{{userinfo.authtotal}}</p>
				</view>
				<view class="item">正确率<p>{{userinfo.rate}}</p>
				</view>
			</view>
			<!-- <image class='renzheng-pic' mode="widthFix" src="../../static/appraisalDetailRenzheng.png"></image> -->
		</view>

		<!-- <view class="user-result">
      <view class="result-item">
        <view class="h1">{{userinfo.authtotal}}</view>
        <view class="p">总鉴定次数</view>
      </view>
      <view class="result-item">
        <view class="h1">{{userinfo.daynum}}</view>
        <view class="p">鉴定人数</view>
      </view>
      <view class="result-item">
        <view class="h1">{{userinfo.peoplenum}}</view>
        <view class="p">平均用时</view>
      </view>
    </view> -->

		<view class="user-list">
			<navigator class="a" url="../countEchart/countEchart?type=1" hover-class="none">
				<view class="user-text">
					<image src="../../static/class_item.png" mode="widthFix"></image>
					<text>鉴定品类统计</text>
				</view>
				<view class="css-icon icon-arrow-right"></view>
			</navigator>
			<navigator class="a" url="../countEchart/countEchart?type=2" hover-class="none">
				<view class="user-text">
					<image src="../../static/user_jd.png" mode="widthFix"></image>
					<text>鉴定方式统计</text>
				</view>
				<view class="css-icon icon-arrow-right"></view>
			</navigator>
			<navigator class="a" url="../countEchart/countEchart?type=3" hover-class="none">
				<view class="user-text">
					<image src="../../static/zhenjia.png" mode="widthFix"></image>
					<text>鉴定真品伪品统计</text>
				</view>
				<view class="css-icon icon-arrow-right"></view>
			</navigator>
			<navigator class="a" url="../accountBalance/accountBalance" hover-class="none">
				<view class="user-text">
					<image src="../../static/rmb.png" mode="widthFix"></image>
					<text>提现及结算列表</text>
				</view>
				<view class="css-icon icon-arrow-right"></view>
			</navigator>
			<navigator class="a" url="../SettingData/SettingData" hover-class="none">
				<view class="user-text">
					<image src="../../static/user_setting.png" mode="widthFix"></image>
					<text>设置</text>
				</view>
				<view class="css-icon icon-arrow-right"></view>
			</navigator>
		</view>

		<nav-bar :navlist="navlist" :sort="sort"></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classLevel: 'cLevel_1',
				navlist: getApp().globalData.navbar_admin,
				sort: false,
				fullScreen: getApp().globalData.fullScreen,
				id: '',
				userinfo: {},
				opacity: ''
			};
		},
		onShow() {

			this.getUserInfo()
		},
		onPageScroll(e) {
			if (e.scrollTop > 1) {
				this.opacity = "background: linear-gradient(to top,#35363B " + e.scrollTop * 5 + "%,transparent 100%)"
			} else {
				this.opacity = ""
			}
		},
		methods: {
			getUserInfo() {
				var id = uni.getStorageSync('userinfo').userid
				let params = {
					id: id
				}
				this.$requestApi.getGemmologistDetail(params).then(res => {
					this.userinfo = res.data.info
					uni.setStorageSync('userinfo', res.data.info);
					let level = res.data.info.level;
					if(level=="初级鉴定师"){
						this.classLevel='cLevel_1';
					}else if(level=="中级鉴定师"){
						this.classLevel='cLevel_2';
					}else{
						this.classLevel='cLevel_3';
					}
				})
			},
			exitInfo() {
				uni.navigateTo({
					url: "../personalData/personalData"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-list {
		.a {
			display: flex;
			margin: 0 40upx;
			border-bottom: 1upx solid #EEEEEE;
			height: 120upx;
			align-items: center;
			justify-content: space-between;

			&:last-of-type {
				border: 0upx;
			}

			.icon-arrow-right {
				&::before {
					border-color: #C1C1C1;
				}
			}

			.user-text {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: #35363B;

				image {
					width: 32upx;
					margin-right: 20upx;
				}
			}
		}
	}

	.user-result {
		width: 670upx;
		height: 220upx;
		margin: 0 auto;
		border-radius: 16upx;
		/*background: url(../../static/appraisalDetailTag.png) no-repeat center;
		background-size: 100% 220upx;*/
		box-sizing: border-box;
		padding: 42upx 50upx;
		position: relative;
		
		.renzheng-pic {
			position: absolute;
			right:42upx;
			top:44upx;
			width:121upx;
			height:121upx;
		}
		.result-item {
			text-align: center;
			padding-top: 38upx;
	
			.p {
				color: #FFFFFF;
			}
	
			.h1 {
				color: #FFFFFF;
				font-size: 40upx;
				font-weight: bold;
				line-height: 67upx;
				margin-bottom: 20upx;
			}
		}
	
		.items-box {
			display: flex;
			padding-top: 44upx;
			.item {
				font-size: 24upx;
				color: #fff;
	
				p {
					font-size: 40upx;
					display: inline;
					padding-left: 20upx;
					color:#FFFFFF;
				}
				margin-right: 10upx;
			}
		}
	
		.level {
			color: #FFFFFF;
			font-size: 50upx;
			line-height: 50upx;
		}
	}
	.cLevel_1 {
		background:url(../../static/bg01.png) no-repeat;
		background-size: 100% 220upx;
		.star {
			background:url(../../static/bg01star.png) no-repeat ; 
			position:absolute;
			left:503upx;
			top:37upx;
			width:120upx;
			height:120upx;
			background-size:100% 100%;
		}
	}
	.cLevel_2 {
		background:url(../../static/bg02.png) no-repeat ;
		background-size: 100% 220upx;
		.star {
			background:url(../../static/bg02star.png) no-repeat ;
			position:absolute;
			left:503upx;
			top:37upx;
			width:120upx;
			height:120upx;
			background-size:100% 100%;
		}
	}
	.cLevel_3 {
		background:url(../../static/bg03.png) no-repeat ;
		background-size: 100% 220upx;
		.star {
			background:url(../../static/bg03star.png) no-repeat ;
			position:absolute;
			left:503upx;
			top:37upx;
			width:120upx;
			height:120upx;
			background-size:100% 100%;
		}
	}
	
	.userinfo-wrap {
		width: 670upx;
		margin: 0 auto;
		padding: 50upx 0;

		.userinfo {
			display: flex;

			.userinfo-info {
				width: 410upx;

				.mine_user_up {
					display: inline-block;
					vertical-align: top;
					width: 70upx;
					height: 70upx;
					background: url(../../static/mine_user_up.png) no-repeat center;
					background-size: cover;
					margin: -15upx 0 0 20upx;
				}

				.level {
					color: #FFFFFF;
					font-size: 28upx;
					margin-bottom: 20upx;
					line-height: 40upx;
				}

				.p {
					color: #FFFFFF;
					font-size: 28upx;
					line-height: 40upx;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.h1 {
					color: #C9AB79;
					font-size: 38upx;
					height: 40upx;
					line-height: 40upx;
					font-weight: bold;
					margin-bottom: 20upx;

					text {
						width: 310upx;
						display: inline-block;
						vertical-align: top;
					}
				}
			}

			.userinfo-avatar {
				width: 160upx;
				height: 160upx;
				border-radius: 160upx;
				box-sizing: border-box;
				border: 10upx solid #FFFFFF;
				overflow: hidden;
				margin-right: 30upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
