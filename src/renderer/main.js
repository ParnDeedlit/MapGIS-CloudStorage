import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import Mock from './mock'
Mock.init()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

