<template>
	<view class="page" :class="{fullScreen: fullScreen}">
		<navtop-hide :goback="false" :opacity="opacity"></navtop-hide>
		<view class="userinfo-wrap">
			<view class="userinfo">
				<view class="userinfo-avatar">
					<image :src="userinfo.avatar"></image>
				</view>
				<view class="userinfo-info">
					<view class="h1 text-hidden1">{{userinfo.nickname}}</view>
					<view class="level text-hidden1">
						<text>{{userinfo.level}}</text>
						<!-- <text v-if="userinfo.level == 1">初级鉴定师</text> -->
						<!-- <text v-else-if="userinfo.level == 2">中级鉴定师</text> -->
						<!-- <text v-else>高级鉴定师</text> -->
					</view>
					<view class="p text-hidden1">{{userinfo.describe}}</view>
				</view>
			</view>
		</view>

		<view class="appraisal-list">
			<view class="appraisal-item" v-for="(item,index) in appraisalList" :key="index" @click="goDetail(item)">
				<view class="appraisal-avatar">
					<image :src="item.imgsrc" mode=""></image>
				</view>
				<view class="appraisal-main">
					<view class="h1 text-hidden1">客户<text class="span">{{item.uname}}</text></view>
					<view class="p text-hidden1">下单了 {{item.genre}} {{item.brand}}</view>
				</view>
				<view class="appraisal-btn">我要鉴定</view>

				<view class="lock-wrap" v-if="!item.sort"></view>
				<view class="appraisal-state">
					<view class="span" v-if="item.state == '标准鉴定'">
						<image src="../../static/start.png" mode=""></image>
						标准鉴定
					</view>
					<view class="span" v-if="item.state == '精细鉴定'">
						<image src="../../static/serve.png" mode=""></image>
						精细鉴定
					</view>
					<view class="span" v-if="item.state == '专家鉴定'">
						<image src="../../static/expert.png" mode=""></image>
						专家鉴定
					</view>
					<view class="span" v-if="item.state == '学徒鉴定'">
						学徒鉴定
					</view>
				</view>
			</view>
		</view>
		<view v-if="nodata" class="no-data" :class="{mt60: appraisalList.length == 0}">已经触碰到我的底线啦</view>

		<uni-popup ref="sortwrap" type="center" class="sort-masker">
			<view class="error-wrap">
				<image src="../../static/error_icon.png"></image>
			</view>
			<view class="h1">您尚未达到该商品鉴定级别</view>
			<view class="p">该商品为精细鉴定，升级为中级鉴定师即可鉴定该商品，再鉴定<text>{{nextLv}}</text>件商品即可升级为<text>{{lv}}</text></view>
			<view class="close-btn" @click="closePopup">返回查看其他鉴定</view>
		</uni-popup>
		<nav-bar :navlist="navlist" :sort="sort"></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fullScreen: getApp().globalData.fullScreen,
				navlist: getApp().globalData.navbar_admin,
				sort: false,
				opacity: "",
				userinfo: {},
				appraisalList: [],
				nodata: false,
				page: 0,
				nextLv: 0,
				lv: '初级鉴定师',
				openid:'',
				code:''
			};
		},
		onPageScroll(e) {
			if (e.scrollTop > 1) {
				this.opacity = "background: linear-gradient(to top,#35363B " + e.scrollTop * 5 + "%,transparent 100%)"
			} else {
				this.opacity = ""
			}
		},
		onShow() {
			this.userinfo = uni.getStorageSync('userinfo')
			this.appraisalList = []
			this.page = 0
			this.nodata = false
			this.getArticles()
			this.getuserinfo()
		},
		onReachBottom() {
			if (!this.noData) {
				this.getArticles()
			}
		},
		methods: {
			getuserinfo(){
				this.$requestApi.getopenid().then(res => {
					this.openid = res.data
					if(!this.openid){
						let that = this;
						wx.login({
							success(res) {
								that.code = res.code;
								that.$requestApi.saveopenid({code:that.code}).then(res=>{
									console.log('wx.login',res);
								});
							}
						})
					}
				})
			},
			closePopup() {
				this.$refs.sortwrap.close()
			},
			goDetail(item) {
				if (!item.sort) {
					this.nextLv = item.upnum
					this.lv = item.level
					this.$refs.sortwrap.open()
					return
				}
				uni.navigateTo({
					url: "../poolDetail/poolDetail?id=" + item.id
				})
			},
			getArticles() {
				if (this.nodata) {
					return
				}
				let params = {
					page: this.page + 1
				}
				this.page = this.page + 1
				this.$requestApi.getAppraisalList(params).then(res => {
					this.appraisalList = [...this.appraisalList, ...res.data.appraisal]
					if (res.data.appraisal.length < 10) {
						this.nodata = true
					} else {
						this.nodata = false
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.no-data {
		&.mt60 {
			margin-top: 90upx;
		}
	}

	.sort-masker {
		/deep/ .uni-popup__wrapper-box {
			width: 620upx;
			border-radius: 16upx;
			padding: 0 !important;
		}

		.close-btn {
			line-height: 100upx;
			background: #35363B;
			color: #C9AB79;
			font-size: 32upx;
			font-weight: bold;
			letter-spacing: 2upx;
			text-align: center;
		}

		.h1 {
			text-align: center;
			font-size: 42upx;
			font-weight: bold;
			margin-bottom: 30upx;
		}

		.p {
			width: 530upx;
			margin: 0 auto 50upx;
			color: #999A9B;
			line-height: 40upx;
			font-size: 24upx;

			text {
				font-weight: bold;
				color: #C9AB79;
			}
		}

		.error-wrap {
			text-align: center;
			padding: 50upx 0 30upx;

			image {
				width: 120upx;
				height: 120upx;
			}
		}
	}

	.lock-wrap {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(53, 54, 59, .4) url(../../static/lock.png) no-repeat center;
		background-size: 60upx 60upx;
		z-index: 2;
	}

	.appraisal-state {
		position: absolute;
		top: 0;
		left: 0;
		width: 105upx;
		height: 30upx;
		border-radius: 8upx 0px 18upx 0px;
		background: #BF9F62;
		line-height: 30upx;
		text-align: center;
		z-index: 3;

		.span {
			font-size: 18upx;
			color: #FFFFFF;
		}

		image {
			width: 16upx;
			height: 16upx;
			vertical-align: middle;
			margin-right: 3upx;
			margin-top: -3upx;
		}
	}

	.page {
		background-color: #F8F8F8;
		padding-bottom: 133upx;
	}

	.appraisal-list {
		width: 670upx;
		margin: 0 auto;

		.appraisal-item {
			background: #FFFFFF;
			height: 200upx;
			border-radius: 8upx;
			overflow: hidden;
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			padding: 50upx 30upx;
			box-sizing: border-box;
			position: relative;
			justify-content: space-between;

			.appraisal-btn {
				width: 140upx;
				line-height: 60upx;
				border-radius: 60upx;
				background: #C9AB79;
				color: #FFFFFF;
				font-size: 24upx;
				text-align: center;
			}

			.appraisal-main {
				flex: 1;
				word-break: break-all;

				.p {
					width: 320upx;
					font-size: 32upx;
					color: #999A9B;
				}

				.h1 {
					font-size: 32upx;
					line-height: 45upx;
					margin-bottom: 10upx;

					.span {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						max-width: 320upx;
						display: inline-block;
						vertical-align: middle;
						color: #BE9F62;
						font-size: 32upx;
						line-height: 45upx;
					}
				}
			}

			.appraisal-avatar {
				width: 100upx;
				height: 100upx;
				border-radius: 100upx;
				overflow: hidden;
				margin-right: 20upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
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
				}

				.h1 {
					color: #C9AB79;
					font-size: 38upx;
					line-height: 40upx;
					font-weight: bold;
					margin-bottom: 20upx;
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
