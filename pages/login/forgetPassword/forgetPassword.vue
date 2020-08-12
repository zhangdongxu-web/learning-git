<template>
	<view class="forget">
		<view class="h1">手机号登录</view>
		<!-- <view class="p">通过手机验证找回密码</view> -->
		<view class="input-item">
			<view class="user-phone"></view>
			<input type="number" v-model="userPhone" placeholder="请输入手机号" />
			<view class="menu-wrap">
				<view class="clearn-data" v-if="userPhone.length > 0" @click="userPhone=''"></view>
			</view>
		</view>
		<view class="input-item code">
			<view class="user-code"></view>
			<input type="number" v-model="code" placeholder="请输入验证码" />
			<view class="code-btn" @click="sendCode">{{content}}</view>
			<view class="menu-wrap">
				<view class="clearn-data" v-if="code.length > 0" @click="code=''"></view>
			</view>
		</view>

		<view class="login-btn" @click="submitForget" :class="{disabled: userPhone != '' && code != ''}">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: "",
				code: "",
				codeFlag: true,
				content: "获取验证码",
				count: 60,
			};
		},
		methods: {
			sendCode() {
				if (!this.codeFlag) {
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){ 
						 uni.showToast({
						 	icon:'none',
							title:'请输入正确的手机号'
						 })
				        return false; 
				    }
				this.codeFlag = false;
				let params = {
					mobile: this.userPhone,
					event: 'register'
				}
				var timer = setInterval(() => {
					this.count--
					if (this.count <= 0) {
						clearInterval(timer)
						this.count = 60
						this.codeFlag = true
						this.content = "获取验证码"
					} else {
						this.content = "剩余 " + this.count + " s"
					}
				}, 1000)
				this.$requestApi.sendsms(params).then(res => {
					if (res.code == 1000) {
						//this.codeFlag = false
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})
			},
			submitForget() {
				if (this.userPhone == '' || this.code == '') {
					return
				}
				wx.request({
					url: 'https://www.bopo.com/api/index/mblogin',
					data: {
						mobile: this.userPhone,
						mscode: this.code,
					},
					method: 'post',
					success(res) {
						debugger;
						console.log(res, 'resresres');
						if (res.data.code == 1000) {
							uni.setStorageSync('token', res.data.data.token);
							uni.setStorageSync('isuser', res.data.data.isuser);
							uni.setStorageSync('userinfo', res.data.data);
							if (res.data.data.isuser == "0") {
							  getApp().globalData.navbar_list = getApp().globalData.navbar_admin
							  getApp().globalData.sort = 0
							} else {
							  getApp().globalData.navbar_list = getApp().globalData.navbar_user
							  getApp().globalData.sort = 1
							}
							getApp().globalData.now_page_index = 0;
							//getApp().onChageState();
							//getApp().globalData.sort = ress.data.data.isuser==0?0:1;
							//getApp().globalData.now_page_index = 0;
							uni.hideLoading();
							uni.showToast({
								title: "登录成功"
							});
							setTimeout(() => {
								if (res.data.data.isuser == "0") {
									uni.switchTab({
										url: '../../appraisalPool/appraisalPool'
									})
								} else {
									uni.switchTab({
										url: "../../index/index"
									})
								}
							}, 500)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					}
				})
				// this.$requestApi.forgetpwd(params).then(res => {
				//   if(res.code == 1000){
				//     uni.redirectTo({
				//       url: '../changePassword/changePassword?tel=' + this.userPhone
				//     })
				//   }else{
				//     uni.showToast({
				//       icon: 'none',
				//       title: res.message
				//     })
				//   }
				// })

			}
		},
	}
</script>

<style lang="less" scoped>
	.forget {
		width: 670upx;
		margin: 0 auto;
		padding: 150upx 0 0;

		.login-btn {
			margin-top: 50upx;
			line-height: 100upx;
			text-align: center;
			border-radius: 8upx;
			font-size: 30upx;
			font-weight: bold;
			letter-spacing: 2upx;
			background: #C1C1C1;
			color: #FFFFFF;
			transition: all ease .4s;
			box-shadow: 0px 10upx 30upx rgba(114, 114, 114, .4);

			&.disabled {
				color: #C9AB79;
				background: #35363B;
			}
		}

		.h1 {
			font-size: 60upx;
			font-weight: bold;
			color: #35363B;
			line-height: 84upx;
			margin-bottom: 10upx;
		}

		.p {
			font-size: 28upx;
			color: #C1C1C1;
			margin-bottom: 100upx;
		}

		.input-item {
			height: 100upx;
			position: relative;
			display: flex;
			border-radius: 8upx;
			align-items: center;
			padding: 30upx 0;
			border-bottom: 1upx solid #eee;
			box-sizing: border-box;

			.code-btn {
				color: #C1C1C1;
			}

			.menu-wrap {
				position: absolute;
				right: 30upx;
				z-index: 2;

				.clearn-data {
					display: inline-block;
					vertical-align: middle;
					width: 42upx;
					height: 42upx;
					background: url(../../../static/login_close.png) no-repeat center;
					background-size: 32upx 32upx;
				}

				.eyes {
					display: inline-block;
					vertical-align: middle;
					width: 42upx;
					height: 42upx;
					background: url(../../../static/eyes.png) no-repeat center;
					background-size: 42upx 24upx;
					margin-left: 10upx;
				}
			}

			input {
				flex: 1;
				margin: 0 50upx 0 17upx;
				font-size: 28upx;
			}

			&.pwd {
				input {
					margin: 0 85upx 0 17upx;
				}
			}

			&.code {
				input {
					margin-right: 30upx;
				}

				.menu-wrap {
					right: 160upx;
				}
			}

			.user-code {
				width: 45upx;
				height: 45upx;
				background: url(../../../static/code.png) no-repeat center;
				background-size: 31upx 37upx;
			}

			.user-phone {
				width: 45upx;
				height: 45upx;
				background: url(../../../static/user_tel.png) no-repeat center;
				background-size: 27upx 42upx;
			}

			.user-pwd {
				width: 45upx;
				height: 45upx;
				background: url(../../../static/user_pwd.png) no-repeat center;
				background-size: 34upx 34upx;
			}
		}
	}
</style>
