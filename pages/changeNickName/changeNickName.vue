<template>
	<view class="nickname">
		<input v-model="saveName" />
		<view class="fixed_btn">
			<view class="button" @click="savenickhand">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				saveName: '',
				type: 0
			};
		},
		onLoad(option) {
			console.log(option, 'option');
			this.type = Number(option.type);
			uni.setNavigationBarTitle({
				title: this.type ? "修改签名" : "修改昵称"
			})
		},
		onShow() {
			const value = uni.getStorageSync('userinfo');
      console.log(value)
			this.saveName = Number(this.type) ?  value.describe : value.nickname
		},
		methods: {
			savenickhand() {
				var name = this.type ? 'describe' : 'nickname'
				let params = {
					[name]: this.saveName
				}
				if (this.saveName.length <= 28) {
					this.$requestApi.profile(params).then(res => {
						// uni.setStorageSync('isuser', res.data.isuser);
						let _userinfo = uni.getStorageSync('userinfo');
						uni.setStorageSync('userinfo', Object.assign(_userinfo,params));
						uni.showToast({
							title: "修改成功"
						})
						setTimeout(() => {
							// let pages=getCurrentPages();
							// let prepage = pages[pages.length-2];
							// prepage.getUserInfo();
							uni.navigateBack()
						}, 1000)
					})
				} else {
					uni.showToast({
						title: "不能超过28字符"
					})
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.nickname {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 25rpx 30rpx 0;
		box-sizing: border-box;

		.savenick {
			width: 20%;
			background: #007AFF;
			color: #FFFFFF;
			text-align: center;
			height: 100%;
			font-size: 32rpx;
			line-height: 60rpx;
		}

		input {
			width: 80%;
			height: 100%;
			line-height: 60rpx;
			font-size: 32rpx;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #dddddd;
		}
	}

	.fixed_btn {
		position: fixed;
		bottom: 60rpx;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.button {
			height: 100rpx;
			border-radius: 10rpx;
			line-height: 100rpx;
			text-align: center;
			background: #000000;
			font-size: 32rpx;
			color: #D5BD94;
		}
	}
</style>
