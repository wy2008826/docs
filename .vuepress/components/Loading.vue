<template>
    <div class="loading-wraper" v-show="loading">
        <div class="loading" >
            <!--<div class="bounce1"></div>-->
            <!--<div class="bounce2"></div>-->
            <!--<div class="bounce3"></div>-->
        </div>
    </div>

</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import API from '@/utils/API'

    export default {
        name:'loading',
        computed: {
            ...mapGetters([
                'loading'
            ])
        },
        mounted () {
            // API.interceptors()
        }
    }
</script>
<style lang="scss" scoped>
    .loading-wraper{
        @include position((p:fixed,t:0,r:0,b:0,l:0,z:100));
        background-color: transparent;
    }
    .loading{
        @include position((p:fixed,t:40%,l:50%,z:30));
        @include box((w:1.6rem,h:1.6rem,ta:center));
        transform: translate(-0.8rem,-0.8rem);
        color:#f93;

        @include bg('../assets/img/loading.gif');
        background-size:0.8rem auto;
        background-position: center;
        background-repeat: no-repeat;
    }
    .loading > div {
        width: 0.3rem;
        height: 0.3rem;
        background-color: $primary;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
        animation: bouncedelay 1.4s infinite ease-in-out;
        /* Prevent first frame from flickering when animation starts */
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .loading .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .loading .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes bouncedelay {
        0%, 80%, 100% { -webkit-transform: scale(0.0) }
        40% { -webkit-transform: scale(1.0) }
    }

    @keyframes bouncedelay {
        0%, 80%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 40% {
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
          }
    }
</style>
