<template>
	<view>
		<view class="list">
			<view class="list-item">
				<view class="list-item-title">头像</view>
				<view class="list-logo">
					<cropper selWidth="660rpx" selHeight="660rpx" @upload="myUpload" :avatarSrc="userInfo.avatar" avatarStyle="width:80rpx;height:80rpx;" />
				</view>
			</view>
			<navigator hover-class="none" url="../changeNickName/changeNickName?type=0">
				<view class="list-item">
					<view class="list-item-title">昵称</view>
					<view class="list-text">
						<text>{{userInfo.nickname}}</text>
						<view class="css-icon icon-arrow-right"></view>
					</view>
				</view>
			</navigator>
			<block v-if="userInfo.isuser == 0">
				<navigator hover-class="none" url="../changeNickName/changeNickName?type=1">
					<view class="list-item">
						<view class="list-item-title">简介</view>
						<view class="list-text">
							<text>{{userInfo.describe}}</text>
							<view class="css-icon icon-arrow-right"></view>
						</view>
					</view>
				</navigator>
			</block>
			<view class="list-item" @click="openPopup">
				<view class="list-item-title">性别</view>
				<view class="list-text">
					<text>{{userInfo.sex == 1 ? '男' : '女'}}</text>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<!-- <view class="list-item">
				<view class="list-item-title">出生日期</view>
				<view class="list-text" @click="getDateTime">
					<text>{{userInfo.birthdate}}</text>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view> -->
			<view class="list-item">
				<view class="list-item-title">手机号</view>
				<view class="list-text">
					<text>{{userInfo.mobile}}</text>
					<!-- <view class="css-icon icon-arrow-right"></view> -->
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="center" :custom="true" :maskClick="true">
			<view class="ident_popup">
				<view class="genter">
					性别
				</view>
				<radio-group @change="radioChange">
					<view class="radio_view">
						<label class="radio">
							<radio value="1" :checked="isRadio==1" />
							<text>男</text>
						</label>
					</view>
					<view class="radio_view">
						<label class="radio">
							<radio value="0" :checked="isRadio==0" />
							<text>女</text>
						</label>
					</view>
				</radio-group>
			</view>
		</uni-popup>
		<!-- 时间 -->
		<w-picker mode="date" ref="getDate" @confirm="onConfirm"></w-picker>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import wPicker from "../../components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				flag: false,
				userInfo: {
					avatar: '',
					nickname: '',
					sex: '',
					birthdate: '',
					mobile: ''
				},
				isRadio: '1',
				userInfoNew: {}
			};
		},
		methods: {
			myUpload(rsp) {
				this.userInfo.avatar = rsp.path; //更新头像方式一
				uni.showLoading({
					mask: true,
					title: "正在上传"
				})
				uni.uploadFile({
					url: this.$upLoadUrl,
					filePath: rsp.path,
					name: 'file',
					header: {
						"content-type": "multipart/form-data"
					},
					formData: {
						//和服务器约定的token, 一般也可以放在header中
						'pathname': 'lisence',
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false
							})
							return;
						}
						var data = JSON.parse(res.data);
						this.userInfo.avatar = data.data;
						let params = {
							avatar: this.userInfo.avatar
						}
						// console.log(res.data)
						this.changeUserInfo(params)
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						})
					}
				})
			},
			openPopup() {
				this.$refs.popup.open()
			},
			changeUserInfo(params = {}) {
				this.$requestApi.profile(params).then(res => {
					uni.setStorageSync('isuser', res.data.isuser);
					let userinfoStorage = uni.getStorageSync('userinfo');
					uni.setStorageSync('userinfo', Object.assign(userinfoStorage,params));
					uni.showToast({
						title: "修改成功"
					})
				})
			},
			// 性别
			radioChange(e) {
				// 获取最新
				let userinfoStorage = uni.getStorageSync('userinfo');
				this.userInfo.sex = e.detail.value;
				this.isRadio = e.detail.value;
				let params = {
					sex: e.detail.value
				}
				this.changeUserInfo(params)
				this.$refs.popup.close()
			},
			// 时间
			getDateTime() {
				this.$refs['getDate'].show();
			},
			onConfirm(time) {
				this.userInfo.birthdate = time.result;
				let params = {
					birthdate: time.result
				}
				this.changeUserInfo(params)
			},
			// 获取用户信息
			getUserInfo() {				
				this.userInfoNew = uni.getStorageSync('userinfo');
				this.userInfo = this.userInfoNew;
				this.isRadio = this.userInfoNew.sex;
			}
		},
		onShow() {
			console.log('person show')
			this.getUserInfo();
		},
		onLoad() {
			this.getUserInfo();
		},
	}
</script>

<style lang="less" scoped>
	/deep/ radio .wx-radio-input.wx-radio-input-checked {
		background: #C9AB79;
		border-color: #C9AB79;
	}

	.list {
		padding: 0 40rpx;

		.list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 140rpx;
			border-bottom: 0.1rpx solid #EEEEEE;

			.list-item-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #30313B;
			}

			.icon-arrow-right {
				color: #C1C1C1;
				float: right;
			}

			.list-logo {
				image {
					width: 80rpx;
					height: 80rpx;
					vertical-align: middle;
					margin-right: 20rpx;
				}
			}

			.list-text {
				max-width: 510upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 32rpx;
					color: #636365;
					margin-right: 20rpx;
					line-height: 50upx;
				}
			}
		}
	}

	.ident_popup {
		width: 300rpx;
		height: 200rpx;
		padding: 20rpx;
		text-align: center;
		margin: 0 auto;
		background: #FFFFFF;

		.genter {
			font-size: 32rpx;
			margin: 20rpx 0;
		}

		.radio_view {
			padding-bottom: 20rpx;

			text {
				margin-left: 30rpx;
			}
		}
	}
</style>
