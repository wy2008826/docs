<template>
    <div class="dialog" v-show="msg.show">
        <div class="icon iconfont" :class="icon"></div>
        <div class="content" v-text="msg.content"></div>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: 'msg',
        methods: {
            ...mapActions([
                'showMsg'
            ])
        },
        computed: {
            ...mapGetters([
                'msg'
            ]),
            icon(){
                const iconType={
                    warn:'icon-tip',
                    success:'icon-checked-not',
                    error:'icon-close'
                };

                return iconType[this.msg.type || 'warn']
            }
        }
    }
</script>
<style lang="scss" scoped>

    .icon{
        @include box((fs:0.6rem,c:$white,lh:1rem));
    }
    .dialog{
        @include position((p:fixed,t:35%,l:2.25rem,z:30));
        @include box((w:3rem,bg:rgba(90,90,90,0.6),bdr:0.2rem,ta:center));
    }
    .content{
        @include box((c:#fff,fs:0.28rem,p:0.3rem 0.2rem,lh:0.4rem));
        min-height:1.2rem;
    }
</style>
