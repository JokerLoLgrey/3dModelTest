/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios'
import { Toast } from 'vant'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}

// 请求超时时间
axios.defaults.timeout = 60000

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      return Promise.reject(error.response)
    }
  }
)

/**
* get方法，对应get请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function get (url, params, config = {}, toastConfig = {}) {
  const toastDefault = {
    loading: {
      show: true,
      message: '加载中...',
      forbidClick: true,
      duration: 0
    },
    message: {
      show: true
    }
  }
  const toast = Object.assign(toastDefault, toastConfig)
  return new Promise((resolve, reject) => {
    if (toast.loading) {
      if (toast.loading.show) {
        delete toast.loading.show
        Toast.loading(toast.loading)
      }
    }
    axios.get(url, {
      params: params
    }, config)
      .then(res => {
        Toast.clear()
        if (res.data.code === 200) {
          if (res.data.data) {
            resolve(res.data.data)
          } else {
            if (toast.message) {
              if (toast.message.show) {
                if (res.data.msg) {
                  Toast({
                    message: res.data.msg,
                    forbidClick: true,
                    duration: 3000
                  })
                }
              }
            }
            resolve('0')
          }
        } else {
          if (toast.message) {
            if (toast.message.show) {
              if (res.data.msg) {
                Toast({
                  message: res.data.msg,
                  forbidClick: true,
                  duration: 3000
                })
              }
            }
          }
          resolve('')
        }
      })
      .catch(err => {
        Toast.clear()
        reject(err.data)
      })
  })
}

/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function post (url, params, config = {}, toastConfig = {}) {
  const toastDefault = {
    loading: {
      show: true,
      message: '加载中...',
      forbidClick: true,
      duration: 0
    },
    message: {
      show: true
    }
  }
  const toast = Object.assign(toastDefault, toastConfig)
  return new Promise((resolve, reject) => {
    if (toast.loading) {
      if (toast.loading.show) {
        delete toast.loading.show
        Toast.loading(toast.loading)
      }
    }
    axios.post(url, params, config)
      .then(res => {
        Toast.clear()
        if (res.data.code === 200) {
          if (res.data.data) {
            resolve(res.data.data)
          } else {
            if (toast.message) {
              if (toast.message.show) {
                if (res.data.msg) {
                  Toast({
                    message: res.data.msg,
                    forbidClick: true,
                    duration: 3000
                  })
                }
              }
            }
            resolve('0')
          }
        } else {
          if (toast.message) {
            if (toast.message.show) {
              if (res.data.msg) {
                Toast({
                  message: res.data.msg,
                  forbidClick: true,
                  duration: 3000
                })
              }
            }
          }
          resolve('')
        }
      })
      .catch(err => {
        Toast.clear()
        reject(err.data)
      })
  })
}

/**
* 未注册用户
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function goToRegister (url, params) {
  get(url, params).then(res => {
    if (res) {
      if (res.url) {
        window.location.replace(res.url)
      }
    }
  })
}
