<template>
    <div class="my">
        <van-nav-bar title="个人中心"/>
        <div class="myMain">
            <div class="Main" v-if="islogin==true">
                <img src="http://img.lovingliu.cn/default.jpg" alt="头像">
                <p>{{myName}}</p>
            </div>
            <div class="Main" v-if="islogin==false">
                <img src="http://img.lovingliu.cn/default.jpg" alt="头像">
                <p>
                    <van-button type="primary" @click="tologin">登录</van-button>
                    <van-button type="info" @click="toregister">注册</van-button>
                </p>
            </div>
        </div>
        <div class="MyBox">
            <div class="oneItem" @click="order">
                <van-icon name="orders-o" />
                <p>我的订单</p>
            </div>
            <div class="oneItem" @click="userInfo">
                <van-icon name="user-circle-o" />
                <p>我的信息</p>
            </div>
            <div class="oneItem" @click="address">
                <van-icon name="location-o" />
                <p>收货地址</p>
            </div>
            <div class="oneItem" @click="author">
                <van-icon name="comment-circle-o" />
                <p>关于我</p>
            </div>
            <div class="oneItem" @click="contact">
                <van-icon name="comment-circle-o" />
                <p>联系我</p>
            </div>
        </div>
        <van-row v-if="islogin==true">
            <van-col offset="6" span="12">
                <van-button type="danger" size="large" @click="logOut">退出登录</van-button>
            </van-col>
        </van-row>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';
import { async } from 'q';
export default {
    name:"my",
    data(){
        return{
            myName: this.$store.state.userInfo.userName
        }
    },
    computed: {
        islogin(){
            return this.$store.state.isLogin
        }
    },
    mounted() {
        console.log(this.$store.state.isLogin)
    },
    updated() {
        
    },
    methods:{
        tologin(){
            this.$router.push('/login')
        },
        order(){
            this.$router.push('/order')
        },
        author(){
            this.$router.push('/author')
        },
        userInfo(){
            this.$router.push('/userInfo')
        },
        address(){
            this.$router.push('/address')
        },
        contact(){
            this.$router.push('/contact')
        },
        dev(){
            Toast.fail('暂未开放注册功能，敬请期待....');
        },
        toregister(){
            this.$router.push('/register')
        },
        logOut(){
            this.$axios.get(this.$baseUrl + "user/logout").then(res => {
                if(res.data.code === 0 || res.data.code === 200) {
                    Toast.success(res.data.msg)
                }else {
                    Toast.fail(res.data.msg)
                }
            }).catch(err => {
                Toast.fail(err.message)
            })
            sessionStorage.removeItem("userInfo")
            this.$store.dispatch("userLogout")
            this.$router.go(0)
        }
    },

}
</script>


<style lang="scss">
.my{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    background: white;
    overflow-x: hidden;
    overflow-y: auto;
    .myMain{
        background: white;
        margin-top: 10px;
        width: 100%;
        .Main{
            height: 100%;
            padding: 0 10px;
            border-bottom: 1px solid #cccccc;
            img{
                display: block;
                width: 60px;
                height: 60px;
                padding: 7px;
                float: left;
            }
            p{
                line-height: 75px;
                font-size: 0.55rem;
                font-weight: bolder;
                margin-left: 10px;
                .van-button{
                    margin: 0 10px;
                }
            }
        } 
    }
    .MyBox{
        width: 100%;
        background: white;
        margin-bottom: 45px;
        .oneItem{
            height: 44px;
            padding: 0 10px;
            line-height: 44px;
            border-bottom: 1px solid #ccc;
            i,
            p{
                font-size: 0.45rem;
                display: block;
                line-height: 44px;
                float: left;
                margin-left: 10px;
            }
        }
    }    
}
    
    
    
</style>
