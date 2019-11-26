<template>
    <div class="choose">
        <van-nav-bar
            title="选购手机"
            left-arrow
            @click-left="choose"
        />
        <div class="choose-main">
            <van-tabs v-model="selected" swipeable animated>
                <van-tab title="全部">
                    <van-row class="products">
                        <van-col span="12" v-for="goodsInfo in allData" :id="goodsInfo.goodsId" :key="goodsInfo.goodsId">
                            <div @click="open(goodsInfo.goodsId)">
                                <div class="image">
                                    <img v-lazy="goodsInfo.goodsCoverImg" alt="图片">
                                </div>
                                <div class="name">{{goodsInfo.goodsName}}</div>
                                <div class="nametwo">{{goodsInfo.goodsIntro}}</div>
                                <div class="Price">￥{{goodsInfo.sellingPrice}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab :title="category.categoryName" v-for="category in categoryList" :key="category.categoryId">
                    <van-row class="products">
                        <van-col span="12" v-for="goodsInfo in category.goodsInfoList" :id="goodsInfo.goodsId" :key="goodsInfo.goodsId">
                            <div @click="open(goodsInfo.goodsId)">
                                <div class="image">
                                    <img v-lazy="goodsInfo.goodsCoverImg" alt="图片">
                                </div>
                                <div class="name">{{goodsInfo.goodsName}}</div>
                                <div class="nametwo">{{goodsInfo.goodsIntro}}</div>
                                <div class="Price">￥{{goodsInfo.sellingPrice}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
            </van-tabs>            
        </div>
    </div>
</template>


<script>
import { Tab, Tabs } from 'vant';
export default {
    name:"choose",
    computed: {
        // 全部商品 后期替换
        allData() {
            let goodsInfoArray = []
            this.categoryList.map(item1 => {
                item1.goodsInfoList.map(item2 => {
                    goodsInfoArray.push(item2)
                })
            })
            console.log(goodsInfoArray)
            return goodsInfoArray
        }
    },
    data(){
        return{
            selected:"",
            categoryList:[]
        }
    },
    mounted(){
        this.category()
    },
    methods:{
        category() {
            this.$axios.get(this.$baseUrl+"userGoods/category").then(res => {
                if(res.data.code === 0 || res.data.code === 200 ){
                    console.log(res.data.data)
                    this.categoryList = res.data.data
                }
            }).catch(err => {
                Toast.fail(err.message);
            })
        },
        open(id){
            this.$router.push({path:"goodDetail",query:{id:id}})
        },
        choose(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
.choose{
    position: fixed;
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index:999;
    overflow-x: hidden;
    overflow-y: auto;
    .choose-main{
        width: 100%;
        .products{
            border-top: 1px solid #ccc;
            padding-bottom: 50px;
            .van-col--12{
                border-bottom: 1px solid #ccc;
                &:nth-child(2n-1){
                    border-right: 1px solid #ccc;
                }
                .image{
                    width: 100%;
                    height: 4rem;
                    background: white;
                    img{
                        height: 3.3rem;
                        width: 3.5rem;
                        display: block;
                        margin:0 auto;
                        padding-top: 0.45rem;
                    }
                }
                .name{
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin: auto;
                    font-size: 0.25rem;
                    padding-top: 0.25rem;
                    font-weight: 800;
                    text-align: center;
                }
                .nametwo{
                    font-size: 0.2rem;
                    text-align: center;
                    padding-top: 0.15rem;
                    font-family: "微软雅黑"
                }
                .Price{
                    font-size: 0.43rem;
                    color: red;
                    margin:0 auto;
                    text-align: center;
                    padding-top: 0.3rem;
                    padding-bottom: 0.2rem;
                    font-weight: bold;
                }
            }
        }
    }
}

</style>
