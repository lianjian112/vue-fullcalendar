<template>
  <div class="login-container">
    <!-- 重置成功提示 -->
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="375px"
      center
      class="abow_dialog"
    >
      <span class="text">密码重置成功！</span>
      <img src="../../assets/resetPassword/next.png" alt="" class="nextImg">
      <div class="goIndex" @click="goIndex">返回首页</div>
    </el-dialog>
    <!-- 重置成功提示 -->

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
          ref="resetForm"
          :model="resetForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">重置密码</h3>
          </div>
          <div class="titleList">手机号</div>
          <el-form-item prop="phone">
            <span class="svg-container">
              <span class="el-icon-phone" style="font-size: 16px" />
            </span>

            <el-input
              ref="phone"
              v-model="resetForm.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <div class="titleList">验证码</div>
          <el-form-item prop="verificationCode2">
            <span class="svg-container"></span>
            <el-input
              ref="verificationCode2"
              v-model="resetForm.verificationCode2"
              placeholder="请输入验证码"
              name="verificationCode2"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="el-inputClass"
            />
            <div class="verificationCode">
              <!-- <el-button type="primary" :disabled="flag" @click="getCaptcha">{{
                content
              }}</el-button> -->
              <img
                :src="kaptchaImg"
                alt="加载失败"
                style="height: 64px; width: 148px"
                @click="reloadVerificationCode"
              >
            </div>
          </el-form-item>

          <el-form-item prop="verificationCode">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="verificationCode"
              v-model="resetForm.verificationCode"
              placeholder="请输入验证码"
              name="verificationCode"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="el-inputClass"
            />
            <div class="verificationCode">
              <el-button type="primary" :disabled="flag" @click="getCaptcha">{{
                content
              }}</el-button>
            </div>
          </el-form-item>

          <div class="titleList">新密码</div>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="resetForm.password"
              :type="passwordType"
              placeholder="请输入新密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <div class="tips">密码至少6位，且必须数字、字母、符号2种组合</div>

          <div class="titleList">确认密码</div>
          <el-form-item prop="verifyPassword">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="verifyPassword"
              v-model="resetForm.verifyPassword"
              :type="passwordType"
              placeholder="请确认新密码"
              name="verifyPassword"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="
              width: 100%;
              margin-bottom: 24px;
              height: 62px;
              font-size: 18px;
            "
            @click.native.prevent="handleSubmit"
          >提 交</el-button>
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
import { rePassword, rePwdCode } from '@/api/Login&reset&register/api.js'
import { getKaptchaImg } from '@/api/user.js'

export default {
  name: 'ResetPassword',
  data() {
    const validateVerificationCode = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value.length < 11) {
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
    const validatePassword2 = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else if (this.resetForm.password !== this.resetForm.verifyPassword) {
        console.log(1)
        callback(new Error('请确认两次密码输入一致'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        verificationCode: '',
        verificationCode2: '',
        password: '',
        verifyPassword: '',
        phone: ''
      },
      loginRules: {
        verificationCode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVerificationCode
          }
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verifyPassword: [
          { required: true, trigger: 'blur', validator: validatePassword2 }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 验证码按钮
      flag: false, // 按钮是否可取
      content: '获取验证码', // 按钮内文本
      totalTime: 60, // 倒计时时间
      centerDialogVisible: false,
      kaptchaImg: ''
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
    handleSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          // this.loading = true;
          const data = {
            account: this.resetForm.phone,
            verificationCode: this.resetForm.verificationCode,
            password: this.resetForm.password
          }
          rePassword(data).then((res) => {
            if (res.code === 200) {
              console.log(res)
              this.centerDialogVisible = true
            }
            // else {
            // }
            // this.loading = false;
            // if (res.code === 0) {
            //   this.tableData = res.data.result;
            //   this.total = res.data.total;
            // } else {
            //   this.$message.error(res.msg);
            // }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 点击按钮倒计时
    // 获取验证码
    getCaptcha() {
      if (
        this.resetForm.phone.length === 11 &&
        this.resetForm.verificationCode2 !== ''
      ) {
        const data = this.resetForm.phone
        rePwdCode({
          account: data,
          verification: this.resetForm.verificationCode2
        }).then((res) => {
          if (res.code === 200) {
            this.flag = true // 点击之后设置按钮不可取
            this.content = this.totalTime + 's后重新发送' // 按钮内文本
            const clock = window.setInterval(() => {
              this.totalTime--
              this.content = this.totalTime + 's后重新发送'
              if (this.totalTime < 0) {
                window.clearInterval(clock)
                this.content = '重新发送验证码'
                this.totalTime = 60
                this.flag = false // 这里重新开启
              }
            }, 1000)
            console.log(res)
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('请填写手机号和验证码')
      }
    },

    // 获取图片验证码
    reloadVerificationCode() {
      getKaptchaImg().then((res) => {
        console.log(res)
        this.kaptchaImg = res.data ? 'data:image/png;base64,' + res.data : ''
      })
    },

    goIndex() {
      this.$router.push({ path: '/login' })
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
    height: 47px;
    width: 85%;

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

.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  top: -200px;
  ::v-deep .el-dialog {
    border-radius: 8px !important;
    height: 410px;
    padding-top: 30px;
  }
  .el-dialog {
    margin: 0 auto !important;
    height: 410px;
    overflow: hidden;
    .text {
      font-size: 32px;
      color: #171c33;
      position: relative;
      left: 50%;
      margin-left: -135px;
      padding: 50px 22px 59px;
    }
    .nextImg {
      position: absolute;
      top: 45%;
      margin-bottom: 37px;
    }
    .goIndex {
      margin-top: 150px;
      text-align: center;
      color: #b0b7c3;
      font-size: 18px;
      cursor: pointer;
    }
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
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
      padding: 10% 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .verificationCode {
      button {
        height: 64px;
        width: 150px;
        border-radius: 0 4px 4px 0;
      }
      cursor: pointer;
      vertical-align: middle;
      width: 104px;
      height: 64px;
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
    .el-inputClass {
      width: 270px !important;
    }
    .tips {
      font-size: 14px;
      color: #8a94a6;
      position: relative;
      top: -8px;
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
