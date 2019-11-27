import Vue from "vue";
import Router from "vue-router"

// 引入组件
import login from '@/views/login'
import register from '@/views/register'
import welcome from '@/views/welcome'

import home from '@/views/home/home'
import choose from '@/views/home/choose'
import parts from '@/views/home/parts'

import cart from '@/views//cart/cart'

import my from '@/views/my/my'
import order from '@/views/my/order'
import author from '@/views/my/author'
import userInfo from '@/views/my/userInfo'
import address from '@/views/my/address'
import contact from '@/views/my/contact'

import information from '@/views/information/information'

import goodDetail from '@/components/goodDetail'
import news from '@/components/news'
import orderDetail from '@/components/orderDetail'

Vue.use(Router)
export default new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'welcome',
        component: welcome,
        meta: { isLogin: false }
    }, {
        path: '/home',
        name: 'home',
        component: home,
        meta: { isLogin: false },
    }, {
        path: '/cart',
        name: 'cart',
        component: cart,
        meta: { isLogin: false },
    }, {
        path: '/my',
        name: 'my',
        component: my,
        meta: { isLogin: false },
    }, {
        path: '/goodDetail',
        name: 'goodDetail',
        component: goodDetail,
        meta: { isLogin: false }
    }, {
        path: '/order',
        name: 'order',
        component: order,
        meta: { isLogin: true }
    }, {
        path: '/author',
        name: 'author',
        component: author,
        meta: { isLogin: false }
    }, {
        path: '/choose',
        name: 'choose',
        component: choose,
        meta: { isLogin: false }
    }, {
        path: '/information',
        name: 'information',
        component: information,
        meta: { isLogin: false },
    }, {
        path: '/news',
        name: 'news',
        component: news,
        meta: { isLogin: false }
    }, {
        path: '/parts',
        name: 'parts',
        component: parts,
        meta: { isLogin: false }
    }, {
        path: '/login',
        name: 'login',
        component: login,
        meta: { isLogin: false }
    }, {
        path: '/register',
        name: 'register',
        component: register,
        meta: { isLogin: false }
    }, {
        path: "/userInfo",
        name: "userInfo",
        component: userInfo,
        meta: { isLogin: true }
    }, {
        path: "/address",
        name: "address",
        component: address,
        meta: { isLogin: true }
    }, {
        path: "/contact",
        name: "contact",
        component: contact,
        meta: { isLogin: false }
    }, {
        path: "/orderDetail",
        name: "orderDetail",
        component: orderDetail,
        meta: { isLogin: false }
    }, {
        path: '*',
        redirect: '/home',
        meta: { isLogin: false }
    }]
});