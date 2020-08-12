<template>
	<view class="login-wrap">
		<view class="logo"><image src="../../../static/user_logo.png" mode=""></image></view>
    <view class="input-item">
      <view class="user-phone"></view>
      <input type="text" v-model="userPhone" placeholder="请输入手机号"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPhone.length > 0" @click="userPhone=''"></view>
      </view>
    </view>
    <view class="input-item code">
      <view class="user-code"></view>
      <input type="text" v-model="code" placeholder="请输入验证码"  />
      <view class="code-btn" @click="sendCode">{{content}}</view>
      <view class="menu-wrap">
        <view class="clearn-data" v-if="code.length > 0" @click="code=''"></view>
      </view>
    </view>
    <view class="input-item pwd">
      <view class="user-pwd"></view>
      <input v-if="password" type="password" v-model="userPwd" placeholder="请输入6位以上数字字母组合密码"  />
      <input v-else type="text" v-model="userPwd" placeholder="请输入6位以上数字字母组合密码"  />
      <view class="menu-wrap">
        <view class="clearn-data" v-if="userPwd.length > 0" @click="userPwd=''"></view>
        <view class="eyes" v-if="userPwd.length > 0" @click="password = !password"></view>
      </view>
    </view>
    <view class="login-btn" @click="submitRegister" :class="{disabled: userPhone != '' && userPwd != '' && code != '' && userPwd.length >= 6}">同意协议并注册</view>
    <view class="login-menu">
      <navigator hover-class="none" url="../login/login" open-type="redirect">登录</navigator>
    </view>
    
    <view class="banquan-wrap">
      包铺鉴定
      <navigator class="a" url="">《版权声明》</navigator>
      和
      <navigator class="a" url="">《隐私保护》</navigator>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: "",
        userPwd: "",
        code: "",
        password: true,
        codeFlag: true,
        content: "获取验证码",
        count: 60,
			};
		},
    onLoad(option) {
      this.type = option.type || 0
    },
    methods:{
      sendCode(){
        if(!this.codeFlag){
          return
        }
        let params = {
          mobile: this.userPhone
        }
        this.$requestApi.sendsms(params).then(res => {
          if(res.code == 1000){
            this.codeFlag = false
            var timer = setInterval(()=>{
              this.count--
              if(this.count <= 0){
                clearInterval(timer)
                this.count = 60
                this.codeFlag = true
                this.content="获取验证码"
              }else{
                this.content="剩余 " + this.count + " s"
              }
            },1000)
          }else{
            uni.showToast({
              icon: 'none',
              title: res.message
            })
          }
        })
      },
      submitRegister(){
        if(this.userPhone == '' || this.userPwd == '' || this.code == ''){
          return
        }
        let params = {
          mobile: this.userPhone,
          password: this.userPwd,
          mscode: this.code,
        }
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        if(!reg.test(params.password)){
          uni.showToast({
            icon: "none",
            title: "密码格式错误"
          })
          return;
        }
        
        if(this.type == 1){
          params['nickname'] = getApp().globalData.wechatRegister.nickName
          params['avatar'] = getApp().globalData.wechatRegister.avatarUrl
          params['openid'] = getApp().globalData.openidRegister
          this.$requestApi.wxregister(params).then(res => {
            if(res.code == 1000){
              uni.showToast({
                title: "注册成功"
              })
              uni.setStorageSync('token', res.data.token);
              uni.setStorageSync('isuser', res.data.isuser);
              uni.setStorageSync('userinfo', res.data);
              uni.navigateBack()
            }else{
              uni.showToast({
                icon: 'none',
                title: res.message
              })
            }
            
          })
        }else{
          this.$requestApi.register(params).then(res => {
            if(res.code == 1000){
              uni.showToast({
                title: "注册成功"
              })
              uni.setStorageSync('token', res.data.token);
              uni.setStorageSync('isuser', res.data.isuser);
              uni.setStorageSync('userinfo', res.data);
              uni.navigateBack()
            }else{
              uni.showToast({
                icon: 'none',
                title: res.message
              })
            }
          })
        }
      }
    }
	}
</script>
<style lang="less">
  .login-wrap{
    width: 620upx;
    margin: 0 auto;
    
    .banquan-wrap{
      margin-top: 250upx;
      text-align: center;
      color: #999A9B;
      font-size: 28upx;
      .a{
        display: inline-block;
        vertical-align: middle;
        color: #C9AB79;
      }
    }
    .wechat-login{
      text-align: center;
      margin-top: 220upx;
      &::after,&::before{
        content: '';
        display: inline-block;
        height: 1px;
        width: 220upx;
        background: #C1C1C1;
        vertical-align: middle;
      }
      &::after{
        margin-left: 30upx;
      }
      &::before{
        margin-right: 30upx;
      }
      image{
        width: 120upx;
        height: 120upx;
        vertical-align: middle;
      }
    }
    .login-menu{
      margin: 40upx 0 0 0;
      font-size: 32upx;
      color: #35363B;
      font-weight: bold;
      text-align: center;
    }
    .login-btn{
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
    .input-item{
      height: 100upx;
      position: relative;
      display: flex;
      background: #F7F7F7;
      border-radius: 8upx;
      margin-bottom: 30upx;
      align-items: center;
      padding: 30upx 34upx;
      box-sizing: border-box;
      
      .code-btn{
        font-size: 28upx;
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
          margin: 0 70upx 0 17upx;
        }
      }
      &.code{
        input{
          margin-right: 30upx;
        }
        .menu-wrap{
          right: 180upx;
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
    .logo{
      text-align: center;
      padding: 100upx 0 70upx;
      image{
        width: 252upx;
        height: 155upx;
      }
    }
  }
  
</style>