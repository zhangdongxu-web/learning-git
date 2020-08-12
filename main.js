import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//引入插件图片放大器
import vfinger from 'v-finger-mk42';
Vue.use(vfinger);

import digitJump from './components/zhihuai-DigitJump/zhihuai-DigitJump.vue'
// 顶部自定义标题栏
import navtopHide from './components/navtop-hide/navtop-hide'
Vue.component('navtop-hide',navtopHide)

// 顶部自定义标题栏
import loginTitle from './components/login-title/login-title'
Vue.component('login-title',loginTitle)

// 头像裁剪
import cropper from './components/lxiaoxiao-cropper/cropper.vue'
Vue.component('cropper',cropper)

// 底部导航
import navBar from './components/nav-bar/nav-bar.vue'
Vue.component('nav-bar',navBar)

// 公共图表
import uEcharts from './js_sdk/u-charts/component.vue'
Vue.component('u-echarts',uEcharts)

//弹出层
import uniPopup from './components/uni-popup/uni-popup.vue'
Vue.component('uni-popup',uniPopup)

//鉴定师列表
import appraisalItem from './components/appraisal-item/appraisal-item.vue'
Vue.component('appraisal-item',appraisalItem)

//鉴定师列表
import atriclesItem from './components/atricles-item/atricles-item.vue'
Vue.component('atricles-item',atriclesItem)

// 鉴定列表
import appraisalUser from './components/appraisal-user/appraisal-user'
Vue.component('appraisal-user',appraisalUser)

//引入接口文件
import requestApi from 'utils/api.js'
Vue.$requestApi = Vue.prototype.$requestApi = requestApi

//上传图片封装
import {uploadPhoto} from 'config'
Vue.$uploadPhoto = Vue.prototype.$uploadPhoto = uploadPhoto

//ring
import ring from './components/ring/ring'
Vue.component('ring',ring)

// 登录状态判断
Vue.$isLogin = Vue.prototype.$isLogin = (callback)=>{
  const value = uni.getStorageSync('token');
  if (value == "") {
    uni.navigateTo({
      url: '/pages/login/login/login'
    })
    return 
  }else{
    callback && callback()
  }
}

// 图片点击放大封装
Vue.$previewImage = Vue.prototype.$previewImage = (path) => {
	//console.log(path)
  uni.previewImage({
	  current :0,
      urls: [path]
  });
}

//图片上传路径
Vue.$upLoadUrl = Vue.prototype.$upLoadUrl = "https://www.bopo.com/api/upload/upload"

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
