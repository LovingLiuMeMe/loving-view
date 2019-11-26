<template>
    <div class="order">
        <van-nav-bar
            title="我的订单"
            left-arrow
            @click-left="back"
            />
        <div class="orderimg" v-if="!orderList.length">
            <img src="/img/dingdan.png" alt="订单">
            <p>您暂无订单</p>
        </div>
        <div v-else class="orderMain">
            <van-tabs v-model="active">
                <van-tab title="全部">
                    <OrderList :orderList="orderList"/>    
                </van-tab>
                <van-tab title="未付款">
                    <OrderList :orderList="orderList" :orderStatus="0"/>
                </van-tab>
                <van-tab title="已付款">
                    <OrderList :orderList="orderList" :orderStatus="1"/>
                </van-tab>
                <van-tab title="已发货">
                    <OrderList :orderList="orderList" :orderStatus="2"/>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { mapState ,mapMutations ,mapGetters,} from 'vuex';
import OrderList from '../../components/orderList'
export default {
    name:"order",
    components: {
        OrderList
    },
    data(){
        return{
            orderList:[],
            active: 0
        }
    },
    computed:{
        ...mapGetters(
            ["sum"]
        )
    },
    methods:{
        ...mapMutations([
            "orderdel"
        ]),
        back(){
            this.$router.go(-1)
        },
        getOrderList() {
            this.$axios.get(this.$baseUrl+"userOrder/list",{ params: {
                userId: 1
            }}).then(res => {
                if(res.data.code === 0 || res.data.code === 200 ){
                    this.orderList = res.data.data
                }
            }).catch(err => {
                Toast.fail(err.message);
            })
        }
    },
    mounted() {
        this.getOrderList()
    }
}
</script>


<style lang="scss">
.order{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #F4F4F4;
    overflow-x: hidden;
    overflow-y: auto;
    .orderimg{
        width: 3rem;
        height: 3rem;
        margin: 5rem auto;
        >img{
            width: 2.5rem;
        }
        >p{
            margin-top: 0.3rem;
            text-align: center;
            color: #ccc;
            font-size: 0.42rem 
        }
    }
    .orderMain{
        .orders{
            margin-top: 0.05rem;
            .order-header{
                padding: 10px 5px;
            }
            .order-body{
                height: 3.4rem;
                width: 100%;
                background: white;
                list-style: none;
                border-top: 1px solid #ccc;
                overflow: hidden;
                .orderImage{
                    padding: 0.3rem;
                    >img{
                        width: 2.5rem;
                        float: left;
                    }
                }
                .order-text{
                    width: 58%;
                    float: left;
                    font-size: 16px;
                    .orderName{
                        width: 100%;
                    }
                    .orderColor{
                        max-height: 45px;
                        overflow: hidden;
                        >span{
                            font-size: 14px;
                            color: #888;
                        }
                    }
                    .orderPrice{
                        width: 100px;
                        float: left;
                        color: red;
                        font-size: 14px;
                        margin-top: 0.13rem;
                        >span{
                            color: red;
                        }
                    }
                }
                >p{
                    color: #888;
                    font-size: 16px;
                }  
            }
            .order-total{
                    width: 100%;
                    padding: 10px 10px;
                }
        }
    }
}
    
</style>
