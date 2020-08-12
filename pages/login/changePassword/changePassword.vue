<template>
	<view class="forget">
		<view class="h1">修改密码</view>
    <view class="p">通过手机验证找回密码</view>
    <view class="input-item pwd">
      <view class="user-pwd"></view>
      <input :type="password1?'password':'text'" v-model="userPwd" placeholder="请输入6位以上数字字母组合密码"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPwd.length > 0" @click="userPwd=''"></view>
        <view class="eyes" v-if="userPwd.length > 0" @click="password1 = !password1"></view>
      </view>
    </view>
    <view class="input-item pwd">
      <view class="user-pwd"></view>
      <input :type="password2?'password':'text'" v-model="userPwds" placeholder="请再次确认密码"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPwds.length > 0" @click="userPwds=''"></view>
        <view class="eyes" v-if="userPwds.length > 0" @click="password2 = !password2"></view>
      </view>
    </view>
    
    <view class="login-btn" @click="submitForget" :class="{disabled: userPwd != '' && userPwds != ''}">确认修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password1: true,
        password2: true,
        userPwd: "",
        userPwds: ""
			};
		},
    onLoad(option) {
      this.phone = option.tel
    },
    methods: {
      submitForget(){
        if(this.userPwd == '' || this.userPwds == ''){
          return
        }
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
        if(!reg.test(this.userPwd)){
          uni.showToast({
            icon: "none",
            title: "密码格式错误"
          })
          return;
        }
        if(this.userPwds != this.userPwd){
          uni.showToast({
            icon: "none",
            title: "两次密码不一致"
          })
          return;
        }
        let params = {
          mobile: this.phone,
          password: this.userPwd
        }
        this.$requestApi.doforget(params).then(res => {
          if(res.code == 1000){
            uni.showToast({
              title: '修改成功！'
            })
            setTimeout(() => {
              uni.redirectTo({
                url: '../login/login'
              })
            },1000)
          }else{
            uni.showToast({
              icon: 'none',
              title: res.message
            })
          }
        })
      }
    },
	}
</script>

<style lang="less" scoped>
  .forget{
    width: 670upx;
    margin: 0 auto;
    padding: 150upx 0 0;
    
    .login-btn{
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
      box-shadow: 0px 10upx 30upx rgba(114,114,114,.4);
      &.disabled{
        color: #C9AB79;
        background: #35363B;
      }
    }
    .h1{
      font-size: 60upx;
      font-weight: bold;
      color: #35363B;
      line-height: 84upx;
      margin-bottom: 10upx;
    }
    .p{
      font-size: 28upx;
      color: #C1C1C1;
      margin-bottom: 100upx;
    }
    
    .input-item{
      height: 100upx;
      position: relative;
      display: flex;
      border-radius: 8upx;
      align-items: center;
      padding: 30upx 0;
      border-bottom: 1upx solid #eee;
      box-sizing: border-box;
      .code-btn{
        color: #C1C1C1;
      }
      .menu-wrap{
        position: absolute;
        right: 30upx;
        z-index: 2;
        .clearn-data{
          display: inline-block;
          vertical-align: middle;
          width: 42upx;
          height: 42upx;
          background: url(../../../static/login_close.png) no-repeat center;
          background-size: 32upx 32upx;
        }
        .eyes{
          display: inline-block;
          vertical-align: middle;
          width: 42upx;
          height: 42upx;
          background: url(../../../static/eyes.png) no-repeat center;
          background-size: 42upx 24upx;
          margin-left: 10upx;
        }
      }
      
      input{
        flex: 1;
        margin: 0 50upx 0 17upx;
        font-size: 28upx;
      }
      &.pwd{
        input{
          margin: 0 85upx 0 17upx;
        }
      }
      &.code{
        input{
          margin-right: 30upx;
        }
        .menu-wrap{
          right: 160upx;
        }
      }
      .user-code{
        width: 45upx;
        height: 45upx;
        background: url(../../../static/code.png) no-repeat center;
        background-size: 31upx 37upx;
      }
      .user-phone{
        width: 45upx;
        height: 45upx;
        background: url(../../../static/user_tel.png) no-repeat center;
        background-size: 27upx 42upx;
      }
      .user-pwd{
        width: 45upx;
        height: 45upx;
        background: url(../../../static/user_pwd.png) no-repeat center;
        background-size: 34upx 34upx;
      }
    }
  }
</style>
