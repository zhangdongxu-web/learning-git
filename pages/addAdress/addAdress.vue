<template>
  <view>
    <!-- 基础用法 -->
    <view class="list" v-if="addressList.length">
      <view class="list-item" v-for="(item,index) in addressList" :key="index" @click="godetail(item)">
        <uni-swipe-action :options="options" @click="deleteAddress(item,index)">
          <view class="list-item-swiper-main">
            <view class="list-item-swiper">
              <view>
                <view class="list-item-title">{{item.receiver}} {{item.phone}}</view>
                <view class="list-item-title-address">{{item.area}}{{item.address}}</view>
              </view>
              <view class="css-icon icon-arrow-right"></view>
            </view>
          </view>
        </uni-swipe-action>
      </view>
    </view>
    <view class="noneAdress" v-else>您尚未添加收货地址</view>
    <view class="fixed_btn">
      <view class="button" @click="addressAdmin">新增地址</view>
    </view>
  </view>
</template>

<script>
  import {
    uniSwipeAction
  } from "../../components/uni-swipe-action/uni-swipe-action.vue"
  export default {
    components: {
      uniSwipeAction
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#F13939',
            fontSize: '32rpx'
          }
        }],
        addressList: []
      };
    },
    onLoad(option) {
      this.choseItem = option.type == 1 ? true : false
    },
    onShow() {
      this.getList()
    },
    methods: {
      godetail(item){
        if(this.choseItem){
          uni.navigateTo({
            url: '../adressAdmin/adressAdmin?type=2&&id=' + item.id
          })
        }else{
          getApp().globalData.userAddress = item
          uni.navigateBack()
        }
      },
      getList() {
        this.$requestApi.addresslist().then(res => {
          this.addressList = res.data
        })
      },
      addressAdmin() {
        uni.navigateTo({
          url: '../adressAdmin/adressAdmin?type=1'
        })
      },
      deleteAddress(item, index) {
        uni.showModal({
          title: '提示',
          content: '确定删除吗？',
          success: (res) => {
            let params = {
              id: item.id,
              type: 'del',
            }
            if(!res.cancel){
              this.$requestApi.addressop(params).then(res => {
                uni.showToast({
                  icon: 'none',
                  title: '删除成功'
                })
                this.getList()
              })
            }else{
              uni.showToast({
                icon: 'none',
                title: '已取消'
              })
            }
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .list-item-swiper-main {
    padding: 0 40rpx;

    .list-item-swiper {
      display: flex;
      justify-content: space-between;
      height: 160rpx;
      align-items: center;
      border-bottom: 0.1rpx solid #eeeeee;

      .icon-arrow-right {
        color: #C1C1C1;
      }
    }

    .list-item-title {
      font-size: 32rpx;
      color: #35363B;
      font-weight: 600;
    }

    .list-item-title-address {
      padding-top: 20rpx;
      font-size: 28rpx;
      color: rgba(153, 154, 155, 1);
    }
  }

  .noneAdress {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    color: rgba(153, 154, 155, 1);
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
