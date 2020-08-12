<template>
	<view class="detail">
		<view class="nav">
			<image src="../../static/baopudsj.png" alt="" />
			<view class="navLeft">
				<view class="rateBox">
					<view class="circle">
						<view class="test1 test2" :style="{clipPath:cir01}"></view>
						<view class="circle-ban">
						</view>
					</view>
				</view>
				<view class="rateText">{{info&&info.genrerate.name}}假货率</view>
				<view class="rateNum">{{info&&info.genrerate.rate}}</view>
			</view>
			<view class="navRight">
				<view class="rateBox">
					<view class="circle">
						<view class="test1 test2" :style="{clipPath:cir02}"></view>
						<view class="circle-ban">
						</view>
					</view>
				</view>
				<view class="rateText">{{info&&info.brandrate.name}}假货率</view>
				<view class="rateNum">{{info&&info.brandrate.rate}}</view>
			</view>
		</view>
		<view class="main">
			<view class="con">
				<view class="h">
					购买渠道(必填)
				</view>
				<view class="liBox">
					<radio-group @change="radioChange">
						<view class="liBoxOne" v-for="(arr,idx) in from" :key="idx">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>{{arr[0]}}</view>
								<view class="Right">
									<radio class="radio" :value="arr[0]" />
								</view>
							</label>
							<label class="uni-list-cell uni-list-cell-pd" v-if="arr[1]">
								<view>{{arr[1]}}</view>
								<view class="Right">
									<radio class="radio" :value="arr[1]" />
								</view>
							</label>
						</view>
						<!-- <view class="liBoxOne">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>自己出国买</view>
								<view class="Right">
									<radio class="radio" value="自己出国买" />
								</view>
							</label>
							<label class="uni-list-cell uni-list-cell-pd">
								<view>被赠予</view>
								<view class="Right">
									<radio class="radio" value="被赠予" />
								</view>
							</label>
						</view>
						<view class="liBoxOne">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>亲友海外代购</view>
								<view class="Right">
									<radio class="radio" value="亲友海外代购" />
								</view>
							</label>
							<label class="uni-list-cell uni-list-cell-pd">
								<view>门店专柜</view>
								<view class="Right">
									<radio class="radio" value="门店专柜" />
								</view>
							</label>
						</view>
						<view class="liBoxOne">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>其他</view>
								<view class="Right">
									<radio class="radio" value="其他" />
								</view>
							</label>
						</view> -->
					</radio-group>
				</view>
			</view>
		</view>
		<view class="details">
			<view class="titles">
				<view class="h2">物品描述(必填)</view>
				<view class="text">
					<textarea class="textarea" v-model="totalityTxt" @blur="changeBlur" placeholder="请说明商品购入时间，有无附件(发票、保修卡、包装)等信息，以便鉴定师准确鉴定（50字以内）"
					 placeholder-style="color:#C1C1C1" maxlength="50" />
					</view>
          </view>
      </view>
      <view class="footer" @click="toPic">
          下一步
      </view>
  </view>
</template>

