<template>
	<view class="content page">
		<navtop-hide title="我的"></navtop-hide>
		<view class="mine-title ">
			<!-- 头部 -->
			<view class="user-info">
				<view class="user-info-view">
					<view class="user-info-name">
						<text>{{userInfo.nickname}}</text>
						<image @click="editUserImage" class="mine_user_up" src="../../static/mine_user_up.png"></image>
					</view>
					<view class="user_info_goods_num">
						已鉴定 {{userInfo.num}} 件物品
					</view>
				</view>
				<view class="user-info-view user-info-img-view">
					<image class="user-info-img" :src="userInfo.avatar == '' ? '../../static/mine_user_up.png' : userInfo.avatar "></image>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="user-list">
			<navigator hover-class="none" open-type="navigate" url="../Identification/Identification?type=0">
				<view class="user-list-item">
					<view class="user-list-item-text">
						<image class="user_sl" mode="widthFix" src="../../static/user_sl.png"></image>
						<text>鉴定中</text>
					</view>
					<view class="user-list-item-r">
						<view class="css-icon icon-arrow-right"></view>
					</view>
				</view>
			</navigator>
			<navigator hover-class="none" open-type="navigate" url="../Identification/Identification?type=1">
				<view class="user-list-item">
					<view class="user-list-item-text">
						<image mode="widthFix" src="../../static/user_jd.png"></image>
						<text>鉴定报告</text>
					</view>
					<view class="user-list-item-r">
						<view class="css-icon icon-arrow-right"></view>
					</view>
				</view>
			</navigator>
			<navigator hover-class="none" open-type="navigate" url="../myPoints/myPoints">
				<view class="user-list-item">
					<view class="user-list-item-text">
						<image mode="widthFix" src="../../static/score.png"></image>
						<text>积分</text>
					</view>
					<view class="user-list-item-r">
						<view class="css-icon icon-arrow-right"></view>
					</view>
				</view>
			</navigator>
			<view class="user-list-item" @click="qr_code">
				<view class="user-list-item-text">
					<image mode="widthFix" src="../../static/user_ewm.png"></image>
					<text>我的二维码</text>
				</view>
				<view class="user-list-item-r">
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<view class="user-list-item">
				<button class="user_kf" open-type='contact'>联系客服</button>
				<view class="user-list-item-text">
					<image mode="widthFix" src="../../static/user_kf.png"></image>
					<text>联系客服</text>
				</view>
				<view class="user-list-item-r">
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<navigator hover-class="none" open-type="navigate" url="../SettingData/SettingData">
				<view class="user-list-item">
					<view class="user-list-item-text">
						<image mode="widthFix" src="../../static/user_setting.png"></image>
						<text>设置</text>
					</view>
					<view class="user-list-item-r">
						<view class="css-icon icon-arrow-right"></view>
					</view>
				</view>
			</navigator>
		</view>
		<nav-bar :navlist="navlist" :sort="sort"></nav-bar>
		<!-- 二维码弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="qr_code">
				<view class="qr_code_title">
					<image :src="userInfo.avatar"></image>
					<text>{{userInfo.nickname}}</text>
				</view>
				<view class="qr_code_img">
					<image :src="qr_code_img"></image>
				</view>
				<view class="qr_code_text">
					<view>朋友通过扫描你的二维码并完成首次下单</view>
					<view>你也可以获得一次免费鉴定的机会(获得500积分)</view>
				</view>
				<view class="qr_code_btn">
					<view @click="add_kp">保存到手机</view>
					<view class="zf">
						<button data-id="shareBtn" class="btn" open-type="share" plain="true">转发朋友</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 生成卡片 -->
		<canvas class="canvas_img" :style="{width:'100%',height:canvasH}" canvas-id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	let num = 1;
	export default {
		components: {
			uniPopup
		},
		onLoad() {
			uni.hideTabBar();
		},
		data() {
			return {
				title: 'Hello',
				fullScreen: getApp().globalData.fullScreen,
				opacity: '',
				navlist: [],
				sort: true,
				url: require('../../static/cancas.png'),
				canvasH:'780px',
				userInfo: {
					nickname: '',
					avatar: ''
				},
				qr_code_img: '' //小程序码
			}
		},
		onShow() {
			this.showUserInfo();
			const value = uni.getStorageSync('userinfo');
			if (value && value.isuser != 1) {
				this.navlist = [...getApp().globalData.navbar_admin]
				this.sort = false
			} else {
				this.navlist = [...getApp().globalData.navbar_user]
				this.sort = true
			}

			let visited = getApp().globalData.visited || false
			if (visited) {
				this.qr_code()
				getApp().globalData.visited = false
			}
		},
		methods: {
			async base64src(base64data){
				const fsm = uni.getFileSystemManager();
				const FILE_BASE_NAME = 'tmp_base64src'+num;
				num++;
				
				const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
				console.log('format,',format);
				if (!format) {
				  reject(new Error('ERROR_BASE64SRC_PARSE'));
				}
				const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
				const buffer = uni.base64ToArrayBuffer(bodyData);
				fsm.writeFileSync(filePath,buffer,'binary');
				console.log('writeFile',filePath);
				return filePath;
			},			
			async qr_code() {
				this.$refs.popup.open();
				// 获取小程序码
				let userinfo = uni.getStorageSync('userinfo');
				this.userInfo.nickname = userinfo.nickname;
				this.userInfo.avatar = userinfo.avatar;
				var res = await uni.request({
					method: 'GET',
					url: "https://www.bopo.com/api/wechat/qrcode?userid=" + userinfo.userid
				})				
				console.log('qrcode',res)
				let imgUrl = res.slice(-1)[0].data;
				console.log('base64___01',imgUrl);
				let _imgSrc = await this.base64src(imgUrl);
				await this.createQrCode(_imgSrc);
				this.qr_code_img = imgUrl
			},
			// 点击头像表编辑跳转
			editUserImage() {
				uni.navigateTo({
					url: '/pages/personalData/personalData'
				})
			},
			// 展示用户信息
			showUserInfo() {
				this.userInfo = uni.getStorageSync('userinfo');
				console.log(this.userInfo);
			},
			// 生成卡片
			async add_kp() {
				let that = this;
				var res = await uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'firstCanvas',
					fileType: 'jpg',
					quality: 0.8
				});
				console.log('res',res,res.slice(-1)[0].tempFilePath);
				var res2 = await uni.saveImageToPhotosAlbum({
					filePath: res.slice(-1)[0].tempFilePath,
				});
				console.log('res2',res2,res2.slice(-1)[0].errMsg);
				if (res2.slice(-1)[0].errMsg == 'saveImageToPhotosAlbum:ok') {
					console.log('save success');
					that.$refs.popup.close();
				} else {
					uni.showModal({
						title: '提示',
						content: '需要您授权保存相册',
						showCancel: false,
						success: (res) => {
							uni.openSetting({
								success: (res) => {
									if (res.authSetting['scope.writePhotosAlbum']) {
										uni.showModal({
											title: '提示',
											content: '获取权限成功,再次点击图片即可保存',
											showCancel: false,
										})
									} else {
										uni.showModal({
											title: '提示',
											content: '获取权限失败，将无法保存到相册哦~',
											showCancel: false,
										})
									}
									that.$refs.popup.close();
								}
							})
						}
					})
				}
				// 	success: function(res) {
				// 		uni.saveImageToPhotosAlbum({
				// 			filePath: res.tempFilePath,
				// 			success: function() {
				// 				console.log('save success');
				// 				that.$refs.popup.close();
				// 			}
				// 		});
				// 	},
				// 	fail: function(res) {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: '生成失败,请重试'
				// 		});
				// 		fail: (err) => {
				// 			if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg ===
				// 				"saveImageToPhotosAlbum:fail auth deny") {
				// 				uni.showModal({
				// 					title: '提示',
				// 					content: '需要您授权保存相册',
				// 					showCancel: false,
				// 					success: (res) => {
				// 						uni.openSetting({
				// 							success: (res) => {
				// 								if (res.authSetting['scope.writePhotosAlbum']) {
				// 									uni.showModal({
				// 										title: '提示',
				// 										content: '获取权限成功,再次点击图片即可保存',
				// 										showCancel: false,
				// 									})
				// 								} else {
				// 									uni.showModal({
				// 										title: '提示',
				// 										content: '获取权限失败，将无法保存到相册哦~',
				// 										showCancel: false,
				// 									})
				// 								}
				// 								that.$refs.popup.close();
				// 							}
				// 						})
				// 					}
				// 				})
				// 			}
				// 		}
				// 	}
				// })
			},
			//圆角矩形
			drawRoundRect(cxt, x, y, width, height, radius) {
				cxt.beginPath();
				cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
				cxt.lineTo(width - radius + x, y);
				cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
				cxt.lineTo(width + x, height + y - radius);
				cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
				cxt.lineTo(radius + x, height + y);
				cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
				cxt.closePath();
				// 颜色
				cxt.setFillStyle('#FFFFFF');
				//对当前路径中的内容进行填充
				cxt.fill();
			},
			//圆角头像
			circleImg(ctx, img) {
				ctx.save(); //保存状态
				ctx.beginPath(); //开始绘制
				ctx.arc(95, 150, 25, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.clip();
				ctx.drawImage(img,0,0,320,320, 50, 105, 80, 80);
				ctx.restore();
			},
			// 转换地址
			async getGoodsImgPath(url) {				
				var promise = new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url,
						success: resolve,
						fail: resolve
					})
				})
				return promise
			},
			// 创建图片
			async createQrCode(imgUrl) {
				const {
					windowWidth,
					windowHeight
				} = uni.getSystemInfoSync();
				var context = uni.createCanvasContext('firstCanvas');
				//let path_title = this.url; //base64
				console.log('base64__02',this.url);
				let _path_title_base64 =await this.base64src(this.url);
				console.log('base__over',_path_title_base64);
				let path_title = await this.getGoodsImgPath(_path_title_base64);
				console.log('base__over2',path_title);
				//大背景颜色
				context.rect(0, 0, windowWidth, 780);
				context.setFillStyle('#C9AB79');
				context.fill();

				//将图像画入画布
				context.drawImage(path_title.path, 40, 33, 160, 40);
				//画矩形
				this.drawRoundRect(context, 40, 110, windowWidth - 80, 400, 10);
				// 画字
				try {
					context.beginPath();
					context.setFontSize(16);
					context.setFillStyle('#333333');
					context.fillText(`${this.userInfo.nickname}`, 130, 160);
				} catch (e) {
					console.log(e)
				}
				// 画小程序码
				let path_logo2 = await this.getGoodsImgPath(imgUrl);
				console.log('base__over3',path_logo2);
				context.drawImage(path_logo2.path, 120, 200, 170, 170);
				// 画标识文字
				context.beginPath();
				context.setFontSize(20);
				context.setFillStyle('#999999');
				context.fillText('长按识别或扫码进入包铺鉴定', 60, 440);
				context.fill();
				//将图像画入画布
				let path_logo = await this.getGoodsImgPath(this.userInfo.avatar);
				this.circleImg(context, path_logo.path);
				// 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
				context.draw();
			},
		},
		onPageScroll(e) {
			if (e.scrollTop > 1) {
				this.opacity = "background: linear-gradient(to top,#35363B " + e.scrollTop * 5 + "%,transparent 100%)"
			} else {
				this.opacity = ""
			}
		},
		onShareAppMessage(options) {
			let {
				avatar,
				nickname
			} = uni.getStorageSync('userinfo');
			return {
				title: '包铺',
				path: 'pages/index/index',
				imageUrl: avatar,
				desc: '箱包鉴定小程序',
				success: res => {
					console.log(res);
					that.$refs.popup.close();
				},
				fail: res => {
					console.log(res);
					that.$refs.popup.close();
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.mine-title {
		box-sizing: border-box;
		padding-top: 70upx;
		width: 100%;
		height: 420upx;

		.user-info {
			display: flex;
			height: 140upx;
			padding: 0 40upx;
			box-sizing: border-box;
			width: 100%;

			.user-info-view {
				flex: 1;

				.user-info-name {
					font-size: 54upx;
					color: #C9AB79;
					margin-top: 20upx;
					font-weight: bold;
					display: flex;

					text {
						width: 380upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.mine_user_up {
						width: 70upx;
						height: 70upx;
						vertical-align: middle;
						margin-left: 40upx;
					}
				}

				.user_info_goods_num {
					color: #FFFFFF;
					font-size: 28upx;
					margin-top: 10upx;
				}

				// 右侧头像
				.user-info-img {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
				}
			}

			.user-info-img-view {
				text-align: right;
			}

		}

	}

	.user-list {
		width: 100%;
		position: relative;
		z-index: 1;
		top: -150upx;
		box-sizing: border-box;
		border-radius: 30upx;
		padding: 0 40upx;
		background-color: #FFFFFF;

		.user-list-item {
			border-bottom: 1upx solid #EEEEEE;
			height: 122upx;
			display: flex;
			align-items: center;
			position: relative;


			.user_kf {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}

			view {
				flex: 1;
			}

			.user-list-item-text {
				text {
					color: #30313B;
					font-weight: bold;
					font-size: 32upx;
					vertical-align: middle;
					margin-left: 15upx;
				}

				image {
					width: 32upx;
					vertical-align: middle;
				}

				.user_sl {
					width: 26upx;
				}
			}

			.user-list-item-r {
				text-align: right;
			}

		}

	}

	// 二维码
	/deep/ .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
		border-radius: 20rpx;
		padding: 40rpx;
	}

	.qr_code {
		width: 600rpx;
		margin: 0 auto;
		height: 740rpx;
		background: #FFFFFF;
		box-sizing: border-box;

		.qr_code_title {
			height: 90rpx;
			display: flex;
			align-items: center;

			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			text {
				font-size: 32rpx;
				font-weight: bold;
				padding-left: 20rpx;
				color: rgba(48, 49, 59, 1);
			}
		}

		.qr_code_img {
			width: 320rpx;
			height: 320rpx;
			margin: 20rpx auto;

			image {
				width: 320rpx;
				height: 320rpx;
			}
		}

		.qr_code_text {
			text-align: center;

			view {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 41rpx;
				height: 41rpx;
				color: rgba(153, 154, 155, 1);
			}

			margin-bottom:20rpx;
		}

		.qr_code_btn {
			display: flex;
			justify-content: space-between;

			view {
				width: 48%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
				color: #FFFFFF;
				background: #C9AB79;
			}

			.zf {
				background: #333333;

				.btn {
					font-size: 32rpx;
					color: #FFFFFF;
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}
			}
		}
	}

	.canvas_img {
		visibility: hidden;
		z-index: -1;
		position: fixed;
		left: 0;
		bottom: -8000rpx;
		// position:fixed;
		// z-index:99999999;
		// left:0;
		// top:0;
	}
</style>
