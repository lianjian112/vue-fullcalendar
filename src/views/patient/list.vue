<template>
  <div class="app-container">
    <!-- 搜索 -->
    <baseSearch />
    <!-- 表格 -->
    <Table :list="tableList" :loading="listLoading"></Table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import baseSearch from './components/search.vue'
import Table from './components/table.vue'
export default {

  components: { baseSearch, Table },
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
      getList().then(response => {
        this.tableList = response.data.items
        setTimeout(() => { this.listLoading = false }, 1000)
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
