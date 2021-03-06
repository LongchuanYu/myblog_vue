// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './assets/bootstrap-markdown/css/bootstrap-markdown.min.css'
import './assets/bootstrap-markdown/css/custom.css' 
import './assets/icon-awesome/css/font-awesome.min.css' 
import './assets/custom.css'
import VueToasted from 'vue-toasted'
import axios from './http'
import moment from 'moment'
import swal from 'sweetalert';
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$swal = swal
Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'outline',
  // 显示在页面哪个位置
  position: 'top-right',
  // 显示多久时间（毫秒）
  duration: 2000,
  // 支持哪个图标集合
  iconPack : 'fontawesome', // set your iconPack, defaults to material. material|fontawesome|custom-class
  // 可以执行哪些动作
  action: {
    text: 'X',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
