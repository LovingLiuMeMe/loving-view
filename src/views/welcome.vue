<template>
    <div class="welcome">
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :class="{'lastAd': index === welcomeList.length -1 }" v-for="(item, index) in welcomeList" :key="item.welcomeId">
                    <img :src="item.welcomeUrl" alt="欢迎页" width="100%" height="100%">
                    <router-link to='/home' v-if="index === welcomeList.length -1"><van-button plain type="danger">进入首页</van-button></router-link>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return {
            welcomeList: []
        }
    },
    mounted() {
        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    created() {
        this.getWelcomeList()
    },
    methods: {
        getWelcomeList(){
            this.$axios.get(this.$baseUrl+'userIndex/welcomeList').then(res => {
                if(res.data.code === 0 || res.data.code === 200){
                    this.welcomeList = res.data.data
                }else {
                    Toast.fail(res.data.msg)
                }
            }).catch(err => {
                Toast.fail(err.message)
            })
        }
    }
}
</script>

<style lang="scss">
.welcome{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-wrapper{
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
            }
            .lastAd{
                position: relative;
                a{
                    display: block;
                    position: absolute;
                    top:15px;
                    right: 15px;
                    .van-button {
                        border-radius:20px;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
        .swiper-pagination{
            color: red;
        }
    }
}
</style>
