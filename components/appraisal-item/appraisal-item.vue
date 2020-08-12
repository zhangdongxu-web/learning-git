<template>
	<view class="jianding-list">
	  <view class="li" v-for="(item,index) in gemmologist" :key="index">
	    <navigator class="a flex" :url="'../../pages/appraisalDetail/appraisalDetail?id='+item.id">
	      <view class="jianding-tx">
	        <image :src="item.avatar" mode=""></image>
	      </view>
	      <view class="jianding-info">
	        <view class="h3 text-hidden1">{{item.nickname}}</view>
	        <view class="p text-hidden1 mb30">{{item.describe}}</view>
	        <view class="p">
	          <view class="span">总鉴别{{item.authtotal}}人</view>丨
	          <view class="span">日均鉴别{{item.daynum}}个</view>
	        </view>
	      </view>
	      <view class="css-icon icon-arrow-right"></view>
	    </navigator>
	  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
    props:{
      gemmologist: {
        type: Array,
        default: () => []
      }
    },
		created() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
  .jianding-list {
    margin-top: 40upx;
  
    .li {
      .a {
        display: flex;
        padding: 20upx 160upx 20upx 40upx;
        position: relative;
  
        .icon-arrow-right {
          position: absolute;
          right: 40upx;
          top: 50%;
          transform: translateY(-50%);
  
          &::before {
            border-color: #999999;
          }
        }
  
        &::after {
          content: '';
          position: absolute;
          width: 670upx;
          height: 1upx;
          background: #F1F1F1;
          bottom: 0;
          left: 41upx;
        }
      }
  
      .jianding-info {
        width: 350upx;
        text-align: left;
        padding-left: 28upx;
  
        .h3 {
          font-size: 32upx;
          color: #35363B;
          line-height: 40upx;
          margin-bottom: 10upx;
          font-weight: bold;
        }
  
        .p {
          color: #999A9B;
  
          .span {
            display: inline-block;
            vertical-align: top;
            color: #999A9B;
          }
        }
  
        .mb30 {
          margin-bottom: 28upx;
          color: #333333;
        }
      }
  
      .jianding-tx {
        image {
          width: 140upx;
          height: 140upx;
          border-radius: 140upx;
        }
      }
    }
  }
</style>
