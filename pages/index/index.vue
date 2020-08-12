<template>
	<view class="content" >
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" @click="gomessage">{{title}}</text>
		</view>
    <nav-bar></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '刷屏时代',
        
			}
		},
		onLoad() {
      
    uni.hideTabBar();   // 隐藏原声  navbar-
    // let menuButtonInfo = uni.getMenuButtonBoundingClientRect();   // 获取小球胶囊的位置信息
    // console.log(menuButtonInfo)
		},
		methods: {
    gomessage() {
      uni.navigateTo({
        animationType:"zoom-fade-out",
        url:'../animation/animation'
      })
      
    }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
    background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592210400506&di=ccbeae10530307747f9144188c26e3ca&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg');
    width:100%;
    height:100vh;
    background-repeat:no-repeat;
    background-size:100% 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 88rpx;
		color: #fff;
	}
</style>
