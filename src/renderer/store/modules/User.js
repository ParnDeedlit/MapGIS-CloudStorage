import { users } from "../../mock/data/user";
import { addRouters } from "../getters";

const state = {
  name: "guest",
  role: "guest",
  token: "",
  auth2: ""
};

const mutations = {
  SET_USER_NAME(state, payload) {
    state.username = payload.username;
  },
  SET_USER_ROLE(state, payload) {
    state.role = payload.role;
  }
};

const actions = {
  //context是固定语法，表示全局上下文, 第二个是传递的参数
  loginAsyncTask(context, info) {
    let { commit, state } = context;
    return new Promise((resolve, reject) => {
      let data = {};
      let isValidUser = false;
      let userName = "guest",
        userRole = "guest";
      for (let i = 0; i < users.length && !isValidUser; i++) {
        let item = users[i];
        if (
          item.username === info.username &&
          item.password === info.password
        ) {
          userName = item.username;
          userRole = item.role;
          isValidUser = true;
          break;
        }
      }
      if (isValidUser) {
        commit("SET_USER_NAME", { username: userName });
        commit("SET_USER_ROLE", { role: userRole });
        data = { username: userName, role: userRole };
        resolve(data); //尽量保证每个Promise中resolve只调用一次
      } else {
        commit("SET_USER_NAME", { username: userName });
        commit("SET_USER_ROLE", { role: userRole });
        data = { username: userName, role: userRole };
        reject(data); //尽量保证每个Promise中reject只调用一次
      }
    });
  }
};

export default {
  state,
  mutations,
  actions
};
