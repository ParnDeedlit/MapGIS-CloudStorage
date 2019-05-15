import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VCharts from 'v-charts'
import extend from './extend'

Vue.use(iView)
Vue.use(VCharts)
Vue.use(extend)

import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
    let role=store.state.user.role;
    if(to.meta.requireAuth  &&  role==="user"){
      alert('不可以看');
      next('/index')
    }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
