<template>
  <!-- <div class="app-container"> -->
  <div>
    <!-- 搜索 -->
    <baseSearch></baseSearch>
    <div class="tableDesc">
      <div class="tableDesc-title">
        <div class="mr4">患者列表</div>
        <div>
          <!-- 已选择的数据回显 -->
          <selected-data></selected-data>
        </div>
      </div>
      <div class="tableDesc-total">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link pointer">
            批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>预约</el-dropdown-item>
            <el-dropdown-item>新建回访</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="f12 num">共计3728名患者</div>
      </div>
    </div>
    <!-- 表格 -->
    <Table :list="tableList" :loading="listLoading"></Table>
    <!-- 分页组件 -->
    <diy-paging></diy-paging>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import baseSearch from './components/search.vue'
import Table from './components/table.vue'
import selectedData from './components/selected-data.vue'
export default {

  components: { baseSearch, Table, selectedData },
  data() {
    return {
      tableList: null, // 表格默认数据
      listLoading: false // 表格loading
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      // this.tableList = response.data.items
      setTimeout(() => {
        this.tableList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.listLoading = false
      }, 1000)
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.tableDesc{
  padding: 16px 24px; background: #ffffff;
  display: flex;justify-content:space-between;
  &-title{
    font-size: 16px;display: flex;align-items: center;
  }
  &-total{
    display: flex;align-items: center;
    .num{
      border-left: 1px solid #E3EBF1;
      padding-left: 16px;margin-left: 12px;
    }
  }
}
</style>
