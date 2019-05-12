import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import createLogger from "vuex/dist/logger";
import login from "./modules/login";
import count from "./modules/Counter";
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    login,
    count,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
