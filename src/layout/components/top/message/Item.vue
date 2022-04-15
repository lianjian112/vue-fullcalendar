<template>
  <div class="news-item">
    <div class="news-item-time">4月25日 16:20</div>
    <div class="news-item-title">预约取消</div>
    <div class="news-item-info">
      <span>患者1预约医生周良 2022-04-12 16:00 [xxxx项目]临时取消 </span>
      <span class="news-item-info-options">请尽快完成</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem'
}
</script>

<style lang="scss" scoped>
.news-item{
  padding-bottom: 8px;
  // color: $vice;
  margin-bottom: 12px;font-size: 12px;
  border-bottom: 1px solid #F3F3F3;
  &-time{
    text-align: center;margin-bottom: 10px;
  }
  &-title{
    color: #323B4B;
    margin-bottom: 8px;

  }
  &-info{
    &-options{
      color: #323B4B;
    }
  }
}
</style>
