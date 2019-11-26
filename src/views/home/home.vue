<template>
<div class="home">
    <!-- 首页头部 -->
    <van-nav-bar border>
        <span name="title" slot="title" class="img-wrap">
            <img src="/img/logo.png" alt="logo"/>
        </span>
        <van-icon name="search" slot="right" size="0.55rem" @click="dev"/>
    </van-nav-bar>
    <!-- 首页头部end -->
    <!-- 首页头部承诺 -->
    <van-image
        width="100%"
        height="0.8rem"
        fit="cover"
        src="/img/official.png"
    />
    <!-- 首页头部承诺end -->
    <!-- 轮播图 -->
    <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="red">
            <van-swipe-item v-for="(item,index) in swipeImg" :key="index" @click="open(item.redirectUrl)">
                <img :src="item.carouselUrl" alt="轮播图">
            </van-swipe-item>
        </van-swipe>
    </div>
    <!-- 轮播图end  -->
    <!-- 首页导航 -->
    <van-row class="home-nav">
        <van-col span="6"><img src="/img/xuangou.jpg" alt="选购" @click="xuangou"></van-col>
        <van-col span="6"><img src="/img/peijian.jpg" alt="配件" @click="parts"></van-col>
        <van-col span="6"><img src="/img/pingbao.jpg" alt="屏保" @click="dev"></van-col>
        <van-col span="6"><img src="/img/dingzhi.jpg" alt="定制" @click="dev"></van-col>
    </van-row>

    <!-- 首页导航end -->
    <div class="main">
        <div v-for="activity in activtyList" :key="activity.activityId">
            <van-nav-bar border :title="activity.activityName"></van-nav-bar>
            <van-row class="products">
                <van-col span="12" v-for="activityItem in activity.activityItemList" :id="activityItem.activityItemId" :key="activityItem.activityItemId">
                    <div @click="open(activityItem.goodsId)">
                        <div class="image">
                            <img v-lazy="activityItem.goodsCoverImg" alt="图片">
                        </div>
                        <div class="name">{{activityItem.goodsName}}</div>
                        <div class="nametwo">{{"商品编号:"+activityItem.goodsId}}</div>
                        <div class="price">￥{{activityItem.sellingPrice}}</div>
                    </div>
                </van-col>
            </van-row>            
        </div>
    </div>
</div>  

</template>

<script>
    import { mapState,mapMutations,mapGetters  } from 'vuex';
    import { Toast } from 'vant';
    export default {
        name:"Home",
        data(){
            return{
                activtyList:[],
                swipeImg:[]
            }
        },
        mounted(){
            this.getData();
            this.getSwipper();
        },
        methods:{
            getSwipper(){
                this.$axios.get(this.$baseUrl+"userIndex/bannerlist").then(res => {
                    if(res.data.code === 0 || res.data.code === 200 ){
                        console.log(res.data.data)
                        this.swipeImg = res.data.data
                    }
                })
            },
            getData(){
                this.$axios.get(this.$baseUrl+"userActivity/activityList").then((res)=> {
                    if(res.data.code === 0 || res.data.code === 200 ){
                        console.log(res.data.data)
                        this.activtyList = res.data.data
                    }
                })
            },
            open(id){
                if(id !== '##'){
                   this.$router.push({path:"goodDetail",query:{id:id}}) 
                }
            },
            xuangou(){
                this.$router.push({path:"choose"})
            },
            parts(){
                this.$router.push({path:"parts"})
            },
            dev(){
                Toast.fail('程序员小哥哥表示找到女朋友再开发....');
            }
        },
    }
</script>

<style lang="scss">
.home{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    background: white;
    overflow-x: hidden;
    overflow-y: auto;
    .img-wrap {
        display: flex;
        justify-content: center;
        img {
            height: 46px;
        }
    }
    .swipe{
        height: 6.5rem;
        margin-top: 1px;
        img{
            width: 100%;
            height: 6.5rem;
        }
    }
    .home-nav{
        width: 100%;
        height: 2.5rem;
        .van-col--6{
            padding: 15px;
            img{
                width: 100%;
                
            }
        }
    }
    .main{
        border-top: 1px solid #ccc;
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
                .price{
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
