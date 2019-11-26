<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="back"/>
        <van-cell-group>
          <van-field
              v-model="userName"
              required
              clearable
              label="用户名"
              right-icon="question-o"
              placeholder="请输入邮箱地址"
              rows="1"
              autosize
              @click-right-icon="$toast('如: lovingliu@126.com')"
          />
          <van-field
            v-model="authCode"
            required
            center
            clearable
            label="验证码"
            placeholder="请输入邮箱验证码"
          >
            <van-button slot="button" size="small" type="primary" @click="sendCode">发送验证码</van-button>
          </van-field>
          <van-field
              v-model="password"
              type="password"
              label="密码"
              rows="1"
              autosize
              placeholder="请输入密码"
              required
          />
          <van-field
              v-model="rePassword"
              type="password"
              label="确认密码"
              rows="1"
              autosize
              placeholder="请确认密码"
              required
          />
      </van-cell-group>
      <van-row>
          <van-col offset="6" span="12" style="margin-top: 20px;">
              <van-button type="primary" size="large" @click="register">注册</van-button>
          </van-col>
      </van-row>
  </div>
</template>

<script>
import { Toast,Dialog } from 'vant';
export default {
  data () {
    return {
      userName: '',
      authCode: '',
      password: '',
      rePassword: ''
    };
  },
  methods: {
    sendCode() {
      this.$axios.get(this.$baseUrl + "auth/getAuthCode",{ params: {
        userName: this.userName
      }}).then( res => {
        if(res.data.code === 0 || res.data.code === 200) {
          Toast.success(res.data.msg);
        }else{
          Toast.fail(res.data.msg);
        }
      }).catch( err => {
        Toast.fail(err.message)
      })
    },
    back() {
        this.$router.go(-1)
    },
    register() {
      if(this.userName&&this.authCode&&this.password&&this.rePassword) {
        if(this.password === this.rePassword){
          this.$axios.get(this.$baseUrl + "auth/verify",{ params: {
            userName: this.userName,
            authCode: this.authCode
          }}).then( res => {
            if(res.data.code === 0 || res.data.code === 200) {
              // 注册
              this.$axios.post(this.$baseUrl + "user/register",{
                userName: this.userName,
                password: this.password
              }).then( res => {
                if(res.data.code === 0 || res.data.code === 200) {
                   Dialog.confirm({
                    title: '提示',
                    message: '注册成功,快去登录吧！'
                  }).then(() => {
                    this.$router.push('/login')
                  }).catch(() => {
                    Toast.success(res.data.msg);
                  });
                }else{
                  Toast.fail(res.data.msg);
                }
              }).catch( err => {
                Toast.fail(err.message)
              })
            }else{
              Toast.fail(res.data.msg);
            }
          }).catch( err => {
            Toast.fail(err.message)
          })
        }else {
          Toast.fail('两次密码输入不一致')
        }
      }else {
        Toast.fail('请填写相关信息')
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .register {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .van-cell-group {
          width: 90%;
          margin: 4rem auto 1rem;
      }
  }
</style>