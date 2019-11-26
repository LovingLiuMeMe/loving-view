<template>
    <div class="login">
        <van-nav-bar
            title="登录"
            left-arrow
            @click-left="back"
        />
        <van-cell-group class="van-cell-group">
            <van-field
                v-model="userName"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                rows="1"
                autosize
                @click-right-icon="$toast('如:lovingliu@126.com')"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                rows="1"
                autosize
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-row>
            <van-col offset="6" span="12">
                <van-button type="primary" size="large" @click="login">登录</van-button>
            </van-col>
        </van-row>
        
        
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
export default {
    data(){
        return {
            userName:'',
            password:''
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        login(){ 
            this.$axios.post(this.$baseUrl + "user/login",{userName:this.userName, password:this.password}).then(res=>{
                console.log('hook')
                if(res.data.code === 0 || res.data.code === 200) {
                    let user = res.data.data
                    this.$store.dispatch("userLogin", user)
                    sessionStorage.setItem("userInfo",JSON.stringify(user))
                    Toast.success('登录成功')
                    this.$router.push("/home")
                }else {
                    Toast.fail(res.data.msg)
                }
            }).catch(err => {
                Toast.fail(err.message)
            })
        }  
    },
}
</script>

<style lang="scss">
.login{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .van-cell-group{
        width: 90%;
        margin: 4rem auto 1rem;
    }
}

</style>

