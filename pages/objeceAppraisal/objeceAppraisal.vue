<template>
	<view class="objectAppraisal">
		<view class="object-item">
      <view class="h1">个人信息</view>
      <navigator class="address-a" hover-class="none" url="../addAdress/addAdress?type=0">
        <block v-if="addressInfo == ''">
          请填写寄回地址及个人信息
        </block>
        <view v-else>
          <view class="list-item-title">{{addressInfo.receiver}} {{addressInfo.phone}}</view>
          <view class="list-item-title-address">{{addressInfo.area}}{{addressInfo.address}}</view>
        </view>
        <view class="css-icon icon-arrow-right"></view>
      </navigator>
    </view>
    
    <view class="object-item">
      <view class="h1">商品信息</view>
      <view class="select-wrap">
        <view class="select" @click="classListOpen">
          <input v-model="classname" disabled type="text" placeholder="请选择品类" />
          <view class="css-icon icon-arrow-right"></view>
        </view>
        <view class="select" @click="brandListOpen">
          <input v-model="brandname" disabled type="text" placeholder="请选择品牌" />
          <view class="css-icon icon-arrow-right"></view>
        </view>
      </view>
      <view class="photo-list">
        <view class="photo-item" v-for="(item,index) in photoList" :key="index" @click="takePhoto(item,index)">
          <view class="photo-nodata" v-if="item.imgsrc == ''">
            <view class="upload-default"></view>
            <text class="p">{{item.name}}</text>
          </view>
          <image v-else :src="item.imgsrc"></image>
        </view>
      </view>
      <view class="row-item">
        <view class="text">快递单号</view>
        <input v-model="orderNum" class="input" type="text" placeholder="请输入快递单号" />
      </view>
      <view class="row-item">
        <view class="text">商品价值</view>
        <input v-model="buyPrice" class="input" type="digit" placeholder="请输入商品购买价格" />
      </view>
    </view>
    <view class="object-item" v-if="price">
      <view class="h1">鉴定费用 <text>￥{{price}}</text></view>
    </view>
    <view class="object-item">
      <view class="h1">支付方式</view>
      <view class="wechat-pay">
        <view class="wechat">
          <image src="../../static/wechat.png" mode=""></image>微信支付
        </view>
        <image src="../../static/radio_02.png" mode=""></image>
      </view>
    </view>
    
    <view class="pay-btn" @click="submitPay">立即支付</view>
    
    <!-- 品类弹层 -->
    <uni-popup ref="classList" class="brand-masker">
      <view class="brand-title">
        <image src="../../static/brand_icon.png" mode=""></image>选择品牌
        <view @click="closeClass" class="css-icon icon-close"></view>
      </view>
      <view class="class-list">
        <view class="class-item" v-for="(item,index) in classList" :key="index" @click="choseClass(item)">
          <view class="class-img">
            <image :src="item.image"></image>{{item.name}}
          </view>
          <view class="css-icon icon-arrow-right"></view>
        </view>
      </view>
    </uni-popup>
    <!-- 品牌弹层 -->
    <uni-popup ref="popupBrand" class="brand-masker">
      <view class="brand-title">
        <image src="../../static/brand_icon.png" mode=""></image>选择品牌
        <view @click="closeBrand" class="css-icon icon-close"></view>
      </view>
      <view class="product-list" v-if="brandList.length > 0">
        <view class="product-item" v-for="(item,index) in brandList" :key="index" @click="clickBrand(item)">
          <view class="product-box">
            <image :src="item.image"></image>
            <view class="h3 text-hidden1">{{item.ename}}</view>
            <view class="p text-hidden1">{{item.name}}</view>
          </view>
        </view>
      </view>
      <view class="no-data" v-else>
        暂无数据
      </view>
    </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photoList: [
          {name: "上传实物照片",imgsrc: "",},
          {name: "快递包裹照片",imgsrc: "",},
          {name: "快递订单照片",imgsrc: "",}
        ],
        price: 0,
        classname: "",
        brandname: "",
        classList: [],
        brandList: [],
        classId: -1,
        brandId: -1,
        orderNum: '',
        buyPrice: '',
        addressInfo: ''
			};
		},
    onShow() {
      //品类列表
      this.$requestApi.getClassList().then(res=>{
        this.classList = res.data.list
      })
      this.addressInfo = getApp().globalData.userAddress || ''
    },
    methods:{
      submitPay(){
        let params = {
          brand: this.brandId,
          genre: this.classId,
          courierid: this.orderNum,
          price: this.buyPrice,
          images: [],
          cost: this.price,
          address: JSON.stringify(this.addressInfo),
          paytype: 'wxpay'
        }
        if(!this.addressInfo.id){
          uni.showToast({
            icon: "none",
            title: "请选择收货地址"
          })
          return
        }
        if(params.genre == -1){
          uni.showToast({
            icon: "none",
            title: "请选择品类"
          })
          return
        }
        if(params.brand == -1){
          uni.showToast({
            icon: "none",
            title: "请选择品牌"
          })
          return
        }
        if(this.photoList[0].imgsrc == ""){
          uni.showToast({
            icon: "none",
            title: "请上传实物照片"
          })
          return
        }
        if(this.photoList[1].imgsrc == ""){
          uni.showToast({
            icon: "none",
            title: "请上传包裹照片"
          })
          return
        }
        if(this.photoList[2].imgsrc == ""){
          uni.showToast({
            icon: "none",
            title: "请上传订单照片"
          })
          return
        }
        if(params.courierid == ""){
          uni.showToast({
            icon: "none",
            title: "请输入快递单号"
          })
          return
        }
        if(params.price == ""){
          uni.showToast({
            icon: "none",
            title: "请输入商品购买价格"
          })
          return
        }
        params.images = this.photoList.map(x=>x.imgsrc)
        uni.getProvider({
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
                      code: res.code,
                      money: this.price
                    }).then(res => {
                      console.log(res)
                      let orderid = res.data.orderid
                      uni.requestPayment({
                          provider: 'wxpay',
                          timeStamp: res.data.timeStamp,
                          nonceStr: res.data.nonceStr,
                          package: res.data.package,
                          signType: res.data.signType,
                          paySign: res.data.paySign,
                          success: (res) => {
                            params['orderid'] = orderid
                            this.$requestApi.sendgoodsorder(params).then(res => {
                              uni.showToast({
                                title: '支付成功'
                              })
							  wx.requestSubscribeMessage({
							    tmplIds: ['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU'],
							  });
                              setTimeout(() => {
                                uni.navigateBack()
                              },1000)
                            })
                          },
                          fail: (err) => {
                            console.log('支付失败:' + JSON.stringify(err));
                            // 暂时在失败这里模拟支付成功
                            uni.showToast({
                              icon: "none",
                              title: "支付失败",
                            })
                          }
                      });
                    })
                  }
                }
              });
            }
          }
        })
      },
      clickBrand(item){
        this.$refs.popupBrand.close()
        this.brandname = item.name
        this.brandId = item.id
        this.price = 199
      },
      choseClass(item){
        this.$refs.classList.close()
        this.price = item.price
        this.classname = item.name
        this.classId = item.id
      },
      closeClass(){
        this.$refs.classList.close()
      },
      closeBrand() {
        this.$refs.popupBrand.close()
      },
      brandListOpen(){
        if(this.classId == -1){
          this.$refs.classList.open()
          return
        }
        this.getProductList()
        this.$refs.popupBrand.open()
      },
      classListOpen(){
        this.$refs.classList.open()
      },
      getProductList(){
        this.$requestApi.getProductList({genre: this.classId}).then(res=>{
          this.brandList = res.data.list
        })
      },
      takePhoto(item,index){
        uni.showActionSheet({
          itemList: ['相机拍照','从相册中选择图片'],
          success: res=>{
            let type = res.tapIndex
            var album = ['camera','album']
            album = [album[type]]
            console.log(album)
            this.$uploadPhoto(album,(res)=>{
              this.photoList[index].imgsrc = res.data
            })
          }
        })
      }
    }
	}
