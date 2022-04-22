<template>
  <div
    id="slideVerify"
    class="slide-verify"
    :style="widthlable"
    onselectstart="return false;"
  >
    <canvas ref="canvas" :width="w" :height="h" />

    <canvas ref="block" class="slide-verify-block" :width="w" :height="h" />
    <div class="slide-verify-refresh-icon el-icon-refresh" @click="refresh" />
    <div
      class="slide-verify-info"
      :class="{ fail: fail, show: showInfo }"
      @click="refresh"
    >
      {{ infoText }}
    </div>
    <div
      class="slide-verify-slider"
      :style="widthlable"
      :class="{
        'container-active': containerActive,
        'container-success': containerSuccess,
        'container-fail': containerFail,
      }"
    >
      <div class="slide-verify-slider-mask" :style="{ sliderMaskWidth }">
        <!-- slider -->
        <div
          class="slide-verify-slider-mask-item"
          :style="{ left: sliderLeft }"
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
        >
          <div class="slide-verify-slider-mask-item-icon el-icon-s-unfold" />
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
  </div>
</template>
<script>
function sum(x, y) {
  return x + y
}

function square(x) {
  return x * x
}
export default {
  name: 'SlideVerify',
  props: {
    // block length
    l: {
      type: Number,
      default: 42
    },
    // block radius
    r: {
      type: Number,
      default: 10
    },
    // canvas width
    w: {
      // 背景图宽
      type: [Number, String],
      default: 350
    },
    // canvas height
    h: {
      // 背景图高
      type: [Number, String],
      default: 200
    },
    // canvas width
    sw: {
      // 小图宽
      type: [Number, String],
      default: 50
    },
    // canvas height
    sh: {
      type: [Number, String],
      default: 50
    },
    // block_x: {
    //   type: Number,
    //   default: 155
    // },
    blocky: {
      // 小图初始的垂直距离
      type: [Number, String],
      default: 20
    },
    sliderText: {
      type: String,
      default: 'Slide filled right'
    },
    imgurl: {
      // 大图地址
      type: String,
      default: ''
    },
    miniimgurl: {
      // 小图地址
      type: String,
      default: ''
    },
    fresh: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      // block_x: undefined, // container random position
      // blocky: undefined,
      L: this.l + this.r * 2 + 3, // block real lenght
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: '',
      sliderLeft: 0, // block right offset
      sliderMaskWidth: 0, // mask width
      dialogVisible: false,
      infoText: '验证成功',
      fail: false,
      showInfo: false
    }
  },
  watch: {
    fresh(val) {
      if (val) {
        this.init()
      }
    }
  },
  mounted() {
    // 随机生成数this.block_x =
    this.init()
  },
  methods: {
    init() {
      this.initDom()
      this.bindEvents()
      this.widthlable = '' + this.w + 'px;'
    },
    initDom() {
      this.block = this.$refs.block
      this.canvasStr = this.$refs.canvas

      this.canvasCtx = this.canvasStr.getContext('2d')
      this.blockCtx = this.block.getContext('2d')
      this.initImg()
    },
    initImg(h) {
      var that = this
      const img = document.createElement('img')
      img.onload = onload
      img.onerror = () => {
        img.src = that.imgurl
      }
      img.src = that.imgurl
      img.onload = function() {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h)
      }

      this.img = img
      const img1 = document.createElement('img')
      var blockCtx = that.blockCtx
      var blocky = h || that.blocky
      if (blocky === 0) {
        return
      }
      img1.onerror = () => {
        img1.src = that.miniimgurl
      }
      img1.src = that.miniimgurl
      img1.onload = function() {
        // blockCtx.drawImage(img1, 0, blocky, that.sw, that.sh)
        blockCtx.drawImage(img1, 0, blocky, 55, 45)
      }
      // console.log(777, h)
    }, // 刷新
    refresh() {
      this.$emit('refresh')
    },
    sliderDown(event) {
      this.originX = event.clientX
      this.originY = event.clientY
      this.isMouseDown = true
    },
    touchStartEvent(e) {
      this.originX = e.changedTouches[0].pageX
      this.originY = e.changedTouches[0].pageY
      this.isMouseDown = true
    },
    bindEvents() {
      document.addEventListener('mousemove', (e) => {
        if (!this.isMouseDown) return false
        const moveX = e.clientX - this.originX
        const moveY = e.clientY - this.originY
        if (moveX < 0 || moveX + 38 >= this.w) return false
        this.sliderLeft = moveX + 'px'
        const blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX
        this.block.style.left = blockLeft + 'px'
        this.containerActive = true // add active
        this.sliderMaskWidth = moveX + 'px'
        this.trail.push(moveY)
      })
      document.addEventListener('mouseup', (e) => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        if (e.clientX === this.originX) return false
        this.containerActive = false // remove active
        this.verify()
      })
    },
    touchMoveEvent(e) {
      if (!this.isMouseDown) return false
      const moveX = e.changedTouches[0].pageX - this.originX
      const moveY = e.changedTouches[0].pageY - this.originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.sliderLeft = moveX + 'px'
      const blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX
      this.block.style.left = blockLeft + 'px'

      this.containerActive = true
      this.sliderMaskWidth = moveX + 'px'
      this.trail.push(moveY)
    },
    touchEndEvent(e) {
      if (!this.isMouseDown) return false
      this.isMouseDown = false
      if (e.changedTouches[0].pageX === this.originX) return false
      this.containerActive = false
      this.verify()
    },
    verify() {
      const arr = this.trail // drag y move distance
      const average = arr.reduce(sum) / arr.length // average
      const deviations = arr.map((x) => x - average) // deviation array
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // standard deviation
      const left = parseInt(this.block.style.left)
      this.$emit('success', left, stddev)
    },
    reset(h) {
      this.containerActive = false
      this.containerSuccess = false
      this.containerFail = false
      this.sliderLeft = 0
      this.block.style.left = 0
      this.sliderMaskWidth = 0
      this.canvasCtx.clearRect(0, 0, this.w, this.h)
      this.blockCtx.clearRect(0, 0, this.w, this.h)
      this.fail = false
      this.showInfo = false
      this.containerFail = false
      this.containerSuccess = false
      this.initImg(h)
    },
    handleFail() {
      this.fail = true
      this.showInfo = true
      this.infoText = '验证失败'
      this.containerFail = true
      // console.log(6666)
      // setTimeout(() => {
      //   this.block.style.left = 0
      //   this.sliderMaskWidth = 0
      //   this.sliderLeft = 0
      //   this.fail = false
      //   this.showInfo = false
      //   this.containerFail = false
      // }, 800)
    },
    handleSuccess() {
      // console.log(777)
      this.showInfo = true
      this.infoText = '验证成功'
      this.containerSuccess = true
      setTimeout(() => {
        this.block.style.left = 0
        this.sliderMaskWidth = 0
        this.sliderLeft = 0
        this.fail = false
        this.showInfo = false
        this.containerSuccess = false
      }, 1000)
    }
  }
}
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 310px;
  overflow: hidden;
}

.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  content: "刷新";
  font-size: 22px;
  line-height: 34px;
  text-align: center;
  font-weight: bold;
  color: #3fdeae;
  /* background: url("../../assets/move/icon_light.png") 0 -437px; */
  background-size: 34px 471px;
}
.slide-verify-refresh-icon:hover {
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slide-verify-info {
  position: absolute;
  top: 170px;
  left: 0;
  height: 30px;
  width: 350px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  background-color: #52ccba;
  opacity: 0;
}
.slide-verify-info.fail {
  background-color: #f57a7a;
}
.slide-verify-info.show {
  animation: hide 1s ease;
}
@keyframes hide {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}
.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 -13px;
}

.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 9px;
  left: 7px;
  width: 14px;
  height: 12px;
  content: "法币";
  font-size: 22px;
  color: #ddd;
  /* text-align: center;
    line-height: 12px; */
  /* background: url("../../assets/move/icon_light.png") 0 -26px; */
  /* background-size: 34px 471px; */
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-bottom: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
