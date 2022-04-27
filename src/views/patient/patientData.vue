<template>
  <div>
    <!-- 患者资料顶部名片 -->
    <el-row class="topCard">
      <el-col :span="24">
        <div class="grid-content">
          <div class="user">
            <img src="../../assets/patient/user.png" alt="">
            <span>Galen</span>
            <div class="grid-content appointment">
              <el-button type="primary">创建预约</el-button>
            </div>
            <ul class="cardList">
              <li>
                <p>年龄：33(1990.02.26)</p>
                <p>手机：33(1990.02.26)</p>
              </li>
              <li>
                <p>末诊医生：33(1990.02.26)</p>
                <p>末诊时间：33(1990.02.26)</p>
              </li>
              <li>
                <p>建档人：33(1990.02.26)</p>
                <p>建档时间：33(1990.02.26)</p>
              </li>
              <li>
                <p>患者来源：33(1990.02.26)</p>
                <p>患者标签：33(1990.02.26)</p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <!-- <span class="iconfont icon-tianjia1"></span> -->
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 18px;
  color: $primary;
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #ffffff;
}

.topCard {
  height: 177px;
  background: #ffffff;
  .user {
    padding-left: 24px;
    padding-top: 16px;
    margin-bottom: 16px;
    img {
      vertical-align: middle;
    }
    span {
      margin-left: 10px;
      font-size: 14px;
      color: $black;
    }
  }
  .appointment {
    float: right;
    margin: 4px 24px 0 0;
  }
  .cardList {
    font-size: 14px;
    display: flex;
    margin-top: 16px;
    li {
      flex: 1;
      p {
        color: $black;
        margin: 4px 0 4px 0;
      }
    }
  }
}
</style>
