import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
 

import {users} from './data/user'
 
export default {
 init() {
  let mock = new MockAdapter(axios);
  mock.onGet('/success').reply(200, {
   msg: 'success'
  });
  mock.onGet('/error').reply(500, {
   msg: 'failure'
  })
 
  // login 模拟登录接口
  mock.onPost('/user/login').reply(arg => {
    let { username, password } = JSON.parse(arg.data)
    return new Promise((resolve, reject) => {
        let token = null
        let hasUser = users.some(u => {
            if (u.username === username && u.password === password) {
                token = 'admin'
                return true
            }
        })

        if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', token: token }])
        } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }])
        }

    })
})
 }
}