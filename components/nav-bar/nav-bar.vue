<template>
	<view class="footer-nav" :class="{nocircle: !sort,home: sort}" @catchtouchmove="move">
		<view class="nav_item" :class="{active: index == now_page_index}" @click="change_page(item,index)" :url="item.path"
		 v-for="(item,index) in navlists" :key="index">
			<view class="image" :style="{background: 'url('+item.url+') no-repeat center',backgroundSize: 'contain'}"></view>
			{{item.name}}
		</view>
		<view v-if="sort" @click="onlineDetail" class="nav_mid"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				now_page_index: getApp().globalData.now_page_index,
			}
		},
		computed: {
			navlists() {
				this.navlist.forEach((x, y) => {
					x['url'] = y == this.now_page_index ? x.selectedIconPath : x.iconPath
				})
				return this.navlist
			}
		},
		props: {
			navlist: {
				type: Array,
				default: () => []
			},
			sort: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			move:function(){},
			onlineDetail() {
				this.$isLogin(() => {
					uni.navigateTo({
						url: "../onlineappraisal/onlineappraisal"
					})
				})
			},
			change_page(item, index) {
				console.log(item,index);
				getApp().globalData.now_page_index = index
				this.$isLogin(() => {
					uni.switchTab({
						url: item.path
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer-nav {
		position: fixed;
		width: 100%;
		height: 133upx;
		bottom: 0;
		left: 0;
		z-index: 99;
		background: url(../../static/navbar_bg.png) no-repeat center;
		background-size: cover;
		display: flex;
		justify-content: space-between;

		.nav_item {
			flex: .5;
			text-align: center;
			font-size: 20upx;
			line-height: 1;
			padding-top: 35upx;
			color: #c1c1c1;

			&.active {
				color: #202022;
			}
		}

		&.nocircle {
			height: 100upx;
			background: #FFFFFF;
			box-shadow: 0px -1px 0px rgba(229, 229, 229, 1);

			.nav_item {
				padding-top: 8upx;
			}
		}

		.image {
			display: block;
			width: 55upx;
			height: 52upx;
			margin: 0 auto 7upx;
		}

		image {
			display: block;
			width: 52upx;
			height: 52upx;
			margin: 0 auto 7upx;
		}

		.nav_mid {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -50upx;
			margin-top: -50upx;
			width: 100upx;
			height: 100upx;
			background: url(../../static/nav_mid.png) no-repeat center;
			background-size: cover;
		}

		&.home {
			.nav_item {
				flex: .44;
			}
		}
	}
</style>
