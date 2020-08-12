<template>
	<view>
		<appraisal-user :dataList="dataList" :state="type" :auth="auth" :identTab="identTab"></appraisal-user>
    <view class="pic" v-if="dataList.length==0">
      <image src="../../static/identify.png"></image>
      <text>您还没有任何订单</text>
    </view>
    <view v-else class="no-data">已经触碰到我的底线啦</view>
     <!-- <view v-if="nodata" class="no-data">已经触碰到我的底线啦</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
        type: '',
        auth: '',
        tabType: '',
        title: '',
        identTab: '',
        page: 1,
        nodata: false
			}
		},
    onLoad(option) {
      console.log(option,'66666');
      this.type = option.type
      this.tabType = option.tabType
      this.identTab = option.identTab
      this.auth = option.auth?option.auth:""
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.type==1?"鉴定成功":(this.auth!=1?"待鉴定":"鉴定中")
      })
      this.page = 1
      this.dataList = []
      this.getData()
    },
    onReachBottom() {
      if (!this.noData) {
        this.getData()
      }
    },
    methods:{
      getData(){
        let params = {
          type: this.type==1?'over':this.auth!=1?'waiting':'doing',
          page: this.page
        }
        if(this.identTab == 1){
          this.$requestApi.getGoodsorderList(params).then(res => {
            if(res.data.appraisal.length == 0 || res.data.appraisal.length < 10){
              this.nodata = true
            }
            this.dataList = [...this.dataList,...res.data.appraisal]
          })
        }else{
          this.$requestApi.getOnlineGoodsList(params).then(res => {
            if(res.data.appraisal.length == 0 || res.data.appraisal.length < 10){
              this.nodata = true
            }
            this.dataList = [...this.dataList,...res.data.appraisal]
          })
        }
        this.page += 1
      }
    }
	}
</script>

<style lang="less">
.pic{
  width: 500rpx;
  height: 480rpx;
  position: fixed;
  top:40%;
  left: 50%;
  margin-top: -240rpx;
  margin-left: -250rpx;
  text-align: center;
}
.pic image{
  width: 500rpx;
  height: 410rpx;
  margin-bottom: 20rpx;
}
.pic text{
  font-size:32rpx;
  font-family:PingFang SC;
  font-weight:500;
  line-height:50rpx;
  color:rgba(193,193,193,1);
  opacity:1;
}
</style>
