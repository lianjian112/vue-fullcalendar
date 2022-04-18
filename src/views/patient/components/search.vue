<template>
  <div class="search">
    <div class="search-content">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        size="small"
        class="search-form"
      >
        <!-- 初级筛选内容 -->
        <div class="flex align-center ju-be mb4 form-part1">
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
                @click="showMoreFilter=!showMoreFilter"
              >
                <span>高级筛选</span>
                <span :class="showMoreFilter?'el-icon-arrow-up':'el-icon-arrow-down'" />
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
        <!-- 高级筛选内容 -->
        <el-collapse-transition>
          <div v-show="showMoreFilter" class="search-showMoreFilter">
            <!-- 高级筛选内容-个人信息 -->
            <div class="search-user mb4 flex border-dashed">
              <div class="search-user-title">个人信息：</div>
              <div class="search-user-form">
                <el-form-item label="患者类型：">
                  <el-select placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="患者来源：">
                  <el-select placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="患者性别：">
                  <el-select placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="患者年龄：">
                  <div class="search-user-age center">
                    <el-input placeholder="请输入年龄" :min="3"></el-input>
                    <span class="iconfont icon-pozhe"></span>
                    <el-input placeholder="请输入年龄" :max="100"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="患者标签：">
                  <el-select placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <!-- 高级筛选内容-就诊信息 -->
            <div class="search-user flex">
              <div class="search-user-title">就诊信息：</div>
              <div class="search-user-form">
                <el-form-item label="初诊医生：">
                  <el-select placeholder="请选择初诊医生">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="初诊时间：">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
                <el-form-item label="末诊医生：">
                  <el-select placeholder="全部医生">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="末诊时间：">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
                <el-form-item label="欠费金额：">
                  <div class="search-user-age center">
                    <el-input placeholder="请输费金额" :min="0"></el-input>
                    <span class="iconfont icon-pozhe"></span>
                    <el-input placeholder="请输费金额"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="消费金额：">
                  <div class="search-user-age center">
                    <el-input placeholder="请输入金额：" :min="0"></el-input>
                    <span class="iconfont icon-pozhe"></span>
                    <el-input placeholder="请输入金额："></el-input>
                  </div>
                </el-form-item>
              </div>
            </div>
            <!-- 已选择的数据回显 -->
            <div class="search-form-data">
              <div class="search-form-data-item">
                <span>初诊医生:周良</span>
                <span class="iconfont icon-a-zu16493 cha"></span>
              </div>
              <div class="search-form-data-item">
                <span>出诊时间:2021-03-01至2021-03-30</span>
                <span class="iconfont icon-a-zu16493 cha"></span>
              </div>
            </div>
          </div>
        </el-collapse-transition>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSearch',
  data() {
    return {
      showMoreFilter: false, // 是否展示高级筛选
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
  .border-dashed{
    border-bottom:1px #E9E9E9 dashed ;
  }
  &-form{
    position: relative;
    &-data{
      margin-top: 26px;margin-bottom: 8px;font-size: 12px;display:flex;
      &-item{
        color: $primary;margin-right: 16px;
        font-family: PingFang SC;font-weight: 400;
      }
      &-item:last-child{
        margin-right: 0px;
      }
      .iconfont{
        font-size: 12px;margin-left: 6px;color:$black;
      }
    }
  }
  .form-part1{
    padding: 24px 16px;
    padding-bottom: 0;
  }
  &-showMoreFilter{
    position: absolute;border-radius: 2px;z-index: 999;
    padding: 0 16px;
    background: #fff;box-shadow: 0px 16px 50px rgba(0, 18, 64, 0.06);
  }
  ::v-deep .el-input__inner{
    width: 230px;
    // max-width: 230px;
  }
  &-content {
    background: #fff;
    padding: 24px 0s;
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
    &-title{
      min-width: 80px;
      margin-top: 8px;
      font-family: PingFang SC;
      font-weight: 500;
    }
    &-form{
      flex: 1;
      display: flex;flex-wrap: wrap;
    }
    &-age{
      border:1px solid #DCDFE6;
      width: 230px;
      border-radius:4px;
      ::v-deep .el-input__inner{
        border: none;
        max-width: 100px;
        min-width: 100px;
      }
    }
  }
}
</style>
