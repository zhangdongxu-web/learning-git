<template>
	<view class="x_countW">
	  <view class="atricles-list">
	    <view class="li" v-for="(item,index) in articlesList" :key="index">
	      <view @click="goDetail(item)">
	        <view class="atricles-img">
	          <image :src="item.image" mode="aspectFill"></image>
	          <view class="p">
	            <view class="span" v-if="item.mode == '标准鉴定'">
	              <image src="../../static/start.png" mode=""></image>
	              标准鉴定
	            </view>
	            <view class="span" v-if="item.mode == '精细鉴定'">
	              <image src="../../static/serve.png" mode=""></image>
	              精细鉴定
	            </view>
	            <view class="span" v-if="item.mode == '专家鉴定'">
	              <image src="../../static/expert.png" mode=""></image>
	              专家鉴定
	            </view>
	          </view>
	        </view>
	        <view class="atricles-info">
	          <view class="h3">{{item.name}}</view>
	          <view class="p" v-if="item.istrue" :class="{active: item.istrue}">
	            <image src="../../static/istrue.png" mode=""></image>鉴定为真
	          </view>
	          <view class="p" v-else>
	            <image src="../../static/isfalse.png" mode=""></image>非正品
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>
	
	  <view v-if="noData" class="no-data">已经触碰到我的底线啦</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    props:{
      noData:{
        type: Boolean,
        default: false
      },
      articlesList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      goDetail(item) {
        this.$isLogin(() => {
          uni.navigateTo({
            // url: '../appraisalProductReport/appraisalProductReport?type=1&id=' + item.id,
             url: '../Jddetails/Jddetails?type=1&id=' + item.id
          })
        })
      }
    },
	}
</script>

<style lang="less" scoped>
  .atricles-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40upx;
  
    .li {
      width: 333upx;
      margin-bottom: 20upx;
      background: #F8F8F8;
      border-radius: 8upx;
      overflow: hidden;
      border:2upx solid #eaeaea;
  
      .atricles-info {
        height: 130upx;
        text-align: center;
  
        .h3 {
          font-size: 32upx;
          color: #666666;
          padding: 20upx 0 12upx;
        }
  
        .p {
          font-size: 26upx;
          color: #C1C1C1;
          line-height: 40upx;
  
          &.active {
            color: #BF9F62;
          }
  
          image {
            width: 30upx;
            height: 35upx;
            vertical-align: middle;
            margin: -3upx 6upx 0 0;
          }
        }
      }
  
      .atricles-img {
        position: relative;
        width: 333upx;
        height: 333upx;
  
        image {
          width: 333upx;
          height: 333upx;
        }
  
        .p {
          position: absolute;
          left: 0;
          top: 0;
          width: 150upx;
          height: 40upx;
          background: #BF9F62;
          line-height: 40upx;
          text-align: center;
          border-radius: 0 0 16upx 0;
          .span {
            font-size: 24upx;
            color: #FFFFFF;
          }
  
          image {
            width: 20upx;
            height: 20upx;
            vertical-align: middle;
            margin-right: 3upx;
            margin-top: -3upx;
          }
        }
      }
  
    }
  }
</style>
