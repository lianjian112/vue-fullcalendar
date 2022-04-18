<template>
  <div class="tags">
    <div class="tags-item center tags-qian">欠</div>
    <div class="tags-item center tags-yue">约</div>
    <div class="tags-item center tags-tei">特</div>
    <div class="tags-item center tags-normal">联</div>
    <div class="tags-item center tags-normal">敏</div>
    <div class="tags-item center tags-normal">正</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.tags{
    display: flex;
    &-item{
        width:18px;height: 18px;padding: 2px 2px;
        border-radius: 2px;font-size: 14px;
        font-family: PingFangSC-Regular;margin-right: 2px;
    }
    &-qian{
        color: #FF5630;background: rgba(255, 97, 87, 0.2);
    }
    &-yue{
        color: #FF9830;background: rgba(239, 135, 51, 0.2);
    }
    &-tei{
        background: rgba(75, 188, 109, 0.2);color: #38CB89;
    }
    &-normal{
      color: $vice;background: rgba(227, 235, 241, 0.7);
    }
}
</style>
