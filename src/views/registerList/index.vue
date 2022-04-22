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
          ref="registerListForm"
          :model="registerListForm"
          :rules="loginRules"
          class="registerListForm"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">注册申请</h3>
          </div>

          <div class="titleList">诊所名称</div>
          <el-form-item prop="clinicName">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="clinicName"
              v-model="registerListForm.clinicName"
              placeholder="请输入诊所名称"
              name="clinicName"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <div class="titleList">所在地区</div>
          <!--省市三级联动-->
          <el-cascader
            v-model="location"
            placeholder="请选择"
            :options="options"
            :props="{ value: 'label' }"
            class="Provinces"
          ></el-cascader>

          <div class="titleList">详细地址</div>
          <el-form-item prop="address" style="height: 100px">
            <span class="svg-container"> </span>
            <el-input
              ref="address"
              v-model="registerListForm.address"
              placeholder="请输入地址"
              name="address"
              type="text"
              tabindex="1"
              auto-complete="on"
              style="height: 100px"
            />
          </el-form-item>
          <div class="titleList">诊所联系人</div>
          <el-form-item prop="contactName">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="contactName"
              v-model="registerListForm.contactName"
              placeholder="请输入联系人"
              name="contactName"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-upload
            ref="uploadSuccess"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :multiple="false"
            class="upload"
            :on-change="success"
          >
            <span class="iconfont icon-a-zu16474 uploadIcon" />
            <i slot="default" class="uploadText">营业执照</i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-upload
            ref="uploadSuccess2"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :multiple="false"
            class="upload"
            :on-change="success2"
          >
            <span
              class="iconfont icon-a-zu16474 uploadIcon"
              style="left: 32px"
            />
            <i slot="default" class="uploadText">机构许可证</i>
            <i slot="default" class="uploadText1">(非必填)</i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove2(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

          <el-checkbox
            v-model="checked"
            class="checkBox"
          >已阅读并接受《用户服务条款》及《隐私协议》</el-checkbox>
          <div class="floatBtn">
            <el-button
              :loading="loading"
              plain
              class="footerBtn"
              @click.native.prevent="last"
            >上一步</el-button>
            <el-button
              :loading="loading"
              type="primary"
              class="footerBtn"
              @click.native.prevent="submit"
            >提 交</el-button>
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
import { toFormData } from './toFormData.js'
import { regionData } from 'element-china-area-data'
import { addClinic } from '@/api/Login&reset&register/api.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入诊所名称'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入诊所联系人'))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入详细地址'))
      } else {
        callback()
      }
    }
    return {
      registerListForm: {
        clinicName: '',
        contactName: '',
        address: ''
      },
      loginRules: {
        clinicName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        address: [
          { required: true, trigger: 'blur', validator: validateAddress }
        ],
        contactName: [
          { required: true, trigger: 'blur', validator: validateName }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: false,
      options: regionData,
      location: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imgFile: [],
      imgFile2: [],
      lastPhone: ''
    }
  },
  watch: {
    location() {
      console.log(this.location)
    }
  },
  created() {
    this.lastPhone = this.$route.query.phone
  },
  methods: {
    handleRemove(file) {
      this.$refs.uploadSuccess.clearFiles()
      this.$refs.uploadSuccess.$el.children[1].style.display = 'block'
    },
    handleRemove2(file) {
      this.$refs.uploadSuccess2.clearFiles()
      this.$refs.uploadSuccess2.$el.children[1].style.display = 'block'
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 营业执照上传成功
    success(response, file, fileList) {
      console.log(response)
      console.log(file)
      this.imgFile = file
      console.log(fileList)
      this.$refs.uploadSuccess.$el.children[1].style.display = 'none'
    },

    // 许可证上传成功
    success2(response, file, fileList) {
      console.log(response)
      this.imgFile2 = file
      console.log(file)
      console.log(fileList)
      this.$refs.uploadSuccess2.$el.children[1].style.display = 'none'
    },
    last() {
      this.$router.go(-1)
    },
    submit() {
      const data = {
        contactMobile: this.lastPhone,
        clinicName: this.registerListForm.clinicName,
        province: this.location[0],
        city: this.location[1],
        area: this.location[2],
        address: this.registerListForm.address,
        contactName: this.registerListForm.contactName,
        clinicLicense: this.imgFile[0].raw || '',
        clinicPermit: this.imgFile2[0].raw || ''
      }
      toFormData(data)
      addClinic(toFormData(data)).then((res) => {
        if (res.code === 200) {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
      // this.$router.push();
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
.login-container .el-input input {
  color: black !important;
}
.upload .el-upload--picture-card {
  width: 136px !important;
  height: 100px !important;
  .el-icon-plus {
    position: relative;
    top: -30px;
    left: 15px;
  }
}
.upload {
  .el-upload-list--picture-card .el-upload-list__item {
    width: 136px !important;
    height: 100px !important;
  }
}
</style>
<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #eee;
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
      top: 15%;
      left: 10%;
    }
    .explain {
      position: absolute;
      top: 35%;
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
    .registerListForm {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 55px 35px 0;
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
      vertical-align: middle;
      width: 104px;
      height: 100%;
      display: inline-block;
    }
    .tips1 {
      font-size: 14px;
      color: #8a94a6;
      position: relative;
      top: -20px;
      text-align: left;
    }
    .Provinces {
      width: 448px;
      height: 64px;
      padding: 8px 5px 12px 30px;
      background: #eaf0f7;
      margin-bottom: 22px;
    }
    .upload {
      float: left;
      margin-right: 20px;
      position: relative;
      .uploadIcon {
        font-size: 25px;
        position: relative;
        top: -35px;
        left: 27px;
      }
      .uploadText {
        font-size: 14px;
        position: relative;
        top: -10px;
        left: -12px;
      }
      .uploadText1 {
        font-size: 14px;
        position: absolute;
        top: 11px;
        left: 42px;
      }
    }
    .checkBox {
      margin-top: 20px;
    }
    .floatBtn {
      text-align: right;
      .footerBtn {
        width: 136px;
        margin-bottom: 24px;
        margin-top: 10px;
        height: 62px;
        font-size: 18px;
      }
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
