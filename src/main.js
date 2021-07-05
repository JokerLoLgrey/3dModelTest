import Vue from 'vue'
import VConsole from 'vconsole'
import VueWechatTitle from 'vue-wechat-title'
import App from './App.vue'
import router from './router'
import store from './store'

import { get, post } from './assets/js/http'
import util from './assets/js/util'

import 'amfe-flexible'

import './plugins/vant.js'

import 'normalize.css'

if (process.env.NODE_ENV === 'development') {
  new VConsole() // eslint-disable-line
  sessionStorage.setItem(
    'userInfo',
    JSON.stringify({
      headImgUrl:
        'http://thirdwx.qlogo.cn/mmopen/VHU8bI7BOJDlFX6kFrHichATEjHMg23iaGku4MZ0eDKvwOFiajWeyfwnicThVibrNvficER5dd4HxmfeVbtbbQ15FKWw/132',
      nickname: 'Joker',
      openId: 'oSthY1dZWz-KUkwxD4-EtVmkzuKc',
      xm: '冷冰',
      uid: 613705480962048,
      sfzmhm: '511023199212300176',
      sjhm: '17781823386',
      // uid: -1,
      zcly: 1,
      zclyValue: 'oSthY1dZWz-KUkwxD4-EtVmkzuKc'
    })
  )
}

Vue.use(VueWechatTitle)

Vue.config.productionTip = false

Vue.prototype.$get = get
Vue.prototype.$post = post

Vue.prototype.$system = util.system

Vue.prototype.$util = util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
