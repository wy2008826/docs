<template>
    <div>
        <router-link class="bar" :style="_style||''" tag="div" v-if="href" :to="href" @click="clickEvent">
            <slot name="icon"></slot>
            <label v-html="label" :style="_labelStyle||''"></label>
            <span class="arrowArea">
                <slot name="arrowText"></slot>
                <i class="icon iconfont icon-arrow-right" v-if="arrow"></i>
            </span>
            <slot></slot>
        </router-link>
        <div class="bar" :style="_style||''" v-if="!href" @click="clickEvent">
            <slot name="icon"></slot>
            <label v-text="label" :style="_labelStyle||''"></label>
            <span class="arrowArea">
                <slot name="arrowText"></slot>
                <i class="icon iconfont icon-arrow-right" v-if="arrow"></i>
            </span>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Bar',
        props: ['label','click','href','arrow','_style','_labelStyle'],
        methods:{
          clickEvent(){
              if(typeof this.click === 'function'){
                  this.click()
              }
          }
        }
    }
</script>
<style lang="scss" scoped>
    .bar{
        @include box((lh:0.83rem,p:0 0.2rem));
        background-color:$white;
        @include thin('bottom',$borderColor);
        clear:both;
        label{
            @include box((c:$black3));
        }
        .arrowArea{
            @include box((fl:right));
            position: relative;
        }
        .icon{
            @include box((fs:0.32rem));
        }
    }
</style>
