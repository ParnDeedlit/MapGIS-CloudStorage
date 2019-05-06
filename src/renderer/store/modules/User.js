const state = {
  name: "guest",
  role: "guest",
  token: "",
  auth2: "",
}

const mutations = {
  GET_TOKEN (state, payload) {
    state.token = state.token != ""? state.token: "";
  },
  CHANGE_TOKEN (state, payload) {
    state.token = payload.token;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
