<template>
  <view>
    <view class="ident_tab">
      <view class="ident_tab_item" @click="tabChange(0)">
        <view :class="{active:identTab == 0}">
          <view class="ident_tab_item_img"></view>
          <text>在线鉴定</text>
        </view>
      </view>
      <view class="ident_tab_item" @click="tabChange(1)">
        <view :class="{active:identTab == 1}">
          <view class="ident_tab_item_img_r"></view>
          <text>实物鉴定</text>
        </view>
      </view>
    </view>
    <view class="order-wrap">
      <navigator class="a" :url="'../orderAppraisal/orderAppraisal?type=3&&auth=0&&identTab='+identTab" hover-class="none">
        <view class="order-item">
          <view class="order-icon">
            <image class="order-icon" src="../../static/order_icon1.png"></image>
            <!-- <view class="tips">{{1}}</view> -->
          </view>
          <text>待鉴定</text>
        </view>
        <view class="css-icon icon-arrow-right"></view>
      </navigator>
      <navigator class="a" :url="'../orderAppraisal/orderAppraisal?type=3&&auth=1&&identTab='+identTab" hover-class="none">
        <view class="order-item">
          <view class="order-icon">
            <image src="../../static/order_icon2.png"></image>
            <block v-if="identTab == 0 && online > 0">
              <view class="tips">{{online}}</view>
            </block>
            <block v-if="identTab == 1 && goods > 0">
              <view class="tips">{{goods}}</view>
            </block>
          </view>
          <text>鉴定中</text>
        </view>
        <view class="css-icon icon-arrow-right"></view>
      </navigator>
      <navigator class="a" :url="'../orderAppraisal/orderAppraisal?type=1&&auth=1&&identTab='+identTab" hover-class="none">
        <view class="order-item">
          <view class="order-icon">
            <image src="../../static/order_icon3.png"></image>
            <!-- <view class="tips">{{1}}</view> -->
          </view>
          <text>鉴定完成</text>
        </view>
        <view class="css-icon icon-arrow-right"></view>
      </navigator>
    </view>
    <nav-bar :navlist="navlist" :sort="sort"></nav-bar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        navlist: getApp().globalData.navbar_admin,
        sort: false,
        identTab: 0,
        online: 0,
        goods: 0
      };
    },
    onShow() {
      this.getCount()
    },
    methods: {
      getCount(){
        this.$requestApi.count().then(res => {
          this.online = res.data.online
          this.goods = res.data.goods
        })
      },
      tabChange(event) {
        console.log(event,'111111');
      	this.identTab = event;
      }
    },
  }
</script>

<style lang="less" scoped>
  .order-wrap{
    padding: 0 30upx;
    .a{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 120upx;
      box-sizing: border-box;
      border-bottom: 1upx solid #eee;
      .order-item{
        font-size: 32upx;
        font-weight: bold;
        display: flex;
        align-items: center;
        .order-icon{
          width:32upx;
          height: 32upx;
          margin-right: 20upx;
          position: relative;
          .tips{
            position: absolute;
            width: 24upx;
            font-size: 16upx;
            border-radius: 24upx;
            text-align: center;
            line-height: 24upx;
            background: #F13939;
            color: #FFFFFF;
            right: -14upx;
            top: -10upx;
          }
          image{
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
      .icon-arrow-right::after{
        border-color: #e5e5e5;
      }
    }
  }
  .ident_tab {
    display: flex;
    height: 120upx;
    border: 0.5upx solid #eeeeee;
    border-right: none;
    border-left: none;
    position: sticky;
    top: 0;

    .ident_tab_item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      &>view.active {
        border-bottom: 4upx solid #BE9F62;
        line-height: 120upx;
        color: #BE9F62;

        .ident_tab_item_img {
          display: inline-block;
          width: 37upx;
          height: 32upx;
          vertical-align: middle;
          background: url(../../static/online_ident_active.png) center no-repeat;
          background-size: 100% 100%;
        }

        .ident_tab_item_img_r {
          display: inline-block;
          width: 39upx;
          height: 35upx;
          vertical-align: middle;
          background: url(../../static/ident_goods_active.png) center no-repeat;
          background-size: 100% 100%;
        }
      }

      .ident_tab_item_img {
        display: inline-block;
        width: 37upx;
        height: 32upx;
        vertical-align: middle;
        background: url(../../static/online_ident.png) center no-repeat;
        background-size: 100% 100%;
      }

      .ident_tab_item_img_r {
        display: inline-block;
        width: 39upx;
        height: 35upx;
        vertical-align: middle;
        background: url(../../static/ident_goods.png) center no-repeat;
        background-size: 100% 100%;
      }

      text {
        vertical-align: middle;
        padding-left: 10upx;
        font-size: 32upx;
        font-weight: bold;
      }
    }

  }
</style>
