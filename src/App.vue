<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
// 字体
.fs10{
    font-size: 12px !important;
		transform: scale(0.83);
}
// 布局
.flex{
  display: flex;
}
.ju-be{
  justify-content: space-between;
}
.ju-center{
  justify-content: center;
}
.align-center{
  align-items: center
}
.text-center{
  text-align: center;
}
.center{
  display: flex;align-items: center;justify-content: center;
}

// 间距
.mt4{
  margin-top: 16px;
}
.mb4{
  margin-bottom: 16px;
}
</style>
