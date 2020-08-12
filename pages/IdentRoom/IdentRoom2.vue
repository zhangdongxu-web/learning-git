<template>
	<view class="identRoom">
		<!-- <view class="identRoom_title">
			<text>鉴定结果</text>
		</view> -->
		<!-- <view class="identRoom_good">
			<text>第{{datainfo.noid}}号</text>
			<text>{{datainfo.mode}}</text>
			<text>{{datainfo.genre}}</text>
			<text>{{datainfo.brand}}</text>
		</view> -->
		<!--首次鉴定图片-->
		<view class="imglistbox">
			<view class="imglist" v-for="(item,index) in imglist" :key="index">
				<image :src="item.image" mode="aspectFit" @click="$previewImage(item.image)"></image>
				<text class="span">{{index + 1}}/{{imglist.length}} {{item.name}}</text>
			</view>
		</view>
		
		<view class="resbox" v-if="istrue">
			<view class="resTit">鉴定完毕</view>
			<!-- <view class="resTip">已出具鉴定结果</view> -->
			
			<view class="resTxt">
				<view :class="resIco"></view>
				<text>鉴定为{{istrue}}</text>
			</view>
		</view>
		
	<!-- 	<view class="identRoom_teacher common_bj">			
			<view class="identRoom_teacher_l">
				<view class="start">鉴定完成</view>
				<view class="respoend">鉴定师已响应，已经鉴定完成</view>
			</view>
			<view class="identRoom_teacher_r">
				<image mode="widthFix" src="../../static/sl_start.png"></image>
			</view>
		</view> -->
		
		<!-- 响应状态为1 -->
		<!-- 鉴定师开始 -->		
		<!-- 对话 -->
		<view class="common_bj">

			<!-- 对话列表 -->
			<view class="title" v-for="(item,i) in toBePersonTeacherList" :key="i">

				<!-- 鉴定师 -->
				<block v-if="sort == 1 || item.user || item.id">
					<view class="dialogue">
						<view class="dialogue_teacher">
							<view class="dialogue_teacher_title">鉴定师回复</view>
							<view class="dialogue_teacher_text">
								<view class="identRoom_list_good">
									<block v-for="(teacher,index) in  item.assayer.images" :key="index">
										<block v-if="teacher.image == '' ">
											<view style="width:100%;height:60rpx;">
												<view style="line-height: 32rpx;">{{teacher.name}}</view>
											</view>
										</block>
										<block v-else>
											<view class="identRoom_list_good_item">
												<image mode="aspectFill" :src="teacher.image" @click="$previewImage(teacher.image)"></image>
												<view style="line-height: 32rpx;">{{teacher.name}}</view>
											</view>
										</block>
									</block>
									<view style="width:100%;height:60rpx;" v-if="item.assayer.text">
										<view style="line-height: 32rpx;">{{item.assayer.text}}</view>
									</view>
								</view>

								<view class="voice_list" v-if="item.assayer.voice != ''">
									<view class="playVoice" @click="playVoice(0,i,item.assayer)">
										{{item.assayer.seconds}}
										<image src="../../static/voice.gif" v-if="item.assayer.voicePlay"></image>
										<image src="../../static/voice_b.png" v-else></image>
									</view>
								</view>


							</view>
						</view>
					</view>
					<!-- 用户 -->
					<view class="dialogue_user" v-if="item.user">
						<view class="dialogue">
							<view class="dialogue_user_name">用户回复</view>
							<view class="dialogue_teacher_text">
								<view class="identRoom_list_good">
									<block v-for="(user,index) in  item.user.images" :key="index">
										<block v-if="user.image == '' ">
											<view style="width:100%;height:60rpx;">
												<view style="line-height: 32rpx;">{{user.text}}</view>
											</view>
										</block>
										<block v-else>
											<view class="identRoom_list_good_item">
												<image mode="aspectFill" :src="user.image" @click="$previewImage(user.image)"></image>
												<view>{{item.assayer.images[index].name}}</view>
											</view>
										</block>
									</block>
									<view style="width:100%;height:60rpx;" v-if="item.user.text">
										<view style="line-height: 30rpx;">{{item.user.text}}</view>
									</view>
								</view>
								<view class="voice_list" v-if="item.user.voice != ''">
									<view class="playVoice" @click="playVoice(1,i,item.user)">
										{{item.user.seconds}}
										<image src="../../static/voice.gif" v-if="item.user.voicePlay"></image>
										<image src="../../static/voice_b.png" v-else></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>

				<!-- 回复消息模块 -->
				<!-- 鉴定师回复 -->
				<!-- <view class="dialogue_hf" v-if="sort == 0 && i == toBePersonTeacherList.length - 1 && item.user == null && item.assayer == '' && datainfo.over != 1">
					<view class="dialogue_user_name">鉴定师要求补拍</view>
					<view class="dialogue_user_img_message">图片消息</view>
					<view class="dialogue_user_img_message_list">
						<block v-if="choselist.length > 0">
							<view class="dialogue_user_img_change" v-for="(item,index) in choselist" :key="index">
								<image :src="item.image" @click="$previewImage(item.image)"></image>
							</view>
						</block>
						<view class="dialogue_user_img_change" @click="AddImgMessage">+</view>
					</view>
					<view class="dialogue_user_img_message_text">文字消息</view>
					<view class="voice_list" v-if="voicePath != '' && istext == 1">
						<view class="playVoice" @click="playVoice">
							{{voiceNum}}
							<image src="../../static/voice.gif" v-if="voicePlay"></image>
							<image src="../../static/voice_b.png" v-else></image>
						</view>
					</view>
					<input v-model="jtext" v-if="istext == 2" placeholder="请输入文字" class="user_text" />
					<view v-if="istext == 1" class="user_text user_text_mouse" :class="{revoic: voicePath != ''}" @touchstart="startRecord"
					 @touchend="endRecord">{{voicePath != ''?"重新录制":"按住说话"}}</view>
					<view v-if="istext == 2" class="user_text_voice" @click="change_text(1)">
						<image mode="widthFix" src="../../static/voice.png"></image>
						<text>切换语音</text>
					</view>
					<view v-if="istext == 1" class="user_text_voice" @click="change_text(2)">
						<image mode="widthFix" src="../../static/icon_message.png"></image>
						<text>切换文字</text>
					</view>
					<view class="user_text_hf" @click="reply()">
						回复消息
					</view>
				</view>		 -->
				<!-- 用户回复 -->
				<!-- <view class="dialogue_hf" v-if="sort == 1 && i == toBePersonTeacherList.length - 1 && !item.user && datainfo.over != 1">
					<view class="dialogue_user_name">用户回复</view>
					<view class="dialogue_user_img_message">图片消息</view>
					<view class="dialogue_user_img_message_list">
						<block v-if="choselist.length > 0">
							<view class="dialogue_user_img_change" v-for="(item,index) in choselist" :key="index">
								<image :src="item.image"></image>
							</view>
						</block>
						<view  v-if="datainfo.over != 1" class="dialogue_user_img_change" @tap="userAddImgMessage(i)">+</view>
					</view>
					<view class="dialogue_user_img_message_text">文字消息</view>
					<view class="voice_list" v-if="voicePath != '' && istext == 1">
						<view class="playVoice" @click="playVoice()">
							{{voiceNum}}
							<image src="../../static/voice.gif" v-if="voicePlay"></image>
							<image src="../../static/voice_b.png" v-else></image>
						</view>
					</view>
					<view  v-if="datainfo.over != 1">
						<input v-model="jtext" v-if="istext == 2" placeholder="请输入文字" class="user_text" />
						<view v-if="istext == 1" class="user_text user_text_mouse" :class="{revoic: voicePath != ''}" @touchstart="startRecord"
						 @touchend="endRecord">{{voicePath != ''?"重新录制":"按住说话"}}</view>
						<view v-if="istext == 2" class="user_text_voice" @click="change_text(1)">
							<image mode="widthFix" src="../../static/voice.png"></image>
							<text>切换语音</text>
						</view>
						<view v-if="istext == 1" class="user_text_voice" @click="change_text(2)">
							<image mode="widthFix" src="../../static/icon_message.png"></image>
							<text>切换文字</text>
						</view>
						<view class="user_text_hf" @click="userReply(item)">
							回复消息
						</view>
					</view>
				</view> -->
			</view>
		</view>

		<!-- <view class="scoreBox" v-if="sort == 0 && datainfo.over != 1 ">
			<view class="scoreBtn" @click="goScore">开始打分</view>
		</view> -->
		<view class="identRoom_teacher common_bj">			
			<view class="identRoom_teacher_l">
				<view class="start">鉴定开始</view>
				<view class="respoend">鉴定师已响应，开始为您鉴定</view>
			</view>			
			<view class="identRoom_teacher_r">
				<image mode="widthFix" src="../../static/sl_start.png"></image>
			</view>
		</view>
		<!-- 鉴定列表商品图片 -->
		<view class="identRoom_list_img">
			<view class="identRoom_list_res">				
				<text v-if="orderState == 'wait'">已提交等待鉴定</text>
			</view>
			<view class="identRoom_list_good">
				<view class="identRoom_list_good_item" v-for="(item,i) in toBeIdentifiedList" :key="i">
					<image mode="aspectFill" :src="item.image" @click="$previewImage(item.image)"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
		
			<block v-if="attach.images.length>0">
				<view class="identRoom_list_res">
					<text>用户额外添加图片</text>
				</view>
				<view class="identRoom_list_good">
					<view class="identRoom_list_good_item" v-for="(item,i) in attach.images" :key="i">
						<image mode="aspectFill" :src="item.image" @click="$previewImage(item.image)"></image>
						<!-- <view>{{item.name}}</view> -->
					</view>
				</view>
			</block>
		
			<block v-if="attach.text.length>0">
				<view class="identRoom_list_res">
					<text>用户发送信息</text>
				</view>
				<view class="identRoom_list_good">
					<view class="theTitle">发送的文字内容:{{attach.text}}</view>
					<!-- <view class="voice_list" v-if="item.assayer.voice != ''">
		    	<view class="playVoice" @click="playVoice(1,i,item.assayer)">
		    	  {{item.assayer.seconds}}
		    	  <image src="../../static/voice.gif" v-if="item.assayer.voicePlay"></image>
		    	  <image src="../../static/voice_b.png" v-else></image>
		    	</view>
		    </view> -->
				</view>
			</block>
		
		
		</view>
		<!-- 鉴定成功 -->
		<view class="ident_success common_bj"  v-if="false">
			<!-- <view class="ident_success_icon">v-if="orderState == 'over'"
				<image mode="widthFix" src="../../static/ident_success_icon.png"></image>
				<view>鉴定完毕</view>
			</view> -->
			<view class="ident_success_btn" >
				<view class="back" @click="appraisalProductReport" >查看鉴定报告</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import utils from "../../utils/util.js";
	import {
		recordPointsFun,
		startTouch,
		drawBack
	} from "../../utils/paint.js";
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				quanju: false,
				id: "",
				state: '',
				auth: '',
				identTab: '',
				exId: [], //鉴定师回复消息的id
				jtext: "",
				orderState: '',
				choselist: [],
				datainfo: {},
				voicePlay: false,
				record: false,
				start: 5, //评价
				activeStartIndex: null, //评价
				activeStartText: '',
				goodsInfo: { //用户信息

				},
				istext: '2', //录音相关
				voicePath: '', //录音相关
				timer: '', //录音相关
				voiceNum: '', //录音相关
				voiceLength: '', //录音相关
				toBeIdentifiedList: [], //待鉴定列表
				toBePersonTeacherList: [], //对话列表 assayer 鉴定师 user 用户
				attach: [], //获取到的用户额外添加的图片、文字、语音
				appraisalSuccess: 1, //0,未鉴定 1鉴定成功
				ident_success_btn_show: 0, //1表示评价成功 0 未成功
				sort: getApp().globalData.sort,
				imglist: [],
				istrue:'',
				resIco:'',
				choseImgList: {
					exp: [],
					upload: []
				}
			};
		},
		onLoad(option) {
			console.log('option', option);
			this.id = option.id
			this.state = option.type
			this.auth = option.auth
			this.identTab = option.identTab
			this.goodsInfo = uni.getStorageSync('userinfo') || '';
			// 监听错误
			recorderManager.onError((res) => {
				// 录音失败的回调处理
				console.log('#######录音失败############');
			});
			// 监听停止
			recorderManager.onStop(res => {
				console.log('录音结束----------------------------', res.tempFilePath);
				// this.voicePath = res.tempFilePath; //停止时 跟新音频
				this.voiceNum = Math.round(res.duration / 1000) //  计算语音时长
				this.voiceLength = Math.round(res.duration / 1000) // 计算语音时长
				uni.showLoading({
					title: "正在上传",
					mask: true
				})
				uni.uploadFile({
					url: this.$upLoadUrl,
					filePath: res.tempFilePath,
					name: 'file',
					header: {
						"content-type": "multipart/form-data"
					},
					formData: {
						//和服务器约定的token, 一般也可以放在header中
						'pathname': 'lisence',
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false
							})
							return;
						}
						var data = JSON.parse(res.data);
						console.log('*****data', data)
						this.voicePath = data.data
						uni.hideToast(); //隐藏Toast
					},
					fail: (err) => {
						console.log(err)
						uni.hideLoading()
						uni.hideToast(); //隐藏Toast
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						})
					}
				})
			});
			// 音频停止事件
			innerAudioContext.onEnded(res => {
				this.voicePlay = false
				if (this.timer) {
					this.voiceNum = this.voiceLength
					clearInterval(this.timer)
				}
				this.toBePersonTeacherList.forEach(x => {
					x.assayer.voicePlay = false
					x.assayer.seconds = x.assayer.len
					clearInterval(x.assayer.timer)
					if (x.user) {
						x.user.voicePlay = false
						x.user.seconds = x.user.len
						clearInterval(x.user.timer)
					}
				})
			});
		},
		onShow() {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			let params = {
				id: this.id
			}
			this.$requestApi.getBeIdentifiedList(params).then((res) => {
				console.log(res, '获取用户信息');
				this.orderState = res.data.orderState;
			})
			this.$requestApi.authpoolinfo(params).then(res => {
				this.imglist = [...res.data.list]
			})
			this.$requestApi.onlineOver(params).then(res => {
				this.istrue = res.data.isture=='1'?'正':'伪'
				this.resIco = res.data.isture == '1'?'resTrue':'resFalse'
				uni.hideLoading()
			})
			this.sort = getApp().globalData.sort
			this.getBeIdentifiedListHand()
			this.getChoseImg()
		},
		methods: {
			// 用户回复
			userReply(item) {
				let params = {
					id: this.id,
					tid: item.id,
					talk: {
						images: "",
						text: this.jtext,
						voice: this.voicePath,
						seconds: this.voiceNum
					}
				}
				if (this.choselist.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择补拍图片"
					})
					return
				}
				params.talk.images = this.choselist.map(x => JSON.stringify(x))
				params.talk = JSON.stringify(params.talk)
				// params.talk.id = 
				this.$requestApi.roomtalk(params).then(res => {
					if (res.code == 1000) {
						uni.showToast({
							icon: "none",
							title: "回复成功"
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							icon: "none",
							title: res.message
						})
					}
				})
			},
			// 鉴定师回复
			reply() {
				let params = {
					id: this.id,
					tid: "",
					talk: {
						images: "",
						text: this.jtext,
						voice: this.voicePath,
						seconds: this.voiceNum
					}
				}
				if (this.choselist.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择补拍图片"
					})
					return
				}
				params.talk.images = this.choselist.map(x => JSON.stringify(x))
				params.talk = JSON.stringify(params.talk)
				this.$requestApi.roomtalk(params).then(res => {
					if (res.code == 1000) {
						uni.showToast({
							icon: "none",
							title: "回复成功"
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							icon: "none",
							title: res.message
						})
					}
				})
			},
			clickImg(item) {
				item.succ = !item.succ
				this.choseImgList.exp.push({})
				this.choseImgList.upload.push({})
				this.choseImgList.exp.pop()
				this.choseImgList.upload.pop()
				console.log(this.choseImgList, 'qwertyuiop');
				var arr1 = this.choseImgList.exp.filter(x => x.succ == true)
				var arr2 = this.choseImgList.upload.filter(x => x.succ == true)
				this.choselist = [...arr1, ...arr2]
				this.choselist.push({})
				this.choselist.pop()
			},
			closeBrand() {
				this.$refs.choseimg.close()
			},
			AddImgMessage() {
				this.$refs.choseimg.open()
			},
			getChoseImg() {
				let params = {
					id: this.id
				}
				this.$requestApi.chooseimg(params).then(res => {
					this.choseImgList = res.data
				})
			},
			// 评价函数
			startActive(i) {
				this.activeStartIndex = i;
			},
			// 评价
			async startBtn() {
				let params = {
					id: this.id,
					star: this.activeStartIndex,
					memo: this.activeStartText
				}
				let res = await this.$requestApi.postevaluate(params)
				if (res.code == 1000) {
					this.$refs.popup.close();
					uni.showToast({
						icon: "none",
						title: "评价成功"
					})
					this.ident_success_btn_show = 1;
				}
			},
			//跳转到鉴定报告页面
			appraisalProductReport() {
				uni.navigateTo({
					url: '/pages/appraisalProductReport/appraisalProductReport?id=' + this.id
				})
			},
			// 切换语音
			change_text(i) {
				this.istext = i;
				if (i == 2) {
					this.voicePath = '';
				}
			},
			// 开始录音
			startRecord() {
				console.log('开始录音');
				this.record = true
				recorderManager.start({
					duration: 60000, //录音时长：一分钟
					format: 'mp3', //音频格式 ：mp3格式
				});
			},
			// 结束录音
			endRecord() {
				this.record = false
				console.log('录音结束');
				recorderManager.stop();
			},
			// 播放录音
			playVoice(type, index, item) {
				// 判断是否显示回复,还是回复消息
				let types = type && type == 1 ? 'user' : 'assayer'
				if (type == 0 || type == 1) {
					this.toBePersonTeacherList[index][types]['voicePlay'] = true
					this.toBePersonTeacherList[index][types]['len'] = item.seconds
					console.log('this.toBePersonTeacherList[index]', this.toBePersonTeacherList[index])
					innerAudioContext.src = item.voice
					innerAudioContext.play()
					this.toBePersonTeacherList[index][types]['timer'] = setInterval(() => {
						if (this.toBePersonTeacherList[index][types].seconds >= 1) {
							this.toBePersonTeacherList[index][types].seconds--
						}
					}, 1000)
				} else {
					this.voicePlay = true
					if (this.timer) {
						clearInterval(this.timer)
					}
					if (this.voicePath) {
						innerAudioContext.src = this.voicePath;
						innerAudioContext.play();
						this.timer = setInterval(() => {
							if (this.voiceNum >= 1) {
								this.voiceNum--
							}
						}, 1000)
					}
				}
			},

			// 弹出层
			openPopup() {
				this.$refs.popup.open()
			},
			// 获取鉴定列表
			async getBeIdentifiedListHand() {
				let params = {
					id: this.id
				}
				let res = await this.$requestApi.getBeIdentifiedList(params);
				if (res.code == 1000) {
					this.datainfo = res.data.info
					this.toBeIdentifiedList = res.data.list
					this.attach = res.data.attach
					res.data.exchange.forEach(x => {
						x.assayer.images.forEach((q, i) => {
							x.assayer.images[i] = JSON.parse(q)
							x.assayer.len = x.assayer.seconds
						})
						if (x.user) {
							x.user.images.forEach((q, i) => {
								x.user.images[i] = JSON.parse(q)
								x.user.len = x.user.seconds
							})
						}
					})
					console.log('sort', this.sort)
					if (this.sort == 0) {
						this.toBePersonTeacherList = res.data.exchange.length == 0 ? [{
								assayer: "",
								user: null
							}] : res.data.exchange,
							console.log(this.toBePersonTeacherList)
						if (this.toBePersonTeacherList[this.toBePersonTeacherList.length - 1].user) {
							this.toBePersonTeacherList.push({
								assayer: "",
								user: null
							})
						}
						console.log('toBePersonTeacherList', this.toBePersonTeacherList)
					} else {
						this.toBePersonTeacherList = res.data.exchange
					}

				}
			},
			closePopup() {
				this.$refs.popup.close()
			},
			userAddImgMessage(index) {
				console.log(index, 'indexindex')
				uni.showActionSheet({
					itemList: ['拍照', '相册'],
					success: res => {
						let type = res.tapIndex
						let album = ['camera', 'album']
						album = [album[type]]
						this.$uploadPhoto(album, (data) => {
							console.log(this.toBePersonTeacherList[index].assayer.images.length)
							if (this.choselist.length >= this.toBePersonTeacherList[index].assayer.images.length) {
								setTimeout(() => {
									uni.showToast({
										icon: "none",
										title: "不得超过鉴定师补拍数量"
									})
								}, 200)
								return
							}
							this.choselist.push({
								image: data.data,
							})
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			goScore() {
				console.log(this);
				console.log(this.id + "&&type=" + this.state + "&&auth=" + this.auth + "&&identTab=" + this.identTab);
				uni.navigateTo({
					url: "../onlineAppraisalDetail/onlineAppraisalDetail?id=" + this.id + "&type=3&auth=1&identTab=" + this.identTab
				})
			}
		},
		computed: {
			ismode() {
				let mode = this.goodsInfo.mode
				if (mode == 1) {
					return '标准鉴定'
				} else if (mode == 2) {
					return '精细鉴定'
				} else if (mode == 3) {
					return '专家鉴定'
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.theTitles {
		background: red;
	}

	.theTitle {
		width: 100%;
		font: 14px/30px '微软雅黑';
	}

	.chose_success {
		position: absolute;
		width: 36upx;
		height: 36upx;
		background: url(../../static/ident_success_icon.png) no-repeat center;
		background-size: cover;
		right: 20upx;
		top: 20upx;
	}

	/deep/ .uni-popup__wrapper-box {
		border-radius: 16upx;
	}

	.ohterlist {
		white-space: nowrap;
		height: 240upx;
		margin-bottom: 30upx;
	}

	.scroll-img {
		width: 180upx;
		position: relative;
		display: inline-block;
		vertical-align: top;
		margin-right: 20upx;
	}

	.chose_img {
		.h3 {
			font-size: 30upx;
			margin-bottom: 30upx;
		}

		image {
			width: 180upx;
			height: 180upx;
		}

		.p {
			line-height: 60upx;
			text-align: center;
			background: #F5F5F5;
		}
	}

	.brand-title {
		text-align: center;
		line-height: 40upx;
		font-size: 32upx;
		color: #BE9F62;
		font-weight: bold;
		margin-bottom: 40upx;

		.icon-close {
			float: right;
			font-size: 40upx;
		}
	}

	.record {
		position: fixed;
		right: 20upx;
		bottom: 20upx;
		background: rgba(0, 0, 0, .6);
		width: 300upx;
		height: 340upx;
		text-align: center;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 200upx;
			height: 200upx;
		}
	}

	.identRoom_list_good {
		width: 100%;
		padding-top: 30upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.identRoom_list_good_item {
			width: 180upx;
			height: 200upx;
			margin-right: 20upx;
			margin-bottom: 50upx;
			border-radius: 8upx;

			image {
				height: 180upx;
				width: 100%;
			}

			view {
				height: 50upx;
				line-height: 50upx;
				font-size: 24upx;
				font-weight: 400;
				color: #666666;
				background: #F5F5F5;
				text-align: center;
			}
		}

		& .identRoom_list_good_item:nth-child(3n) {
			margin-right: 0;
		}
	}

	.identRoom {
		border-top: 1upx solid #eeeeee;
		padding: 0 50upx;
		padding-top: 50upx;

		.identRoom_title {
			text {
				font-size: 48upx;
				color: #202022;
				font-weight: bold;
			}
		}

		.identRoom_good {
			margin-top: 20upx;
			margin-bottom: 50upx;

			text {
				font-size: 28upx;
				color: rgba(153, 154, 155, 1);
				margin-right: 10upx;
			}
		}

		.identRoom_list_img {
			width: 100%;
			height: auto;
			padding: 40upx 30upx;
			margin-top:30upx;
			box-sizing: border-box;
			background: #ffffff;
			box-shadow: 0upx 10upx 30upx rgba(0, 0, 0, 0.08);
			border-radius: 8upx;

			.identRoom_list_res {
				font-size: 32upx;
				font-weight: bold;
				color: rgba(201, 171, 121, 1);
			}
		}

		// 鉴定师
		.identRoom_teacher {
			width: 100%;
			height: 200upx;

		}
	}

	.common_bj {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 10upx 30upx rgba(0, 0, 0, 0.08);
		border-radius: 8upx;
		margin-top: 30upx;
		margin-bottom: 30upx;

		.title {
			margin-bottom: 40upx;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.18);
			opacity: 1;
			margin-top: 30upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
		}
	}

	.identRoom_teacher {
		margin-top: 30upx;
		height: 200upx;
		padding: 60upx 30upx;
		box-sizing: border-box;
		display: flex;

		.identRoom_teacher_l {
			width: 70%;

			.start {
				font-size: 32upx;
				color: #C9AB79;
				font-weight: bold;
			}

			.respoend {
				font-size: 22upx;
				font-weight: 400;
				color: #999999;
				margin-top: 20upx;
			}
		}

		.identRoom_teacher_r {
			width: 30%;

			image {
				width: 65upx;
				height: 65upx;
			}
		}
	}

	// 对话
	.dialogue {
		padding: 30upx 30upx;
		margin-top: 30upx;
	}

	.dialogue_teacher_title {
		font-size: 32upx;
		font-weight: bold;
		color: #C9AB79;
	}

	.dialogue_user {
		border-top: 0.1upx solid #eeeeee;
		margin-bottom: 30upx;

		.dialogue_user_name {
			font-size: 32upx;
			font-weight: bold;
			color: #C9AB79;
		}

		.dialogue_user_img_message {
			font-size: 30upx;
			font-weight: bold;
			color: #35363B;
			margin-top: 20upx;
		}
	}

	// 回复模块
	.dialogue_hf {
		padding: 30upx 30upx;

		.dialogue_user_name {
			font-size: 32upx;
			font-weight: bold;
			color: #C9AB79;
			margin-bottom: 10upx;
		}

		.dialogue_user_img_message_list {
			margin-top: 15upx;
			display: flex;
			flex-wrap: wrap;

			.dialogue_user_img_change {
				width: 180upx;
				height: 180upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				background: #F5F5F5;
				justify-content: center;
				font-size: 67upx;
				color: #C1C1C1;

				&:nth-of-type(3n) {
					margin-right: 0;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.user_text {
			height: 90upx;
			margin-top: 20upx;
			background: #F8F8F8;
			border-radius: 8upx;
			padding-left: 10upx;
			display: flex;
			align-items: center;
		}

		.user_text_mouse {
			background: #C9AB79;
			justify-content: center;
			color: #FFFFFF;

			&.revoic {
				background: #35363B;
				color: #C9AB79;
			}
		}

		.dialogue_user_img_message_text {
			margin-top: 20upx;
		}

		.user_text_voice {
			height: 90upx;
			border-radius: 8upx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 22upx;
				height: 28upx;
				vertical-align: middle;
				margin: 0upx 7upx 0 0;
			}

			text {
				font-size: 28upx;
				color: #999999;
				vertical-align: middle;
				display: inline-block;
				margin-left: 10upx;

			}
		}

		.user_text_hf {
			height: 90upx;
			border-radius: 45upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #c9ab79;
			font-size: 36upx;
			font-weight: bold;
			color: #FFFFFF;
		}
	}

	.scoreBox {
		padding-top: 50upx;
		padding-bottom: 50upx;

		.scoreBtn {
			height: 90upx;
			border-radius: 8upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #000000;
			font-size: 36upx;
			font-weight: bold;
			color: #C9AB79;
		}
	}


	// 鉴定成功模块
	.ident_success {
		height: 355upx;
		margin-top: 30upx;
		padding: 60upx 30upx;
		box-sizing: border-box;

		.ident_success_icon {
			text-align: center;

			image {
				width: 64upx;
				height: 64upx;
			}

			view {
				text-align: center;
				font-size: 28upx;
				font-weight: bold;
				margin-top: 10upx;
				color: #202022;
			}
		}

		.ident_success_btn {
			margin-top: 30upx;
			display: flex;
			justify-content: space-around;

			view {
				width: 48%;
				height: 100upx;
				background: #C9AB79;
				font-size: 30upx;
				color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 8upx;
			}

			view.back {
				background: #35363B;
			}
		}

		.ident_success_btn.active {
			view {
				display: none;
				width: 100%;
			}

			view.back {
				display: 100%;
				display: block;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	// 弹层实例
	.ident_popup {
		height: 640upx;
		padding: 70upx 40upx;
		padding-bottom: 0;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		border-radius: 24upx 24upx 0upx 0upx;
		position: relative;

		.css-icon {
			position: absolute;
			width: 28upx;
			height: 28upx;
			top: 60upx;
			right: 46upx;
		}

		.title {
			font-size: 48upx;
			font-weight: bold;
			color: rgba(32, 32, 34, 1);
		}

		.message {
			font-size: 24upx;
			font-weight: 400;
			color: rgba(153, 154, 155, 1);
			margin-top: 30upx;
			margin-bottom: 45upx;
		}

		.start {
			image {
				width: 50upx;
				height: 50upx;
				margin-right: 15upx;
				vertical-align: middle;
			}
		}

		.start_text {
			height: 80upx;
			margin: 50upx 0;
			line-height: 80upx;
			background: rgba(245, 245, 245, 1);
			padding-left: 30upx;
			border-radius: 8upx;
			font-size: 28upx;
			color: rgba(153, 154, 155, 1);
		}

		.click_btn {
			height: 100upx;
			line-height: 100upx;
			background: rgba(53, 54, 59, 1);
			border-radius: 8upx;
			text-align: center;
			color: #C9AB79;
		}
	}

	.voice_list {
		margin-top: 10rpx;

		.playVoice {
			line-height: 90upx;
			text-align: center;
			background: #C9AB79;
			margin-bottom: 20upx;
			border-radius: 8upx;
			font-size: 26upx;
			color: #FFFFFF;
			text-align: right;
			padding: 0 30upx;

			image {
				width: 29upx;
				height: 27upx;
				margin-left: 10upx;
				vertical-align: middle;
			}
		}
	}

	.imglistbox {
		height:620upx;
		white-space: nowrap;
		overflow-y:auto;
		.imglist {
			position: relative;
			width: 100%;
			height: 620upx;
			margin-bottom: 20upx;
			margin-right:10upx;
			display:inline-block;

			image {
				width: 100%;
				height: 100%;
			}

			.span {
				position: absolute;
				left: 40upx;
				bottom: 30upx;
				color: #FFFFFF;
				font-size: 32upx;
				font-weight: bold;
				background: rgba(0, 0, 0, .4);
			}
		}
	}
	.resbox {
		background: #ffffff;
		box-shadow: 0rpx 10rpx 30rpx rgba(0, 0, 0, 0.08);
		border-radius: 8rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		padding: 60rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.resTit {
			font-size: 32upx;
			color: #999;
			font-weight: bold;
			display: block;
		}
		.resTip {
			font-size:24upx;
			display: block;
			padding:20upx 0;
			color: #999999;
		}
		.resTrue {
			display: block;
			margin:15upx auto;
			background:url(../../static/istrue.png) no-repeat;
			background-size:contain;
			width:50upx;
			height:50upx;
		}
		.resFalse {
			display: block;
			margin:15upx auto;
			background:url(../../static/isfalse.png) no-repeat;
			background-size:contain;
			height:50upx;
			width:50upx;
		}
		.resTxt {
			font-size:26upx;
			display: block;
			padding:20upx;
			color: #777;
		}
	}
</style>
