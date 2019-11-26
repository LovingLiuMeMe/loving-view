<template>
<div class="goodDetail" >
        <van-nav-bar title="商品详情" left-arrow @click-left="back" />
        <div class="goodDetailList">
            <div class="goodDetaiSwipe">
                <van-swipe :autoplay="3000" indicator-color="red">
                    <van-swipe-item v-for="(item,index) in goodsCarousel" :key="index"><img :src="item" alt="图片"></van-swipe-item>
                </van-swipe>
            </div>
            <div class="goodDetailMain">
                <div class="gooDetailNumber">商品编号：{{goodsInfo.goodsId}}</div>
                <div class="goodDetailName">{{goodsInfo.goodsName}}</div>
                <div class="goodDetailIntro">{{goodsInfo.goodsIntro}}</div>
                <div class="goodDetailPaid">￥ {{goodsInfo.sellingPrice}}</div>
            </div>
            
            <div class="goodDetailValue">
                <div class="_Value">购买数量：</div>
                <div style="margin-left: 2rem;">
                    <van-stepper v-model="goodsInfo.goodsCount" integer min="1" max="99"/>
                </div>
            </div>
            <div class="goodDetailBox">
                <van-tabs v-model="selected" swipeable animated>
                    <van-tab title="图文详情">
                        <div class="goodDetailImg">
                            <div v-html="markdownHtml"></div>
                        </div>
                    </van-tab>
                    <van-tab title="商品配置">
                        <div class="goodDetailPeizhi">
                            <table style="width: 100%;border:1px solid #cccccc;margin-top: 5px;border-collapse: collapse;" border="1">
                                <tbody>
                                    <tr v-for="(config,index) in configParam" :key="index">
                                        <td style="width:26%;height:50px">{{config.configKey}}</td>
                                        <td style="width:80%;height:50px">{{config.configValue}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="goodDetailFooter">
                <van-goods-action>
                    <van-goods-action-icon icon="chat-o" text="客服" @click="chat" />
                    <van-goods-action-icon icon="cart-o" text="购物车" :info="getCartInfo?getCartInfo:''" @click="gotoCart" />
                    <van-goods-action-button type="warning" text="加入购物车" @click="add()" />
                    <van-goods-action-button type="danger" text="立即购买" @click="pay()" />
                </van-goods-action>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { Toast } from 'vant';
import { Tab, Tabs } from 'vant';
import marked from 'marked';

    export default{
        name:"goodDetail",
        data(){
            return{
                selected:"" ,
                goodsInfo: {},
                goodsCarousel: [],
                configParam: [],
                markdownHtml: ''
            }
        },
        mounted(){
            this.getData()
        },
        computed:{
            paid(){
                let paid = this.goodsInfo.goodsCount * this.goodsInfo.sellingPrice
                return paid
            },
            // 获取购物车商品数量
            getCartInfo(){
                return this.$store.state.carts.length
            }
            
        },
        methods:{
            // 本地写个json数据文件，模拟后台将数据渲染出来
            getData(){
                let id = this.$route.query.id
                this.$axios.get(this.$baseUrl+`userGoods/search/${id}`).then((res)=> {
                    if(res.data.code === 200 || res.data.code === 0) {
                        this.goodsInfo = res.data.data
                        // 购买数量默认为1 
                        this.goodsInfo.goodsCount = 1
                        // 处理图片
                        this.convertGoodsCarousel(this.goodsInfo.goodsCarousel)
                        // 处理配置
                        this.convertConfigParam(this.goodsInfo.configParam)
                        // 转换markdown文本
                        this.convertMarkdownHtml(this.goodsInfo.goodsDetailContent)                        
                    }else{
                        Toast.fail('商品不存在,请联系客服')
                        this.back()
                    }
                })
            },
            // 处理配置信息
            convertConfigParam(configParamStr){
                if(configParamStr) {
                    let configParamArray = configParamStr.split(';')
                    configParamArray.map(config => {
                        let configArray = config.split('=')
                        let configObj = {configKey: configArray[0],configValue: configArray[1]}
                        this.configParam.push(configObj)
                    })
                }
                

            },
            // 处理轮播图
            convertGoodsCarousel(goodsCarouselStr){
                if(goodsCarouselStr) {
                    let goodsCarouselArray = goodsCarouselStr.split(';')
                    this.goodsCarousel = goodsCarouselArray
                }
            },
            convertMarkdownHtml(markdownStr){
                this.markdownHtml = marked(markdownStr)
            },
            jia(){
                this.goodsInfo.buyAmount++
            },
            jian(){
                if(this.goodsInfo.buyAmount==1){
                    this.goodsInfo.buyAmount=1
                }else{
                    this.goodsInfo.buyAmount--
                }
            },
            chat(){
                Toast.fail('程序员小哥哥正在努力开发中....');
            },
            gotoCart(){
                this.$router.push("/cart")
            },
            // 点击按钮时，首先判断该商品是否在购物车已存在，如果存在则不再加入
            add(){
                let idExist=this.$store.state.carts.find(obj=> {
                    return obj.id==this.goodsInfo.goodsId
                })
                if(!idExist){
                    let data={
                        goodsId:this.goodsInfo.goodsId,
                        goodsName:this.goodsInfo.goodsName,
                        sellingPrice:this.goodsInfo.sellingPrice,
                        goodsCoverImg:this.goodsInfo.goodsCoverImg,
                        goodsCount:this.goodsInfo.goodsCount,
                        goodsIntro:this.goodsInfo.goodsIntro
                    }
                    this.$store.commit("addcarts",data);
                    Toast.success("加入购物车成功！");
                }else{
                    Toast.fail('商品已存在购物车中');
                }
            },
            //返回上一级
            back(){
                this.$router.go(-1)
            },
            pay(){
                if(this.$store.state.isLogin==true){
                    let data={
                        goodsId:this.goodsInfo.goodsId,
                        goodsName:this.goodsInfo.goodsName,
                        sellingPrice:this.goodsInfo.sellingPrice,
                        goodsCoverImg:this.goodsInfo.goodsCoverImg,
                        goodsCount:this.goodsInfo.goodsCount,
                        goodsIntro:this.goodsInfo.goodsIntro,
                        goodsNumber:this.goodsInfo.goodsId,
                    }
                    let order={
                        id:this.$common.getOrderId(new Date()),
                        totalPrice:this.paid,
                        addTime:new Date(),
                        orderStatus: 0,
                        orderItemList:[data]
                    }
                    this.$store.commit('addTempOrder',order);// 增加到临时订单
                    this.$router.push("/orderDetail")
                }else{
                    Toast.fail('请先登录！')
                }
            },
        }
    }
</script>

<style lang="scss">
    .goodDetail{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: white;
        .goodDetailList{
            margin-bottom: 1rem;
            .goodDetaiSwipe{
                margin-top: 3px;
                background: white;
                img{
                    width: 70%;
                    height: 7rem;
                    display: block;
                    margin: 15px auto;
                }
            }
            .goodDetailMain{
                background: white;
                border-bottom: 1px solid #cecece;
                border-top: 1px solid #cecece;
                padding: 0.4rem;
                .gooDetailNumber{
                    display: none
                }
                .goodDetailName{
                    color: black;
                    font-weight: 800;
                    font-size: 0.35rem
                }
                .goodDetailPaid{
                    color: red;
                    font-size: 0.4rem;
                }
            }
            .goodDetailValue{
                height: 1rem;
                border-bottom: 1px solid #cecece;
                padding: 0.4rem;
                ._Value{
                    float: left;
                    margin-top: 0.2rem
                }
            }
            .goodDetailBox{
                height: 1px;
                .goodDetailImg{
                    margin-top: 4px;
                    padding-bottom: 1rem;
                    img{
                        width: 100%;
                        height: auto;
                        display: block;
                    }
                }
                table{
                    margin-bottom: 50px;
                    td{
                        font-size: 0.31rem;
                        text-align: center;
                        color: #000
                    }  
                }
            }
            .goodDetailFooter{
                position: fixed;
                width: 100%;
                bottom: 0rem;
                height: 1.3rem;
                background: #F6F4F7;
                border-top: 1px solid #efefef
            }
        }
    }
</style>
