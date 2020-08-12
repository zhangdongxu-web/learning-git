<template>
	<view>
		<view class="list-wrap" v-for="(item,index) in dataList" :key="index" @click="goDetail(item)">
			<view class="avatar">
				<image :src="item.avatar?item.avatar:'../../static/user_img.png'"></image>
				<block v-if="item.corner">
					<view class="readonly_no"></view>
				</block>
			</view>
			<view class="list-item">
				<view class="h1 text-hidden1">
					<text class="span">{{item.name}}</text>
					<text class="em">第{{item.noid}}个用户</text>
				</view>
				<view class="imglist" v-if="identTab == 0">
					<image mode="aspectFill" :src="ite" v-for="(ite,idx) in item.imgSmall" :key="idx" v-if="idx < 3"></image>
				</view>
				<view class="class-list text-hidden1">
					<image :src="item.imgsrc" mode=""></image>
					<text class="class-item">{{item.classItem}}</text>
					<text>{{formatTime(item.time)}}</text>
				</view>
			</view>
			<view class="list-txt" :class="{gray: state == 1 && item.istrue == 0}">
				<block v-if="state == 1 && item.istrue == 1">
					<view class="em-icon"></view>正品
				</block>
				<block v-if="state == 1 && item.istrue == 0">
					<view class="em-icon"></view>伪品
				</block>
				<block v-if="state == 3 && auth == 0">待鉴定</block>
				<block v-if="state == 3 && auth == 1">鉴定中</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			identTab: {
				type: Number,
				default: () => 0
			},
			state: {
				type: Number,
				default: () => 2
			},
			auth: {
				type: String,
				default: () => ""
			},
			dataList: {
				type: Array,
				default: () => []
			}
		},
		created() {

		},
		methods: {
			goDetail(item) {
				if (this.state == 1 && this.identTab == 1) {
					uni.navigateTo({
						url: "../appraisalReport/appraisalReport?id=" + item.id
					})
				} else if (this.state == 1 && this.identTab == 0) {
					uni.navigateTo({
						url: "../IdentRoom/IdentRoom2?id=" + item.id + "&&type=" + this.state + "&&auth=" + this.auth + "&&identTab=" +
							this.identTab
					})
					// uni.navigateTo({
					//   url: "../appraisalProductReport/appraisalProductReport?type=0&&id=" + item.id
					// })
				} else {
					console.log('list', this.state, this.identTab, this.auth)
					if (this.identTab != 1) {
						uni.navigateTo({
							url: "../IdentRoom/IdentRoom?id=" + item.id + "&&type=" + this.state + "&&auth=" + this.auth + "&&identTab=" +
								this.identTab
						})
					} else {
						uni.navigateTo({
							url: "../onlineAppraisalDetail/onlineAppraisalDetail?id=" + item.id + "&&type=" + this.state + "&&auth=" +
								this.auth + "&&identTab=" + this.identTab
						})
					}
				}
			},
			formatTime(timeStr) {
				var time = new Date(timeStr * 1000);

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

			}
		}
	}
</script>

<style lang="less" scoped>
	.list-wrap {
		display: flex;
		justify-content: space-between;
		margin: 0 40upx;
		padding: 50upx 0 30upx;
		border-bottom: 1upx solid #EEE;

		.class-list {
			color: #999A9B;
			font-size: 28upx;
			width: 500upx;

			image {
				width: 30upx;
				height: 30upx;
				vertical-align: middle;
				margin: -3upx 10upx 0 0;
			}

			.class-item {
				margin-right: 20upx;
			}
		}

		.em-icon {
			display: inline-block;
			vertical-align: middle;
			margin: -3upx 16upx 0 0;
			width: 30upx;
			height: 35upx;
			background: url(../../static/istrue.png) no-repeat center;
			background-size: cover;
		}

		.list-txt {
			font-size: 28upx;
			color: #C9AB79;
			line-height: 45upx;

			&.gray {
				filter: gray;
				-webkit-filter: grayscale(100%);
			}
		}

		.list-item {
			width: 400upx;
			flex: 1;
			margin: 0 30upx;

			.imglist {
				display: flex;
				margin-bottom: 20upx;

				image {
					width: 120upx;
					height: 120upx;
					border-radius: 8upx;
					margin-right: 16upx;
				}
			}

			.h1 {
				line-height: 45upx;
				margin-bottom: 12upx;

				.span {
					font-size: 32upx;
					font-weight: bold;
					color: #35363B;
					margin-right: 10upx;
				}

				.em {
					font-size: 28upx;
					color: #999A9B;
				}
			}
		}

		.avatar {
			width: 100upx;
			height: 100upx;
			border-radius: 100upx;
			position: relative;

			.readonly_no {
				width: 14upx;
				height: 14upx;
				background: #F13939;
				border-radius: 50%;
				position: absolute;
				top: -3upx;
				right: -3upx;
			}

			image {
				width: 100%;
				height: 100%;
				border-radius: 100upx;
			}
		}
	}
</style>