<script>
  export default {
    data(){
      return{
			totalityTxt:"",
			id:"",
			value:"",
			info:'',
			from:[],
			cir01:'polygon(50% 50%,50% 0%,0% 0%)',
			cir02:'polygon(50% 50%,50% 0%,0% 0%)'
		} 
    },
    onLoad(option) {      
      this.id = option.id
    },
    onShow() {
     console.log(this.totalityTxt)
	 this.getData()
    },
    methods:{
		getPross(r){
			var r=r*4;
			var k1="polygon(50% 50%,50% 0%,";
			var k2=k1+"100% 0%,";
			var k3=k2+"100% 100%,";
			var k4=k3+"0% 100%,";
			var k5=k4+"0% 0%,";
			var res='';
			if(r<=50){
				r+=50;
				res=k1+r+"% 0%)";                    
			}else if((r>50)&&(r<=150)){
				r-=50;
				res=k2+"100% "+r+"%)";
			}else if((r>150)&&(r<=250)){
				r=250-r;
				res=k3+r+"% 100%)";
			}else if((r>250)&&(r<=350)){
				r=350-r;
				res=k4+"0% "+r+"%)";
			}else if((r>350)&&(r<=400)){
				r-=350;
				res=k5+r+"% 0%)";
			}
			return res;
		},
	  getData(){
		  let that = this;
		  console.log('purchase--->getData');
		  uni.request({
		    url:"https://www.bopo.com/api/appraisal/channel",
		    data:{
		      token:uni.getStorageSync('token'),
		       id:this.id
		    },
		    method:'post',
		    success(res){
		      console.log('purchase data',res)
					let data = res.data.data;
		  		  that.info = data;
				  let rate01 = data.genrerate.rate.split('.')[0];
				  let rate02 = data.brandrate.rate.split('.')[0];
				  console.log('getrate',rate01,rate02);
				  that.cir01 = that.getPross(+rate01);
				  that.cir02 = that.getPross(+rate02);
				  console.log('rate',that.cir01,that.cir02);
				  let from = [],temp=[];
				  Object.keys(data.from).forEach((item,idx)=>{
					  if(idx%2==0){
						  if(temp.length){
							  from.push(temp);
						  }
						  temp=[];
					  }
					  temp.push(item);
				  });
				  if(temp.length){
					  from.push(temp)
				  }
				  that.from=from;
				  console.log('from',from);
		    }
		  })
	  },
      //失去焦点时获取输入框的内容
      changeBlur(e){
        console.log(e)
        this.totalityTxt = e.detail.value
      },
      radioChange(e){
        console.log(e)
        this.value = e.detail.value;
        
      },
      toPic(){
        if(this.value == "" || this.totalityTxt == ""){
          uni.showToast({
              title: '请您填写必填项',
              duration: 1500
          });
        }else{
          let that = this;
          uni.request({
            url:'https://www.bopo.com/api/appraisal/savechannelinfo',
             data:{
              token:uni.getStorageSync('token'),
              id:that.id,
              from:that.value,
              describe:that.totalityTxt
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': uni.getStorageSync("token")
            },
            method:'post',
            success(res){
              if(res.data.code == 1000){
                  uni.navigateTo({
                    url: '../appraisalRoom/appraisalRoom?id=' + that.id,       
                  })
              } 
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .detail{
    width: 100%;
    height: 100%;
    .nav{
      width: 100%;
      height: 340upx;
      position: relative;
      image{
        width: 100%;
        height: 100%;
      }
      .navLeft{
        width:325upx;
        height:180upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 10upx 30upx rgba(0,0,0,0.08);
        border-radius:8upx;
        position: absolute;
        left: 40upx;
        top: 240upx;
      }
      .navRight{
        width:325upx;
        height:180upx;
        position: absolute;
        background:rgba(255,255,255,1);
        box-shadow:0px 10upx 30upx rgba(0,0,0,0.08);
        border-radius:8upx;
        left: 385upx;
        top: 240upx;
      }
    }
    .main{
      padding:110upx 0 35upx 0;
      .con{
        width: 640rpx;
        height: 510rpx;
        background: #ffffff;
        -webkit-box-shadow: 0px 10rpx 30rpx rgba(0, 0, 0, 0.07);
        box-shadow: 0px 10rpx 30rpx rgba(0, 0, 0, 0.07);
        opacity: 1;
        border-radius: 8rpx;
        padding: 0 10rpx 0 20rpx;
        margin: 0 auto;

        .h{
         width: 100%;
         height: 100rpx;
         font-size: 32rpx;
         font-family: PingFang SC;
         font-weight: bold;
         line-height: 100rpx;
         color: #202022;
         opacity: 1;
         border-bottom: 1px solid rgba(245,245,245,1);
        }
        .liBox{
		  .liBoxOne{
            width: 100%;
            height: 100rpx;
            border-bottom: 1rpx solid rgba(245,245,245,1);
            display: flex;
            label{
              flex: 1;
              justify-content: space-between;
              display: flex;
              view{
                display: inline-block;
                flex: 1;
                justify-content: space-between;
                align-items: center;
                font: 25rpx/100rpx '微软雅黑';
              }
              .Right{
                position: relative;
                .radio{
                  position: absolute;
                  right: 35rpx;
                }
              }
            }
          }
		  & .liBoxOne:nth-child(4){width: 50%;}
        }
      }
    }
    .details{
      padding: 0 0 40rpx 0;
      overflow: hidden;
      .titles{
        width:670rpx;
        height:280rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 10rpx 30rpx rgba(0,0,0,0.07);
        opacity:1;
        border-radius:8rpx;
        margin: 0 auto;
        .h2{
          height:65rpx;
          font-size:32rpx;
          font-family:'微软雅黑';
          font-weight:bold;
          line-height:65rpx;
          color:rgba(32,32,34,1);
          border-bottom:1rpx solid rgba(245,245,245,1);
          opacity:1;
          padding-left: 20rpx;
        }
        .text{
          width:100%;
          .textarea{
           width: 631rpx;
           height: 100rpx;
           font-size: 28rpx;
           font-family: '\5FAE\8F6F\96C5\9ED1';
           font-weight: 400;
           line-height: 48rpx;
           color: #999a9b;
           opacity: 1;
           margin: 0 auto;
           padding: 31rpx 0;
          }
        }
      }
    }
    .footer{
      width: 670rpx;
      height: 100rpx;
      background:rgba(53,54,59,1);
      font: 30rpx/100rpx '微软雅黑';
      color:rgba(201,171,121,1);
      text-align: center;
      margin: 0 auto;
    }  
  }
  .rateText {
	  font-size:24upx;
	  color:#35363B;
	  padding-top:40upx;
	  padding-left:20upx;
	  font-weight: bold;
  }
  .rateNum {
	  font-size:44upx;
	  color:#C9AB79;
	  padding-top:20upx;
	  padding-left:20upx;
	  white-space: nowrap;
	  font-weight: bold;
  }
  .rateBox {
	  float:right;
	  position: relative;
	  margin-right:30upx;
	  margin-top:30upx;
	  width:90upx;
	  height:90upx;
	  // border:15upx solid #ddd;
	  // border-radius: 100%;
	  // box-sizing: border-box;
	}
	.circle,
	.test1{
		width:100%;
		height:100%;
		border-radius:50%;                                          
	}
	.circle{
		background-color:#ccc;
		text-align:center;
		position:relative;
	}
	.test2{
		background-color:#C9AB79;
		/*position: absolute;*/
		/*clip: rect(0px,200px,200px,100px);*/
		/*-webkit-clip-path:polygon(50% 50%,50% 0%,100% 0%,100% 100%,0% 100%,0% 0%,30% 0%);*/
		clip-path:polygon(50% 50%,50% 0%,100% 0%,100% 100%,0% 100%,0% 0%,30% 0%);
	}
	.circle-ban{
		width:80%;
		height:80%;
		border-radius:50%;
		background-color:white; 
		position:absolute;
		top:10%;
		left:10%;
	}
</style>
