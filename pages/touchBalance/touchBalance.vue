<template>
  <view class="list-wrap">
    <view class="item" v-for="(item,index) in data" :key="index">
      <view class="item-text">
        <view class="item-name">{{item.name}}</view>
        <view class="item-time">{{item.time}}</view>
      </view>
      <view class="item-text">
		  <view class="num" :class="{add: item.money > 0}">{{item.money}}</view>
		  <view class="item-time">余额 {{item.balance}}</view>
	  </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        data: []
      }
    },
    onShow() {
      this.getData()
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
      getData() {
        this.$requestApi.getTouchBalance().then(res => {
          res.data.list.map(x => x.time = this.getLocalTime(x.time))
          this.data = res.data.list
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .list-wrap {
    padding: 40upx;

    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1upx solid #eeeeee;
      height: 140upx;
      align-items: center;

      .item-name {
        font-size: 32upx;
        line-height: 40upx;
        margin-bottom: 10upx;
      }

      .item-time {
        color: #999A9B;
      }

      &:last-of-type {
        border: 0;
      }

      .num {
        font-size: 40upx;
        font-weight: bold;

        &.add {
          color: #C9AB79;
        }
      }
    }
  }
</style>
