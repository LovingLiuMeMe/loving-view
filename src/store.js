import Vue from "vue";
import Vuex from "vuex";

import { Dialog } from 'vant';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // 初始全局状态和数据
        footerIsShow: true,
        userInfo: {},
        isLogin: false,
        // 数据保存本地防止刷新消失
        goodDetails: localStorage["goodDetails"] ? JSON.parse(localStorage["goodDetails"]) : [],
        // 购物车
        carts: localStorage["carts"] ? JSON.parse(localStorage["carts"]) : [],
        // 订单
        orders: localStorage["orders"] ? JSON.parse(localStorage["orders"]) : [],

        // 临时订单 （订单详情也需要使用）
        tempOrder: {}
    },
    mutations: { // 全局方法，控制state里的状态和数据
        // 根据路由切换底部导航栏是否显示
        NoShow: (state) => {
            state.footerIsShow = false
        },
        YesShow: (state) => {
            state.footerIsShow = true
        },
        // 保存登录用户信息
        userLogin(state, userInfo) {
            state.userInfo = userInfo
            state.isLogin = true
        },
        // 清空登录用户信息
        userLogout(state) {
            state.userInfo = {}
            state.isLogin = false
        },
        //加入购物车
        addcarts: (state, data) => {
            state.carts.push(data)
            localStorage.setItem("carts", JSON.stringify(state.carts))
        },
        //购物之后加入订单
        addorder: (state, data) => {
            // 添加到数组最前面，这样可以使订单页最新的订单在最顶部
            state.orders.unshift(data)
            localStorage.setItem("orders", JSON.stringify(state.orders))
        },
        //删除购物车商品
        shanchu: (state, index) => {
            Dialog.confirm({
                message: '确定删除该商品么？'
            }).then((action) => {
                // on confirm
                state.carts.splice(index, 1)
                localStorage.setItem("carts", JSON.stringify(state.carts))
            }).catch(() => {
                // on cancel
            })
        },
        // 清空购物车
        settlement: (state, data) => {
            Dialog.confirm({
                message: '确定清空购物车吗？'
            }).then((action) => {
                // on confirm
                state.carts = []
                localStorage.setItem("carts", JSON.stringify(state.carts))
            }).catch(() => {
                // on cancel
            })
        },
        // 订单删除
        orderdel: (state, index) => {
            Dialog.confirm({
                message: '确定删除该订单么？'
            }).then((action) => {
                // on confirm
                state.orders.splice(index, 1)
                localStorage.setItem("orders", JSON.stringify(state.orders))
            }).catch(() => {
                // on cancel
            });
        },
        // 添加临时订单
        addTempOrder: (state, order) => {
            console.log('添加临时订单',order)
            state.tempOrder = order
        }
    },
    actions: { // 应用mutations里的方法
        //获取登录状态
        userLogin({ commit }, userInfo) {
            commit("userLogin", userInfo)
        },
        userLogout({ commit }) {
            commit("userLogout")
        }
    },
    getters: { // 计算state里的值
        sum: state => {
            let sum = 0
            state.carts.forEach((cart) => {
                sum += cart.sellingPrice * cart.goodsCount
            })
            return sum
        },
        //获取登录状态
        isLogin: state => state.isLogin
    }
});