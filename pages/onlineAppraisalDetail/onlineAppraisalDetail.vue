<template>
	<view class="detail-wrap" v-if="loadings">
		<view class="bg">
			<view class="avatar">
				<image :src="data.avatar" mode=""></image>
			</view>
			<view class="user-info">
				<view class="h1">{{ data.name }}</view>
				<view class="p">第{{ data.noid }}个用户</view>
			</view>
		</view>
		<view class="card-item first">
			<view class="item first">
				<image src="../../static/pinlei.png" mode="widthFix"></image>
				<text>品类：{{data.genre}}</text>
			</view>
			<view class="item">
				<image src="../../static/pinpai.png" mode="widthFix"></image>
				<text>品牌：{{data.brand}}</text>
			</view>
			<view class="item" v-if="!identTab">
				<image src="../../static/pinpai.png" mode="widthFix"></image>
				<text>购买渠道：{{data.channel}}</text>
			</view>
			<view class="item" v-if="!identTab">
				<image src="../../static/miaoshu.png" mode="widthFix"></image>
				<text>客户描述：{{data.describe}}</text>
			</view>
			<picker mode="selector" v-model="bagstyleIndex" :range="bagstyleList" :range-key="'name'" @change="changeBagstyle">
				<view class="item" v-if="flag">
					<view class="css-icon icon-arrow-right icoCusRight"></view>
					<image src="../../static/baobao.png" mode="widthFix"></image>
					<text style="display: inline-flex;">{{data.genre}}款式：{{ bagstyleList[bagstyleIndex].name }}</text>
				</view>
			</picker>

		</view>
		<view class="img-list" v-if="!identTab">
			<view class="h2warn">分值为0-10分，图片越接近真品，分值越高</view>
			<view class="h2">部位图片</view>
			<block v-if="!flag">
				<view class="img-item" v-for="(item,index) in data.details" :key="index">
					<image mode="aspectFill" :src="item.image" @click="$previewImage(item.image)"></image>
					<text>{{item.name}}</text>
				</view>
			</block>
			<block v-else>
				<view class="grade-list" v-for="(item,index) in data.details" :key="index">
					<view class="grade-item">
						<image mode="aspectFill" :src="item.image" @click="$previewImage(item.image)"></image>
						<view class="grade-info">
							<view class="grade-t">{{item.name}}</view>
							<view class="grade-desc">
								<view class="h3">{{item.name}}评分：</view>
								<input type="number" placeholder="0" @blur="changeScore(item.score,index)" v-model="item.score" class="span" />
								<!-- @focus = "changeFocus(item.score,index)" -->
							</view>
						</view>
					</view>
					<input class="grade-text" v-model="item.describe" type="text" placeholder="请填写描述..." />
					<view class="grade-flag">
						<text>在鉴定报告中显示：</text>
						<label>
							<checkbox v-model="item.show" class="checkbox" @click="showReport(item)" />
						</label>
					</view>
				</view>

				<view class="h2">其他照片</view>
				<scroll-view class="ohterlist" scroll-x="true">
					<view class="otherimg" v-for="(item,index) in data.attach.images" :key="index">
						<image :src="item.image" @click="$previewImage(item.image)" mode=""></image>
					</view>
				</scroll-view>

				<view class="grade-list">
					<view class="h2">整体评价</view>

					<!-- 添加选项的类别  通过判断来进行选项的禁止操作-->
					<view @click="changeCommont" class="commentBox">
						<view class="css-icon icon-arrow-right icoCusRight"></view>
						<view v-if="selectLen>0">
							<view v-for="(item,idx) in onlinedesc" :key="idx">
								<text class="selectTxt" v-if="item.select">{{item.describe}}</text>
							</view>
						</view>
						<view v-else>
							<text class="selectNoTxt">请选择您要评价的内容</text>
						</view>
					</view>
				</view>


				<!-- <textarea class="textarea" v-model="totalityTxt" placeholder="请填写您的评价（限时60字以内）" placeholder-style="color:#C1C1C1" maxlength="60" /> -->
				<view class="grade-num">
					<text>总分</text>
					<view class="grade-fen">
						<text>{{ grades }}</text>分
					</view>
				</view>
			</block>
		</view>
		<view class="object-wrap" v-if="flag && identTab">
			<view class="object-item">
				<view class="h1">鉴定依据</view>
				<view class="address-a">
					<picker mode="selector" v-model="yijuIndex" :range="yiju" :range-key="'name'" @change="changeyiju">
						<view class="text">
							{{yiju[yijuIndex].name}}
						</view>
					</picker>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<view class="object-item">
				<view class="h1">结论</view>
				<view class="address-a">
					<picker mode="selector" v-model="resultIndex" :range="result" :range-key="'name'" @change="changeresult">
						<view class="text">
							{{result[resultIndex].name}}
						</view>
					</picker>
					<view class="css-icon icon-arrow-right"></view>
				</view>
			</view>
			<view class="object-item">
				<view class="h1">产品图片</view>
				<view class="photo-list">
					<view class="photo-item" v-for="(item,index) in photoList" :key="index" @click="takePhoto(item,index)">
						<view class="photo-nodata" v-if="item == ''">
							<view class="upload-default"></view>
						</view>
						<image v-else :src="item"></image>
					</view>
				</view>
			</view>
		</view>


		<view class="object-item fujiaxinxi" v-if="!flag && !identTab">
			<view class="h1">附加信息</view>
			<view class="card-item">
				<view class='cardimage'>
					<image v-for="(item,index) in data.attach.images" :key="index" :src="item.image"></image>
				</view>
				<view class="item">
					<text class="warn">{{data.attach.text?data.attach.text:'未填写'}}</text>
				</view>
			</view>
		</view>



		<view class="start-btn" v-if="!flag" @click="startAppraisal">开始鉴定</view>
		<view class="start-btn" v-else @click="subFinal">鉴定完成</view>
		<!-- <view class="msg-btn" v-if="flag && !identTab && !data.corner" @click="goRoom"></view>
    <view class="msg-btn active" v-if="flag && !identTab && data.corner" @click="goRoom"></view> -->
		<uni-popup ref="comment">
			<view class="commentTit">
				<view class="commentClose" @click="commentClose"></view>
				<text>选择评价内容</text>
			</view>
			<view class="checkBox">
				<checkbox-group @change="checkboxChange">
					<view class="sole" v-for="(item,index) in selectCommont" :key="index">
						<text>{{item.describe}}</text>
						<label>
							<checkbox :value="item.describe" :disabled="item.flag" @click="check(item.nature,item,$event)" color="#FFCC33"
							 style="transform:scale(1)" />
						</label>
					</view>
				</checkbox-group>
			</view>
			<view class="start-btn" @click="commentSave">保存</view>
		</uni-popup>

	</view>

