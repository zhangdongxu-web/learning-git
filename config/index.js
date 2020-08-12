// const commonUrl = "http://192.168.3.157:7300/mock/5d81e436a44dc61edc1342ce/example" //公共路径
//const commonUrl = "http://wxhf.var365.cn/api" //公共路径
const commonUrl = "https://www.bopo.com/api";
// post请求封装
function postRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;
    uni.request({
      url: commonUrl + url,
      data: postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': uni.getStorageSync("token")
      },
      success: function(res) {
        // 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定，
        //返回什么就相应的做调整
        if (res.statusCode == 200 && res.data.code == 1000) {
          resolve(res.data);
        }else if(res.data.code == 1956 || res.data.code == 1005){
			uni.showToast({
				icon: 'none',
				title:res.data.message
			})
			setTimeout(()=>{
				uni.navigateTo({
					url: '/pages/login/login/login'
				})	
			},500)
			
		}else if(res.data.code == 1006) {
          uni.navigateTo({
            url: '/pages/login/login/login'
          })
          return
          // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据 
          //接口后面的then执行
          // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
          //不会被阻断在那里执行不下去！
          resolve(res.data);
          // if(res.data.code == 1){
          //   uni.navigateTo({
          //     url: "../IdentRoom/IdentRoom"
          //   })
          //   resolve(res.data);
          //   // reject('未登录');
          // }else{
          //   resolve(res.data);
          // }
        }else{
          resolve(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// get请求封装
function getRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;
    uni.request({
      url: commonUrl + url,
      data: postData,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': uni.getStorageSync("token")
      },
      success: function(res) {
        if (res.statusCode == 200 && res.data.code == 0) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// 上传封装
function uploadPhoto(sourceType, callback) { //sourceType可以指定来源是相册还是相机,callback回调函数
  uni.chooseImage({
    count: 1, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      uni.showToast({
        icon: "loading",
        title: "正在上传"
      });
      uni.uploadFile({
        url: this.$upLoadUrl,
        filePath: tempFilePaths[0],
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
          if (res.statusCode != 200) {
            uni.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          var data = JSON.parse(res.data);
          callback && callback(data)
          uni.hideToast();  //隐藏Toast
        },
        fail: (err) => {
          console.log(err)
          uni.hideToast(); //隐藏Toast
          uni.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        }
      })
    }
  })
}
module.exports = {
  postRequest,
  getRequest,
  uploadPhoto
}
