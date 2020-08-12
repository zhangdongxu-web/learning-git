<template>
  <view class="bubble-countw">
    <view class="message-item" :class="{mine: item.state,hide : index != 0,black: item.appraisal}" v-for="(item,index) in data" :key="index">
      <!-- state = 0 包铺 state = 1 用户 -->
      <image v-if="!item.state" src="../../static/kefu.png" mode=""></image>
      <image v-else src="../../static/own.png" mode=""></image>
      <view class="bubble-wrap">

        <!-- 文字 -->
        <view class="bubble-text" :class="{white: item.state}">
          <view class="circle-wrap" v-if="item.isshow"><image :src="item.image" mode=""></image></view>
          <text>{{item.txt}}</text>
        </view>

        <!-- 品类 -->
        <view class="class-list" v-if="index == 0 && item.classList.length > 0">
          <view class="li" v-for="(ite,idx) in item.classList" :key="idx" @click="choseClass(ite)">
            <view class="p">
              <image :src="ite.image"></image><br>{{ite.name}}
            </view>
          </view>
        </view>

        <!-- 选择品牌 -->
        <view class="choseBrand" @click="choseBrand" v-if="item.choseBrand">
          <image src="../../static/brand.png" mode=""></image>
        </view>
        
        <!-- 我选择的品牌 -->
        <view class="brand-info" v-if="item.brand">
          <view class="brand-image"><image :src="item.image"></image></view>
          <view class="brand-txt">
            <view class="h3 text-hidden1">{{item.ename}}</view>
            <view class="p text-hidden1">{{item.name}}</view>
          </view>
        </view>
        
        <!-- 鉴定方式 -->
        <block v-if="item.appraisal">
          <view class="appraisal-title">请选择鉴定方式：</view>
          <view class="appraisalMode" v-for="(ite,idx) in item.appraisalMode" :key="idx" @click="choseAppraisalMode(ite,idx)">
            <image v-if="idx == 0" src="../../static/start_h.png" mode=""></image>
            <image v-if="idx == 1" src="../../static/serve_h.png" mode=""></image>
            <image v-if="idx == 2" src="../../static/expert_h.png" mode=""></image>
            <text class="name">{{ite.name}}</text>
            <text class="price">{{ite.price}}￥</text>
          </view>
        </block>
        
        <!-- 确认鉴定方式 -->
        <view class="bubble-text" :class="{white: item.state}" v-if="item.appraisalTxt && item.appraisalTxt!=''">
          <view class="circle-wrap white">
            <image v-if="payMasker.state == 0" src="../../static/start_h.png" mode=""></image>
            <image v-if="payMasker.state == 1" src="../../static/serve_h.png" mode=""></image>
            <image v-if="payMasker.state == 2" src="../../static/expert_h.png" mode=""></image>
          </view>
          <text>{{item.appraisalTxt}}</text>
        </view>
        
        <!-- 上传照片 -->
        <view class="bubble-text" :class="{white: item.state}" v-if="item.upLoadImg && item.upLoadImg!=''">
          <text>{{item.upLoadImg}}</text>
          <view class="upload-camera" @click="goAppraisalRoom">
            <!-- <image src="../../static/camera.png" mode=""></image> -->
            填写信息
          </view>
        </view>
        
        <!-- 返回上一步 -->
        <view @click="revoke" class="revoke" v-if="index == data.length - 2 && item.state && payFlag"></view>
      </view>
    </view>
    
    <!-- 选择品牌弹层 -->
    <uni-popup ref="popupBrand" class="brand-masker">
      <view class="brand-title">
        <image src="../../static/brand_icon.png" mode=""></image>选择品牌
        <view @click="closeBrand" class="css-icon icon-close"></view>
      </view>
      <view class="product-list" v-if="productList.length > 0">
        <view class="product-item" v-for="(item,index) in productList" :key="index" @click="clickBrand(item)">
          <view class="product-box">
            <image :src="item.image"></image>
            <view class="h3 text-hidden1">{{item.ename}}</view>
            <view class="p text-hidden1">{{item.name}}</view>
          </view>
        </view>
      </view>
      <view v-else class="no-data">
        暂无数据
      </view>
    </uni-popup>
    
    <!-- 支付弹层 -->
    <uni-popup ref="popupAppraisal" type="center" class="pay-masker">
      <view class="pay-wrap">
        <view class="pay-title">
          <image v-if="payMasker.state == 0" src="../../static/start_h.png" mode=""></image>
          <image v-if="payMasker.state == 1" src="../../static/serve_h.png" mode=""></image>
          <image v-if="payMasker.state == 2" src="../../static/expert_h.png" mode=""></image>
          {{payMasker.title}}
        </view>
        <view class="pay-desc">
          <text>出具电子鉴定证书</text>（不显示真伪对应部位）<br>注：适合大多数购物保真场景，￥1.5万以上的物品建议选择精细鉴定或者专家鉴定。       
        </view>
        <view class="pay-btn integral" @click="paySure(0)">{{payMasker.integral}}积分兑换</view>
        <view class="pay-btn wechat" @click="paySure(1)">微信支付￥{{payMasker.price}}</view>
        <view class="pay-agreement">
          
          <view  :class="radio_02?'radio_02':'radio'" @click="radioClick"></view>
          <text @click="goprotocol">我已阅读并同意包铺鉴定服务协议</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        radio_02: false,
        classShow: true,
        payFlag: true,
		payOnce:true,
        payMasker: {
          state: 0,
          title: '',
          price: '0',
          integral: '0'
        },
        defaultData: {
          state: 0,
          count: '',
          txt: '亲爱的王二小\n今天想鉴定什么物品呢？',
          isshow: false,
          id: 0,
          classList: []
        },
        historyData: [],
        data: [],
        productList: [],
        appraisalMode: [],
        style: {
          pageHeight: 0,
          contentViewHeight: 0,
          footViewHeight: 90,
          mitemHeight: 0
        },
        genre: '',
        brand: '',
        level: '',
        money: ''
      };
    },
    onLoad() {
      this.$requestApi.getClassList().then(res => {
        var userinfo = uni.getStorageSync('userinfo')
        this.defaultData.txt = '亲爱的'+userinfo.nickname+'\n今天想鉴定什么物品呢？'
        this.defaultData.classList = res.data.list
        var json1 = JSON.parse(JSON.stringify(this.defaultData))
        this.data.push(json1)
        var json2 = JSON.parse(JSON.stringify(this.defaultData))
        this.historyData.push(json2)
        this.getAppraisalMode()
      })
    },
    methods: {
      radioClick(){
        this.radio_02 = !this.radio_02
        // console.log(this.radio_02)
      },
		goprotocol(){
			this.radio_02 = true
			uni.navigateTo({
			  // url: '../appraisalRoom/appraisalRoom?id=' + this.orderid,
			  url: '../protocol/protocol'
			})
		},
      // 跳转鉴定室
      goAppraisalRoom(){
        uni.navigateTo({
          // url: '../appraisalRoom/appraisalRoom?id=' + this.orderid,
          url: '../purchase/purchase?id=' + this.orderid
        })
      },
      // 支付方式
      paySure(type){
        if(this.radio_02){
			if(!this.payOnce){
				return;
			}
			this.payOnce = false;
          if(type){
            let res = uni.getProvider({
              service: "payment",
              success: (res)=>{
                if(~res.provider.indexOf('wxpay')){
                  console.log('微信支付')
                  uni.login({
                    provider: 'wxpay',
                    success: (res)=> {
                      if(res.code){
                        console.log(res.code)
                        this.$requestApi.wxpay({
                          // genre: this.genre,
                          // brand: this.brand,
                          // level: this.level,
                          code: res.code,
                          money: this.money
                          // paytype: 'wx'
                        }).then(res => {
                          console.log(res,'888')
                          this.orderid = res.data.orderid
                          uni.requestPayment({
                              provider: 'wxpay',
                              timeStamp: res.data.timeStamp,
                              nonceStr: res.data.nonceStr,
                              package: res.data.package,
                              signType: res.data.signType,
                              paySign: res.data.paySign,
                              success: (res) => {
                                // console.log('支付成功:' + JSON.stringify(res));
                                uni.showToast({
                                  icon: "none",
                                  title: "支付成功",
                                  position: "bottom"
                                })
                                this.$refs.popupAppraisal.close()
                                this.$requestApi.beforeorder({
                                  genre: this.genre,
                                  brand: this.brand,
                                  level: this.level,
                                  orderid: this.orderid,
                                  paytype: 'wxpay'
                                }).then(res => {
                                  this.orderid = res.data.id
                                  var json1 = {
                                    state: 1,
                                    appraisalTxt: this.payMasker.title,
                                  }
                                  var json2 = {
                                    state: 0,
                                    upLoadImg: "请填写鉴定品信息："
                                  }
                                  this.data[this.data.length-1].appraisalMode = []
                                  console.log(this.data,this.data.length)
                                  this.payFlag = false
								  this.payOnce = true;
                                  this.data.push(json1)
                                  this.scrollToBottom()
                                  setTimeout(()=>{
                                    this.data.push(json2)
                                    this.scrollToBottom()
                                  },600);
                                })
                              },
                              fail: (err) => {
                                // console.log('支付失败:' + JSON.stringify(err));
                                // 暂时在失败这里模拟支付成功
                                uni.showToast({
                                  icon: "none",
                                  title: "支付失败",
                                  position: "bottom"
                                })
								this.payOnce = true;
                              }
                          });
                        })
                      }
                    }
                  });
                }
              }
            })
          }else{
            console.log('积分支付')
            this.$requestApi.scorepay({
              score: this.payMasker.integral
            }).then(res => {
              if(res.code == 1000){
                this.orderid = res.data.orderid
                uni.showToast({
                  icon: "none",
                  title: "支付成功",
                  position: "bottom"
                })
                this.$refs.popupAppraisal.close()
                this.$requestApi.beforeorder({
                  genre: this.genre,
                  brand: this.brand,
                  level: this.level,
                  orderid: this.orderid,
                  score: this.payMasker.integral,
                  paytype: 'score'
                }).then(res => {
                  this.orderid = res.data.id
                  var json1 = {
                    state: 1,
                    appraisalTxt: this.payMasker.title,
                  }
                  var json2 = {
                    state: 0,
                    upLoadImg: "请填写鉴定品信息："
                  }
                  this.data[this.data.length-1].appraisalMode = []
                  console.log(this.data,this.data.length)
                  this.payFlag = false
                  this.data.push(json1)
                  this.scrollToBottom()
                  setTimeout(()=>{
                    this.data.push(json2)
                    this.scrollToBottom()
					this.payOnce = true;
                  },600);
                })
              }else{
                uni.showToast({
                  icon: "none",
                  title: res.message,
                })
				this.payOnce = true;
              }
            })
          }
        }else{
          uni.showToast({
              icon:'none',
              title: '请您阅读并同意服务协议',
              duration: 1500
          })
        } 
      },
      //滚动到底部
      scrollToBottom() {
        uni.createSelectorQuery().select(".bubble-countw").boundingClientRect((res)=>{
          uni.pageScrollTo({
              duration: 600,
              scrollTop:res.bottom
          })
        }).exec();
      },
      // 确认鉴定方式
      choseAppraisalMode(item,idx){
        this.level = parseInt(idx) + 1
        this.money = item.price
        this.payMasker = {
          state: idx,
          title: item.name,
          price: item.price,
          integral: item.price * 10
        }
        this.$refs.popupAppraisal.open()
      },
      //获取鉴定方式
      getAppraisalMode(){
        this.$requestApi.getAppraisalMode().then(res=>{
          this.appraisalMode = res.data.list
        })
      },
      // 选择品牌
      clickBrand(item){
        this.brand = item.id
        this.data[this.data.length-1].choseBrand = 0
        this.closeBrand()
        var json1 = JSON.parse(JSON.stringify(item))
        json1['state'] = 1
        json1['brand'] = 1
        this.data.push(json1)
        var json2 = {
          state: 0,
          appraisal: 1,
          appraisalMode: this.appraisalMode
        }
        setTimeout(()=>{
          this.data.push(json2)
        }, 600)
        setTimeout(()=>{
          this.scrollToBottom()
        },1600)
        this.historyData = [...this.historyData,json1,json2]
      },
      //获取品牌列表
      getProductList(){
        this.$requestApi.getProductList({genre: this.id}).then(res=>{
          this.productList = res.data.list
        })
      },
      // 选择品牌
      choseBrand() {
        this.$refs.popupBrand.open()
        this.getProductList()
      },
      // 关闭选择品牌
      closeBrand() {
        this.$refs.popupBrand.close()
      },
      //撤回
      revoke() {
        var k = this.data.map(x=>x.state)
        k = k.reduce((x, y) => {
          x[y]?x[y]++:x[y]=1;
          return x
        }, {})
        //判断当前是否为第一次选择 如果不是第一次选择则取历史记录，如果第一次选择，则初始化
        var len = k[1]
        if(len>=2){
          this.historyData = this.historyData.splice(0,this.historyData.length-2)
          var json1 = JSON.parse(JSON.stringify(this.historyData))
          this.data = [...json1]
        }else{
          var json1 = JSON.parse(JSON.stringify(this.defaultData))
          this.data = [json1]
        }
      },
      //选择分类
      choseClass(item) {
        this.genre = item.id
        var json1 = {
          state: 1,
          count: '',
          txt: '我要鉴定' + item.name,
          isshow: true,
          image: item.image
        }
        var json2 = {
          state: 0,
          txt: '好的！是什么品牌的' + item.name + '呢？',
          choseBrand: 1
        }
        this.data[0].classList = []
        this.data.push(json1)
        this.id = item.id
        setTimeout(() => {
          this.data.push(json2)
          var json3 = JSON.parse(JSON.stringify(this.data))
          this.historyData = [...json3]
        }, 600)
      }
    }
  }
