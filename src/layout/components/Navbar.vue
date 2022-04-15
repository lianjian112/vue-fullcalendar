<template>
  <div>
    <div class="navbarCom">
      <div class="navbarCom-left">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <!-- <breadcrumb class="breadcrumb-container" /> -->
        <div class="navbarCom-organization-name">成都新华光口腔诊所</div>
      </div>

      <div class="right-menu">
        <div class="right-menu-search">
          <el-autocomplete
            v-model="state"
            clearable
            prefix-icon="el-icon-search"
            class="right-menu-search-input"
            :maxlength="20"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入姓名和手机号..."
            @select="handleSelect"
          />
          <el-button type="primary" class="right-menu-btn">
            <span class="iconfont  icon-add-user" />
            <span>添加患者</span>
          </el-button>
        </div>
        <div class="right-menu-icons">
          <!-- 点击消息icon -->
          <el-badge is-dot class="badge">
            <span class="icon-a-zu16489 iconfont" @click="showMessage=!showMessage" />
          </el-badge>
          <!-- 点击客服弹窗 -->
          <el-popover
            placement="bottom-start"
            trigger="click"
            popper-class="kefu-popper"
            width="181"
          >
            <div class="kefu-content">
              <p class="kefu-content-title text-center">
                客服联系方式
              </p>
              <div class="text-center">
                <el-image
                  style="width: 38px; height: 38px"
                  src="https://qr.api.cli.im/newqr/create?data=hello&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=ad80fe56900a7527c6f09b0edbf4268d"
                />
                <div class="mb4">公众号</div>
              </div>
              <div>
                <div class="kefu-content-contact">
                  <span class="iconfont icon-a-zu16474" />
                  <span>rcy1997@hgylqx.com</span>
                </div>
                <div class="kefu-content-contact">
                  <span class="iconfont icon-a-zu15936" />
                  <span>rcy1997@hgylqx.com</span>
                </div>
              </div>
            </div>
            <div slot="reference">
              <i class="icon-a-zu15936 iconfont" />
            </div>
          </el-popover>

          <a href="http://47.108.233.89:9090" target="_blank">
            <i class="icon-a-zu15937 iconfont" />
          </a>
        </div>
        <!-- 点击用户头像弹窗 -->
        <el-popover
          class="avatar-container"
          placement="bottom-start"
          trigger="click"
          popper-class="user-popper"
          width="117"
        >
          <div>
            <div class="avatar-container-label">
              <span class="fs10 avatar-container-label-item">前台</span>
              <span class="fs10 avatar-container-label-item">管理员</span>
            </div>
            <div>
              <p class="avatar-container-options">修改密码</p>
              <p class="avatar-container-options">我的业绩</p>
              <p class="avatar-container-options" @click="logout">
                安全退出
              </p>
            </div>
          </div>
          <div slot="reference" class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <span class="avatar-wrapper-name">lisa</span>
            <i class="el-icon-caret-bottom" />
          </div>
        </el-popover>
      </div>

    </div>
    <!-- 点击消息中心的抽屉弹框 -->
    <MessageDrawer :message-drawer="showMessage" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import MessageDrawer from './top/message/index.vue'
export default {
  components: {
    // Breadcrumb,
    Hamburger, MessageDrawer
  },
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null,
      showMessage: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },

  mounted() {
    this.restaurants = this.loadAll()
  },

  methods: {

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 点击安全退出
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 下面是输入框的搜索是事件
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
.navbarCom {
  height: 56px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left{
    display: flex;align-items: center;
  }
  .hamburger-container {
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    &-search{
      display: flex;align-items:center;
      &-input{
        min-width: 436px;
        .el-input__inner{
          border: none;
          height: 36px;
          background: rgba(234, 237, 240, 0.7);
          border-radius: 2px;
        }
      }
    }
    &-btn{
      width: 94px;height: 36px;
      margin-left: 10px;margin-right: 86px;
      display: flex;align-items: center;justify-content: center;
      .icon-add-user{
        font-size: 18px;margin-right: 4px;
      }
    }
    &-icons{
      display: flex;align-items:center;
      .iconfont{
       font-size: 20px;
        cursor: pointer;
      }
      .icon-a-zu15936{
        margin: 0 18px;
      }
      .icon-a-zu15937{
        margin-right: 18px;
      }
      .badge .is-dot{
        left: -8px;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #171C33;
        &-name{
          margin-left: 8px;margin-right: 4px;
        }
        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
        }
      }

    }
  }
  &-organization{
    &-name{
      color: #BBC0CC;
      font-size: 16px;
      }
  }
}

.avatar-container{
  &-label{
    margin: 8px;
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #F3F3F3;
    box-shadow: 0px 16px 20px rgba(0, 18, 64, 0.06);
    opacity: 1;
    box-sizing: border-box;
    border-radius: 4px;padding:6px 4px;
    margin-right: 4px;
    &-item{
      background: rgba(0, 47, 167, 0.03);
      padding: 3px 9px;font-size: 10px;
      margin-bottom: 6px;
      // color: $primary;
      margin-right: 4px;
    }
  }
  &-options{
    // color: $vice;
    padding-left: 10px;font-size: 14px;
    line-height: 32px;cursor: pointer;
    &:hover{
      background: rgba(0, 47, 167, 0.39);color: #323B4B;
    }
  }
}
.user-popper{
  padding: 0 !important;right: 0!important;
}
.kefu-content{
  font-size: 12px;color: #323B4B;
  &-title{
    margin-bottom: 16px;margin-top: 4px;
  }
  &-contact{
    color: #8A94A6;display: flex;align-items: center;
    .iconfont{
      margin-right: 8px;
    }
  }
}
</style>
