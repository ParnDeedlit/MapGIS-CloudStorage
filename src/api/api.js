import axios from 'axios'
export const requestLogin = params => { 
    return axios.post('/users', params)
            .then(res => res.data)
                                 }
 