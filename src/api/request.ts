import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Dialog, Toast } from 'vant'

// 创建axios
const request = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 120000
})

// 拦截请求
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if (localStorage.AccessToken) {
    // config.headers.Authentication = localStorage.AccessToken
    config = Object.assign({}, config, {
      headers: {
        // Authentication: localStorage.AccessToken
        Authorization: import.meta.env.VITE_GITHUB_TOKEN // Your Github Token
      }
    })
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 拦截响应
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { code } = response.data
    // if (code === 0) {
    //   return response.data
    // } else {
    //   Toast((response.data && response.data.msg) || '请求失败')
    //   return Promise.reject(response)
    // }
    return response
  },
  (error) => {
    console.log('err-----' + error)
    if (error.response.data?.code === 1000) {
      Dialog.confirm({
        title: '提示',
        showCancelButton: false,
        message: '登录过期，请重新打开应用'
      }).then(() => {})
    } else if (error.response.data?.code === 40029) {
      Toast('无效的code，请重新登录')
    } else {
      Toast(
        error.msg || (error.response.data && error.response.data.msg) || '请求出错，请稍后重试！'
      )
    }
    return Promise.reject(error)
  }
)

export default request
