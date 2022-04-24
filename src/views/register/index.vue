<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="containerLeft">
        <div class="logoImg">
          <img src="../../assets/login_img/logo@2x.png" alt="">
        </div>
        <div>
          <h1 class="title">骅光口腔睿齿云门诊<br>管理系统</h1>
          <div class="explain">
            <h3>申请说明</h3>
            <p>
              定制网站就是指针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，也就是根据企业的产品特点、宣传推广而来量身定做网站。它跟传统的模板建站就完全不一样，定制网站完全是全新打造的，不会跟其他网站重复。
              <br>
              定制网站就是指针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，也就是根据企业的产品特点、宣传推广而来量身定做网站。它跟传统的模板建站就完全不一样，定制网站完全是全新打造的，不会跟其他网站重复。
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="containerRight">
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="registerForm"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">注册申请</h3>
          </div>

          <div class="titleList">诊所联系电话</div>
          <el-form-item prop="phone">
            <span class="svg-container">
              <span class="el-icon-phone" style="font-size: 16px" />
            </span>

            <el-input
              ref="phone"
              v-model="registerForm.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <div class="tips1">
            该电话号，将作为审核结果短信通知号码及诊所账号，请正确填写
          </div>

          <div class="titleList">验证码</div>
          <el-form-item prop="verificationCode2">
            <span class="svg-container"></span>
            <el-input
              ref="verificationCode2"
              v-model="registerForm.verificationCode2"
              placeholder="请输入验证码"
              name="verificationCode2"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="el-inputClass"
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

          <el-form-item prop="verificationCode">
            <span class="svg-container"> </span>
            <el-input
              ref="verificationCode"
              v-model="registerForm.verificationCode"
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

          <el-button
            :loading="loading"
            type="primary"
            :disabled="disabled"
            style="
              width: 100%;
              margin-bottom: 24px;
              margin-top: 34px;
              height: 62px;
              font-size: 18px;
            "
            @click.native.prevent="next"
          >下一步</el-button>

          <div class="tips">
            <span class="span1">已有账号？</span>
            <a class="span2" @click="returnLogin">返回登录</a>
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
import {
  getSmsRegisterCode,
  checkMobile
} from '@/api/Login&reset&register/api.js'
import { getKaptchaImg } from '@/api/user.js'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
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
    return {
      registerForm: {
        verificationCode: '',
        verificationCode2: '',
        password: '',
        phone: ''
      },
      registerRules: {
        verificationCode: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: false,
      disabled: true,
      // 验证码按钮
      flag: false, // 按钮是否可取
      content: '获取验证码', // 按钮内文本
      totalTime: 60, // 倒计时时间
      kaptchaImg: '' // 验证码图片；base64
    }
  },
  watch: {
    'registerForm.verificationCode'(newval, oldval) {
      if (newval.length === 6) {
        this.disabled = false
      }
    }
  },
  created() {
    this.reloadVerificationCode()
  },
  methods: {
    next() {
      console.log(this.registerForm)
      const data = {
        contactMobile: this.registerForm.phone,
        registerVerificationCode: this.registerForm.verificationCode
      }
      checkMobile(data).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push({
            path: '/registerList',
            query: { phone: this.registerForm.phone }
          })
        } else {
          this.$message.error(res.msg)
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
    // 返回登录
    returnLogin() {
      this.$router.push({ path: '/login', query: '' })
    },
    // 点击按钮倒计时
    getCaptcha() {
      const data = this.registerForm.phone
      getSmsRegisterCode({
        contactMobile: data,
        verification: this.registerForm.verificationCode2
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
.el-input {
  width: 60% !important;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/register/bg@2x.png") no-repeat;
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
    .explain {
      position: absolute;
      top: 46%;
      left: 210px;
      width: 257px;
      h3 {
        font-size: 16px;
        font-weight: Regular;
        color: #323b4b;
        line-height: 22px;
      }
      p {
        font-size: 14px;
        line-height: 23px;
        color: #8a94a6;
      }
    }
  }
  .containerRight {
    .registerForm {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      text-align: center !important;
      margin-top: 24px;
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
    .tips1 {
      font-size: 14px;
      color: #8a94a6;
      position: relative;
      top: -8px;
      text-align: left;
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
