<template>
  <div>
    <el-drawer
      title="消息"
      append-to-body
      :modal="false"
      size="348px"
      class="drawer-message"
      :visible.sync="messageDrawer"
    >
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="系统消息" name="first">
            <newsItem />
            <newsItem />
          </el-tab-pane>
          <el-tab-pane label="平台公告" name="second">平台公告</el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import newsItem from './Item.vue'
export default {
  name: 'MessageDrawer',
  components: { newsItem },
  props: {
    messageDrawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'second'
    }
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-message{
    ::v-deep .el-drawer__body{
        margin: 0 10px;
        margin-bottom: 25px;
        .el-tabs__item{
            color: #B0B7C3;font-size: 12px;
        }
        .is-active{
            color: #323B4B;
        }
        .el-tabs__active-bar{
            // width: 18px !important;
        }
    }
}
</style>
