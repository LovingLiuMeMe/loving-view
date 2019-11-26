<template>
    <div class="userInfo">
        <van-nav-bar title="我的信息" left-arrow @click-left="back" />
        <!-- 联系人卡片 -->
        <div class="contact-container">
            <van-cell-group>
                <van-field
                    v-model="userName"
                    label="邮箱"
                    left-icon="free-postage"
                    disabled
                />
                <van-field
                    v-model="nickName"
                    label="昵称"
                    left-icon="contact"
                    disabled
                />
            </van-cell-group>
        </div>       
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: this.$store.state.userInfo.userName,
            nickName: this.$store.state.userInfo.nickName
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss">

</style>
