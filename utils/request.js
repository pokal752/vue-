import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: process.env.NODE_ENV === 'production' ? 0 : 0, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
     // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = store.getters.token
  }
  return config
}, error => {
  Promise.reject(error)
})

  // respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data && response.data.IsOk) {
      return response.data.Data
    } else {
      // 验证是否登录超时
      if (response.data.ErrCode === '-1') {
        store.dispatch('user/ClearUser').then(r => {
          router.push({name: 'login'})
        })
      }
      return Promise.reject({errorCode: response.data.ErrCode, msg: response.data.Msg})
    }
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      return Promise.reject({errorCode: '500', msg: error})
    } else {
      Message.error('服务器无响应！')
    }
  }
)

export default service
