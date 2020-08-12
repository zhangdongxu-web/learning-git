<template>
	<view class="login-wrap">
		<view class="logo">
			<image src="../../../static/user_logo.png" mode=""></image>
		</view>
		<!-- <view class="input-item">
      <view class="user-phone"></view>
      <input type="text" v-model="userPhone" placeholder="请输入手机号"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPhone.length > 0" @click="userPhone=''"></view>
      </view>
    </view> -->
		<!-- <view class="input-item pwd">
      <view class="user-pwd"></view>
      <input :type="password?'password':'text'" v-model="userPwd" placeholder="请输入密码"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPwd.length > 0" @click="userPwd=''"></view>
        <view class="eyes" v-if="userPwd.length > 0" @click="password = !password"></view>
      </view>
    </view> -->
		<button class="login-btn" open-type="getPhoneNumber" hover-class="none" @getphonenumber="getphonenumber">微信登录</button>
		<!-- <view class="login-btn" open-type="getPhoneNumber" hover-class="none" @getphonenumber="getphonenumber">微信登录</view> -->
		<navigator class="login-btnn" url="../forgetPassword/forgetPassword" open-type="redirect" hover-class="none">手机号登录</navigator>
		<!-- <view class="login-menu">
      <navigator url="../register/register" open-type="redirect" hover-class="none">注册</navigator>
      <navigator url="../forgetPassword/forgetPassword" open-type="redirect" hover-class="none">忘记密码？</navigator>
    </view>
		<view class="wechat-login">
      <button plain="true" open-type="getPhoneNumber" hover-class="none" @getphonenumber="getphonenumber">
        <image src="../../../static/user_wechat.png"></image>
      </button>
    </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: "",
				userPwd: "",
				password: true,
				data: {},
				code: '',
				flag: true,
			};
		},
		onShow() {
			console.log('login show');
			let that = this;
			wx.login({
				success(res) {
					console.log('wx.login',res);
					that.code = res.code;
				}
			})
		},
		methods: {
			getphonenumber(e) {
				let that = this;
				console.log(e);
				wx.checkSession({
					success(res) {
						console.log(res, 'ress');
						wx.request({
							url: 'https://www.bopo.com/api/Wechat/getphone',
							//url:'http://wxhf.var365.cn/api/Wechat/getphone',
							data: {
								code: that.code,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData,
							},
							success(r) {
								console.log(r, 'rrr')
								if (r.data.code == 1000) {
									var mobile = r.data.data.phone;
									var openid = r.data.data.openid;
									// wx.setStorageSync('phone',phone);
									wx.request({
										url: 'https://www.bopo.com/api/index/wxlogin',
										//url: 'http://wxhf.var365.cn/api/index/wxlogin',
										data: {
											openid,
											mobile,
										},
										method: 'post',
										success(ress) {
											console.log(ress, 'ress');
											if (ress.data.code == 1000) {
												uni.setStorageSync('token', ress.data.data.token);
												uni.setStorageSync('isuser', ress.data.data.isuser);
												uni.setStorageSync('userinfo', ress.data.data);
												if (ress.data.data.isuser == "0") {
												  getApp().globalData.navbar_list = getApp().globalData.navbar_admin
												  getApp().globalData.sort = 0
												} else {
												  getApp().globalData.navbar_list = getApp().globalData.navbar_user
												  getApp().globalData.sort = 1
												}
												getApp().globalData.now_page_index = 0;
												// getApp().onChageState();
												// getApp().globalData.sort = ress.data.data.isuser==0?0:1;
												// getApp().globalData.now_page_index = 0;
												uni.hideLoading();
												uni.showToast({
													title: "登录成功"
												});

												if (ress.data.data.isuser == "0") {
													uni.switchTab({
														url: '../../appraisalPool/appraisalPool'
													})
												} else {
													uni.switchTab({
														url: "../../index/index"
													})
												}

											}
										}
									})
								}
							}

						})

					},
					fail() {
						uni.showToast({
							title: "微信登录失败，请重试",
							duration: 2000,
						})
						wx.login({
							success(res) {
								that.code = res.code;
							}
						})
					}
				})
			}



			// getphonenumber(e){
			//   uni.showLoading({
			//     title: '正在登陆',
			//     mask: true
			//   })
			//   uni.login({
			//     provider: 'weixin',
			//     oauth: "weixin",
			//     success: res => {
			//       uni.getUserInfo({
			//         provider: 'weixin',
			//         success: (infoRes) => {
			//           console.log('code',res)
			//           let params = {
			//             code: res.code
			//           }
			//           this.$requestApi.wxlogin(params).then(res => {
			//             console.log(res)
			//             if(res.code == 1000){
			//               uni.setStorageSync('token', res.data.token);
			//               uni.setStorageSync('isuser', res.data.isuser);
			//               uni.setStorageSync('userinfo', res.data);
			//               getApp().globalData.sort = res.data.isuser
			//               uni.hideLoading();
			//               uni.showToast({
			//                 title: "登录成功"
			//               })
			//               setTimeout(() => {
			//                 uni.navigateBack()
			//               },1000)
			//             }else{
			//               getApp().globalData.wechatRegister = infoRes.userInfo
			//               getApp().globalData.openidRegister = res.data.openid
			//               uni.redirectTo({
			//                 url: '../register/register?type=1'
			//               })
			//             }
			//           })

			//         }
			//       });
			//     },
			//     fail: () => {},
			//     complete: () => {}
			//   });
			//   console.log(e,'1111')
			//   uni.login({
			//     success(res) {
			//       console.log(res,'2222')
			//     }
			//   })
			// },

			// submitLogin() {
			//   let parasm = {
			//     account: this.userPhone,
			//     password: this.userPwd
			//   }
			//   if (this.userPhone == '') {
			//     uni.showToast({
			//       icon: "none",
			//       title: '请输入手机号'
			//     })
			//     return
			//   }
			//   if (this.userPwd == '') {
			//     uni.showToast({
			//       icon: "none",
			//       title: '请输入密码'
			//     })
			//     return
			//   }
			//   this.$requestApi.login(parasm).then(res => {
			//     if (res.code != 1000) {
			//       uni.showToast({
			//         icon: "none",
			//         title: res.message
			//       })
			//       return
			//     }
			//     if (res.data.isuser == 1) {
			//       getApp().globalData.navbar_list = [...getApp().globalData.navbar_user]
			//       setTimeout(() => {
			//         uni.switchTab({
			//           url: "../../index/index"
			//         })
			//       }, 1000)
			//     } else {
			//       getApp().globalData.navbar_list = [...getApp().globalData.navbar_admin]
			//       setTimeout(() => {
			//         uni.switchTab({
			//           url: "../../appraisalPool/appraisalPool"
			//         })
			//       }, 1000)
			//     }
			//     console.log(getApp().globalData.navbar_list)
			//     uni.setStorageSync('token', res.data.token);
			//     uni.setStorageSync('isuser', res.data.isuser);
			//     uni.setStorageSync('userinfo', res.data);
			//     uni.showToast({
			//       title: "登录成功"
			//     })
			//   })
			// }
		}
	}
