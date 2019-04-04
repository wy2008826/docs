<template>
    <i  class="textIcon" :class="type" v-text="text[type]"></i>
</template>
<script>
    export default {
        name: 'GoodLabels',
        props: ['type'],
        data:()=>{
            return {
                text:{
                    preSale:'预售',
                    preTimeSale:'预'
                }
            }
        },
        methods:{

        }
    }
</script>
<style lang="scss" scoped>
    .textIcon {
        @include box((lh:0.3rem,d:inline-block,bdr:0.06rem,fs:0.2rem,c:$white,p:0 0.08rem));
        vertical-align: middle;
    }
    .preSale{
        @include box((bg:$blue2));
    }
    .preTimeSale{
        @include box((bg:#00CCFF));
    }
</style>