</template>

<style scoped>
	.cardimage image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
		margin-right: 10rpx;
	}
	.cardimage image:nth-child(1) {
		margin-right: 30rpx;
	}
</style>

<script>
	export default {
		data() {
			return {
				// focus: false,   //评分焦点
				bagstyleIndex: 0,
				photoList: ['', ''],
				id: "",
				type: "",
				auth: "",
				data: {
					name: "",
					which: "12345",
					details: [],
				},
				flag: 0, //0待鉴定 1鉴定中
				identTab: 0, //0在线鉴定 1实物鉴定
				bagstyleList: [],
				// totalityTxt: '',
				yiju: [],
				yijuIndex: 0,
				result: [{
						id: "-1",
						name: "请选择您的鉴定结论真品或者伪品"
					},
					{
						id: "1",
						name: "真品"
					},
					{
						id: "0",
						name: "伪品"
					}
				],
				resultIndex: 0,
				selectLen: 0,
				selectCommont: [],
				onlinedesc: [], //获取评价列表
				totalityTxt: [] ,//接收用户选择评价列表
        loadings: false
			};
		},
		computed: {
			//计算鉴定师打的评分【权重问题】
			grades() {
				let nu = 0;
				let num = this.data.details ? this.data.details.reduce((x, y) => {
					// return this.accAdd(parseFloat(x),parseFloat(y.score))
					return nu += (parseInt(y.score || 0) * y.weight)
				}, 0) : 0
				// return parseFloat( num / this.data.details.length).toFixed(2)
				num = num == 0 ? 0 : (num / 100).toFixed(2)
				return num;
			}
		},
		onLoad(option) {
      uni.showLoading({
        title:'努力加载中'
      });
			// uni.getStorage({
			// 	key:'attachimage',
			// 	success(e){
			// 		console.log(e.data)
			// 		e.data//这就是你想要取的token
			// 	}
			// })
			console.log(`option is ${JSON.stringify(option)}`);
			this.id = option.id
			this.type = option.type
			this.auth = option.auth
			this.identTab = option.identTab
			this.flag = this.type == 3 ? (this.auth == 1 ? 1 : 0) : ""
			uni.setNavigationBarTitle({
				title: this.flag ? "鉴定中详情" : "待鉴定详情"
			})
      this.getData()
      this.getBasisList()        
		},
		onShow() {
			
			// this.getData()
			// this.getBasisList()
			// this.getBagstyleList()
			let params = {
				token: uni.getStorageSync('token')
			}
			this.$requestApi.onlinedesc(params).then((res) => {
				console.log(res);
				res.data.map((v, i) => {
					v.flag = false;
				})
				this.onlinedesc = res.data;
				this.selectCommont = res.data;
			})
		},
		methods: {
			changeCommont() {
				this.$refs.comment.open()
			},
			commentClose() {
				this.$refs.comment.close()
			},
			commentSave() {
				this.onlinedesc = this.selectCommont;
				this.selectLen = this.selectCommont.filter(item => item.select == true).length;
				this.$refs.comment.close()
			},
			// 判断nature的状态为true还是false
			check(e, ele, event) {
				console.log(e, ele, event, 'qqqqq')
				if (event.target) {
					ele.select = true;
				} else {
					ele.select = false;
				}
				if (e == "false") {
					this.selectCommont.map((v, i) => {
						if (v.nature == "true") {
							v.flag = true
						}
					})
				} else {
					this.selectCommont.map((val, ind) => {
						if (val.nature == "false") {
							val.flag = true
						}
					})
				}
			},
			//获取鉴定师评价信息
			checkboxChange(e) {
				console.log(e, 'eeeeee')
				this.totalityTxt = e.detail.value;
				if (e.detail.value.length == 0) {
					this.selectCommont.map((value, index) => {
						console.log(56565656);
						let params = {
							token: uni.getStorageSync('token')
						}
						this.$requestApi.onlinedesc(params).then((res) => {
							console.log(res);
							res.data.map((v, i) => {
								v.flag = false;
							})
							//this.onlinedesc = res.data;
							this.selectCommont = res.data;
						})
					})
				}
				//this.$refs.comment.close()
				console.log(this.totalityTxt, '8989898');
			},
			changeScore(e, index) {
				console.log(e, 7777)
				if (e > 10) {
					this.data.details[index].score = 10;
				}

			},
			// accAdd(arg1, arg2) {
			// 	var r1, r2, m;
			// 	try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
			// 	try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
			// 	m = Math.pow(10, Math.max(r1, r2))
			// 	return (arg1 * m + arg2 * m) / m
			// },
			getBasisList() {
				this.$requestApi.getBasisList().then(res => {
					res.data.list.unshift({
						id: 0,
						name: '请选择鉴定依据',
					})
					this.yiju = res.data.list
				})
			},
			startAppraisal() {
				let params = {
					id: this.id
				}
				if (this.identTab == 1) {
					this.$requestApi.getStartGoodsAuth(params).then(res => {
						 this.auth = 1
						this.flag = this.type==3?(this.auth==1?1:0):""
						uni.setNavigationBarTitle({
						  title: this.flag?"鉴定中详情":"待鉴定详情"
						})
						this.getData()
						
					})
				} else {
					this.$requestApi.startonlineauth(params).then(res => {
						// this.auth = 1
						// this.flag = this.type==3?(this.auth==1?1:0):""
						// uni.setNavigationBarTitle({
						//   title: this.flag?"鉴定中详情":"待鉴定详情"
						// })
						// this.getData()
						this.goRoom();
					})
				}
			},
			goRoom() {
				// this.state = option.type
				// this.auth = option.auth
				// this.identTab = option.identTab
				uni.navigateTo({
					url: '../IdentRoom/IdentRoom?id=' + this.id + '&auth=' + this.auth + '&type=' + this.type + '&identTab=' + this.identTab
				})
			},
			showReport(e) {
				e.show = !e.show
			},
			authuser(){
					  wx.requestSubscribeMessage({
					    tmplIds: ['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU'],
					    success (res) { 
							console.log(res,'success')
								if(res['U_9kL6pmwoYljBLrxUFPPnnsyoQ9nbNgIlpnoUF0ewU']!='accept'){
																uni.showModal({
																	title:'提示',
																	content:'请允许消息通知，否则接收不到消息提醒'
																})
															}
					  			},
					  			fail(res){
					  				console.log(res,'fail')
					  			},
					  }); 
					  
			},
			subFinal() {
				if (this.bagstyleIndex == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择箱包款式'
					})
					return
				}
				if (this.identTab == 1) {
					// 实物鉴定提交
					let params = {
						id: this.id,
						style: this.bagstyleList[this.bagstyleIndex].id,
						basis: this.yiju[this.yijuIndex].id,
						result: this.result[this.resultIndex].id,
						images: this.photoList
					}
					if (this.yijuIndex == 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择鉴定依据'
						})
						return
					}
					if (this.resultIndex == 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择鉴定结论'
						})
						return
					}
					
					if(this.photoList[0]=='' || this.photoList[1]==''){
						uni.showToast({
							icon: 'none',
							title: '请上传产品图片'
						})
						return
					}
					uni.showLoading({
						title:'正在提交',
						mask:true
					})
					this.$requestApi.goodsPost(params).then(res => {
						uni.hideLoading()
            // this.loadings = true
						if(res.code==1000){
							uni.showToast({
								icon: 'none',
								title: '鉴定成功'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						}else{
							uni.showToast({
								icon:'none',
								title:'提交失败请稍后重试'
							})
						}
					})

				} else {
					this.authuser();
					// 在线鉴定提交
					let params = {
						id: this.id,
						style: this.bagstyleList[this.bagstyleIndex].id,
						score: this.grades,
						describe: this.totalityTxt,
						details: JSON.stringify(this.data.details)
					}
					let len = this.data.details.filter(x => x.describe == '')
					if (len.length > 0) {
						uni.showToast({
							icon: 'none',
							title: '请填写描述'
						})
						return
					}
					if (this.grades == 0) {
						uni.showToast({
							icon: 'none',
							title: '总分最低不能低于0分'
						})
						return
					}
					if (this.grades > 10) {
						uni.showToast({
							icon: 'none',
							title: '总分不得超过上限10分'
						})
						return
					}
					this.$requestApi.onlinePost(params).then(res => {
						uni.showToast({
							icon: 'none',
							title: '鉴定成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					})
				}

			},
			changeresult(e) {
				this.resultIndex = e.detail.value
			},
			changeyiju(e) {
				this.yijuIndex = e.detail.value
				console.log(e, 3333333)
			},
			changeBagstyle(e) {
				console.log(e, 'eeeeee')
				this.bagstyleIndex = e.detail.value
			},
			takePhoto(item, index) {
				uni.showActionSheet({
					itemList: ['相机拍照', '从相册中选择图片'],
					success: res => {
						let type = res.tapIndex
						var album = ['camera', 'album']
						album = [album[type]]
						this.$uploadPhoto(album, (res) => {
							this.photoList[index] = res.data
							this.photoList.push('')
							this.photoList.splice(2, 1)
							console.log(this.photoList)
						})
					}
				})
			},
			// getBagstyleList(){
			//   this.$requestApi.getBagstyleList().then(res => {
			//     console.log(res,'jkljkljlk');
			//     res.data.list.forEach(x => {
			//       x['value'] = x.id})
			//     res.data.list.unshift({
			//       id: 0,
			//       value: 0,
			//       name: '请选择'
			//     })
			//     this.bagstyleList = res.data.list
			//     console.log(this.bagstyleList)
			//   })
			// },
			getData() {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				let params = {
					id: this.id
				}
				if (this.identTab == 1) {
					this.$requestApi.getGoodWait(params).then(res => {
						console.log(res, '实物鉴定');
						res.data['details'] = []
						res.data['details'].push({
							score: 0,
							show: 0
						})
						// res.data.details.forEach(x => {x['score'] = 0;x['show'] = 0})
						this.data = res.data;
						// console.log(this.data, '获取实物鉴定的请选择');
            uni.hideLoading()
            this.loadings = true
						//箱包款式：请选择
						res.data.style.forEach(x => {
							x['value'] = x.id
						})
						res.data.style.unshift({
							id: 0,
							value: 0,
							name: '请选择'
						})
						this.bagstyleList = res.data.style;
						setTimeout(()=>{
							uni.hideLoading()
              this.loadings = true
						},500)
					})
				} else {
					this.$requestApi.getOnlineWait(params).then(res => {
						console.log(res, '在线鉴定');
						// res.data.details.forEach(x => {x['score'] = 0;x['show'] = 0})
						res.data.details.forEach(x => {
							x['score'] = "";
							x['show'] = ""
						})
						this.data = res.data
						console.log(this.data, '获取请选择');
						//箱包款式：请选择
						res.data.style.forEach(x => {
							x['value'] = x.id
						})
						res.data.style.unshift({
							id: 0,
							value: 0,
							name: '请选择'
						})
						this.bagstyleList = res.data.style;
						console.log(this.bagstyleList);
						setTimeout(()=>{
							uni.hideLoading()
              this.loadings = true
						},500)
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.checkBox checkbox-group .sole {
		padding: 10px 30px 10px 0;
		overflow: hidden;
		position: relative;
		border-bottom: 1px solid #eee;
    
		text {
			font: 30rpx/35rpx '微软雅黑';
      padding: 3rpx;
      font-size: 28rpx;
      letter-spacing: 4rpx;
		}
	}

	.checkBox checkbox-group .sole label checkbox {
		position: absolute;
		right: 0;
		top: 5px;
	}

	/deep/ checkbox .wx-checkbox-input {
		border-radius: 100upx;
	}

	/deep/ checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #C9AB79;
		border-color: #C9AB79;
	}

	// 对勾
	/deep/ checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #FFFFFF;
	}

	.object-wrap {
		padding: 0 40upx;
	}

	.object-item {
		box-shadow: 0px 10upx 30upx rgba(0, 0, 0, 0.07);
		padding: 0 30upx;
		margin-bottom: 30upx;

		.photo-list {
			display: flex;
			margin-top: 30upx;
			padding-bottom: 30upx;

			.photo-item {
				margin: auto;
				width: 188upx;
				height: 188upx;
				border-radius: 20upx;
				border: 1upx dashed rgba(193, 193, 193, 1);
				box-sizing: border-box;
				overflow: hidden;

				image {
					width: 188upx;
					height: 188upx;
				}

				.photo-nodata {
					text-align: center;
					color: #C1C1C1;
					height: 100%;
					display: flex;
					align-items: center;

					.upload-default {
						width: 53upx;
						height: 43upx;
						background: url(../../static/card_upload.png) no-repeat center;
						background-size: cover;
						margin: 0 auto;
					}
				}
			}
		}

		.select-wrap {
			padding: 30upx 0;
			display: flex;
			justify-content: space-between;

			.select {
				position: relative;
				width: 290upx;
				height: 80upx;

				input {
					width: 290upx;
					height: 80upx;
					line-height: 60upx;
					background: #F2F2F2;
					border-radius: 8upx;
					box-sizing: border-box;
					padding: 10upx 20upx;
				}

				.css-icon {
					position: absolute;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%) rotate(90deg);
				}

				.icon-arrow-right::before {
					border-color: #C1C1C1;
				}
			}
		}

		.h1 {
			line-height: 100upx;
			font-size: 32upx;
			font-weight: bold;
			border-bottom: 1upx solid #F5F5F5;

			text {
				float: right;
				color: #DF1919;
			}
		}

		.h2 {
			line-height: 100upx;
			font-size: 28upx;
			border-bottom: 1upx solid #F5F5F5;

			text {
				float: right;
				color: #DF1919;
			}
		}

		.address-a {
			line-height: 100upx;
			font-size: 28upx;
			color: #999A9B;
			display: flex;
			justify-content: space-between;

			picker {
				flex: 1;
			}

			.text {
				font-size: 28upx;
				color: #999A9B;
			}

			.css-icon {
				height: 100upx;
			}

			.icon-arrow-right::before {
				border-color: #C1C1C1;
			}
		}
	}

	.msg-btn {
		position: fixed;
		right: 20upx;
		bottom: 40upx;
		width: 70upx;
		height: 70upx;
		background: url(../../static/msg.png) no-repeat center;
		background-size: cover;

		&.active {
			background: url(../../static/msg_active.png) no-repeat center;
			background-size: cover;
		}
	}

	.grade-num {
		height: 120upx;
		background: #F8F8F8;
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		box-sizing: border-box;
		align-items: center;
		margin-bottom: 60upx;
		font-size: 32upx;
		font-weight: bold;

		.grade-fen {
			font-size: 26upx;
			font-weight: bold;

			text {
				font-size: 90upx;
				font-weight: bold;
				color: #DFC38D;
				margin-right: 5upx;
			}
		}
	}

	.textarea {
		background: #F8F8F8;
		border-radius: 8upx;
		min-height: 180upx;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		margin-bottom: 30upx;
	}

	.ohterlist {
		white-space: nowrap;
		height: 130upx;
		margin-bottom: 30upx;
	}

	.otherimg {
		display: inline-block;
		width: 130upx;
		height: 130upx;
		border-radius: 8upx;
		margin-right: 20upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.grade-list {
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);
		border-radius: 8upx;
		box-sizing: border-box;
		padding: 30upx 30upx 0 30upx;
		margin-bottom: 30upx;

		.grade-flag {
			display: flex;
			justify-content: space-between;
			height: 90upx;
			align-items: center;
		}

		.grade-text {
			padding: 20upx 0;
			line-height: 60upx;
			height: 60upx;
			width: 100%;
			border-bottom: 1px solid #eeeeee;
			color: #666;
		}

		.grade-item {
			display: flex;
			align-items: center;
			font-size: 32upx;
			font-weight: bold;

			image {
				width: 160upx;
				height: 160upx;
				border-radius: 8upx;
				margin-right: 45upx;
			}

			.grade-info {
				flex: 1;

				.grade-t {
					font-size: 32upx;
					margin-bottom: 15upx;
				}

				.grade-desc {
					display: flex;
					justify-content: space-between;

					.h3 {
						font-size: 28upx;
						color: #666666;
						font-weight: normal;
						line-height: 60upx;
						height: 60upx;
					}

					.span {
						width: 100upx;
						font-size: 40upx;
						line-height: 60upx;
						height: 60upx;
						text-align: right;
						color: #C9AB79;
					}
				}
			}
		}
	}

	.detail-wrap {
		padding-bottom: 60upx;
	}

	.start-btn {
		width: 670upx;
		line-height: 100upx;
		text-align: center;
		border-radius: 8upx;
		background: #35363B;
		color: #D5BD94;
		font-size: 30upx;
		font-weight: bold;
		margin: 0 auto;
	}

	.img-list {
		width: 670upx;
		margin: 0 auto;

		.img-item {
			height: 220upx;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);
			border-radius: 8upx;
			box-sizing: border-box;
			padding: 30upx;
			display: flex;
			align-items: center;
			font-size: 32upx;
			font-weight: bold;
			margin-bottom: 30upx;

			image {
				width: 160upx;
				height: 160upx;
				border-radius: 8upx;
				margin-right: 30upx;
			}
		}

		.h2 {
			font-weight: bold;
			font-size: 32upx;
			margin-top: 10upx;
			margin-bottom: 20upx;
		}
	}

	.card-item {
		width: 670upx;
		margin: 0 auto 30upx;
		box-shadow: 0px 10upx 30upx rgba(0, 0, 0, 0.08);
		border-radius: 8upx;
		background: #FFFFFF;

		&.first {
			margin: -160upx auto 30upx;
		}

		.item {
			margin: 0 30upx;
			padding: 35upx 0;
			//min-height: 110upx;
			line-height: 40upx;
			border-top: 1upx solid #eeeeee;
			// display: flex;
			// align-items: center;
			font-size: 28upx;
			// justify-content: space-between;

			.icon-arrow-right {
				&::before {
					border-color: #C1C1C1;
				}
			}

			text {
				// flex: 1;
				// margin-left:55upx;
				display: flex;
				justify-content: space-between;

				&.active {
					color: #C1C1C1;
				}
			}

			.warn {
				color: #999A9B;
				font-size: 24upx;
			}

			&.first {
				border: 0;
			}

			image {
				width: 42upx;
				height: 42upx;
				margin-right: 10upx;
				vertical-align: -7upx;
				float: left;
			}
		}
	}

	.bg {
		height: 405upx;
		background: linear-gradient(to bottom, #C9AB79, #F2DDB5);
		padding-top: 30upx;

		.user-info {
			text-align: center;
			font-weight: bold;

			.h1 {
				font-size: 32upx;
				line-height: 45upx;
				color: #FFFFFF;
			}

			.p {
				color: #FFFFFF;
			}
		}

		.avatar {
			margin: 0 auto 10upx;
			width: 120upx;
			height: 120upx;
			border-radius: 120upx;
			box-sizing: border-box;
			border: 10upx solid #FFFFFF;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.h2warn {
		font-size: 24upx;
		line-height: 36upx;
		margin-top: 30upx;
		margin-bottom: 40upx;
		color: #999A9B;
		background: #FFFFFF;
		border-radius: 8upx;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.06);
		padding: 24upx 20upx;
	}

	.commentTit {
		padding-top: 35upx;
		padding-bottom: 20upx;
		text-align: center;

		.commentClose {
			float: right;
			background: url(../../static/close.png) no-repeat;
			background-size: 100%;
			width: 29upx;
			height: 29upx;
		}

		text {
			color: #C9AB79;
			font-size: 32upx;
			font-weight: bold;
		}
	}

	.commentBox {
		padding-top: 20upx;
		padding-bottom: 30upx;
		position: relative;
		padding-right: 25upx;

		.icoCusRight {
			position: absolute;
			right: 10upx;
			top: 50%;
			margin-top: -10upx;
		}

		.selectTxt {
			list-style-type: disc;
			color: #35363B;
			font-size: 28upx;
			line-height: 30upx;
			margin: 15upx 0;
			display: block;
		}

		.selectNoTxt {
			color: #C1C1C1;
			font-size: 28upx;
			line-height: 30upx;
			display: block;
		}
	}
	.fujiaxinxi {
		box-shadow: none;
		h1 {
			border:none;
		}
		.card-item {
			.item {
				border:none;
			}
		}
	}
</style>
