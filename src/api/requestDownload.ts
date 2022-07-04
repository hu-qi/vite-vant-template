import axios from 'axios'
import { useRouter } from 'vue-router'
import { Dialog, Toast } from 'vant'

const service = axios.create({
  responseType: 'blob',
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 120000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.AccessToken) {
      // config.headers.Authentication = localStorage.AccessToken
      config = Object.assign({}, config, {
        headers: {
          Authentication: localStorage.AccessToken
        }
      })
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    const code = response.data.code
    if (response.config.responseType === 'blob') {
      if (res.type === 'application/json') {
        Toast('导出文件失败，请稍后重试！')
        return Promise.reject(response)
      } else {
        return res
      }
    }
    if (code === 1013) {
      // if (loginFlag) return
      // loginFlag = true
      Toast.clear()
      Dialog.confirm({
        title: '提示',
        showCancelButton: false,
        message: '登录过期，请重新打开应用'
      }).then(() => {
        const router = useRouter()
        router.go(-1)
      })
      return Promise.reject(response)
    } else {
      Toast(response.msg || response.data.msg || '请求失败')
      return Promise.reject(response)
    }
  },
  (error) => {
    console.log('err-----' + error)
    Toast('请求出错，请稍后重试！')
    return Promise.reject(error)
  }
)

export default service
