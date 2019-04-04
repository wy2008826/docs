<template>
  <transition name="show">
    <div class="m-schedule__top" @click="returnTop">
      <i class="iconfont">&#xe714;</i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ScheduleReturnTop',
  props: {
    el: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      scrollToTop: '',
      speed: 0,
      oldValue: 0,
      elements: null
    }
  },
  methods: {
    returnTop() {
      this.elements = document.querySelector(this.el)
      this.scrollToTop = this.elements.scrollTop
      const requestAnimation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
      requestAnimation(this.scrollTop)
    },
    scrollTop() {
      this.speed = Math.ceil(this.scrollToTop / 5)
      if (!this.scrollToTop) return void cancelAnimationFrame(this.scrollTop)
      this.scrollToTop -= this.speed
      this.elements.scrollTop -= this.speed
      requestAnimationFrame(this.scrollTop)
    }
  }
}
</script>

<style scoped lang="scss">
.m-schedule__top {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  float: right;
  right: .5rem;
  bottom: 1.2rem;
  width: 100px;
  height: 100px;
  z-index: 999;
  border-radius: 100px;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, .8);
  .iconfont {
    font-size: .32rem;
    transform: rotate(-.5turn);
  }
}

.show-enter-active {
  animation: fade .5s;
}
.show-leave-active {
  animation: fade .5s reverse;
}
@keyframes fade {
  from {
    transform: translate3d(0, 20px, -20px);
    opacity: 0
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
