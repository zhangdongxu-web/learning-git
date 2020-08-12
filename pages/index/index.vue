<template>
	<view class="home-wrap">
		<view class="home-swiper">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			 indicator-active-color="#C9AB79" indicator-color="#FFFFFF">
				<swiper-item v-for="(item,index) in data.bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.imagesrc"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="x_countW">
			<view class="count-tit">
				<view class="h3">鉴定入口</view>
				<view class="p">IDENTIFICATION</view>
			</view>
			<view class="jianding-enter">
				<view class="wrap-flex">
					<view class="jd-num">
						<view class="h3">奢侈品权威鉴定</view>
						<view class="p">累计鉴别数已超过</view>
						<view class="span">{{number}}</view>
					</view>
					<view class="jd-img">
						<image src="../../static/bao.png"></image>
					</view>
					<view class="jd-btn">
						<view @click="matter" class="span shiwu">实物鉴定</view>
						<view @click="onlineappraisal" class="span zaixian">在线鉴定</view>
					</view>
				</view>
				<view class="flex">
					<view class="li">
						<image src="../../static/icon01.png" mode=""></image>
						<view class="h3">选择品类</view>
					</view>
					<view class="liLeft">
					</view>
					<view class="li">
						<image src="../../static/icon02.png" mode=""></image>
						<view class="h3">拍摄细节</view>
					</view>
					<view class="liRight"></view>
					<view class="li">
						<image src="../../static/icon03.png" mode=""></image>
						<view class="h3">等待结果</view>
					</view>
				</view>
			</view>

			<view class="count-tit">
				<view class="h3">当前鉴定师</view>
				<view class="p">GEMMOLOGIST</view>
			</view>
		</view>
		<!-- 当前鉴定师 -->
		<appraisal-item :gemmologist="data.assayerList"></appraisal-item>
		<navigator class="more-link" hover-class="none" url="../appraisal-list/appraisal-list">查看更多<view class="css-icon icon-arrow-right"></view>
		</navigator>

		<!-- 鉴定物展示 -->
		<view class="count-tit">
			<view class="h3">鉴定物展示</view>
			<view class="p">ARTICLES DISPLAY</view>
		</view>
		<atricles-item :articlesList="articlesList" :noData="noData"></atricles-item>

		<nav-bar :navlist="navlist" :sort="sort"></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				articlesList: [],
				noData: false,
				page: 1,
				navlist: [],
				sort: true,
				number: 198020,
			}
		},
		onLoad(options) {
			this.getInfo()
			uni.hideTabBar()
			if (options.scene) {
				console.log('index options',options);
				let scene = decodeURIComponent(options.scene);
				//&是我们定义的参数链接方式
				let userId = scene.split("&")[0];
				let recommendId = scene.split('&')[1];
				//其他逻辑处理。。。。。
				console.log('123', scene, userId, recommendId)
			};
			this.timer = setInterval(() => {
				// console.log(parseInt(this.data.authTotal),'datddata');
				this.number += 400;
				if (this.number >= 244020) {
					this.number = 244020;
					if (typeof this.number !== "undefined") {
						var arr = (this.number + "").split(""),
							arr = arr.reverse();
						for (var i = 0, len = arr.length / 3; i < len; i++) {
							arr.splice(i * 3 + i, 0, "-");
						}
						arr.reverse();
						var str = arr.join("");
						str = str.substring(0, str.length - 1);
						str = str.replace(/-/g, ",");
						this.number = str;
					}
					clearInterval(this.timer)
				}
			}, 10);
		},
		onReachBottom() {
			if (!this.noData) {
				this.getArticles()
			}
		},
		onShow() {
			this.getInfo()
			this.getArticles()
			const value = uni.getStorageSync('userinfo');
			if (value && value.isuser != 1) {
				this.navlist = [...getApp().globalData.navbar_admin]
				this.sort = false
			} else {
				this.navlist = [...getApp().globalData.navbar_user]
				this.sort = true
			}
		},
		methods: {
      // onShareAppMessage(res) {},   //当前页面分享给朋友
			matter() {
				this.$isLogin(() => {
					uni.navigateTo({
						url: "../objeceAppraisal/objeceAppraisal"
					})
				})
			},
			onlineappraisal() {
				this.$isLogin(() => {
					uni.navigateTo({
						url: '../onlineappraisal/onlineappraisal'
					})
				})
			},
			getArticles() {
				this.$requestApi.getArticles({
					page: this.page
				}).then(res => {
					console.log(this.articlesList)
					this.articlesList = [...this.articlesList, ...res.data.list]
					if (res.data.list.length == 0) {
						this.noData = true
					}
					this.page += 1;
				})
			},
			getInfo() {
				this.$requestApi.getHomeData().then(res => {
					this.data = res.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.home-wrap {
		background: linear-gradient(to bottom, #C4A770 0%, #FFFFFF 500upx);
		padding-bottom: 133upx;

		.more-link {
			display: block;
			text-align: center;
			color: #999999;
			margin: 34upx 0;

			.icon-arrow-right {
				margin-top: -3upx;

				&::before {
					border-color: #999999;
				}
			}
		}


		// 鉴定入口
		.jianding-enter {
			margin-top: 30upx;
			margin-bottom: 56upx;
			background: #FFFFFF;
			box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.08);
			border-radius: 8upx;
			overflow: hidden;

			.flex {
				background: #FBFBFB;
				padding: 35upx 0;
				position: relative;

				.li {
					flex: 1;
					font-size: 22upx;
					font-weight: bold;

					image {
						width: 100upx;
						height: 100upx;
						margin-bottom: 16upx;
					}
				}
			}

			.flex .liLeft,
			.flex .liRight {
				width: 88upx;
				height: 0px;
				border: 1px dashed rgba(193, 193, 193, 1);
				opacity: 0.4;
			}

			.flex .liLeft {
				position: absolute;
				left: 180upx;
				top: 90upx;
			}

			.flex .liRight {
				position: absolute;
				left: 420upx;
				top: 90upx;
			}

			.wrap-flex {
				display: flex;
				padding: 28upx 35upx;
				border-bottom: 1upx solid #E5E5E5;
				flex-wrap: wrap;

				.jd-num {
					flex: .6;

					.h3 {
						font-size: 36upx;
						line-height: 40upx;
						margin-bottom: 24upx;
						color: #202022;
					}

					.p {
						color: #666666;
						font-size: 20upx;
						margin-bottom: 10upx;
					}

					.span {
						font-size: 42upx;
						font-weight: bold;
						color: #35363B;
					}
				}

				.jd-img {
					flex: .4;
					text-align: center;
					padding-right: 48upx;

					image {
						width: 188upx;
						height: 159upx;
					}
				}
			}

			.jd-btn {
				margin: 25upx auto 0;
				display: flex;
				width: 610upx;
				line-height: 100upx;
				border-radius: 8upx;
				overflow: hidden;
				text-align: center;

				.span {
					color: #FFFFFF;
				}

				.shiwu {
					width: 200upx;
					background: #C9AB79;
					font-size: 28upx;
				}

				.zaixian {
					flex: 1;
					background: #35363B;
					font-size: 28upx;
				}
			}
		}

		/* 轮播 */
		.home-swiper {
			height: 300upx;
			padding: 20upx 0 35upx;

			.swiper {
				height: 100%;
				width: 100%;

				.swiper-item {
					height: 100%;
					width: 100%;
					text-align: center;

					image {
						width: 690upx;
						height: 300upx;
						border-radius: 10upx;
					}
				}
			}
		}
	}
</style>
