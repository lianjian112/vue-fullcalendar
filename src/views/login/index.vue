<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="containerLeft">
        <div class="logoImg">
          <img src="../../assets/login_img/logo@2x.png" alt="">
        </div>
        <div>
          <h1 class="title">骅光口腔睿齿云门诊<br>管理系统</h1>
        </div>
      </el-col>
      <el-col :span="12" class="containerRight">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">欢迎登录</h3>
          </div>
          <div class="titleList">诊所机构码</div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入诊所机构码"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="el-inputClass"
            />
          </el-form-item>

          <div class="titleList">手机号</div>
          <el-form-item prop="phone">
            <span class="svg-container">
              <span class="el-icon-phone" style="font-size: 16px" />
            </span>

            <el-input
              ref="phone"
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <div class="titleList">密码</div>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <div class="titleList">验证码</div>
          <el-form-item prop="verificationCode2">
            <span class="svg-container"></span>
            <el-input
              ref="verificationCode2"
              v-model="loginForm.verificationCode2"
              placeholder="请输入验证码"
              name="verificationCode2"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="el-inputClass"
              @keyup.enter.native="handleLogin"
            />
            <div class="verificationCode">
              <img
                :src="kaptchaImg"
                alt="加载失败"
                style="height: 64px; width: 149px"
                @click="reloadVerificationCode"
              >
            </div>
          </el-form-item>
          <el-checkbox v-model="choose_tag" class="remPassword">记住密码</el-checkbox>
          <el-link class="forgetPassword" @click="forgetPassword">忘记密码</el-link>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 24px; height: 62px; font-size: 18px"
            @click.native.prevent="handleLogin"
          >登 录</el-button>

          <div class="tips">
            <span class="span1">还没有账号？</span>
            <a class="span2" @click="register">注册申请</a>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div class="footer">
      <span>系统配置建议: </span>
      <a class="chrome">谷歌Chrome</a>
      <span> 1440*800px分辨率</span>
    </div>
  </div>
</template>

<script>
import { getKaptchaImg } from '@/api/user'
// cookie操作
import Cookie from 'js-cookie'

// base64加密
const Base64 = require('js-base64').Base64
export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入诊所机构码'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        phone: '',
        verificationCode2: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      kaptchaImg: '',
      choose_tag: false // 记住密码
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.reloadVerificationCode()
    const username = Cookie.get('username')
    const account = Cookie.get('account')
    const password = Base64.decode(Cookie.get('password'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (account) {
      this.loginForm.username = username
      this.loginForm.phone = account
      this.loginForm.password = password
      this.choose_tag = true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const data = {
            account: this.loginForm.phone,
            clinicNo: this.loginForm.username,
            password: this.loginForm.password,
            verification: this.loginForm.verificationCode2
          }
          this.$store
            .dispatch('user/login', data)
            .then(() => {
              console.log('登陆成功')
              if (this.choose_tag) {
                Cookie.set('username', this.loginForm.username)
                Cookie.set('account', this.loginForm.phone)
                const passWord = Base64.encode(this.loginForm.password)
                Cookie.set('password', passWord)
              }
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          // this.$router.push({ path: "/" });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取图片验证码
    reloadVerificationCode() {
      getKaptchaImg().then((res) => {
        console.log(res)
        this.kaptchaImg = res.data ? 'data:image/png;base64,' + res.data : ''
      })
    },
    // 忘记密码
    forgetPassword() {
      this.$router.push({ path: '/resetPassword', query: '' })
    },
    // 注册中心
    register() {
      this.$router.push({ path: '/register', query: '' })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #eaf0f7;
$light_gray: rgb(255, 255, 255);
$cursor: rgb(39, 37, 37);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 60%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.908);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: #454545;
  }
}
</style>
<style lang="scss">
/* reset element-ui css */
.containerRight {
  .el-form-item__content {
    line-height: 52px !important;
    background: #eaf0f7;
    border-radius: 8px;
    .el-input__inner {
      color: #323b4b;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #eee;
.el-input {
  width: 60% !important;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/login_img/bg@2x.png") no-repeat;
  background-size: contain;
  overflow: hidden;

  .containerLeft {
    .logoImg {
      img {
        width: 135px;
        position: relative;
        top: 50px;
        left: 10%;
      }
    }
    .title {
      font-weight: bold;
      color: #323b4b;
      font-family: "PingFang SC";
      font-size: 28px;
      line-height: 40px;
      position: absolute;
      top: 20%;
      left: 10%;
    }
  }
  .containerRight {
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 12% 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .verificationCode {
      cursor: pointer;
      vertical-align: middle;
      height: 64px !important;
      display: inline-block;
    }
    .tips {
      text-align: center;
      .span1 {
        font-size: 14px;
        color: #999;
      }
      .span2 {
        color: #323b4b;
        font-size: 14px;
        text-decoration: underline;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .titleList {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 8px;
      color: #171c33;
      font-weight: bold;
      font-family: "PingFang SC";
    }

    .title-container {
      position: relative;

      .title {
        font-size: 32px;
        color: #171c33;
        margin: 0px auto 30px auto;
        font-weight: Medium;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .remPassword {
      margin-left: 2px;
      margin-bottom: 20px;
      color: #323b4b;
      font-family: "PingFangSC-Regular";
    }
    .forgetPassword {
      float: right;
      color: #b0b7c3;
      text-decoration: underline;
    }
  }
  .footer {
    font-size: 14px;
    color: #b0b7c3;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -10%;
    .chrome {
      color: #002fa7;
      text-decoration: underline;
    }
  }
}
</style>