</script>

<style lang="less" scoped>
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
  .class-list{
    padding: 50upx 0 30upx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .class-item{
      width: 317upx;
      padding: 0 20upx;
      height: 100upx;
      line-height: 100upx;
      box-sizing: border-box;
      margin-bottom: 20upx;
      border: 1upx solid #E5E5E5;
      border-radius: 8upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .class-img{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #35363B;
        font-weight: bold;
        image{
          width: 40upx;
          height: 40upx;
          margin-right: 20upx;
        }
      }
    }
  }
  .brand-masker{
    /deep/ .uni-popup__wrapper-box{
      border-radius: 16upx 16upx 0 0;
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
  .pay-btn{
    line-height: 90upx;
    text-align: center;
    color: #D5BD94;
    background: #35363B;
    border-radius: 8upx;
    font-size: 32upx;
    font-weight: bold;
  }
  .row-item{
    display: flex;
    justify-content: space-between;
    padding: 20upx 0;
    .text{
      flex: .4;
      height: 60upx;
      font-size: 28upx;
      line-height: 60upx;
    }
    input{
      flex: .6;
      height: 60upx;
      font-size: 28upx;
      line-height: 60upx;
      text-align: right;
    }
  }
  .objectAppraisal{
    width: 670upx;
    margin: 0 auto;
    padding: 40upx 0;
    
    .wechat-pay{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30upx 0;
      image{
        width: 36upx;
        height: 36upx;
      }
      .wechat{
        display: flex;
        align-items: center;
        image{
          width: 46upx;
          height: 46upx;
          margin-right: 12upx;
        }
      }
    }
    .object-item{
      box-shadow:0px 10upx 30upx rgba(0,0,0,0.07);
      padding: 0 30upx;
      margin-bottom: 30upx;
      
      .photo-list{
        display: flex;
        justify-content: space-between;
        padding-bottom: 30upx;
        .photo-item{
          width: 188upx;
          height: 188upx;
          border-radius: 20upx;
          border: 1upx dashed rgba(193,193,193,1);
          box-sizing: border-box;
          overflow: hidden;
          
          image{
            width: 188upx;
            height: 188upx;
          }
          .photo-nodata{
            text-align: center;
            color: #C1C1C1;
            height: 100%;
            padding-top: 50upx;
            .upload-default{
              width: 53upx;
              height: 43upx;
              background: url(../../static/card_upload.png) no-repeat center;
              background-size: cover;
              margin: 0 auto 27upx;
            }
          }
        }
      }
      .select-wrap{
        padding: 30upx 0;
        display: flex;
        justify-content: space-between;
        
        .select{
          position: relative;
          width: 290upx;
          height: 80upx;
          input{
            width: 290upx;
            height: 80upx;
            line-height: 60upx;
            background: #F2F2F2;
            border-radius: 8upx;
            box-sizing: border-box;
            padding: 10upx 20upx;
          }
          .css-icon{
            position: absolute;
            right: 20upx;
            top: 50%;
            transform: translateY(-50%) rotate(90deg);
          }
          .icon-arrow-right::before{
            border-color: #C1C1C1;
          }
        }
      }
      .h1{
        line-height: 100upx;
        font-size: 32upx;
        font-weight: bold;
        border-bottom: 1upx solid #F5F5F5;
        text{
          float: right;
          color: #DF1919;
        }
      }
      .address-a{
        line-height: 100upx;
        font-size: 28upx;
        color: #999A9B;
        display: flex;
        justify-content: space-between;
        .css-icon{
          height: 100upx;
        }
        .icon-arrow-right::before{
          border-color: #C1C1C1;
        }
      }
    }
  }
</style>
