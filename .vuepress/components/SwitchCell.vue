<template>
  <div class="container">
    <span v-text="title"></span>
    <my-switch class="btn" v-bind="$props" @change="$emit('input', $event)"></my-switch>
  </div>
</template>

<script>
import mySwitch from './Switch'

export default {
  name:'SwitchCell',
  props:{
    title: String,
    value: Boolean,
  },
  components: {
    mySwitch
  }
}
</script>

<style lang="scss" scoped>
  $height: 1rem;
  .container {
    @include box((d:block,w:100%,h:$height,bg:#fff));
    @include thin('bottom',$borderColor);
    span {
      line-height: $height;
      font-size: .35rem;
      margin-left: 0.3rem;
    };
    .btn {
      @include position((p:absolute, r:0));
      font-size: .5rem !important;
      transform: translate(-50%,50%)
    }
    
  }
</style>

