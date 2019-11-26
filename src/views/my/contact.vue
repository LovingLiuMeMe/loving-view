<template>
    <div class="Author">
        <van-nav-bar
            title="联系我"
            left-arrow
            @click-left="back"
        />
        <div class="AuthorMain">
            <h2>刘波</h2>
            <p>lovingliu@126.com</p>
            <p>qq：3230644615</p>
            <van-button plain type="danger" @click="goHome">进入首页</van-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        isShow(){
            return this.$store.state.footerIsShow
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        goHome(){
            this.$router.push("/home")
        }
    },
}
</script>

<style lang="scss">
.Author{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    background: white;
    .AuthorMain{
        font-size: 0.55rem;
        text-align: center;
    }
}
</style>
