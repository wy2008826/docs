<template>
  <div>
    <div class="header">
      <span></span>
      <span class="title" v-text="title"></span>
    </div>
    <div class="body">
      <div></div>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Card',
  data: () => {
    return {
      title: '快速上手'
    }
  },
  props: {
    title: String,
  }
}
</script>

<style lang="scss" scoped>

</style>
