<template>
    <div class="cart">
        <van-nav-bar
            title="购物车"
            left-arrow
            @click-left="backHome">
            <van-icon name="delete" slot="right" size="0.55rem" @click="settlement"/>
        </van-nav-bar>
        <div class="cartImg" v-if="!carts.length">
            <img src="/img/gouwuche.png" alt="购物车图片">
            <h1>购物车是空的哦，快去购物吧</h1>
            <router-link to="/home">逛一逛</router-link>
        </div>
        <div class="cartMain">
            <ul>
                <li v-for="(cart,index) in carts" :key="index" class="cartList">
                    <div class="cartImage">
                        <img :src="cart.goodsCoverImg" >
                    </div>
                    <!-- 购物车商品信息 -->
                    <div class="cartInformation">
                        <div class="cartName">{{cart.goodsName}}</div>
                        <p class="goodsIntro">商品详情:{{cart.goodsName}}</p>
                        <p class="cartPrice">￥{{cart.sellingPrice}}</p>
                    </div>
                    <!-- 购物车商品数量 -->
                    <div class="cartNumber">
                        <van-row>
                            <van-col span="16">
                                <van-stepper v-model="cart.goodsCount" integer min="1" max="99"/>
                            </van-col>
                            <van-col span="4">
                                <van-icon name="delete" size="0.75rem" @click="shanchu(index)"/>
                            </van-col>
                        </van-row>
                    </div>
                </li>
            </ul> 
            <van-submit-bar
                :price="sum*100"
                button-text="确认"
                @submit="onSubmit"
            />
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations,mapGetters  } from 'vuex';
import { Toast } from 'vant';
export default {
    name:"cart",
    data(){
        return{}
    },
    computed:{
        ...mapGetters(
            ["sum"]
        ),
        carts(){
            return this.$store.state.carts   
        },
    },
    mounted() {},
    methods:{
        ...mapMutations([
            'shanchu','settlement','addorder'
        ]),
        backHome(){
            this.$router.push("/home")
        },
        onSubmit(){
            if(this.$store.state.isLogin==true){
                if(this.carts.length==0){
                    Toast.fail('购物车还没有东西哟！')
                }else{
                    let oneOrder={
                        id: this.$common.getOrderId(new Date()),
                        totalPrice: this.sum,
                        addTime: new Date(),
                        orderStatus: 0,
                        orderItemList:this.carts
                    }
                    this.$store.commit('addTempOrder',oneOrder);// 增加到定时订单
                    this.$router.push("/orderDetail")
                }
            }else{
                Toast.fail('请先登录！')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .cart{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
        background: #F4F4F4;
        overflow-x: hidden;
        overflow-y: auto;
        .cartImg{
            img{
                width: 4.4rem;
                height: 5.2rem;
                display: block;
                margin:0 auto;
                padding-top: 1.5rem;
            }
            h1{
                margin-top: 0.5rem;
                text-align: center;
                color: #959595;
                font-size: 0.6rem;
            }
            a{
                display: block;
                text-align: center;
                margin: 0.8rem auto;
                width: 110px;
                height: 37px;
                line-height: 37px;
                border-radius: 4px;
                text-align: center;
                background: #e0524b;
                color: white;
                font-weight: 800;
                font-size: 0.5rem;
            }
        }
        .cartMain{
            .cartList{
                width: 100%;
                height: 4rem;
                background: white;
                margin-bottom: 0.1rem;
                position: relative;
                .cartImage{
                    float: left;
                    padding: 0.5rem;
                    img{
                        width: 2.6rem;
                        height: 2.8rem;
                    }
                }
                .cartInformation{
                    width: 100%;
                    font-size: 0.35rem;
                    padding-left: 0.3rem;
                    padding-top: 0.6rem;
                    .cartName{
                        width: 9.3rem;
                        font-size: 0.36rem;
                    }
                    .goodsIntro{
                        font-size: 12px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #888;
                    }
                    .cartPrice{
                        color:red;
                        margin-top: 0.2rem;
                        font-size: 0.4rem;
                    }
                }
                .cartNumber {
                    float: left;
                    position: absolute;
                    left: 3.6rem; /* 2.6+0.5+0.5  */
                    bottom: 0.5rem;
                    width: calc(100% - 3.6rem);
                    .van-icon-delete{
                        float: right;
                    }
                }
            }
        }
    }
</style>
