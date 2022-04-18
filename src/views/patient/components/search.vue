<template>
  <div class="search">
    <div class="search-content">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        size="small"
        class="demo-ruleForm"
      >
        <div class="flex align-center ju-be">
          <div class="flex align-center">
            <el-form-item label-width="0px">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入姓名/手机号"
              />
            </el-form-item>
            <el-form-item label-width="0px" class="search-content-times">
              <el-date-picker
                v-model="times"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label-width="24px">
              <el-link
                type="primary"
                :underline="false"
                class="search-content-more"
              >
                <span>主要链接</span>
                <span class="el-icon-arrow-down" />
              </el-link>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >查询</el-button>
          </el-form-item>
        </div>
        <div class="search-user flex">
          <div>个人信息：</div>
          <div class="search-user-form">
            <el-form-item label-width="100px" label="患者类型">
              <el-select placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  data() {
    return {
      times: [],
      ruleForm: {
        name: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &-content {
    background: #fff;
    padding: 24px 16px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    ::v-deep .el-form-item {
      margin-bottom: 16px;
    }
    &-times {
      margin: 0 24px;
    }
    &-more span {
      font-size: 12px;
    }
  }
  &-user {
  }
}
</style>
