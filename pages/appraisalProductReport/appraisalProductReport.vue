<template>
	<view class="report" :class="{nopd: type == 1}">
		<block v-if="type == 1">
			<view class="identRoom_title">
				<text>鉴定详情</text>
			</view>
			<view class="identRoom_good">
				<text>第 {{dataDesc.info.noid}} 号</text>
				<text>{{dataDesc.info.mode}}</text>
				<text>{{dataDesc.info.name}}</text>
			</view>
		</block>
		<image :src="canvasImg" :style="{height: cheight / 2 + 'px'}" mode="widthFix"></image>
		<canvas class="canvas_img" :style="{width: cwidth + 'px', height:cheight + 'px'}" canvas-id="firstCanvas"></canvas>
		<block v-if="type == 1">
			<view class="imglist" v-for="(item,index) in dataDesc.list" :key="index">
				<image :src="item.image" mode=""></image>
				<text class="span">{{index + 1}}/{{dataDesc.list.length}} {{item.name}}</text>
			</view>
		</block>
		<view v-else class="start-btn" @click="savePhoto">保存到手机</view>
	</view>
</template>

<script>
	const imgurl = getApp().globalData.img_src
	export default {
		data() {
			return {
				err: "",
				canvasImg: "",
				canvasImg2: "",
				cwidth: 690 * 2, //放大四倍保持真机清晰度
				cheight: 3000 * 2, //放大四倍保持真机清晰度
				data: {
					title: "实物鉴定评估报告",
					classItem: "香奈儿",
					productItem: "精细鉴定",
					certificate: "第12346号",
					imgSmall: "http://m.qpic.cn/psb?/V10oV2Rw42RpLG/LRJqUkq93XyQ0tak0VB9jrf2t32oAj1MaSLo*e6ekYo!/b/dL4AAAAAAAAA&bo=yADIAAAAAAARFyA!&rf=viewer_4",
					mark: 7,
					position: ["LOGO压印", "五金刻字", "序号压印", "五金", "布标", "拉链"],
					desc: ["用户提供图片质量几乎在所以部位未达到清晰度要求/或缺少相应图片", "所示图片与品牌标准品相应部位较吻合"]
				},
				desc: ["本机构作为第三方机构，不参与买卖纠纷", "本机构不提供鉴定点相关细节描述", "由于照片存在局限性，如对鉴定结果有异议，请于7日内提出申请，进行实物鉴定复审。"],
				company: "最终结论以实物鉴定为准",
				addressIcon: imgurl + "/assets/bpimg/canvas_address.png",
				logoIcon: imgurl + "/assets/bpimg/canvas_baopu.png",
				checkIcon: imgurl + "/assets/bpimg/canvas_checked.png",
				addressIcon_gray: imgurl + "/assets/bpimg/canvas_address_gray.png",
				logoIcon_gray: imgurl + "/assets/bpimg/canvas_baopu_gray.png",
				checkIcon_gray: imgurl + "/assets/bpimg/canvas_checked_gray.png",
				initHeight: 0,
				dataDesc: {
					info: {
						noid: "0",
						mode: "",
						name: ""
					},
					list: []
				}
			};
		},
		onLoad(option) {
			this.id = option.id
			this.type = option.type
		},
		onShow() {
			if (this.type == 1) {
				this.getDataPhotos()
				uni.setNavigationBarTitle({
					title: '鉴定物详情'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '鉴定报告'
				})
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getDataPhotos() {
				let params = {
					id: this.id
				}
				this.$requestApi.goodsinfo(params).then(res => {
					this.dataDesc = res.data
				})
			},
			getData() {
				let params = {
					id: this.id
				}
				this.$requestApi.onlineOver(params).then(res => {
					let result = res.data
					this.data = {
						title: "实物鉴定评估报告",
						classItem: result.brand,
						productItem: result.mode,
						certificate: result.cate,
						imgSmall: result.image,
						mark: result.score,
						position: result.show,
						desc: result.describe
					}
					console.log(this.data)

					if (result.isture == 1) {
						this.createReport()
					} else {
						this.grayReport()
					}
				})
			},
			savePhoto() {
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImg,
					success: (res) => {
						uni.showToast({
							title: '下载成功',
							duration: 2000,
						})
						console.log('save success', res);
					},
					fail: (err) => {
						if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg ===
							"saveImageToPhotosAlbum:fail auth deny") {
							uni.showModal({
								title: '提示',
								content: '需要您授权保存相册',
								showCancel: false,
								success: (res) => {
									uni.openSetting({
										success: (res) => {
											if (res.authSetting['scope.writePhotosAlbum']) {
												uni.showModal({
													title: '提示',
													content: '获取权限成功,再次点击图片即可保存',
													showCancel: false,
												})
											} else {
												uni.showModal({
													title: '提示',
													content: '获取权限失败，将无法保存到相册哦~',
													showCancel: false,
												})
											}
										}
									})
								}
							})
						}
					}
				});
			},
			// 绘制图片封装
			drawImg(imgsrc) {
				var promise = new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgsrc,
						success: resolve,
						fail: resolve
					})
				})
				return promise
			},
			// 多行文字封装
			drawText(_paint, str, initHeight, titleHeight, offleft, _color) {
				var canvasWidth = this.cwidth - 180 * 2
				var lineWidth = 0;
				_paint.font = "400 36px 微软雅黑";
				_paint.fillStyle = _color || "#BE9F62";
				var lastSubStrIndex = 0; //每次开始截取的字符串的索引
				var flagNum = 0;
				for (let i = 0; i < str.length; i++) {
					lineWidth += _paint.measureText(str[i]).width;
					if (lineWidth > canvasWidth) {
						_paint.fillText(str.substring(lastSubStrIndex, i), offleft, initHeight); //绘制截取部分
						initHeight += 36 * 2; //36为字体的高度
						lineWidth = 0;
						lastSubStrIndex = i;
						titleHeight += 36 * 2;
						flagNum++
					}
					if (i == str.length - 1) { //绘制剩余部分
						_paint.fillText(str.substring(lastSubStrIndex, i + 1), offleft, initHeight);
					}
				}
				this.initHeight += 36 * 2 * (flagNum + 1)
			},
			// 圆角矩形
			roundRect(_paint, x, y, w, h, r) {
				var min_size = Math.min(w, h);
				if (r > min_size / 2) r = min_size / 2;
				// 开始绘制
				_paint.beginPath();
				_paint.moveTo(x + r, y);
				_paint.arcTo(x + w, y, x + w, y + h, r);
				_paint.arcTo(x + w, y + h, x, y + h, r);
				_paint.arcTo(x, y + h, x, y, r);
				_paint.arcTo(x, y, x + w, y, r);
				_paint.closePath();
				return _paint;
			},
			// 灰色
			async grayReport() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				var context = uni.createCanvasContext('firstCanvas');
				console.log(context)
				// 背景颜色
				context.rect(0, 0, this.cwidth, this.cheight);
				context.setFillStyle('#FFFFFF');
				context.fill();


				// 标题
				var infoTextHeight = 170 //设置高度
				context.save()
				context.font = "400 44px 微软雅黑";
				context.fillStyle = "#999999";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('鉴定结果基于用户提供信息得出', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()
				infoTextHeight += 44
				context.save()
				context.font = "bold 64px 微软雅黑";
				context.fillStyle = "#30313B";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('您的商品经在线初审结论为', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()
				infoTextHeight += 64
				context.save()
				context.font = "bold 108px 微软雅黑";
				context.fillStyle = "#C1C1C1";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('伪品', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()

				// 推荐图
				var imgSmall = await this.drawImg(this.data.imgSmall)
				infoTextHeight += 67
				context.save();
				context.beginPath();
				this.roundRect(context, 110 * 2, infoTextHeight * 2, 160 * 2, 160 * 2, 10 * 2);
				context.clip(); // 通过裁剪得到圆角矩形 
				context.drawImage(imgSmall.path, 110 * 2, infoTextHeight * 2, 160 * 2, 160 * 2)
				context.restore();

				// 产品信息
				context.save()
				infoTextHeight += 30
				context.font = "bold 44px 微软雅黑";
				context.fillStyle = "#333333";
				context.textBaseline = "middle";
				context.fillText('品       牌：', 280 * 2, infoTextHeight * 2)
				context.fillText('鉴定方式：', 280 * 2, infoTextHeight * 2 + 52 * 2)
				context.fillText('证书编号：', 280 * 2, infoTextHeight * 2 + 52 * 4)
				context.fillStyle = "#C1C1C1";
				context.fillText(this.data.classItem, 400 * 2, infoTextHeight * 2)
				context.fillText(this.data.productItem, 400 * 2, infoTextHeight * 2 + 52 * 2)
				context.fillText(this.data.certificate, 400 * 2, infoTextHeight * 2 + 52 * 4)
				context.restore()
				infoTextHeight += 52 * 4

				// 评分_级别
				context.save()
				context.font = "400 40px 微软雅黑";
				context.fillStyle = "#636365";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('真伪系数值', this.cwidth / 2, infoTextHeight * 2)
				context.fillStyle = "#636365";
				context.fillText('仿品', 110 * 2, infoTextHeight * 2)
				context.fillText('正品', 110 * 2 + 460 * 2, infoTextHeight * 2)

				// 评分_级别_虚线
				context.lineWidth = 1 * 2;
				context.setLineDash([5, 10]);
				context.strokeStyle = '#C1C1C1';
				context.beginPath()
				context.moveTo(160 * 2, infoTextHeight * 2)
				context.lineTo(160 * 2 + 110 * 2, infoTextHeight * 2)
				context.closePath()
				context.stroke()
				context.beginPath()
				context.moveTo(420 * 2, infoTextHeight * 2)
				context.lineTo(420 * 2 + 110 * 2, infoTextHeight * 2)
				context.closePath()
				context.stroke()
				context.restore()

				// 评分_圆角矩形
				infoTextHeight += 40
				context.save()
				this.roundRect(context, 110 * 2, infoTextHeight * 2, 460 * 2, 14 * 2, 14 * 2);
				var linearGradient = context.createLinearGradient(110 * 2, infoTextHeight * 2, 110 * 2 + 460 * 2,
					infoTextHeight * 2);
				linearGradient.addColorStop(0, 'rgba(53,54,59, 0.2)');
				linearGradient.addColorStop(1, 'rgba(53,54,59, 1)');
				context.fillStyle = linearGradient;
				context.fill();
				context.restore()

				// 评分_分割线
				context.save()
				context.lineWidth = 1 * 2;
				context.strokeStyle = '#FFFFFF';
				for (let i = 1; i < 10; i++) {
					context.beginPath()
					context.moveTo(110 * 2 + 46 * i * 2, infoTextHeight * 2)
					context.lineTo(110 * 2 + 46 * i * 2, infoTextHeight * 2 + 14 * 2)
					context.closePath()
					context.stroke();
				}
				context.restore()

				// 评分_指示
				var signpost = await this.drawImg(this.addressIcon_gray)
				context.drawImage(signpost.path, 110 * 2 + 46 * this.data.mark * 2 - 10 * 2, infoTextHeight * 2 - 8 * 2,
					19 * 2, 26 * 2)

				// 评分_分数
				infoTextHeight += 36
				context.save()
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#999A9B";
				context.textAlign = "center";
				context.textBaseline = "middle";
				for (let i = 0; i <= 10; i++) {
					context.fillText(i, 110 * 2 + 46 * i * 2, infoTextHeight * 2)
				}
				context.restore()

				// 部位选择
				infoTextHeight += 36
				var checkIcon = await this.drawImg(this.checkIcon_gray)
				var checkIconSrc = checkIcon.path
				context.save()
				context.font = "400 44px 微软雅黑";
				context.fillStyle = "#666666";
				context.textAlign = "left";
				context.textBaseline = "top";
				var rowLen = 0
				for (let i = 0; i < this.data.position.length; i++) {
					// 第几行
					var flag = parseInt((i) / 3)
					var k = Math.floor((i) % 3)
					//获取总行数
					rowLen = flag
					// infoTextHeight += 80 * flag
					context.drawImage(checkIconSrc, 90 * 2 + 170 * 2 * k, infoTextHeight * 2 + 80 * flag, 22 * 2, 22 * 2)
					context.fillText(this.data.position[i], 120 * 2 + 170 * 2 * k, infoTextHeight * 2 + 80 * flag)
				}
				context.restore()

				// 描述
				infoTextHeight = infoTextHeight * 2 + 80 * (rowLen + 1) + 80 * 2
				// 获取矩形高度
				var descHeight = 0

				// 描述_文字_副本_获取文字高度
				context.save()
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#f2f2f2";
				// for (let i = 0; i < this.data.desc.length; i++) {
				//   var str = (i + 1) + '.'
				//   context.fillText(str, 80 * 2, infoTextHeight + this.initHeight)
				this.drawText(context, this.data.desc, infoTextHeight + this.initHeight, 40 * 2, 120 * 2, "#ffffff")
				// }
				descHeight = this.initHeight
				context.restore()

				// 描述_圆角矩形
				context.save()
				context.fillStyle = "#F2F2F2";
				this.roundRect(context, this.cwidth / 2 - 550 * 2 / 2, infoTextHeight - 100, 550 * 2, descHeight + 120, 10 *
					2);
				context.fill();
				context.restore()

				// 描述_文字
				context.save()
				this.initHeight = 0
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#666666";
				// for (let i = 0; i < this.data.desc.length; i++) {
				//   var str = (i + 1) + '.'
				//   context.fillText(str, 80 * 2, infoTextHeight + this.initHeight)
				this.drawText(context, this.data.desc, infoTextHeight + this.initHeight, 40 * 2, 100 * 2, "#666666")
				// }
				context.restore()

				// 备注
				// 备注_圆角矩形
				infoTextHeight = infoTextHeight + this.initHeight + 180
				context.save()
				context.fillStyle = "#F2F2F2";
				this.roundRect(context, this.cwidth / 2 - 550 * 2 / 2, infoTextHeight - 80, 550 * 2, 170 * 2, 10 * 2);
				context.fill();
				context.restore()
				// 备注_文字
				context.save()
				this.initHeight = 0
				for (let i = 0; i < this.desc.length; i++) {
					this.drawText(context, this.desc[i], infoTextHeight + this.initHeight, 40 * 2, 100 * 2, "#666666")
				}
				context.restore()

				// 公司名字
				infoTextHeight += this.initHeight + 60
				context.save()
				context.font = "bold 36px 微软雅黑";
				context.fillStyle = "#333333";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText(this.company, this.cwidth / 2, infoTextHeight)
				context.restore()

				//获取动态高度
				this.cheight = infoTextHeight + 100

				// 边框
				context.strokeStyle = '#999A9B';
				context.save()
				var lineWidth = 2 * 2
				context.lineWidth = 2 * 2;
				context.strokeRect(lineWidth, lineWidth, this.cwidth - lineWidth * 2, this.cheight - lineWidth * 2);
				context.restore()
				// 左上角图形
				context.strokeStyle = '#F2F2F2';
				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(0, 690 * 2)
				context.quadraticCurveTo(60 * 2, 60 * 2, 540 * 2, 0)
				context.lineTo(0, 0)
				context.setFillStyle('#F2F2F2');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(0, 620 * 2)
				context.quadraticCurveTo(65 * 2, 65 * 2, 480 * 2, 0)
				context.lineTo(0, 0)
				context.setFillStyle('#30313B');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				// 右下角图形
				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(this.cwidth, this.cheight - 300 * 2)
				context.quadraticCurveTo(this.cwidth - 60 * 2, this.cheight - 60 * 2, this.cwidth - 360 * 2, this.cheight)
				context.lineTo(this.cwidth, this.cheight)
				context.setFillStyle('#F2F2F2');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(this.cwidth, this.cheight - 260 * 2)
				context.quadraticCurveTo(this.cwidth - 45 * 2, this.cheight - 45 * 2, this.cwidth - 320 * 2, this.cheight)
				context.lineTo(this.cwidth, this.cheight)
				context.setFillStyle('#30313B');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				// logo图标
				var cl = await this.drawImg(this.logoIcon_gray)
				context.drawImage(cl.path, 66 * 2, 120 * 2, 134 * 2, 172 * 2)
				//渲染

				context.draw(true, () => {
					// 隐藏canvas使用image显示图片
					setTimeout(() => {
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							canvasId: 'firstCanvas',
							fileType: 'jpg',
							quality: 1,
							width: this.cwidth * 2,
							height: this.cheight * 2,
							destWidth: this.cwidth,
							destHeight: this.cheight,
							success: (res) => {
								this.canvasImg = res.tempFilePath
								
								uni.hideLoading();
							},
							fail: (res) => {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '生成失败,请重试'
								});
								this.err = JSON.stringify(res)
								console.log(res)
							}
						})
					}, 2)
				})
			},
			async createReport() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				var context = uni.createCanvasContext('firstCanvas');
				console.log(context)
				// 背景颜色
				context.rect(0, 0, this.cwidth, this.cheight);
				context.setFillStyle('#FFFFFF');
				context.fill();


				// 标题
				var infoTextHeight = 170 //设置高度
				context.save()
				context.font = "400 44px 微软雅黑";
				context.fillStyle = "#999999";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('鉴定结果基于用户提供信息得出', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()
				infoTextHeight += 44
				context.save()
				context.font = "bold 64px 微软雅黑";
				context.fillStyle = "#30313B";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('您的商品经在线初审结论为', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()
				infoTextHeight += 64
				context.save()
				context.font = "bold 108px 微软雅黑";
				context.fillStyle = "#BE9F62";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('正品', 230 * 2 + (this.cwidth - 230 * 2) / 2, infoTextHeight * 2)
				context.restore()

				// 推荐图
				var imgSmall = await this.drawImg(this.data.imgSmall)
				infoTextHeight += 67
				context.save();
				context.beginPath();
				this.roundRect(context, 110 * 2, infoTextHeight * 2, 160 * 2, 160 * 2, 10 * 2);
				context.clip(); // 通过裁剪得到圆角矩形 
				context.drawImage(imgSmall.path, 110 * 2, infoTextHeight * 2, 160 * 2, 160 * 2)
				context.restore();

				// 产品信息
				context.save()
				infoTextHeight += 30
				context.font = "bold 44px 微软雅黑";
				context.fillStyle = "#333333";
				context.textBaseline = "middle";
				context.fillText('品       牌：', 280 * 2, infoTextHeight * 2)
				context.fillText('鉴定方式：', 280 * 2, infoTextHeight * 2 + 52 * 2)
				context.fillText('证书编号：', 280 * 2, infoTextHeight * 2 + 52 * 4)
				context.fillStyle = "#BE9F62";
				context.fillText(this.data.classItem, 400 * 2, infoTextHeight * 2)
				context.fillText(this.data.productItem, 400 * 2, infoTextHeight * 2 + 52 * 2)
				context.fillText(this.data.certificate, 400 * 2, infoTextHeight * 2 + 52 * 4)
				context.restore()
				infoTextHeight += 52 * 4

				// 评分_级别
				context.save()
				context.font = "400 40px 微软雅黑";
				context.fillStyle = "#C1C1C1";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText('真伪系数值', this.cwidth / 2, infoTextHeight * 2)
				context.fillStyle = "#BE9F62";
				context.fillText('仿品', 110 * 2, infoTextHeight * 2)
				context.fillText('正品', 110 * 2 + 460 * 2, infoTextHeight * 2)

				// 评分_级别_虚线
				context.lineWidth = 1 * 2;
				context.setLineDash([5, 10]);
				context.strokeStyle = '#C1C1C1';
				context.beginPath()
				context.moveTo(160 * 2, infoTextHeight * 2)
				context.lineTo(160 * 2 + 110 * 2, infoTextHeight * 2)
				context.closePath()
				context.stroke()
				context.beginPath()
				context.moveTo(420 * 2, infoTextHeight * 2)
				context.lineTo(420 * 2 + 110 * 2, infoTextHeight * 2)
				context.closePath()
				context.stroke()
				context.restore()

				// 评分_圆角矩形
				infoTextHeight += 40
				context.save()
				this.roundRect(context, 110 * 2, infoTextHeight * 2, 460 * 2, 14 * 2, 14 * 2);
				var linearGradient = context.createLinearGradient(110 * 2, infoTextHeight * 2, 110 * 2 + 460 * 2,
					infoTextHeight * 2);
				linearGradient.addColorStop(0, 'rgba(190, 159, 98, 0.2)');
				linearGradient.addColorStop(1, 'rgba(190, 159, 98, 1)');
				context.fillStyle = linearGradient;
				context.fill();
				context.restore()

				// 评分_分割线
				context.save()
				context.lineWidth = 1 * 2;
				context.strokeStyle = '#FFFFFF';
				for (let i = 1; i < 10; i++) {
					context.beginPath()
					context.moveTo(110 * 2 + 46 * i * 2, infoTextHeight * 2)
					context.lineTo(110 * 2 + 46 * i * 2, infoTextHeight * 2 + 14 * 2)
					context.closePath()
					context.stroke();
				}
				context.restore()

				// 评分_指示
				var signpost = await this.drawImg(this.addressIcon)
				context.drawImage(signpost.path, 110 * 2 + 46 * this.data.mark * 2 - 10 * 2, infoTextHeight * 2 - 8 * 2,
					19 * 2, 26 * 2)

				// 评分_分数
				infoTextHeight += 36
				context.save()
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#BE9F62";
				context.textAlign = "center";
				context.textBaseline = "middle";
				for (let i = 0; i <= 10; i++) {
					context.fillText(i, 110 * 2 + 46 * i * 2, infoTextHeight * 2)
				}
				context.restore()

				// 部位选择
				infoTextHeight += 36
				var checkIcon = await this.drawImg(this.checkIcon)
				var checkIconSrc = checkIcon.path
				context.save()
				context.font = "400 44px 微软雅黑";
				context.fillStyle = "#BE9F62";
				context.textAlign = "left";
				context.textBaseline = "top";
				var rowLen = 0
				for (let i = 0; i < this.data.position.length; i++) {
					// 第几行
					var flag = parseInt((i) / 3)
					var k = Math.floor((i) % 3)
					//获取总行数
					rowLen = flag
					// infoTextHeight += 80 * flag
					context.drawImage(checkIconSrc, 90 * 2 + 170 * 2 * k, infoTextHeight * 2 + 80 * flag, 22 * 2, 22 * 2)
					context.fillText(this.data.position[i], 120 * 2 + 170 * 2 * k, infoTextHeight * 2 + 80 * flag)
				}
				context.restore()

				// 描述
				infoTextHeight = infoTextHeight * 2 + 80 * (rowLen + 1) + 80 * 2
				// 获取矩形高度
				var descHeight = 0

				// 描述_文字_副本_获取文字高度
				context.save()
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#FFFFFF";
				// for (let i = 0; i < this.data.desc.length; i++) {
				// var str = (i + 1) + '.'
				// context.fillText(str, 80 * 2, infoTextHeight + this.initHeight)
				this.drawText(context, this.data.desc, infoTextHeight + this.initHeight, 40 * 2, 120 * 2, "#ffffff")
				// }
				descHeight = this.initHeight
				context.restore()

				// 描述_圆角矩形
				context.save()
				context.fillStyle = "#F8F4EE";
				this.roundRect(context, this.cwidth / 2 - 550 * 2 / 2, infoTextHeight - 100, 550 * 2, descHeight + 120, 10 *
					2);
				context.fill();
				context.restore()

				// 描述_文字
				context.save()
				this.initHeight = 0
				context.font = "400 36px 微软雅黑";
				context.fillStyle = "#BE9F62";
				// for (let i = 0; i < this.data.desc.length; i++) {
				//   var str = (i + 1) + '.'
				//   context.fillText(str, 80 * 2, infoTextHeight + this.initHeight)
				this.drawText(context, this.data.desc, infoTextHeight + this.initHeight, 40 * 2, 100 * 2, "")
				// }
				context.restore()

				// 备注
				// 备注_圆角矩形
				infoTextHeight = infoTextHeight + this.initHeight + 180
				context.save()
				context.fillStyle = "#F2F2F2";
				this.roundRect(context, this.cwidth / 2 - 550 * 2 / 2, infoTextHeight - 80, 550 * 2, 200 * 2, 10 * 2);
				context.fill();
				context.restore()
				// 备注_文字
				context.save()
				this.initHeight = 0
				for (let i = 0; i < this.desc.length; i++) {
					this.drawText(context, this.desc[i], infoTextHeight + this.initHeight, 40 * 2, 100 * 2, "#666666")
				}
				context.restore()

				// 公司名字
				infoTextHeight += this.initHeight + 60
				context.save()
				context.font = "bold 36px 微软雅黑";
				context.fillStyle = "#333333";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText(this.company, this.cwidth / 2, infoTextHeight)
				context.restore()

				//获取动态高度
				this.cheight = infoTextHeight + 100

				// 边框
				context.strokeStyle = '#DFC084';
				context.save()
				var lineWidth = 2 * 2
				context.lineWidth = 2 * 2;
				context.strokeRect(lineWidth, lineWidth, this.cwidth - lineWidth * 2, this.cheight - lineWidth * 2);
				context.restore()
				// 左上角图形
				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(0, 690 * 2)
				context.quadraticCurveTo(60 * 2, 60 * 2, 540 * 2, 0)
				context.lineTo(0, 0)
				context.setFillStyle('#DFC084');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(0, 620 * 2)
				context.quadraticCurveTo(65 * 2, 65 * 2, 480 * 2, 0)
				context.lineTo(0, 0)
				context.setFillStyle('#30313B');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				// 右下角图形
				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(this.cwidth, this.cheight - 300 * 2)
				context.quadraticCurveTo(this.cwidth - 60 * 2, this.cheight - 60 * 2, this.cwidth - 360 * 2, this.cheight)
				context.lineTo(this.cwidth, this.cheight)
				context.setFillStyle('#DFC084');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				context.save()
				context.lineWidth = 2 * 2;
				context.beginPath();
				context.moveTo(this.cwidth, this.cheight - 260 * 2)
				context.quadraticCurveTo(this.cwidth - 45 * 2, this.cheight - 45 * 2, this.cwidth - 320 * 2, this.cheight)
				context.lineTo(this.cwidth, this.cheight)
				context.setFillStyle('#30313B');
				context.closePath();
				context.stroke()
				context.fill();
				context.restore()

				// logo图标
				var cl = await this.drawImg(this.logoIcon)
				context.drawImage(cl.path, 66 * 2, 120 * 2, 134 * 2, 172 * 2)
				//渲染
				context.draw(true, () => {
					// 隐藏canvas使用image显示图片
					setTimeout(() => {
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							canvasId: 'firstCanvas',
							fileType: 'jpg',
							quality: 1,
							width: this.cwidth * 2,
							height: this.cheight * 2,
							destWidth: this.cwidth,
							destHeight: this.cheight,
							success: (res) => {
								this.canvasImg = res.tempFilePath
								uni.hideLoading();




								// 上传图片
								let that = this;
								wx.uploadFile({
									// url:"http://wxhf.var365.cn/api/upload/upload",
									url: that.$upLoadUrl,
									filePath: that.canvasImg,
									name: 'file',
									header: {
										"content-type": "multipart/form-data"
									},
									formData: {
										//和服务器约定的token, 一般也可以放在header中
										'pathname': 'lisence',
									},
									success(res) {
										var pic = JSON.parse(res.data)
										//that.canvasImg = pic.data;
										console.log(pic.data, '898989');
									},
									fail: function(error) {
										console.log(error);
									}
								})
								console.log(this.canvasImg, 'this.canvasImg');
								// 上传图片结尾



							},
							fail: (res) => {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '生成失败,请重试'
								});
								this.err = JSON.stringify(res)
								console.log(res)
							}
						})
					}, 200)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.imglist {
		position: relative;
		width: 100%;
		height: 620upx;
		margin-bottom: 30upx;

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
			background:rgba(0,0,0,.4);
		}
	}

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

	.report {
		position: relative;
		width: 690upx;
		margin: 40upx auto;
		overflow: hidden;
		padding-bottom: 120upx;

		&.nopd {
			padding-bottom: 0;
		}

		canvas {
			position: absolute;
			right: -66666px;
		}

		image {
			width: 100%;
			margin-bottom: 30upx;
		}

		.start-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 99999;
			width: 100%;
			line-height: 100upx;
			text-align: center;
			background: #35363B;
			color: #D5BD94;
			font-size: 30upx;
			font-weight: bold;
			margin: 0 auto;
		}
	}
</style>
