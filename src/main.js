import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// 引入 axios 用于ajax请求
import axios from 'axios'
Vue.prototype.$axios = axios
// 设置 请求的公共地址
Vue.prototype.$baseUrl = 'http://view.lovingliu.cn/lovingmall/'
// 引入自定义的全局变量及方法
import common from './function/common.js'
Vue.prototype.$common = common

// 引入第三方插件
import '@/lib/rem/rem.js'

// 引入moment时间插件，用于格式化时间，全局使用，例：{{item.addTimer | dateformat（YYYY-MM-DD HH:mm:ss）}}
import moment from 'moment'
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

// 引入本地全局样式
import "@/assets/css/reset.css"
import "@/assets/fonts/iconfont.css"


//引入UI组件
import "./assets/css/swiper.min.css"
import "./assets/js/swiper.min.js"

import Vant from 'vant'
import { Dialog } from 'vant'
import 'vant/lib/index.css'

import { Lazyload } from 'vant';
Vue.use(Vant)
Vue.use(Lazyload)


Vue.config.productionTip = false

// 进入每一条路由之前先判断是否登录
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    // 1.设置cookie
    const cookieName = 'lovingUser'
    let cookieValue = common.getCookie(cookieName)

    if (cookieValue) {
      // 2.cookie 存在
      // 2.1 sessionStorage 用户不存在
      let userInfoStr = sessionStorage.getItem("userInfo")
      if (userInfoStr) {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        console.log('userInfo',userInfo)
        if (!store.state.isLogin) { // 防止刷新之后 vuex更新
          store.dispatch("userLogin",userInfo)
        }
        if (to.path == "/login") {
          Dialog.alert({
            message: "请先退出登录"
          }).then(() => {
            next({ path: "/my" });
          })
        } else {
          next()
        }
      }else {
        if (to.path !== "/login") {
          store.dispatch("userLogout")
          next({ path: "/login" })
        }else {
          next()
        }
      }
    } else {
      // cookie不存在
      sessionStorage.removeItem("userInfo")
      store.dispatch("userLogout")
      if (to.meta.isLogin) {
        Dialog.alert({
          message: "请先登录"
        }).then(() => {
          // on close
          next({ path: "/login" })
        });
      } else {
        next()
      }
    }
  } else {
    let userInfoStr = sessionStorage.getItem("userInfo")
    if (userInfoStr) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      console.log('userInfo',userInfo)
      if (!store.state.isLogin) { // 防止刷新之后 vuex更新
        store.dispatch("userLogin",userInfo)
      }
      next()
    }else {
      if (store.state.isLogin) { // 防止刷新之后 vuex更新
        if (to.path !== "/login") {
          store.dispatch("userLogout")
          next({ path: "/login" })
        }else {
          next()
        }
      }else {
        next()
      }
    }
  }
});

// 进入路由后跳到该页面顶部，多余的东西，想删就删
router.afterEach(route => { window.scroll(0, 0) })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
