<template>
  <div class="selected-data-form-data">
    <div class="selected-data-form-data-item">
      <span>初诊医生:周良</span>
      <span class="iconfont icon-a-zu16493 cha"></span>
    </div>
    <div class="selected-data-form-data-item">
      <span>出诊时间:2021-03-01至2021-03-30</span>
      <span class="iconfont icon-a-zu16493 cha"></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.selected-data {
  &-form{
    &-data{
      font-size: 12px;display:flex;
      &-item{
        color: $primary;margin-right: 16px;
        font-family: PingFang SC;font-weight: 400;
      }
      &-item:last-child{
        margin-right: 0px;
      }
      .iconfont{
        cursor: pointer;
        font-size: 12px;margin-left: 6px;color:$black;
      }
    }
  }

}
</style>
