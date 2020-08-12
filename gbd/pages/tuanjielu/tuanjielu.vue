<template>
	<view>
		<view class="content">
		  <view class="lu">
		    
		  </view>
      <view class="luz">
       <button type="default" @click="gobottom">go ↓ bottom</button> 
       <button type="default" @click="gotop">go ↑ top</button>
      </view>
      <view class="lu">
        
      </view>
		</view>
    <nav-bar :navlist='navlist' :sort='sort'></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
    onLoad() {
      
    },
		methods: {
			gotop() {
        wx.pageScrollTo({
          scrollTop:0,
          duration:3000
        })
      },
      gobottom() {
        wx.pageScrollTo({
          scrollTop:2900,
          duration:3000
        })
      }
		}
	}
</script>

<style lang="less" scoped>
.content {
  width:100%;
  display:flex;
  justify-content:space-between;
  .lu {
    width:150rpx;
    height:2900rpx;
    background: linear-gradient(to bottom, #f00 0%, #000 100%);
  }
  .luz {
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:300rpx;
    height:2900rpx;
    padding:200rpx 0;
    background: linear-gradient(to bottom, #000 0%, #f00 100%);
    button {
      opacity:0.3;
    }
  }
  
}
</style>
