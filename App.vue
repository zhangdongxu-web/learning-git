<script>
	export default {
		onLaunch() {

			//隐藏底部导航栏
			uni.hideTabBar()
			console.log('App Launch')
			wx.getSystemInfo({
				success: res => {
					this.globalData.statusBarHeight = res.statusBarHeight
					// 判断是否全面屏
					if (res.statusBarHeight > 40) {
						this.globalData.fullScreen = true
					} else {
						this.globalData.fullScreen = false
					}
				}
			})
			const value = uni.getStorageSync('isuser');
			if (value == "0") {
				this.globalData.navbar_list = this.globalData.navbar_admin
				this.globalData.sort = 0
				uni.switchTab({
					url: '/pages/appraisalPool/appraisalPool'
				})
			} else {
				this.globalData.navbar_list = this.globalData.navbar_user
				this.globalData.sort = 1
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onShow() {
			const value = uni.getStorageSync('isuser');
			if (value == "0") {
				this.globalData.navbar_list = this.globalData.navbar_admin
				this.globalData.sort = 0
			} else {
				this.globalData.navbar_list = this.globalData.navbar_user
				this.globalData.sort = 1
			}
			console.log('App Show', value)
		},
		onChageState() {
			const value = uni.getStorageSync('isuser');
			if (value == "0") {
				this.globalData.navbar_list = this.globalData.navbar_admin
				this.globalData.sort = 0
			} else {
				this.globalData.navbar_list = this.globalData.navbar_user
				this.globalData.sort = 1
			}
			this.globalData.now_page_index = 0;
		},
		onHide() {
			console.log('App Hide')
		},
		globalData: {
			fullScreen: false, //是否全面屏
			now_page_index: 0, //底部导航状态
			statusBarHeight: '', //顶部导航栏高度
			//img_src: "http://wxhf.var365.cn", //服务器图片地址
			img_src:"https://www.bopo.com",
			sort: 1, //用户权限  1用户 0鉴定师
			navbar_user: [{
					path: '/pages/index/index',
					name: '首页',
					iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAP1BMVEUAAADDw8PBwcHAwMDBwcG/v7/AwMDCwsK/v7/AwMDDw8PBwcHAwMDBwcHBwcG/v7/CwsLBwcG/v7/CwsLBwcHAA5h2AAAAFHRSTlMAP8DwgBDgXyCfbpC/sKAwUM/McGJs5MoAAADLSURBVEjH7c/dDoIwDIZhunU/OBio3/1fqwnUbAniamLigXuP6MYTytD7fguP0zRy/ICECdJEOuGCR5UPCsJ2ezcHopCFqYhnt88xWWFNEhpnVXGsrptMSLW/jgkxq35xJ4RkVrG5kDYbZcyFKNhzuEcFEZbqOfL7jy0plKH6MXcG5P64jwHoVMh9R3+LHElOj8hCskGNLEqkRARYs+WBpEemPHWkQ0x7F8BfthJwlUMPLAeU0Ww4FG3L8PBC8Wz2brbKyyGvQ+93PQArWhxTbkKFEAAAAABJRU5ErkJggg==',
					selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAqFBMVEUAAAA0NTo0NDgzNTo0NjozNTowMDA0Njo1NTowMDjJq3k0NjrJqnnJq3g1NTrJrHnMrHnKsHvIqnjIqnnJq3jIq3g1NTrKq3czNjnKq3fZsXahimhNSEXIq3lAPz/JqngzNDnIq3nJqniPfF80NTs0NDtYUkbMrXrMs3PJq3k1NjuljWlYUkqjjWg0NTq/o3SId1x6bFdHREI+PT89PD6RfmFRS0ZQS0Z3t5qHAAAAKXRSTlMAwEDwgF8Q4J8g7LDdVDAvJAn2yaqVkF5QOgbu5tHQzMzIx6aPcFQZFG/zpN8AAAEtSURBVEjH7dLZcoMgFIBhUVBwiZo96b6XozbN0vb936yTSsUUETrTi174X3FgvoEZdYb+SSNMEaKY/YIQBCLk2gmfBNAqIBYEe3CMEtclVDIzCbBfz2zuCWYkRLenxqhybGJMeb+RCYKW9g/3qfJNzCySxMyoGKkkFux7eGBG0LB5e2b45LJ1tsryk1/4njhKEYAvlslsEvJj4cV0kctzpiAEUF+1uuLt4kSe69DTlP/sJjWgNORq46QXPce8q3Hag/Jb3l2Y6dGM65qsdeiR61vo0F0PinXojPd0qUFFHzo3ok0h2jRbpQlVexDt36zRAWSVJaoADuVXO4CtPSrlakB2aFvUvQK8N6sPsbkDGCmIQtMLQOfgKDHPhLDToXCE6q69VoHYxEtn6E/6BMN3jDzywJmlAAAAAElFTkSuQmCC'
				},
				{
					path: '/pages/mine/mine',
					name: '我的',
					iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAM1BMVEUAAADDw8PBwcG/v7+/v7/BwcG/v7/CwsLBwcHCwsLAwMDAwMDAwMDAwMDCwsLBwcHBwcH389CwAAAAEHRSTlMAP8AgEKAwcLBg8ODQz1BvKZAV1QAAAQdJREFUSMftlcsWwyAIRINvE23m/7+22E36AJoel80sJTeOILhcMhRqdB3oLtZwEiGHJzk6gXiHNxX/jbmtj99n4i8T5QbWerOZHazonzaOYO0WkwG09LqWNl7MhrfhLHzkcpxSdehXZqQAU+uwrMRaEOvGDotSHwBJDiUOkbZR1JxHZasAwKvH5aDkvI4sqGpAlR1ks4JRPhLpEMk+tuNIcv66sAxAZ47wPPTdXptIxHzK7eJ2oE5co4kLO9UaSwE2vQl/bfeut7s9WOwR1pURZlDysMxnxnLfKY2xvPdjLFvyRXkAbFF5QeiHR60B7fGo/aESmQpKz9iSqGYSSkfVzWbKculNd1KvF4N/1jUKAAAAAElFTkSuQmCC',
					selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAflBMVEUAAAAgICAgICEgICAgICEgICEgICAgICEgICEgICEgICDJq3ggICDJq3ggICAgICHPr4AxLirJq3jJrHnJq3jIq3nJqnlDPTStlGsgICLKqnggICDHr3jIqnggICLIq3fJq3kgICKpkWi+onM/OTFKQze0mm6giWOAb1NfVEJm7+3PAAAAIHRSTlMAP8AgcLAQ8NCgMMBQn2DgEPl/UPDgz8rIn2BfIJCAT1UCUZkAAAF4SURBVEjH7ZXXdoMwDIZtwIBxIHunrc3IeP8XrERz2gCS4b75bzhYfGjZsnjLo/h8DFLn0uB4jiciMnAvCuQEJASkKxWOMbOk/X0k4ctMRim+JTM/EzmQDl8ca1yJxpg0665lcz81w8jiQS0xSzbCMAGGMgCVYMiMLX36Wa9yY/LV19MXRKiY/kAUbT6X3P4qv7R5gUlyjjQ+P2xHK1zTjKsY/gaBL4ztySwgXTDGBFS0VVjs7EA7oKDLBQHpthvGEjJtBzWdkhQnS+okJN2NOaa0oaEN1i8lIEhVrC2jNZoZKOegnIEwPMNBBsNjCmFZYSGYkvMQlpxp7pZjtthcZhsdOOjAbCNMas9Be+cUezRKminZoyGUc8uKYqolOuKPe0NBNR5332BpqoGfBgeLf4TVZS+f5ZTB5x7XP+T6cARDjuX6fivBx+1eE2OZUKiYC8AvqTqInHqpFfrnUtNFLP6fMukVs8f9SigocSPKCOhzhFLirb6+AWr6Zjso04tTAAAAAElFTkSuQmCC'
				}
			],
			navbar_admin: [{
					path: '/pages/appraisalPool/appraisalPool',
					name: '鉴定池',
					iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAdVBMVEUAAADAwMC+vr7BwcG/v7/AwMDAwMDCwsLDw8O/v7/CwsLBwcHAwMDBwcHBwcHCwsLAwMDAwMC8vLzAwMDBwcHBwcG/v7/AwMDAwMDAwMDAwMDBwcHBwcHAwMDBwcG9vb22tra2trbBwcHBwcG8vLz////BwcFDYWNkAAAAJnRSTlMA8BDAMODQYEAgULGekH9wrDgL6KCYJWk+28aIGdSDSxUEuHdYAZEIA5oAAAHeSURBVEjH7VXpeoIwECTmIMiNgFe12mPe/xFrQLMbFNu//dr5lRAmuzO7LNE//hQWcZFKAUDLrFQ/oiwzAQ6d2W85BvfQ8eI5yYUxxdK615Qt2zGsWM4SVKGiWJZJ+DAfeDKZIWmIx8ZoF8zO6dEzfua4IL5PrbyczQtWLlg2fQjkbJusu6p6V58smLM1DzkCSP2u2a9Gz9I6IrSTDBcCED618w43bF8nLOZGDgjl40hgdXzt67VbbMLC6wUTBKreHngbXz11wO4UJESyJBeUrOj6pgLWvC9JBS0d1sDRb2qBtzNP0HtRBF52AKl/2eHwwkgxIH12zJQK6P3mXMH0YTnNuAIQBaSapKcwFIm/awBFj98H7eSKbB5GSoE4aI6dv/zo5XrPpFfHuzsFuquZG4FV8B1JoKSalSzUFqg2SeN6EDjw9rOsOAV1kUOtAZjUpZwBW2aLBtpJUxFL4gLdX1necxl0QSIAw1jNR3Uw3a3Ww2K8ADZ0BSaQfLrt9rInThFxxCBdEzT05bbTwSrCix4dU8moqDTdvp1GdDJ4liX3B4UAoGfmXomBFp6qgYJ0frrJ6xSKrRvm1sbXX4heRk9gJe6hSc0cLdfgEC1FeYakbKUUgJRpqaJ//Fp8AeA0OP9stlTsAAAAAElFTkSuQmCC',
					selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAS1BMVEVHcEw1NjozMzkzNDjCpXY0NTpMRj00NTo0NTo1NTrKrXiOfGCZhGTJq3jKq3jJqnlqYFDJq3k1NjuymW9vYlJAPj9TTUeijGiDc1oaXhqGAAAAEXRSTlMA8SlE/bgQYtuKOv7QvoTVtifzQzQAAAHdSURBVEjH7ZXZcoMwDEUDxhtb6g37/7+0sgVYJJCmb51p9MAk2Id7JQtxu33iX0WrNVfW2oZzzd4jpGosiYbLn5kDgaG0eA3JvItL1sJvwaRWKPdCrYWtmktxTLBwvL22pk/VS1UuSsLggacLQmexE4tMZmuXJrKYPinAw73+KKaetdr6oL6fp7vB6Ka5X2HBHykBp6Ny0USP+13yaXAI3mfkQKuh9iHRBhgxo4DzIWcefIeYmfrisKGFgrJZBiqrqZiRZckXt/vsMYdqEIT1ZgwZ75yLHqjObDEXQ4oK7TLGLDYM+HgPDvfbZhI5dVYz0vO+Fq1NmymgXKXuvd5rnItZGUM3DtZGQ7Rk7Rlw11FoT9+4qlpiDDsEdSAmFlIzgAYKDbVv+GEpHe05CqUKQXqLoYXYStYR1fI/1OqJQKVgZ0hbeseUEjmnLEVKG4Hy0SFETte4QDsi9z1ZLW1UGs9T42CBCOEMIlRp2LBq+XrSxy4vQ4hQnRtSXNPyVefxLZS0p2nE7pJBKkRzESVNeTEmfXfK+ItptE6ckJ6xIS+o87kncLw1wyE1N5bpzi/HuWDr6P4ax3Ga4MLxhnr95ZC4y4YyWprwBlIwbn/7fcKhoXn2pd7+En7iT8Y3WFNB4t8uuHwAAAAASUVORK5CYII='
				},
				{
					path: '/pages/orderList/orderList',
					name: '订单',
					iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAh1BMVEUAAAC9vb3CwsLAwMDAwMDBwcHAwMDAwMC+vr7CwsK1tbXBwcG+vr7BwcHDw8PBwcHBwcHBwcHAwMDBwcHAwMDBwcHBwcHAwMDCwsLBwcHAwMDBwcHAwMDCwsLBwcHAwMDCwsLDw8PAwMDCwsLCwsLAwMDAwMDAwMC/v7+/v7+9vb2+vr7BwcF+LZCxAAAALHRSTlMAH5veXt7D2w9QBMovjxG6CdbOxiitk2tJN/fr5Y6KcU0W9LKiooNgWUI0J04kI2EAAAElSURBVEjH7dDZioNAEIXhMka7o4m7RrMZsy/n/Z9vmshciGUFAgMy5LsqxJ/uLvrquR1T5RhJQDpxWupBzWtW4TZjmvyAlt1QjV85WQ5acdlrjgCU7xqhpih0W+mTgtccr4HDlbqWJtllOjAiMoKWZ8YoMJp5CKQWdZhPS5K5vV9ibDKSXYAFdTiwLZJNgck3EiNrzoqkqIoVJ/a1EJ0xYC9EOvQ5aeGJi/BYY1n5R9FywdnepWgH3uohRDV4m0yIqJxybtlItvdR5GlOIEbP1GWdPSE6YcBMiObK5jhuJESkLdZYVv73kYJ6F12BgjoSrCuSnYAtdeRAGJFkv8HqTh2VA/iXcjZkWtiA23vmCu8kun98DNE6566vy91iMqSoK/rXfgB7hElLjo4ihQAAAABJRU5ErkJggg==',
					selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAolBMVEUAAAAzNToyNDowMTgsLS3KqnkzNjvIqXgyNDkqMDQxMzczNDoxMjgxMjYzNTgzNTkyNDgtMDUzNDozNDkyMjgzNTo1NzszNDoAJCRBQUA7Oz2Me1+xmG8yNDjIqngyNDkwMzdQS0ZrYVGjjmjIq3hfWErKqnrPr4DJq3k0NTuSf2FIRUOah2W/o3Sulm1XUUlSTUe3nHF1aVbFqHdtYlKijGh7PlBvAAAAKHRSTlMA3pseET/DwbkLSs9tMV2tjCj115Lr48gE/NjWyKOIgznw47+whjAQDYHv0wAAATlJREFUSMft1dluwjAQheExCcF2EsjGTgvdOYStJX3/VyuQcpHaTKSqqqKq39Vc+JelkSzTP0NXeuLEd8n1xafwMssoJlMvQUm4FOCiR45AKdVmA0D43pFUpKRXGsbknue0DyRdqgoAEcXuiaIjtzQ6juo8hRIYOlQhgYB4nnEkxSAm3hzIqEJAOMTrAq2mRM9twxMftTtLixUXvdyaAR85YfiwNR24aJGKQW6x3zDRDa5YM5GSk71NwS/CuoVDzfYel1Z81PmlaBTcv9m8c1GEK7ZMFMBuzEWkpyubbTO2971oNNvYsFE8vNvZFIeffhqhGOc2O+4mcmevNk1ZeVOijCp89Bc1UQFExpcrFRutcySaKsIB4M+11tO11arIAc/4fRLUmSj6Svtg9XuKTEpHWeuaLAjpT/sAmHeqU/kVZXEAAAAASUVORK5CYII='
				},
				{
					path: '/pages/appraisalMine/appraisalMine',
					name: '我的',
					iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAM1BMVEUAAADDw8PBwcG/v7+/v7/BwcG/v7/CwsLBwcHCwsLAwMDAwMDAwMDAwMDCwsLBwcHBwcH389CwAAAAEHRSTlMAP8AgEKAwcLBg8ODQz1BvKZAV1QAAAQdJREFUSMftlcsWwyAIRINvE23m/7+22E36AJoel80sJTeOILhcMhRqdB3oLtZwEiGHJzk6gXiHNxX/jbmtj99n4i8T5QbWerOZHazonzaOYO0WkwG09LqWNl7MhrfhLHzkcpxSdehXZqQAU+uwrMRaEOvGDotSHwBJDiUOkbZR1JxHZasAwKvH5aDkvI4sqGpAlR1ks4JRPhLpEMk+tuNIcv66sAxAZ47wPPTdXptIxHzK7eJ2oE5co4kLO9UaSwE2vQl/bfeut7s9WOwR1pURZlDysMxnxnLfKY2xvPdjLFvyRXkAbFF5QeiHR60B7fGo/aESmQpKz9iSqGYSSkfVzWbKculNd1KvF4N/1jUKAAAAAElFTkSuQmCC',
					selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAflBMVEUAAAAgICAgICEgICAgICEgICEgICAgICEgICEgICEgICDJq3ggICDJq3ggICAgICHPr4AxLirJq3jJrHnJq3jIq3nJqnlDPTStlGsgICLKqnggICDHr3jIqnggICLIq3fJq3kgICKpkWi+onM/OTFKQze0mm6giWOAb1NfVEJm7+3PAAAAIHRSTlMAP8AgcLAQ8NCgMMBQn2DgEPl/UPDgz8rIn2BfIJCAT1UCUZkAAAF4SURBVEjH7ZXXdoMwDIZtwIBxIHunrc3IeP8XrERz2gCS4b75bzhYfGjZsnjLo/h8DFLn0uB4jiciMnAvCuQEJASkKxWOMbOk/X0k4ctMRim+JTM/EzmQDl8ca1yJxpg0665lcz81w8jiQS0xSzbCMAGGMgCVYMiMLX36Wa9yY/LV19MXRKiY/kAUbT6X3P4qv7R5gUlyjjQ+P2xHK1zTjKsY/gaBL4ztySwgXTDGBFS0VVjs7EA7oKDLBQHpthvGEjJtBzWdkhQnS+okJN2NOaa0oaEN1i8lIEhVrC2jNZoZKOegnIEwPMNBBsNjCmFZYSGYkvMQlpxp7pZjtthcZhsdOOjAbCNMas9Be+cUezRKminZoyGUc8uKYqolOuKPe0NBNR5332BpqoGfBgeLf4TVZS+f5ZTB5x7XP+T6cARDjuX6fivBx+1eE2OZUKiYC8AvqTqInHqpFfrnUtNFLP6fMukVs8f9SigocSPKCOhzhFLirb6+AWr6Zjso04tTAAAAAElFTkSuQmCC'
				}
			],
			navbar_list: [] //底部导航
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	html,
	body,
	div,
	span,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	a,
	q,
	em,
	ul,
	li,
	ol,
	dl,
	dt,
	dd,
	form,
	article,
	aside,
	embed,
	table,
	td,
	th,
	input,
	button,
	legend,
	fieldlset,
	blockquote,
	textarea,
	label,
	strong,
	img,
	cite {
		margin: 0;
		padding: 0;
		outline: none;
	}

	body {
		font-family: '微软雅黑';
		font-size: 24upx;
		line-height: 1;
		margin: 0 auto;
		color: #333333;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: normal;
		font-size: 100%;
	}

	table {
		border-collapse: collapse;
	}

	ul,
	li,
	ol,
	li {
		list-style: none;
	}

	img {
		border: none;
		vertical-align: top;
	}

	em,
	cite,
	address,
	i {
		font-style: normal;
		font-weight: normal;
	}

	a {
		text-decoration: none;
		color: #333333;
	}

	input {
		outline: none;
		border: none;
		background-color: transparent;
	}

	input::-ms-clear {
		display: none;
	}

	textarea {
		outline: none;
		resize: none;
		;
		overflow: auto;
		border: none;
		background: transparent;
	}

	.page {
		min-height: 100vh;
		box-sizing: border-box;
	}

	page,
	view {
		font-size: 24upx;
		color: #202022;
	}

	image {
		width: auto;
		height: auto;
	}

	.x_countW {
		width: 690upx;
		margin: 0 auto;
	}

	// 自定义导航栏
	.page {
		width: 100%;
		background: url(static/navtop_bg.png) no-repeat center -50upx;
		background-size: 100% 530upx;

		&.fullScreen {
			background: url(static/navtop_bg.png) no-repeat center top;
			background-size: 100% 530upx;
		}
	}

	//隐藏滚动条
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	// 一行超出隐藏
	.text-hidden1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	// 两行行超出隐藏
	.text-hidden2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	// 三行行超出隐藏
	.text-hidden3 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	/* 公共标题 */
	.count-tit {
		text-align: center;

		.h3 {
			font-size: 40upx;
			line-height: 56upx;
			color: #444444;
			font-weight: bold;

			&::before,
			&::after {
				content: '';
				display: inline-block;
				vertical-align: middle;
				width: 42upx;
				height: 1upx;
				background: #333333;
				margin: 0 30upx;
			}
		}

		.p {
			font-size: 20upx;
			color: #999999;
			line-height: 28upx;
		}
	}

	.flex {
		display: flex;
		text-align: center;
	}

	// css图标
	.css-icon {
		display: inline-block;
		height: 1em;
		width: 1em;
		font-size: 20upx;
		box-sizing: border-box;
		text-indent: -9999px;
		vertical-align: middle;
		position: relative;
	}

	.css-icon::before,
	.css-icon::after {
		content: '';
		box-sizing: inherit;
		position: absolute;
		left: 50%;
		top: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	// < 箭头
	.icon-arrow-left::before {
		height: 1.4em;
		width: 1.4em;
		border-style: solid;
		border-width: 4upx 0 0 4upx;
		-ms-transform: translate(-25%, -50%) rotate(-45deg);
		transform: translate(-25%, -50%) rotate(-45deg);
	}

	// > 箭头
	.icon-arrow-right::before {
		height: .65em;
		width: .65em;
		border-style: solid;
		border-width: 2upx 0 0 2upx;
		-ms-transform: translate(-75%, -50%) rotate(135deg);
		transform: translate(-75%, -50%) rotate(135deg);
	}

	// × 叉号
	.icon-close::before {
		width: 90%;
		border-top: 4upx solid;
		-ms-transform: translate(-50%, -50%) rotate(45deg);
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.icon-close::after {
		height: 90%;
		border-left: 4upx solid;
		-ms-transform: translate(-50%, -50%) rotate(45deg);
		transform: translate(-50%, -50%) rotate(45deg);
	}

	// √ 对勾
	.icon-check::before {
		border-style: solid;
		border-width: 0 0 2px 2px;
		height: .5em;
		width: .9em;
		-ms-transform: translate(-50%, -.375em) rotate(-45deg);
		transform: translate(-50%, -.375em) rotate(-45deg);
	}

	// 底部无数据分割线
	.no-data {
		text-align: center;
		font-size: 26upx;
		color: #666;
		padding: 20upx 0;

		&::after,
		&::before {
			content: '';
			display: inline-block;
			vertical-align: middle;
			width: 120upx;
			height: 1upx;
			background: #666;
			margin: 0 30upx;
		}
	}
</style>
