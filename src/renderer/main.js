import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VCharts from 'v-charts'
import extend from './extend'
import  "./assets/iconfont.js" 
import  icon  from  "./components/icon/iconfront.vue"  
import uploader from "./components/upload";
import echarts from 'echarts'

Vue.use(iView)
Vue.use(VCharts)
Vue.use(extend)
Vue.use(uploader);

Vue.component('icon', icon);

Vue.prototype.$echarts = echarts;
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  //console.log("router", to, from, next);
  if (from && from.name && from.name == "listUploads") {
    store.commit("hideUploader");
  }
  iView.LoadingBar.finish()
})


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
