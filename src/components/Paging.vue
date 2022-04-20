<template>
  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next,jumper"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.paging{
    background: #fff;padding: 24px;
    text-align: right;
}
</style>
