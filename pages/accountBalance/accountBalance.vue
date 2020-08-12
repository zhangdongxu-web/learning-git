<template>
	<view>
		<view class="card-item">
      <view class="f28 white">我的金额</view>
      <view class="my-rmb">{{rmb}}</view>
      <view class="mingxi" @click="touchBalance">金额明细</view>
    </view>
    <view class="tixian" @click="withdraw">我要提现</view>
    <view class="desc">
      本平台规定可提现金额需大于100，<br>且提现金额为百元整数提现
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rmb: 0
			}
		},
    onShow() {
      // const value = uni.getStorageSync('userinfo');
      // this.rmb = value.money
      this.$requestApi.getmoney().then(res =>{
        this.rmb = res.data.money
      })
    },
    methods:{
      withdraw(){
        uni.navigateTo({
          url: '../withdraw/withdraw'
        })
      },
      touchBalance(){
        uni.navigateTo({
          url: '../touchBalance/touchBalance'
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
  }
  .tixian{
    width: 670upx;
    line-height: 100upx;
    background: #35363B;
    color: #D5BD94;
    font-size: 30upx;
    border-radius: 8upx;
    text-align: center;
    margin: 0 auto 20upx;
  }
  .card-item{
    width: 100%;
    height: 590upx;
    background: url(../../static/accountBalance.png) no-repeat center;
    background-size: cover;
    text-align: center;
    padding-top: 120upx;
    box-sizing: border-box;
    font-weight: bold;
    .mingxi{
      width: 490upx;
      line-height: 100upx;
      margin: 0 auto;
      border-radius: 100upx;
      font-size: 30upx;
      background: #FFFFFF;
    }
    .my-rmb{
      font-size: 80upx;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 100upx;
      margin: 20upx 0 50upx;
    }
    .f28{
      font-size: 28upx;
    }
    .white{
      color: #FFFFFF;
    }
  }
</style>
