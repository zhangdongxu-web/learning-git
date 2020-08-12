<template>
	<view class="physicall">
		<view class="mail_message">
			<view class="mail_message_item mail_message_title">
				寄出信息
			</view>
			<view class="mail_message_item">
				<view class="mail_message_item_title">
					订单号
				</view>
				<view>
					{{ication.to.noid}}
				</view>
			</view>
			<view class="mail_message_item">
				<view class="mail_message_item_title">
					品牌种类
				</view>
				<view>
					{{ication.to.name}}
				</view>
			</view>
			<view class="mail_message_item">
				<view class="mail_message_item_title">
					快递单号
				</view>
				<view>
          {{ication.to.courierid}}
				</view>
			</view>
			<view class="mail_message_list">
				<view class="mail_message_list_item">
					<image :src="ication.to.images[0]"></image>
					<view>实物图片</view>
				</view>
				<view class="mail_message_list_item">
					<image :src="ication.to.images[1]"></image>
					<view>包裹图片</view>
				</view>
				<view class="mail_message_list_item">
					<image :src="ication.to.images[2]"></image>
					<view>订单图片</view>
				</view>
			</view>
		</view>
		<view class="mail_message" v-if="type==1">
			<view class="mail_message_item mail_message_title">
				鉴定报告
			</view>
			<view class="imglistbox">
				<view class="imglist" v-for="(item,index) in imglist" :key="index">
				<image :src="item" mode="aspectFit" @click="$previewImage(item)"></image>
				</view>
			</view>
		</view>
		<view class="mail_message">
			<view class="mail_message_item mail_message_title">
				开箱信息
			</view>
			<view class="mail_message_list">
				<view class="mail_message_list_item">
					<video id="myVideo" @play="play" :direction="90" :src="ication.open.video">
					</video>
					<view>开箱视频</view>
				</view>
			</view>
		</view>
		
		<view class="mail_message">
			<view class="mail_message_item mail_message_title">
				回邮信息
			</view>
			<view class="mail_message_item">
				<view class="mail_message_item_title">
					快递公司
				</view>
				<view>
					{{ication.back.company}}
				</view>
			</view>
			<view class="mail_message_item">
				<view class="mail_message_item_title">
					快递单号
				</view>
				<view>
					{{ication.back.courierid}}
				</view>
			</view>
			<view class="mail_message_list">
				<view class="mail_message_list_item">
					<video id="myVideo" @play="play" :direction="90" :src="ication.back.video"></video>
					<view>封箱视频</view>
				</view>
        <view class="mail_message_list_item">
        	<image :src="ication.back.goodsimg"></image>
        	<view>实物图片</view>
        </view>
        <view class="mail_message_list_item">
        	<image :src="ication.back.orderimg"></image>
        	<view>订单图片</view>
        </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				danmuValue: '',
				id: '',
				type:'',
				ication: '',
				imglist:[]
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
    onLoad(option) {
      this.id = option.id
	  this.type = option.type
    },
    onShow() {
		uni.showLoading({
			title:'加载中',
			mask:true
		})
      this.getData()
    },
		methods:{
      getData(){
        let params = {
          id: this.id
        }
        this.$requestApi.mygoodsinfo(params).then(res => {
          this.ication = res.data.info
		  setTimeout(()=>{
			  uni.hideLoading()
		  },500)
        })
		if(this.type==1){
			this.$requestApi.goodsOver(params).then(res => {
				this.imglist.push(res.data.report)
			})
		}
      },
			play() {
				this.videoContext.requestFullScreen()
			}
		}
	}
</script>

<style lang="less" scoped>
.physicall{
	padding:30rpx;
	
	.mail_message{
		padding:30rpx;
		box-sizing:border-box;
		width:100%;
		background:#FFFFFF;
		box-shadow:0rpx 10rpx 30rpx rgba(0,0,0,0.09);
		border-radius:8rpx;
		margin-bottom:30rpx;
				
		.mail_message_item{
			height:100rpx;
			display:flex;
			justify-content:space-between;
			align-items:center;
			font-size:28rpx;
			color:#636365;
			border-bottom:0.1rpx solid #dddddd;
			
			.mail_message_item_title{
				color:#333333;
			}
		}
		
		.mail_message_title{
			font-size:32rpx;
			font-weight:bold;
			line-height:41px;
			color:#333333;
		}
		.mail_message_list{
			display:flex;
			width:100%;
			padding:50rpx 0;
			
			video{
				width:100%;
				height:140rpx;
			}
			
			.mail_message_list_item{
				border-radius:6rpx;
				width:30%;
				height:140rpx;
				margin-right:3%;
				text-align:center;
				
				image{
					width:100%;
					height:140rpx;
				}
				
				view{
					font-size:24rpx;
					padding-top:20rpx;
					color:#666666;
				}
			}
			
		}
		.imglistbox {
			height:620upx;
			white-space: nowrap;
			overflow-y:auto;
			.imglist {
				position: relative;
				width: 100%;
				height: 620upx;
				margin-bottom: 20upx;
				margin-right:10upx;
				display:inline-block;
		
				image {
					width: 100%;
					height: 100%;
				}
		
				.span {
					position: absolute;
					left: 40upx;
					bottom: 30upx;
					color: #FFFFFF;
					font-size: 32upx;
					font-weight: bold;
					background: rgba(0, 0, 0, .4);
				}
			}
		}
	}
}


</style>
