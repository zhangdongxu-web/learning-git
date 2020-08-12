<template>
	<view v-if="loadings" class="page" :class="{fullScreen: fullScreen}">
		<navtop-hide :goback="true" :opacity="opacity"></navtop-hide>
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

		<!-- 评论轮播 -->
		<view class="swiper-reply" v-if="evalList.length > 0">
			<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#C9AB79"
			 indicator-color="#FFFFFF">
				<swiper-item v-for="(item,index) in evalList" :key="index">
					<view class="swiper-item">
						<view class="swiper-title">
							<image :src="item.avatar" mode=""></image>
							<view>{{item.nickname}}</view>
						</view>
						<view class="swiper-desc">{{item.memo}}</view>
						<view class="start">
							<block v-for="(q,i) in start" :key="i">
								<block v-if="i+1 <= item.star">
									<image mode="widthFix" src="../../static/wjx.png"></image>
								</block>
								<block v-else>
									<image mode="widthFix" src="../../static/wjx_active.png"></image>
								</block>
							</block>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<atricles-item :noData="noData" :articlesList="articlesList"></atricles-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classLevel:'cLevel_1',
				fullScreen: getApp().globalData.fullScreen,
				id: '',
				userinfo: {},
				articlesList: [],
				noData: true,
				opacity: '',
				evalList: [],
				start: 5,
        loadings: false
			};
		},
		onLoad(option) {
      uni.showLoading({
        title:'努力加载中'
      });
			this.id = option.id
			this.getData()
			this.getEval()
		},
		onPageScroll(e) {
			if (e.scrollTop > 1) {
				this.opacity = "background: linear-gradient(to top,#35363B " + e.scrollTop * 5 + "%,transparent 100%)"
			} else {
				this.opacity = ""
			}
		},
		methods: {
			getEval() {
				let params = {
					id: this.id
				}
				this.$requestApi.evallist(params).then(res => {
					this.evalList = res.data.list
				})
			},
			getData() {
				let params = {
					id: this.id
				}
				this.$requestApi.getGemmologistDetail(params).then(res => {
					console.log(res.data.info)
					this.userinfo = res.data.info
          uni.hideLoading();
          this.loadings = true;
					this.articlesList = res.data.list
					let level = res.data.info.level;
					if(level=="初级鉴定师"){
						this.classLevel='cLevel_1';
					}else if(level=="中级鉴定师"){
						this.classLevel='cLevel_2';
					}else{
						this.classLevel='cLevel_3';
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.swiper-reply {
		width: 670upx;
		height: 220upx;
		box-shadow: 0px 10upx 30upx rgba(0, 0, 0, 0.08);
		border-radius: 16upx;
		margin: 30upx auto 60upx;

		swiper {
			height: 220upx;
		}

		.swiper-item {
			padding: 40upx 50upx;
			box-sizing: border-box;

			.swiper-title {
				display: flex;
				align-items: center;
				margin-bottom: 16upx;
				;
				font-size: 24upx;
			}

			image {
				width: 36upx;
				height: 36upx;
				border-radius: 36upx;
				margin-right: 20upx;
			}

			.swiper-desc {
				margin-bottom: 16upx;
				font-size: 24upx;
				height: 24upx;
				line-height: 24upx;
				overflow: hidden;
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
				font-size: 48upx;
				font-weight: bold;
				line-height: 67upx;
				margin-bottom: 5upx;
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
				margin-right: 20upx;
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
				overflow: hidden;
				margin-left: 44upx;

				.p {
					color: #FFFFFF;
					font-size: 36upx;
					line-height: 40upx;
					margin-top:26upx;
				}

				.h1 {
					color: #C9AB79;
					font-size: 46upx;
					line-height: 50upx;
					margin-top:24upx;
				}
			}

			.userinfo-avatar {
				width: 155upx;
				height: 155upx;
				border-radius: 160upx;
				box-sizing: border-box;
				border: 5upx solid #FFFFFF;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