</script>

<style lang="less" scoped>
  .radio_02{
    display: inline-block;
    vertical-align: middle;
    margin: -3upx 10upx 0 0;
    width: 26upx;
    height: 26upx;
    background: url(../../static/radio_02.png) no-repeat center;
    background-size: contain;
  }
  .radio{
    display: inline-block;
    vertical-align: middle;
    margin: -3upx 10upx 0 0;
    width: 26upx;
    height: 26upx;
    background: url(../../static/radio_h.png) no-repeat center;
    background-size: contain;
  }
  .brand-masker{
    /deep/ .uni-popup__wrapper-box{
      border-radius: 16upx 16upx 0 0;
    }
  }
  .pay-masker{
    /deep/ .uni-popup__wrapper-box{
      border-radius: 16upx;
    }
  }
  .pay-wrap{
    width: 540upx;
    height: 540upx;
    padding: 10upx 30upx;
    box-sizing: border-box;
    
    .pay-agreement{
      text-align: center;
    }
    .pay-btn{
      line-height: 90upx;
      text-align: center;
      font-size: 30upx;
      color: #FFFFFF;
      border-radius: 8upx;
      margin-bottom: 30upx;
      
      &.integral{
        background: #BF9F62;
      }
      &.wechat{
        background: #1AB45E;
      }
    }
    .pay-desc{
      color: #999999;
      font-size: 22upx;
      line-height: 36upx;
      margin-bottom: 40upx;
      
      text{
        font-size: 26upx;
        color: #333333;
      }
    }
    .pay-title{
      color: #202022;
      font-size: 32upx;
      font-weight: bold;
      line-height: 40upx;
      text-align: center;
      margin-bottom: 26upx;
      
      image{
        width: 48upx;
        height: 48upx;
        vertical-align: middle;
        margin: -3upx 7upx 0 0;
      }
    }
  }
  
  .brand-info{
    display: flex;
    
    .brand-txt{
      width: 300upx;
      .h3{
        width: 100%;
        font-size: 20upx;
        color: #FFFFFF;
        margin-bottom: 10upx;
      }
      .p{
        width: 100%;
        color: #FFFFFF;
        font-size: 28upx;
        line-height: 40upx;
      }
    }
    .brand-image{
      position: relative;
      width: 80upx;
      height: 80upx;
      overflow: hidden;
      margin-right: 20upx;
      
      image{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .product-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    &::after {
      content: '';
      flex: auto;    /* 最后一行对齐 */
    }
    .product-item{
      display: flex;
      align-items: center;
      width: 200upx;
      height: 180upx;
      border-radius:20upx;
      border:1px solid rgba(229,229,229,1);
      margin: 0 27upx 27upx 0;
      text-align: center;
      
      .product-box{
        width: 100%;
        padding: 0 10upx;
        box-sizing: border-box;
      }
      .h3{
        width: 100%;
        font-size: 16upx;
        color: #BE9F62;
        margin-bottom: 10upx;
      }
      .p{
        width: 100%;
        color: #999999;
        font-size: 22upx;
        line-height: 40upx;
      }
      image{
        width: 80upx;
        height: 80upx;
        margin-top: 10upx;
        margin-bottom: 8upx;
      }
    }
  }
  .brand-title{
    text-align: center;
    line-height: 40upx;
    font-size: 32upx;
    color: #BE9F62;
    font-weight: bold;
    margin-bottom: 40upx;
    
    .icon-close{
      float: right;
      font-size: 40upx;
    }
    image{
      width: 52upx;
      height: 52upx;
      display: inline-block;
      vertical-align: middle;
      margin-right: 14upx;
      margin-top: -3upx;
    }
  }
  
  
  
  .em {
    display: inline-block;
    background: url(../../static/class_icon.png) no-repeat;
    overflow: hidden;
    text-indent: -9999px;
    text-align: left;
    background-size: 56upx 327upx;
  }

  .em.em_08 {
    background-position: -4upx -0px;
    width: 48upx;
    height: 20upx;
  }

  .em.em_07 {
    background-position: -4upx -24upx;
    width: 47upx;
    height: 24upx;
  }

  .em.em_03 {
    background-position: -4upx -52upx;
    width: 46upx;
    height: 34upx;
  }

  .em.em_04 {
    background-position: -4upx -90upx;
    width: 42upx;
    height: 33upx;
  }

  .em.em_01 {
    background-position: -4upx -127upx;
    width: 34upx;
    height: 33upx;
  }

  .em.em_09 {
    background-position: -4upx -164upx;
    width: 34upx;
    height: 31upx;
  }

  .em.em_05 {
    background-position: -4upx -197upx;
    width: 33upx;
    height: 38upx;
  }

  .em.em_06 {
    background-position: -4upx -240upx;
    width: 28upx;
    height: 42upx;
  }

  .em.em_02 {
    background-position: -4upx -284upx;
    width: 18upx;
    height: 39upx;
  }

  .class-list {
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    margin-top: 20upx;
    
    .li {
      display: flex;
      width: 130upx;
      height: 130upx;
      background: #FFFFFF;
      border-radius: 10upx;
      text-align: center;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      margin-bottom: 20upx;
      margin-right:15rpx;
      image{
        width: 34upx;
        height: 34upx;
      }
      .p {
        width: 100%;
      }
    }
    .li:nth-child(3n+0) {
      margin-right:0rpx;
    }
  }

  .bubble-countw {
    width: 670upx;
    padding: 30upx 0;
    margin: 0 auto;

    .bubble-text {
      line-height: 48upx;
      font-size: 28upx;

      .circle-wrap {
        display: inline-block;
        vertical-align: middle;
        width: 54upx;
        height: 54upx;
        border-radius: 54upx;
        background: #FFFFFF;
        text-align: center;
        margin-right: 14upx;
        
        &.white{
          background: none;
        }
        image{
          width: 30upx;
          height: 30upx;
          vertical-align: middle;
        }
        
        .em {
          vertical-align: middle;
        }

        &::after {
          content: '';
          display: inline-block;
          vertical-align: middle;
          height: 100%;
        }
      }

      &.white {
        color: #FFFFFF;
      }
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }
  .message-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40upx;

    &.hide {
      // transform: translate(0,50upx);
      // opacity: 0;
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeInUp;
    }

    .bubble-wrap {
      position: relative;
      width: 500rpx;
      background: #F5F5F5;
      border-radius: 10upx;
      padding: 40upx;
      box-sizing: border-box;
      margin-right: 40upx;

      .choseBrand {
        margin-top: 20upx;

        image {
          width: 430upx;
          height: 80upx;
        }
      }

      .revoke {
        position: absolute;
        bottom: 15upx;
        right: 30upx;
        width: 40upx;
        height: 40upx;
        background: url(../../static/revoke.png) no-repeat center;
        background-size: cover;
      }

      &::after {
        content: '';
        width: 0;
        height: 0;
        font-size: 0;
        border-width: 15upx;
        border-style: solid;
        border-color: #F5F5F5 transparent transparent;
        overflow: hidden;
        position: absolute;
        left: -26upx;
        top: 30upx;
        transform: rotate(90deg);
      }
    }

    image {
      width: 100upx;
      height: 100upx;
    }
    .upload-camera{
      line-height: 80upx;
      background: #FFFFFF;
      text-align: center;
      margin-top: 20upx;
      
      image{
        width: 43upx;
        height: 35upx;
        display: inline-block;
        vertical-align: middle;
        margin: -3upx 10upx 0 0;
      }
    }
    &.mine {
      flex-direction: row-reverse;

      .bubble-wrap {
        margin-left: 40upx;
        background: #C9AB79;

        &::after {
          left: auto;
          right: -26upx;
          transform: rotate(-90deg);
          border-color: #C9AB79 transparent transparent;
        }
      }
    }
    
    &.black{
      .appraisal-title{
        color: #FFFFFF;
        font-size: 26upx;
      }
      .appraisalMode{
        width: 430upx;
        height: 90upx;
        line-height: 50upx;
        background: #FFFFFF;
        margin: 14upx auto 0;
        display: flex;
        justify-content: space-between;
        padding: 20upx;
        box-sizing: border-box;
        
        .name{
          width: 200upx;
          color: #202022;
          font-weight: bold;
        }
        .price{
          font-size: 26upx;
          color: #BF9F62;
          font-weight: bold;
        }
        image{
          width: 48upx;
          height: 48upx;
          vertical-align: middle;
        }
      }
      .bubble-wrap {
        background: #35363B;
      
        &::after {
          border-color: #35363B transparent transparent;
        }
      }
    }
  }
</style>
