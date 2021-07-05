import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/assets/js/util'
import { goToRegister } from '@/assets/js/http'
import apisObj from '@/api'
const { USER } = apisObj

Vue.use(VueRouter)

let routes = []

const routerContext = require.context('./', true, /\.js$/)

routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 不处理
  if (route.startsWith('./index.js')) {
    return
  }
  const routerModule = routerContext(route)

  routes = [...routes, ...(routerModule.default || routerModule)]
})

const noFound = {
  path: '/404',
  name: 'noFound',
  component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
}

const redirectNoFound = {
  path: '*',
  redirect: '404'
}

const routerArr = [
  noFound,
  redirectNoFound
]

routes.push(...routerArr)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

console.log(routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const userInfoStr = sessionStorage.getItem('userInfo')
  const zcly = localStorage.getItem('zcly') || util.getZcly()
  if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    if (userInfo.uid === -1) {
      goToRegister(USER.getZz, { zcly })
    } else {
      next()
    }
  } else {
    const goToRouter = location.href
    sessionStorage.setItem('goToRouter', goToRouter)
    goToRegister(USER.getZz, { zcly })
  }
})

export default router
