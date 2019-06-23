import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求 拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应 拦截
service.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code === 0) {
      return response.data
    } else {
      Notification.error({
        title: '错误',
        message: msg
      })
      return Promise.reject()
    }
  },
  error => {
    Notification.error({
      title: '错误',
      message: '服务器错误，请刷新后重试'
    })
    return Promise.reject(error)
  }
)

export default service
