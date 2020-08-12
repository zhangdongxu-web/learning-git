<template>
	<view class="pool-wrap" v-if="loadings">
		<view class="pool-info">
			<view class="userinfo">
				<view class="h1">第{{userinfo.noid}}号鉴定室</view>
				<view class="p">品类：{{userinfo.genre}}&nbsp&nbsp&nbsp品牌：{{userinfo.brand}}</view>
			</view>
			<view class="avatar">
				<image :src="userinfo.avatar" mode=""></image>
			</view>
		</view>
		<view class="pool-warn">注意：如鉴定师鉴定物品错误，需赔付十倍罚款</view>
		<view>
			<view class="imglist" v-for="(item,index) in imglist" :key="index">
				<image :src="item.image" mode="aspectFill"></image>
				<text class="span">{{index + 1}}/{{imglist.length}} {{item.name}}</text>
			</view>
		</view>
		<view class="identRoom_list_img">
			<block v-if="attach.images.length>0">
				<view class="identRoom_list_res">
					<text>用户额外添加图片</text>
				</view>
				<view class="identRoom_list_good">
					<view class="identRoom_list_good_item" v-for="(item,i) in attach.images" :key="i">
						<image mode="aspectFill" :src="item.image" @click="$previewImage(item.image)"></image>
						<!-- <view>{{item.name}}</view> -->
					</view>
				</view>
			</block>
			
			<block v-if="attach.text.length>0">
				<view class="identRoom_list_res">
					<text>用户发送信息</text>
				</view>
				<view class="identRoom_list_good">
					<view class="theTitle">:{{attach.text}}</view>
					<!-- <view class="voice_list" v-if="item.assayer.voice != ''">
						<view class="playVoice" @click="playVoice(1,i,item.assayer)">
						  {{item.assayer.seconds}}
						  <image src="../../static/voice.gif" v-if="item.assayer.voicePlay"></image>
						  <image src="../../static/voice_b.png" v-else></image>
						</view>
					</view> -->
				</view>
			</block>
		</view>		
		<view class="sub-btn">
			<view class="poolbtn" @click="subbtn">我要鉴定</view>
		</view>

		<uni-popup ref="popup" type="center" class="successMasker">
			<image class="success" src="../../static/success.png" mode=""></image>
			<view class="success-txt">抢单成功</view>
			<view class="success-btn">
				<navigator class="a" open-type="switchTab" url="../appraisalPool/appraisalPool">继续抢单</navigator>
				<navigator class="a black" :url="'../onlineAppraisalDetail/onlineAppraisalDetail?identTab=0&&auth=0&&type=3&&id=' + id">开始鉴定</navigator>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				userinfo: {
					name: '某某',
					noid: 0,
					avatar: ""
				},
				attach: [],
				imglist: [],
        loadings: false
			}
		},
		onLoad(option) {
      uni.showLoading({
        title:'努力加载中'
      })
			this.id = option.id
		},
		onShow() {
			this.getData2()
		},
		methods: {
			getData() {
				let params = {
					id: this.id
				}
				this.$requestApi.authpoolinfo(params).then(res => {
					this.userinfo = res.data.info
					// console.log(this.userinfo,'11111111')
          uni.hideLoading()
          this.loadings = true
					this.imglist = [...res.data.list]
				})
			},
			getData2() {
				let params = {
					id: this.id
				}
				this.$requestApi.getBeIdentifiedList(params).then(res => {
					this.userinfo = res.data.info
					// console.log(this.userinfo,'222222')
          uni.hideLoading()
          this.loadings = true
					this.imglist = [...res.data.list]
					this.attach = res.data.attach
					uni.setStorage({
					key:'attachimage',
					data:this.attach
					})
					
				})
			},
			subbtn() {
				let params = {
					id: this.id
				}
				uni.showLoading({
					mask: true,
					title: "正在抢单"
				})
				this.$requestApi.grab(params).then(res => {
					setTimeout(() => {
						uni.hideLoading()
						if (res.code == 1000) {
							this.$refs.popup.open()
						} else {
							uni.showToast({
								icon: "none",
								title: res.message
							})
						}

					}, 1000)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.successMasker {
		text-align: center;

		/deep/ .uni-popup__wrapper-box {
			border-radius: 8upx;
			padding: 0 !important;
		}
	}

	.success-txt {
		margin-bottom: 50upx;
		font-size: 42upx;
		font-weight: bold;
	}

	.success-btn {
		display: flex;
		width: 620upx;

		.a {
			flex: 1;
			text-align: center;
			line-height: 100upx;
			background: #BE9F62;
			color: #FFFFFF;
			font-size: 28upx;

			&.black {
				background: #35363B;
			}
		}
	}

	.success {
		width: 120upx;
		height: 120upx;
		margin: 30upx 0;
	}

	.pool-wrap {
		width: 620upx;
		margin: 0 auto;
		padding-top: 50upx;
		padding-bottom: 180upx;

		.imglist {
			position: relative;
			width: 100%;
			height: 620upx;
			margin-bottom: 20upx;

			image {
				width: 100%;
				height: 100%;
			}

			.span {
				position: absolute;
				left: 40upx;
				bottom: 30upx;
				color: #FFFFFF;
				font-size: 32upx;
				font-weight: bold;
				background: rgba(0, 0, 0, .4);
			}
		}

		.sub-btn {
			position: fixed;
			text-align: center;
			height: 160upx;
			padding-top: 30upx;
			box-sizing: border-box;
			bottom: 0;
			z-index: 9;
			background: #FFFFFF;

			.poolbtn {
				display: inline-block;
				width: 620upx;
				height: 100upx;
				background: #35363B;
				line-height: 100upx;
				border-radius: 8upx;
				color: #C9AB79;
				font-size: 30upx;
			}
		}

		.pool-warn {
			color: #999A9B;
			height: 80upx;
			line-height: 40upx;
			padding: 20upx;
			box-sizing: border-box;
			background: #F8F8F8;
			border-radius: 8upx;
			margin-bottom: 40upx;
		}
	}

	.pool-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40upx;

		.userinfo {
			.p {
				color: #999A9B;
				font-size: 28upx;
			}

			.h1 {
				font-size: 48upx;
				font-weight: bold;
				color: #202022;
				line-height: 67upx;
				margin-bottom: 10upx;
			}
		}

		.avatar {
			width: 100upx;
			height: 100upx;
			border-radius: 100upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.identRoom_list_img {
		width: 100%;
		height: auto;
		padding: 40upx 30upx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0upx 10upx 30upx rgba(0, 0, 0, 0.08);
		border-radius: 8upx;
	
		.identRoom_list_res {
			font-size: 32upx;
			font-weight: bold;
			color: rgba(201, 171, 121, 1);
		}
	}
	.identRoom_list_good {
		width: 100%;
		padding-top: 30upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.theTitle {
			line-height: 40upx;
      width: 100%;
		}
		.identRoom_list_good_item {
			width: 180upx;
			height: 200upx;
			margin-right: 20upx;
			margin-bottom: 50upx;
			border-radius: 8upx;
	
			image {
				height: 180upx;
				width: 100%;
			}
	
			view {
				height: 50upx;
				line-height: 50upx;
				font-size: 24upx;
				font-weight: 400;
				color: #666666;
				background: #F5F5F5;
				text-align: center;
			}
		}
	
		& .identRoom_list_good_item:nth-child(3n) {
			margin-right: 0;
		}
	}
	
</style>
