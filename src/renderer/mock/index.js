import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
 

import {users} from './data/user'
 
export default {
 init() {
  let mock = new MockAdapter(axios);
  // mock success request 模拟成功请求
  mock.onGet('/success').reply(200, {
   msg: 'success'
  });
  // mock error request 模拟失败请求
  mock.onGet('/error').reply(500, {
   msg: 'failure'
  })
 
  // login 模拟登录接口
  mock.onPost('/user/login').reply(config => {
   // 解析axios传过来的数据
   let { username, password } = JSON.parse(config.data);
   return new Promise((resolve, reject) => {
    // 先创建一个用户为空对象
    let user = null;
    setTimeout(() => {
     // 判断模拟的假数据中是否有和传过来的数据匹配的
     let hasUser = users.some(person => {
      // 如果存在这样的数据
      if (person.username === username && person.password === password) {
       user = JSON.parse(JSON.stringify(person));
       user.password = undefined;
       return true;
      }else {
       // 如果没有这个person
       return false
      }
     });
     // 如果有那么一个人
     if (hasUser) {
      resolve([ 200, {code: 200, msg: '登录成功',user} ]);
     } else { // 如果没有这么一个人
      resolve([ 200, {code: 500, msg: '账号错误' }])
     }
    }, 500);
   })
  });
 // 模拟注册接口
 }
}