<template>
    <div id="app">
        <transition mode="out-in">
            <router-view />
        </transition>
        <v-footer v-if="isShow"></v-footer>
    </div>
</template>

<script>

import footer from './components/footer.vue'
export default {
    name: 'app',
    data() {
        return {}
    },
    components:{
        "v-footer":footer,
    },
    computed: {
        isShow(){
            return this.$store.state.footerIsShow
        }
    },
    created() {
        this.show()
    },
    mounted() {
        // this.common.test() //测试公共方法
    },
    methods: {
        show(){
            let urlPath=["/","/author","/login","/cart","/ad","/order","/userInfo","/address","/goodDetail","/news","/orderDetail","/register"]
            if(urlPath.indexOf(this.$route.path)!= -1){ // 隐藏底部导航栏
                this.$store.commit("NoShow")
            }else{ // 显示底部导航栏
                this.$store.commit("YesShow") 
            }
        },
    },
    watch: {
        // 监听路由
        "$route.path":function(newPath,oldPath){
            this.show()
        }
    },
}
</script>


<style lang="scss" scoped>
    body{
        padding-bottom:50px; 
        font-family: '微软雅黑';
        background: #F4F4F4;
        overflow: hidden;
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%)
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(100%)
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease
    }
</style>
