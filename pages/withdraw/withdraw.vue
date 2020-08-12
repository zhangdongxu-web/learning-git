<template>
	<view class="withdraw-wrap">
		<view class="h1">提现金额</view>
    <view class="price">
      <text>￥</text>
      <input  type="number" v-model="price" />
    </view>
    <view class="remind">
      您的可提现金额为：<text>￥{{balance}}</text>
    </view>
    <view class="desc">
      本平台规定可提现金额需大于100，<br>且提现金额为百元整数提现
    </view>
    <view class="submit-btn" @click="submitWithdraw">我要提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '',
				lastmoney: '',
        balance:'0'
			};
		},
		onShow(){
			this.$requestApi.getmoney().then(res =>{
			  this.lastmoney = res.data.money
        if(res.data.money>500){this.balance = res.data.money - 500}
         
			})
		},
    methods:{
      submitWithdraw(){
        if(this.price == ""){
          uni.showToast({
            icon: "none",
            title: "请输入提现金额"
          })
          return
        }
	
        if(this.lastmoney - this.price < 500){
          uni.showToast({
            icon: "none",
            title: "余额不足"
          })
          return
        }
        if(this.price%100 != 0){
          uni.showToast({
            icon: "none",
            title: "提现金额为百元整数提现"
          })
          return
        }
        let params = {
          money: this.price
        }
        this.$requestApi.postWithdraw(params).then(res => {
          if(res.code == 1000){
            uni.showToast({
              icon: "none",
              title: '提现成功！'
            })
            setTimeout(()=>{
              uni.navigateBack()
            },1000)
          }else{
            uni.showToast({
              icon: "none",
              title: '提现失败！'
            })
          }
        })
      }
    }
	}
</script>

<style lang="less" scoped>
  .desc{
    color: #999A9B;
    text-align: center;
    line-height: 42upx;
    padding-bottom: 60upx;
  }
  .withdraw-wrap{
    width: 670upx;
    margin: 0 auto;
    padding-top: 200upx;
    .h1{
      font-size: 28upx;
      font-weight: bold;
      color: #30313B;
      margin-bottom: 40upx;
    }
    .price{
      width: 610upx;
      border-bottom: 1upx solid #eeeeee;
      margin: 0 auto 20upx;
      display: flex;
      align-items: center;
      padding-bottom: 50upx;
      text{
        font-size: 80upx;
        font-weight: bold;
        line-height: 110upx;
      }
      input{
        font-size: 80upx;
        font-weight: bold;
        line-height: 110upx;
        height: 110upx;
      }
    }
    .remind {
      text-align:center;
      font-size:30rpx;
      color:#35363B;
      padding-bottom:20rpx;
      text {
        color:#ff5d5d;
      }
    }
    .submit-btn{
      line-height: 100upx;
      text-align: center;
      border-radius: 8upx;
      background: #35363B;
      color: #D5BD94;
      font-size: 30upx;
      font-weight: bold;
    }
  }
</style>
