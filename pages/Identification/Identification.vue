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
		<!-- 鉴定列表 -->
		<view class="ident_list" v-show="identTab == 0">
			<view class="ident_list_item" v-for="(item) in goodsList" :hover-class="none" :key="item.id" @click="gotoAppraisal(item,0)">
				<view class="ident_list_item_l">
					<view class="ident_goods_image">
						<image :src="item.brand"></image>
						<block v-if="item.corner">
							<view class="readonly_no"></view>
						</block>
					</view>
					<view class="ident_goods_text">
						<view class="ident_goods_text_t">
							<text class="title">第{{item.noid}}号</text>
							<image src="../../static/wjx.png"></image>
							<text class="ident_num">{{item.mode}}</text>
						</view>
						<view class="ident_goods_text_b">
							<text class="time">日期: {{item.time}}</text>
						</view>
					</view>

				</view>
				<view class="ident_list_item_r">
					<view class="ident_list_item_r_img">
						<image :src="item.genre"></image>
					</view>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<view class="no-data">已经触碰到我的底线啦</view>
		</view>
		<!-- 实物鉴定列表 -->
		<view class="ident_list" v-show="identTab == 1">
			<view class="ident_list_item" v-for="(item) in goodsList" :hover-class="none" :key="item.id" @click="gotoAppraisal(item,1)">
				<view class="ident_list_item_l">
					<view class="ident_goods_image">
						<image :src="item.brand"></image>
						<block v-if="item.corner">
							<view class="readonly_no"></view>
						</block>
					</view>
					<view class="ident_goods_text">
						<view class="ident_goods_text_t">
							<text class="title">第{{item.noid}}号</text>
						</view>
						<view class="ident_goods_text_b">
							<text class="time">日期: {{item.time}}</text>
						</view>
					</view>

				</view>
				<view class="ident_list_item_r">
					<view class="ident_list_item_r_img">
						<image :src="item.genre"></image>
					</view>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<view class="no-data">已经触碰到我的底线啦</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				identTab: 0,
				goodsList: [],
			}
		},
		onLoad(option) {
			this.type = option.type
			if (this.type == 0) {
				uni.setNavigationBarTitle({
					title: "鉴定中"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "鉴定报告"
				})
			}
		},
		onShow() {
			if (this.type == 0) {
				this.getGoodsList(this.identTab)
			} else {
				this.succList(this.identTab)
			}
		},
		methods: {
			getLocalTime(dataStr) {
				var time = new Date(dataStr * 1000);

				function timeAdd0(str) {
					if (str < 10) {
						str = '0' + str;
					}
					return str
				}
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
			},
			// tab切换
			tabChange(event) {
				this.identTab = event;
				if (this.type == 0) {
					this.getGoodsList(event);
				} else {
					this.succList(event)
				}

			},
			// 去商品详情
			gotoAppraisal(item, i) {
				if (item.channel == true && item.write == 1) {
					uni.navigateTo({
						url: '../appraisalRoom/appraisalRoom?id=' + item.id
					})
				} else {
					console.log(item)
					//return
					if (this.type == 0) {
						if (item.write==1 && i == 0) {
							//console.log(11111111111)
							uni.navigateTo({
								// url: '../appraisalRoom/appraisalRoom?id=' + item.id,
								//物品描述路径修改
								url: `../purchase/purchase?id=${item.id}&auth=${item.auth}&type=${item.type}&identTab=${item.identTab}`,
			
							})
						} else if (i == 0) {
							uni.navigateTo({
								url: `../IdentRoom/IdentRoom?id=${item.id}&auth=${item.auth}&type=${item.type}&identTab=${item.identTab}`,
			
							})
						} else if (i == 1) {
							uni.navigateTo({
								url: `../physicalIdentification/physicalIdentification?type=0&id=${item.id}`
							})
						}
					} else {
						if (i == 0) {
							uni.navigateTo({
								url: "../IdentRoom/IdentRoom2?id=" + item.id + "&&type=" + item.type + "&&auth=" + item.auth + "&&identTab=" +
									item.identTab
							})
							// uni.navigateTo({
							//   url: '/pages/appraisalProductReport/appraisalProductReport?id=' + item.id
							// })
			
						} else {
							// uni.navigateTo({
							// 	url: '../appraisalProductReport/appraisalProductReport?id=' + item.id
							// })
							uni.navigateTo({
								url: `../physicalIdentification/physicalIdentification?type=1&id=${item.id}`
							})
			// 				uni.navigateTo({
			// 				  url: '../appraisalReport/appraisalReport?id=' + item.id
			
			// 				})
						}
					}
				}
			},
			//获取商品列表在线 0 在线 1 实物
			getGoodsList(type) {
				if (type == 0) {
					this.$requestApi.onlinelist().then(res => {
						console.log(res, '88888888');
						res.data.list.map(x => x.time = this.getLocalTime(x.time))
						this.goodsList = res.data.list
					})
				} else {
					this.$requestApi.goodslist().then(res => {
						res.data.list.map(x => x.time = this.getLocalTime(x.time))
						this.goodsList = res.data.list
					})
				}
			},
			succList(type) {
				if (type == 0) {
					this.$requestApi.onlinereportlist().then(res => {
						res.data.list.map(x => x.time = this.getLocalTime(x.time))
						this.goodsList = res.data.list
					})
				} else {
					this.$requestApi.goodsreportlist().then(res => {
						res.data.list.map(x => x.time = this.getLocalTime(x.time))
						this.goodsList = res.data.list
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.ident_tab {
		display: flex;
		height: 120upx;
		border-bottom: 0.5upx solid #eeeeee;
		border-right: none;
		border-left: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 99;

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

	.ident_list {
		padding: 0 40upx;
		padding-top: 140upx;

		.ident_list_item {
			border-bottom: 1px solid #eeeeee;
			height: 220upx;
			padding: 40upx 0;
			box-sizing: border-box;
			display: flex;
			align-content: center;

			.ident_list_item_l {
				width: 80%;
				display: flex;

				.ident_goods_image {
					position: relative;

					image {
						width: 120upx;
						height: 120upx;
					}

					.readonly_no {
						width: 14upx;
						height: 14upx;
						background: #F13939;
						border-radius: 50%;
						position: absolute;
						top: -3upx;
						right: -3upx;
					}
				}

				.ident_goods_text {
					flex: 1;
					font-weight: bold;
					margin-left: 20upx;

					.ident_goods_text_t {
						font-size: 32upx;
						font-weight: bold;
						padding-top: 10upx;
						padding-bottom: 30upx;

						.title {
							color: #202022;
							vertical-align: middle;
						}

						.ident_num {
							color: #BE9F62;
							vertical-align: middle;
						}

						image {
							width: 30upx;
							height: 30upx;
							vertical-align: middle;
							margin-left: 15upx;
						}
					}
				}

				.ident_goods_text_b {
					.time {
						color: #999999;
						font-size: 28upx;
					}
				}
			}

			.ident_list_item_r {
				width: 20%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.ident_list_item_r_img {
					width: 60upx;
					height: 60upx;
					background: #F5F5F5;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20upx;

					image {
						width: 32upx;
						height: 32upx;
					}
				}
			}
		}
	}
</style>
