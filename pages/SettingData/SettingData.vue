<template>
	<view>
		<view class="list">
			<navigator hover-class="none" url="../personalData/personalData">
			<view class="list-item">
				<view class="list-item-title">个人资料</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator>
			<navigator hover-class="none" url="../addAdress/addAdress?type=1">
			<view class="list-item">
				<view class="list-item-title">地址管理</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator>
			<!-- <navigator hover-class="none"  url="../updatePassword/updatePassword">
			<view class="list-item">
				<view class="list-item-title">修改密码</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator> -->
			<navigator hover-class="none">
			<view class="list-item" @click="aaaa()">
				<view class="list-item-title">关于包铺</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator>
			
			<navigator hover-class="none">
			<view class="list-item" @click="auth()">
				<view class="list-item-title">授权消息通知</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator>
			<!-- <navigator hover-class="none">
			<view class="list-item" @click="getVersion()">
				<view class="list-item-title">版本号</view>
				<view class="css-icon icon-arrow-right"></view>
			</view>
			</navigator> -->
		</view>
		<view class="fixed_btn">
			<view class="button" @click="exitUser">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
				openid:''
			};
		},
		onShow() {
			this.getuserinfo();
			
		},
    methods:{
		getuserinfo(){
			this.$requestApi.getopenid().then(res => {
				this.openid = res.data
				if(!this.openid){
					let that = this;
					wx.login({
						success(res) {
							that.code = res.code;
							that.$requestApi.saveopenid({code:that.code}).then(res=>{
								console.log('wx.login',res);
							});
						}
					})
				}
			})
		},
	  aaaa(){
		  uni.navigateTo({
		    url: "../aaaa/aaaa"
		  })
	  },
	  auth(){
		  wx.getSetting({
			  withSubscriptions: true,
			  success(res){
				  let setinfo = res.subscriptionsSetting;
				  if(!setinfo.mainSwitch){
					  uni.showModal({
						  title:'提示',
						  content:'授权时请勾选总是保持以上选择，否则只能接收到一条数据',
						  showCancel:false,
					  })
				  }
				  wx.requestSubscribeMessage({
				    tmplIds: ['OkcKfDcOjrVi9P5_5wtD_b13c1y6oRBsSLTO8SCs1Cs','U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU'],
				    success (res) { 
				  				if(res['OkcKfDcOjrVi9P5_5wtD_b13c1y6oRBsSLTO8SCs1Cs']!='accept' || res['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU']!='accept'){
									uni.showModal({
										title:'提示',
										content:'请允许消息通知，否则接收不到消息提醒'
									})
								}
				  			},
				  			fail(res){
				  				console.log(res,'fail')
				  			},
				  }); 
			  }
		  })
		  
	  },
      getVersion(){
        uni.showModal({
          title: '提示',
          content: '当前版本号：1.0.0',
          showCancel: false
        })
      },
      exitUser(){
        uni.showModal({
          title: "提示",
          content: "确定要退出吗？",
          success: (res) => {
            if(!res.cancel){
              uni.clearStorage()
              uni.switchTab({
                url: "../index/index"
              })
            }
          }
        })
      }
    }
	}
</script>

<style lang="less" scoped>
.list{
	padding:0 40rpx;
	.list-item{
		display:flex;
		justify-content:space-between;
		align-items:center;
		height:140rpx;
		border-bottom:0.1rpx solid #EEEEEE;
		.list-item-title{
			font-size:32rpx;
			font-weight:bold;
			color:#30313B;
		}
		.icon-arrow-right{
			color:#C1C1C1;
		}
	}
}
.fixed_btn{
	position:fixed;
	bottom:60rpx;
	width:100%;
	padding:0 30rpx;
	box-sizing:border-box;
	.button{
		height:100rpx;
		border-radius:10rpx;
		line-height:100rpx;
		text-align:center;
		background:#000000;
		font-size:32rpx;
		color:#D5BD94;
	}
}
</style>