</script>

<style lang="less">
	.login-btnn {
		line-height: 100upx;
		text-align: center;
		color: rgba(53, 54, 59, 1);
		// background: #35363B;
		border-radius: 8upx;
		font-size: 30upx;
		font-weight: bold;
		letter-spacing: 2upx;
		font-family: PingFang SC;
		border: 1px solid rgba(112, 112, 112, 1);
	}

	.login-wrap {
		width: 620upx;
		margin: 0 auto;

		.wechat-login {
			display: block;
			text-align: center;
			margin-top: 220upx;

			button {
				border: 0;
				display: inline-block;
				vertical-align: middle;
			}

			&::after,
			&::before {
				content: '';
				display: inline-block;
				height: 1px;
				width: 220upx;
				background: #C1C1C1;
				vertical-align: middle;
			}

			&::after {
				margin-left: 30upx;
			}

			&::before {
				margin-right: 30upx;
			}

			image {
				width: 120upx;
				height: 120upx;
				vertical-align: middle;
			}
		}

		.login-menu {
			margin: 40upx 0 0 0;
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			color: #35363B;
			font-weight: bold;
		}

		.login-btn {
			line-height: 100upx;
			text-align: center;
			color: rgba(255, 255, 255, 1);
			background: rgba(52, 188, 102, 1);
			border-radius: 8upx;
			font-size: 30upx;
			font-weight: bold;
			letter-spacing: 2upx;
			box-shadow: 0px 10upx 30upx rgba(114, 114, 114, .4);
			margin-bottom: 60upx;
			margin-top: 100upx;
		}

		.input-item {
			height: 100upx;
			position: relative;
			display: flex;
			background: #F7F7F7;
			border-radius: 8upx;
			margin-bottom: 30upx;
			align-items: center;
			padding: 30upx 34upx;
			box-sizing: border-box;

			.menu-wrap {
				position: absolute;
				right: 30upx;

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
					margin-left: 20upx;
				}
			}

			input {
				flex: 1;
				margin: 0 50upx 0 17upx;
				font-size: 28upx;
			}

			&.pwd {
				input {
					margin: 0 110upx 0 17upx;
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

		.logo {
			text-align: center;
			padding: 100upx 0 70upx;

			image {
				width: 252upx;
				height: 155upx;
			}
		}
	}
</style>
