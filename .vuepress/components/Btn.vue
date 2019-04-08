<template>
    <div class="btn">
        <a v-if="!href"
           v-text="label"
           :class="type"
           @click="clickEvent"
           :style="_style"></a>
        <router-link v-if="href"
                     :to="href"
                     :class="type"
                     :style="_style">
            {{label}}
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'Btn',
        props: ['label','click','href','type','_style'],
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
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    $disabledColr:#b5b5b5;
    .btn{
        @include box((d:block,h:3.2rem,lh:3.2rem,ta:center,fs:1.2rem,bdr:0.64rem));
    }
    .primary{
        @extend .btn;
        @include box((c:#fff,bg:$primary));
    }
    .red{
        @extend .btn;
        @include box((c:#fff,bg:$red));
    }
    .wait{
        @extend .btn;
        @include box((bg:rgba(246,76,62,0.50),c:#fff));
    }
    .disabled{
        @extend .btn;
        @include box((c:#fff,bg:$disabledColr));
    }
    .blue{
        @extend .btn;
        @include box((c:#fff,bg:$blue));
    }
    .gray{
        @extend .btn;
        @include box((c:#fff,bg:$disabledColr));
    }
    .red-b{
        @extend .btn;
        @include box((c:$red,bg:$white));
        @include thin(all,$red);
    }
    .blue-b{
        @extend .btn;
        @include box((c:$blue,bg:$white));
        @include thin(all,$blue);
    }
</style>
