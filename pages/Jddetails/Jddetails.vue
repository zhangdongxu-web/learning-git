<template>
	<view class="detail" v-if="loadings">
		<view class="navTitle">
			<view class="h">鉴定报告</view>
			<view class="t">
				<text>第{{info.noid}}号·</text>
				<text>{{info.mode}}·</text>
				<text>{{info.name}}·</text>
				<!-- <text>箱包</text> -->
			</view>
		</view>
		<view class="box">
			<view class="bigBox" v-for="(item,index) in list" :key="index">
				<view class="img">


					<view v-if="item.flag" class="picImage">
						<image :src="item.image" mode="aspectFit" @click="$previewImage(item.image)" alt=""></image>
						<view class="picNumber">
							<text>{{index+1}}</text><text class="one">/{{list.length}}</text><text class="name"> {{item.name}}</text>
						</view>
					</view>

					<view v-else class="flex">
						<image class="image" :src="item.image" mode="aspectFit"></image>
						<view class="playMoney" @click="scorepay">
							<image src="../../static/jiesuo.png"></image>
							<view class="title">解锁全部细节</view>
							<view class="title">30积分</view>
						</view>
						<view class="picNumber">
							<text>{{index+1}}</text><text class="one">/{{list.length}}</text><text class="name"> {{item.name}}</text>
						</view>
					</view>


				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				type: "",
				id: "",
				list: [],
				info: {},
				flag: true,
        loadings:false,
			}
		},
		onLoad(option) {
			console.log(option)
			this.type = option.type;
			this.id = option.id;
      uni.showLoading({  
          title: '加载中'  
      });
		},
		onShow() {
			this.goodsinfo();
		},
		methods: {
			//鉴定物展示
			goodsinfo() {
				console.log(123123123)
				let params = {
					token: uni.getStorageSync('token'),
					id: this.id,
				}
				this.$requestApi.goodsinfo(params).then((res) => {
					// console.log(res);
					// res.data.list.unshift({
					// 	name: "鉴定报告",
					// 	image: "http://wxhf.var365.cn/uploads/20190904/f3ae8b1d0ab6f1bac4b928de61ddd141.png",
					// },
     //      {
					// 	name: "234",
					// 	image: "http://wxhf.var365.cn/uploads/20190904/3a33d7bc5a84adf9065b5849bf52ed80.png",
					// }, {
					// 	name: "345",
					// 	image: "http://wxhf.var365.cn/uploads/20190904/f3ae8b1d0ab6f1bac4b928de61ddd141.png",
					// }, 
          //)
					if (res.data.info.isunlock == false) {
						// console.log(232323)
						res.data.list.map((val, index) => {
							if (index > 2) {
								val.flag = false;
							} else {
								val.flag = true;
							}
						})
					} else {
						// console.log(8989898)
						res.data.list.map((val, index) => {
							val.flag = true;
						})

					}
					// this.list.map((val,ind)=>{
					//      val.flag = true;
					//      if(ind>2){
					//        if(res.data.info.isunlock == false){
					//          val.flag = false;
					//          console.log(2222)
					//        }else{
					//          val.flag = true;
					//          console.log(33333)
					//        }
					//      }
					// })
					this.list = res.data.list;
					this.info = res.data.info;
          uni.hideLoading();
          this.loadings = true;

					// console.log(this.list, 'listlist');
				})
			},
			//支付功能
			scorepay(e) {
				let that = this;
				uni.showModal({
					title: '解锁',
					content: '支付30积分解锁细节',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							let params = {
								token: uni.getStorageSync('token'),
								score: '30'
							};
							that.$requestApi.unlockscore(params).then((res) => {
								console.log(res, '5443554')
								if (res.code == 1000) {
									uni.showToast({
										icon: "none",
										title: "正在支付",
										position: "bottom",
									})
									var id = that.id;
									var token = uni.getStorageSync('token');
									// let that = this;
									uni.request({
										url: 'https://www.bopo.com/api/packageuser/unlock',
										data: {
											id,
											token
										},
										header: {
											'content-type': 'application/x-www-form-urlencoded',
											'token': uni.getStorageSync("token")
										},
										method: 'post',
										success(res) {
											console.log(res, 'resres')
											if (res.data.code == 1000) {
												uni.showToast({
													title: "支付成功",
													duration: 1500,
												});
												that.goodsinfo();
											}
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.detail {
		width: 100%;
		height: 100%;

		.navTitle {
			width: 90%;
			height: 80upx;
			// background: pink;
			padding: 30upx 0 30upx 30upx;

			.h {
				font: 36upx/50upx '微软雅黑';
				color: #202022;
			}

			.t text {
				font: 25upx/40upx '微软雅黑';
				color: #999A9B;
			}
		}

		.box {
			width: 90%;
			height: 1040upx;
			margin: 10upx auto 50upx;
			padding: 20upx 0;
			white-space: nowrap;
			/*文本不会换行，文本会在在同一行上继续*/
			overflow-x: auto;

			/*可滑动*/
			.bigBox {
				width: 84%;
				height: 92%;
				background: #fff;
				display: inline-block;
				margin-right: 10px;
				border: 16rpx solid #e6e6e6;
				vertical-align: top;
				.name {margin-left:20upx;}
				.img {
					width: 100%;
					height: 100%;

					.picImage {
						width: 100%;
						height: 100%;
						position: relative;

						image {
							display: inline-block;
							width: 100%;
							height: 100%;
							object-fit: cover;
						}

						.picNumber {
							border-radius: 20upx;
							padding:0 20upx;
							height: 80upx;
							position: absolute;
							left: 0;
							bottom: 0;
							font: 35upx/80upx '微软雅黑';
							color: #666;
						}
					}

					.flex {
						width: 100%;
						height: 100%;
						position: relative;

						.image {
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							filter: blur(6px)
						}

						.playMoney {
							width: 230rpx;
							height: 170rpx;
							left: 50%;
							top: 50%;
							position: absolute;
							border: 1px dashed #fff;
							background: rgba(0, 0, 0, 0.2);
							margin-left: -115rpx;
							margin-top: -115rpx;
							text-align: center;
							padding: 30rpx 0;

							image {
								display: block;
								margin: 10rpx auto;
								width: 34rpx;
								height: 36rpx;
							}

							.title {
								font: 28rpx/40rpx '微软雅黑';
								color: #fff;
							}
						}

						.picNumber {
							border-radius: 20upx;
							padding:0 20upx;
							height: 80upx;
							position: absolute;
							left: 0;
							bottom: 0;
							font: 35upx/80upx '微软雅黑';
							color: #666;
						}
					}
				}
			}
		}
	}
</style>
