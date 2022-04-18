<template>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="患者">
        <template>
          <div class="table-userInfo">
            <span class="table-userInfo-touxiang icon-touxiangnv iconfont" />
            <span class="table-userInfo-name">lisa</span>
          </div>
          <div>
            <Tags />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
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
}
</style>
