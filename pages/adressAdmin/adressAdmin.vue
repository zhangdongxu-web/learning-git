<template>
	<view>
		<form @submit="formSubmit">
		<view class="list">
			<view class="list-item">
				<view class="list-item-title">联系人姓名</view>
				<view class="list-text"><input name="username" v-model="userInfo.receiver" type="text" placeholder="您的姓名" /></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">联系方式</view>
				<view class="list-text"><input name="tel" v-model="userInfo.phone" type="text" placeholder="您的手机/电话" /></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">邮政编码</view>
				<view class="list-text"><input  name="code" type="text" v-model="userInfo.postcode" placeholder="请输入邮政编码" /></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">所在地区</view>
				<view class="list-text"><input  name="address" type="text" disabled v-model="userInfo.area"  placeholder="请选择收货地址" @click="getAddress"/></view>
			</view>
			<view class="list-item">
				<view class="list-item-title">详细地址</view>
				<view class="list-text"><input  name="detailAddress" v-model="userInfo.address" type="text" placeholder="请输入您的详细地址"/></view>
			</view>
		</view>
		<view class="fixed_btn"><button class="button" formType="submit">保存</button></view>
		</form>
		<w-picker mode="region" ref="getAddress" @confirm="onConfirm"></w-picker>
	</view>
</template>

<script>
	import wPicker from "../../components/w-picker/w-picker.vue";
	import graceChecker from "../../js_sdk/graceui-dataChecker/graceChecker.js";
	let rule = [
		{ name: "username", checkType: "string", checkRule: "1,12", errorMsg: "姓名应为1-12个字符" },
		{ name: "tel", checkType: "phoneno", checkRule: "",  errorMsg: "请输入正确手机号" },
		{ name: "code", checkType: "zipcode", checkRule: "", errorMsg: "请输入正确邮政编码" },
		{ name: "address", checkType: "notnull", checkRule: "", errorMsg: "地址不能为空" },
		{ name: "detailAddress", checkType: "notnull", checkRule: "", errorMsg: "地址不能为空" }
	];
	export default {
		components:{
			wPicker
		},
		data() {
			return {
        type:'',
        id: '',
				userInfo:{
					receiver:'',
					phone:'',
					postcode:'',
					area:'',
					address:''
				}
			}
		},
		computed:{
			
		},
    onLoad(option) {
      this.type = option.type
      this.id = option.id || ''
      console.log(this.type);
      uni.setNavigationBarTitle({
        title: this.type == 1?'新增地址':'编辑地址'
      })
    },
    onShow() {
      if(this.id != ''){
        this.getaddressInfo()
      }
    },
		methods: {
      getaddressInfo(){
        let params = {
          id: this.id
        }
        this.$requestApi.getaddressinfo(params).then(res => {
          this.userInfo = {...res.data}
        })
      },
			getAddress() {
				this.$refs['getAddress'].show();
			},
			onConfirm(val){
        
				this.userInfo.area = val.result;
        console.log('修改')
			},
			formSubmit(e) {
				let formData = e.detail.value;
				let checkRes = graceChecker.check(formData, rule);
				if(checkRes){
          let params = {
            id: this.id,
            type: 'add',
            address: JSON.stringify(this.userInfo)
          }
          console.log(this.type,'typetype');
          // params.type = this.type == 1 ? 'add' : 'edit'
          if(this.type == 1){
            params.type = 'add'
            console.log(22222)
          }else{
             params.type = 'edit'
             console.log(33333)
          }
          this.$requestApi.addressop(params).then(res => {
            uni.showToast({
              icon: 'none',
              title: '操作成功'
            })
            setTimeout(function() {
              uni.navigateBack()
            }, 1000);
          })
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.list {
	padding: 0 40rpx;
	.list-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 140rpx;
		border-bottom: 0.1rpx solid #eeeeee;
		.list-item-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #30313b;
			width: 230rpx;
		}
		.icon-arrow-right {
			color: #c1c1c1;
		}
		.list-text {
			width: 100%;
			input {
				width: 100%;
				text-align: right;
				color: #35363b;
        font-size: 28upx;
			}
			input::-webkit-input-placeholder {
				color: #c1c1c1;
				font-size: 28rpx;
			}
			input::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				color: #c1c1c1;
				font-size: 28rpx;
			}
			input:-moz-placeholder {
				/* Mozilla Firefox 4 to 18 */
				color: #c1c1c1;
				font-size: 28rpx;
			}
			input:-ms-input-placeholder {
				/* Internet Explorer 10-11 */
				color: #c1c1c1;
				font-size: 28rpx;
			}
		}
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
		border-radius:10rpx;
		line-height: 100rpx;
		text-align: center;
		background: #000000;
		font-size: 32rpx;
		color: #D5BD94;
	}
}
</style>
