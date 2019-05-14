import { users } from "../../mock/data/user";
import router, { adminRouter } from "../../router";

//判断用户权限是否存在
/*function hasPermission(roles,route) {
  if(route.props && route.props.roles) {
      return roles.some(roles => route.props.indexOf(roles) >= 0)
  } else {
      return true
  }
}
//根据角色过滤路由
function filterRouter(adminRouter,roles) {
  const accessedRouters = adminRouter.filter(route => {
      if(hasPermission(roles,route)){
          if(route.children && route.children.length){
              route.children = filterAsyncRouter(route.children,roles)
          }
          return true
      }
      return false
  })
  return accessedRouters
}
*/

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
    /* setNewRouter(state,router){
     state.addRouters = router
     state.routers = router.concat(routers)
  }
  */
  },
  actions: {
    logins({ commit }, info) {
      return new Promise((resolve, reject) => {
        let data = {};
        users.map(function(item) {
          if (
            item.username === info.username &&
            item.password === info.password
          ) {
            commit("setUserName", item.username);
            sessionStorage.setItem("username", item.username);
            commit("setRole", item.role);
            sessionStorage.setItem("role", item.role);
            data = { username: item.username, role: item.role };
            console.log(data);
            return data;
          } else {
            return data;
          }
        });
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    }
    /*Roles({ commit }, newrouter){
    return new Promise((resolve, reject) => {
      commit('setNewRouter',newrouter); //存储最新路由
      resolve(newrouter);
    }).catch(error => {
        reject(error);
    });
},*/
    //根据角色形成新的路由表
    /*routes({commit},data){
  return new Promise(resolve => {
      const roles = data.map(item => {
          return item.name
      })
      let accessedRouters;
      if(roles.indexOf('admin') >= 0){
          accessedRouters = adminRouter
      } else {
          accessedRouters = filterRouter(adminRouter,roles)
      }
      commit('setNewRouter',accessedRouters)
   console.log(accessedRouters);
      resolve()
  })
}*/
  }
};

export default login;
