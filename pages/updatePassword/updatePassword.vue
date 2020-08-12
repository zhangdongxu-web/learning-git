<template>
	<view>
		<form @submit="formSubmit">
			<view class="list">
				<view class="list-item">
					<view class="list-item-title">原密码</view>
					<view class="list-text">
						<input name="oldpassword" v-model="oldpassword" type="password"  placeholder="您的旧密码"/>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-title">新密码</view>
					<view class="list-text">
						<input name="newpassword" v-model="newpassword" type="password"  placeholder="请输入6位以上数字字母组合密码"/>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-title">确认密码</view>
					<view class="list-text">
						<input name="isnewpassword" v-model="isnewpassword" type="password"  placeholder="请输入6位以上数字字母组合密码"/>
					</view>
				</view>
			</view>
			<view class="fixed_btn">
				<button class="button" formType="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from "../../js_sdk/graceui-dataChecker/graceChecker.js";
	export default {
		data() {
			return {
				oldpassword:'',
				newpassword:'',
				isnewpassword:''
			};
		},
		methods:{
			formSubmit(e) {
				let rule = [
					{ name: "oldpassword", checkType: "reg", checkRule: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$", errorMsg: "旧密码应为6-16数字字母组合" },
					{ name: "newpassword", checkType: "reg", checkRule: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$",  errorMsg: "新密码为6-16数字字母组合" },
					{ name: "isnewpassword", checkType: "same", checkRule:this.newpassword, errorMsg: "两次密码不一致" },
				];
				let formData = e.detail.value;
				let checkRes = graceChecker.check(formData, rule);
				if(checkRes){
          let params = {
            oldpwd: this.oldpassword,
            newpwd: this.newpassword
          }
          this.$requestApi.changepwd(params).then(res => {
            if(res.code == 1000){
              uni.showModal({
                title: '提示',
                showCancel: false,
                content: '修改成功，请重新登录！',
                success: (res) => {
                  if(!res.cancel){
                    uni.clearStorage()
                    uni.switchTab({
                      url: "../index/index"
                    })
                  }
                }
              })
            }else{
              uni.showToast({
                icon: 'none',
                title: res.message
              })
            }
          })
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.list{
	padding:0 40rpx;
	.list-item{
		display:flex;
		justify-content:flex-start;
		align-items:center;
		height:140rpx;
		border-bottom:0.1rpx solid #EEEEEE;
		.list-item-title{
			font-size:32rpx;
			font-weight:bold;
			color:#30313B;
			width:200rpx;
		}
		.icon-arrow-right{
			color:#C1C1C1;
		}
		.list-text{
			width:100%;
			input{
				width:100%;
				text-align:right;
				color:#35363B;
        font-size: 28upx;
			}
			input::-webkit-input-placeholder{
				color:#C1C1C1;
				font-size:28rpx;
			}
			input::-moz-placeholder{   /* Mozilla Firefox 19+ */
				color:#C1C1C1;
				font-size:28rpx;
			}
			input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
				color:#C1C1C1;
				font-size:28rpx;
			}
			input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
				color:#C1C1C1;
				font-size:28rpx;
			}
		}
	}
}
.fixed_btn{
	position:fixed;
	bottom:60rpx;
	width:100%;
	padding:0 30rpx;
	box-sizing:border-box;
	.button{
		height:100rpx;
		border-radius:10rpx;
		line-height:100rpx;
		text-align:center;
		background:#000000;
		font-size:32rpx;
		color:#D5BD94;
	}
}
</style>
