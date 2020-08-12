<template>
	<view>
		<view class="number-wrap">
			<view>
				<view class="num-wrap">{{data.value}}</view>
				<view class="num-text">{{data.name}}</view>
			</view>
			<view class="time-wrap" @click="openPopup">
				<text>{{time}}</text>
				<view class="css-icon icon-arrow-right"></view>
			</view>
		</view>
		<view v-if="loading">
			<u-echarts :opts="opts"></u-echarts>
		</view>
		<cover-view v-if="converShow" class="num-mask-pipup">
			<cover-view class="mask-center">
				<cover-view class="maskRadioItem" @click="radioChange(0)">
					<cover-image class="mask-ico" :src="maskRadio" v-if="isRadio!=0"></cover-image>
					<cover-image class="mask-ico" :src="maskChecked" v-if="isRadio==0"></cover-image>
					<cover-view class="mask-text">1天</cover-view>
				</cover-view>
				<cover-view class="maskRadioItem" @click="radioChange(1)">
					<cover-image class="mask-ico" :src="maskRadio" v-if="isRadio!=1"></cover-image>
					<cover-image class="mask-ico" :src="maskChecked" v-if="isRadio==1"></cover-image>
					<cover-view class="mask-text">7天</cover-view>
				</cover-view>
				<cover-view class="maskRadioItem" @click="radioChange(2)">
					<cover-image class="mask-ico" :src="maskRadio" v-if="isRadio!=2"></cover-image>
					<cover-image class="mask-ico" :src="maskChecked" v-if="isRadio==2"></cover-image>
					<cover-view class="mask-text">30天</cover-view>
				</cover-view>
				<cover-view class="maskRadioItem" @click="radioChange(3)">
					<cover-image class="mask-ico" :src="maskRadio" v-if="isRadio!=3"></cover-image>
					<cover-image class="mask-ico" :src="maskChecked" v-if="isRadio==3"></cover-image>
					<cover-view class="mask-text">全部</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
		<!-- <uni-popup ref="popup" type="center" :custom="true" :maskClick="true">		
    	<view class="ident_popup">
    		<view class="genter">
    			选择时间
    		</view>
    		<radio-group @change="radioChange">
    			<view class="radio_view">
    				<label class="radio" >
    					<radio value="0" :checked="isRadio==0" />
    					<text>1天</text>
    				</label>
    			</view>
    			<view class="radio_view">
    				<label class="radio" >
    					<radio value="1" :checked="isRadio==1"/>
    					<text>7天</text>
    				</label>
    			</view>
          <view class="radio_view">
          	<label class="radio" >
          		<radio value="2" :checked="isRadio==2" />
          		<text>30天</text>
          	</label>
          </view>
          <view class="radio_view">
          	<label class="radio" >
          		<radio value="3" :checked="isRadio==3" />
          		<text>全部</text>
          	</label>
          </view>
    		</radio-group>
    	</view>
    </uni-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				converShow: false,
				maskRadio: '../../static/radio_h.png',
				maskChecked: '../../static/radio_02.png',
				time: "30天",
				times: ['1天', '7天', '30天', '全部'],
				isRadio: 2,
				opts: {
					// "categories": ["箱包", "口红", "袜子", "鞋履"],
					// "series": [{
					//   "name": "成交量",
					//   "data": [{
					//     "value": 20,
					//     "color": "#E5E5E5"
					//   }, {
					//     "value": 30,
					//     "color": "#E5E5E5"
					//   }, {
					//     "value": 40,
					//     "color": "#E5E5E5"
					//   }, {
					//     "value": 20,
					//     "color": "#E5E5E5"
					//   }]
					// }],
					// scrollShow: false
				},
				type: 1,
				data: {},
				title: ['鉴定品类统计', '鉴定方式统计', '鉴定真品伪品统计'],
			}
		},
		onLoad(option) {
			this.type = option.type
			uni.$on('updateChart', (res) => {
				this.data = res
			})
			uni.setNavigationBarTitle({
				title: this.title[this.type - 1]
			})
		},
		onUnload() {
			uni.$off('updateChart');
		},
		onShow() {
			this.getOpt()
		},
		methods: {
			getOpt() {
				let parmas = {
					day: 1
				}
				switch (parseInt(this.isRadio)) {
					case 0:
						parmas.day = 1
						break;
					case 1:
						parmas.day = 7
						break;
					case 2:
						parmas.day = 30
						break;
					default:
						parmas.day = 'all'
						break;
				}
				if (this.type == 1) {
					this.$requestApi.genretotal(parmas).then(res => {
						this.loading = true
						res.data.opts['scrollShow'] = false
						res.data.opts.series = [res.data.opts.series]
						res.data.opts.series.filter(x => x['color'] = '#e5e5e5')
						this.opts = res.data.opts
						this.$set(this.opts, 'series', res.data.opts.series)
						this.data = {
							name: this.opts.categories[0],
							value: '-'
						}
					})
				} else if (this.type == 2) {
					this.$requestApi.modetotal(parmas).then(res => {
						this.loading = true
						res.data.opts['scrollShow'] = false
						res.data.opts.series = [res.data.opts.series]
						res.data.opts.series.filter(x => x['color'] = '#e5e5e5')
						this.opts = res.data.opts
						this.$set(this.opts, 'series', res.data.opts.series)
						this.data = {
							name: this.opts.categories[0],
							value: '-'
						}
					})
				} else if (this.type == 3) {
					this.$requestApi.resulttotal(parmas).then(res => {
						this.loading = true
						res.data.opts['scrollShow'] = false
						res.data.opts.series = [res.data.opts.series]
						res.data.opts.series.filter(x => x['color'] = '#e5e5e5')
						this.opts = res.data.opts
						this.$set(this.opts, 'series', res.data.opts.series)
						this.data = {
							name: this.opts.categories[0],
							value: '-'
						}
					})
				}
			},
			radioChange(val) {
				this.isRadio = val
				this.time = this.times[val]
				//this.$refs.popup.close()
				this.converShow = false
				this.getOpt()
			},
			openPopup() {
				//this.$refs.popup.open()
				this.converShow = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.ident_popup {
		width: 300rpx;
		padding: 20rpx;
		text-align: center;
		margin: 0 auto;
		background: #FFFFFF;

		.genter {
			font-size: 32rpx;
			margin: 20rpx 0;
		}

		.radio_view {
			padding-bottom: 20rpx;

			.radio {
				display: flex;
				justify-content: space-between;
				padding: 0 70upx;
				align-items: center;
			}

			text {
				margin-left: 30rpx;
			}
		}
	}

	.time-wrap {
		height: 70upx;
		line-height: 70upx;
		background: #F8F8F8;
		border-radius: 8upx;
		padding: 0 20upx;
		font-size: 32upx;
		font-weight: bold;
		color: #C9AB79;

		.icon-arrow-right {
			&::before {
				border-color: #C9AB79;
				transform: rotate(-135deg);
				margin-top: -12upx;
				border-width: 4upx 0 0 4upx;
			}
		}
	}

	.number-wrap {
		padding: 30upx 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.num-wrap {
			color: #C9AB79;
			font-size: 80upx;
			font-weight: bold;
			line-height: 110upx;
		}

		.num-text {
			font-size: 28upx;
			font-weight: bold;
			color: #35363B;
		}
	}

	.num-mask-pipup {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;

		.mask-center {
			height: 240upx;
			width: 300upx;
			padding: 10upx;
			border-radius: 5upx;
			background-color: #FFFFFF;
		}

		.maskRadioItem {
			height: 40upx;
			padding: 10upx 5upx;
			margin: 0 50upx;			

			.mask-ico {
				width: 40upx;
				height: 40upx;
				display: inline-block;
				margin-right: 20upx;
				vertical-align: top;
			}
			
			.mask-text {
				display:inline-block;
				line-height: 40upx;
				font-size: 28upx;
				font-weight: bold;
				vertical-align: top;
			}
		}
	}
</style>
