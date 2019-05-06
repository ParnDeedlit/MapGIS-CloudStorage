import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// strict: process.env.NODE_ENV !== 'production'
// import Vue from 'vue'
// import Vuex from 'vuex'

// import modules from './modules'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules,
//   strict: process.env.NODE_ENV !== 'production'
// })
