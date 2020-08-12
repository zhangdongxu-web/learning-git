import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

import navbar from 'components/nav-bar/nav-bar.vue'
Vue.component('nav-bar',navbar)