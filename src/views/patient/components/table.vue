<template>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      highlight-current-row
      class="table-body"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
      />
      <el-table-column label="患者" fixed width="150">
        <template>
          <div class="table-userInfo">
            <span class="table-userInfo-touxiang icon-touxiangnv iconfont" />
            <span class="table-userInfo-name">lisa</span>
          </div>
          <!--用户标签 -->
          <Tags></Tags>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <!-- <template slot-scope="scope">
          {{ scope.row.title }}
        </template> -->
        <template>
          <div class="f12">
            <div>32</div>
            <div>1992-12-12</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template>
          <span>13456238952</span>
        </template>
      </el-table-column>
      <el-table-column label="累计消费">
        <span>2864.00</span>
      </el-table-column>
      <el-table-column label="欠费总额">
        <span>2864.00</span>
      </el-table-column>
      <el-table-column label="患者来源">
        <span>自然到院</span>
      </el-table-column>
      <el-table-column label="创建时间">
        <span>2020-02-11 07:56</span>
      </el-table-column>
      <el-table-column label="初诊日期">
        <span>2020-02-11 07:56</span>
      </el-table-column>
      <el-table-column label="初诊医生">
        <span>练健</span>
      </el-table-column>
      <el-table-column label="末诊日期">
        <span>2020-02-11 07:56</span>
      </el-table-column>
      <el-table-column label="末诊医生">
        <span>练健</span>
      </el-table-column>
      <el-table-column label="就诊次数" width="80">
        <span>10</span>
      </el-table-column>

      <el-table-column label="操作" class="options" fixed="right" width="120">
        <div>
          <el-link type="primary" :underline="false" class="options-item">
            <router-link to="/patient/appointment">预约</router-link>
          </el-link>
          <el-link type="primary" :underline="false" class="options-item">新建回访</el-link>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Tags from '@/components/patient/Tags.vue'
export default {
  components: { Tags },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  mounted() {

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body div,span,i{
  color: $vice-M;
}
.table{
    &-userInfo{
        margin-bottom: 2px;
        &-touxiang{
            color: #FF5630;font-size: 20px;
        }
        &-name{
            font-size:14px;color: $vice;margin-left: 4px;
            font-family: PingFangSC-Regular;
        }
    }
    .options{
      &-item{
        font-size: 14px;
        margin:0 4px ;
      }
    }
}
</style>
