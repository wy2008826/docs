<template>
    <div>
        <p class="chick" @click="show=!show">Toast 组件交互展示=></p>
        <Toast  :show="show"
                :title="{back:true,text:'返回'}"
                cancelText="取消"
                @msg="onClick"
        >
            <div class="toast-slot-content">
                自定义内容---自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容
            </div>
        </Toast>

    </div>
</template>

<script>
    import Toast from './Toast';
    import Inp from './Input';

    export default {
        name: 'PageToast',
        data:function(){
            return {
                show:false,
                result:[],
                val:''
            }
        },
        props: {

        },
        mounted(){
            setTimeout(()=>{
                this.show=true
            },1000)
        },
        methods: {
            onClick(status) {
                this.show=status
            }
        },
        components:{
            Toast,
            Inp
        }
    };
</script>

<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    .chick{
        cursor: pointer;
        color:$blue
    }
    .toast-slot-content{
        @include box((p:20px,h:200px,c:$red));
    }


</style>
