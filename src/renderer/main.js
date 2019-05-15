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

// router.beforeEach((to, from, next) => {
// //   if(store.getters.role){
// //     console.log(store)
// //     const roles = store.getters.role
// //     console.log(roles)
// //     store.dispatch('routes',roles).then(() => {
// //       console.log(store.getters.addRouters)
// //       router.addRoutes(store.getters.addRouters) 
// //       console.log(router)
// //       next()
// //      }).catch(e=>{
// //        if(e){
// //         next('/') 
// //        }
// //      })
// //     }
// iView.LoadingBar.start()
// next()
// })
// router.beforeEach((to, from, next) => {
//   console.log(store)
//   let role = store.state.user.role
//   console.log(role)
//   if(to.meta.requiresAuth && role ==='guest'){
//      alert('只有user才能看,请返回登录')
//      return next('from.path')
//   }else{
//     return next()
//   }
//   iView.LoadingBar.start()
//   next()
//     let role=store.state.user.role;
//     if(to.meta.requireAuth  &&  role==="user"){
//       alert('不可以看');
//       next('/index')
//     }
// })

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
