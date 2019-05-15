import { users } from "../../mock/data/user";
const login = {
  state: {
    username: sessionStorage.getItem("username"),
    role: sessionStorage.getItem("role"),
    newrouter: "",
    addRouters: []
  },
  mutations: {
    setUserName(state, username) {
      state.username = username;
    },
    setRole(state, role) {
      state.role = role;
    }
  },
  actions: {
    logins(context, info) {
      let {commit,state}=context;
      return new Promise((resolve,reject)=>{
        let data={};
        let validate=false;
        let userName="guest";
        let  userRole="user";
        for(let i=0;i<users.length&& !validate;i++){
          let item=users[i];
          if(item.username===info.username && item.password===info.password){
            userName=item.username;
            userRole=item.role;
            validate=true;
            break;
          }
        }
        if(validate){
          commit("setUserName",{username:userName});
          commit("setRole",{role:userRole});
          data={username:userName,role:userRole};
          resolve(data)
        }else{
          commit("setUserName",{username:userName});
          commit("setRole",{role:userRole});
          data={username:userName,role:userRole};
          reject(data)
        }
      }) 
    }
  }
};

export default login;
