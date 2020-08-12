<template>
	<view>
    <appraisal-item :gemmologist="gemmologist"></appraisal-item>
    <view class="no-data">已经触碰到我的底线啦</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gemmologist: []
			}
		},
    onShow() {
      this.$requestApi.getGemmologist().then(res => {
        console.log(res);
        this.gemmologist = res.data.list
      })
    },
		methods: {
			
		}
	}
</script>

<style>

</style>
