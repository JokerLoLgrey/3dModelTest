import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)

const timeFormatter = (time, connector = '/') => {
  let timeShow = null
  if (time) {
    timeShow = new Date(time)
  } else {
    timeShow = new Date()
  }
  const timeStamp = timeShow.getTime()
  const year = timeShow.getFullYear()
  const month = timeShow.getMonth() + 1
  const date = timeShow.getDate()
  const hour = timeShow.getHours()
  const minute = timeShow.getMinutes()
  const second = timeShow.getSeconds()
  const fullDate = `${year}${connector}${month > 9 ? month : `0${month}`}${connector}${date > 9 ? date : `0${date}`}`

  return {
    timeStamp,
    year,
    month,
    date,
    hour,
    minute,
    second,
    fullDate
  }
}

const getGoToUrl = (userInfo, url, params) => {
  let newUrl = ''
  if (url !== '#') {
    newUrl = url
    if (params && params.length > 0) {
      params.forEach(
        item => {
          if (userInfo) {
            const key = item.replace('{', '').replace('}', '')
            if (key) {
              const value = userInfo[key]
              if (value) {
                newUrl = newUrl.replace(item, value)
              }
            }
          }
        }
      )
    }
  }
  return newUrl
}

const system = {
  brand: md.mobile(), // 手机品牌
  model: md.mobile(), // 手机型号
  system: md.os(), // 操作系统版本
  pixelRatio: window.devicePixelRatio, // 设备像素比
  screenWidth: window.screen.width, // 屏幕宽度
  screenHeight: window.screen.height, // 屏幕高度
  windowWidth: document.documentElement.clientWidth, // 可使用窗口宽度
  windowHeight: document.documentElement.clientHeight, // 可使用窗口高度
  platform: navigator.platform, // 客户端平台
  language: navigator.language, // 微信设置的语言
  ua: md.ua
}

const getZcly = () => {
  let zcly = 1
  if (system.ua.indexOf('MicroMessenger') !== -1) {
    zcly = 1
  }
  if (system.ua.indexOf('AlipayClient') !== -1) {
    zcly = 2
  }
  return zcly
}

export default {
  timeFormatter,
  getGoToUrl,
  system,
  getZcly
}
