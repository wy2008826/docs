<template>
    <router-link tag="div" :to="href||''" class="shopCart"
                 :class="{add:shopCardActive.add,decrease:shopCardActive.decrease}"
    >
        <label  class="hasDot" v-text="goodsAmount"></label>
        <span class="dot" ref="dot"></span>
        <i class="icon iconfont icon-shopping-cart" ></i>
    </router-link>
</template>

<script>
    export default {
        name: "ShopCart",
        data: () => {
            return {
                // shopCardActive:{
                //     add:false,
                //     decrease:false
                // },
            }
        },
        props: ['goodsAmount','shopCardActive','href'],
        mounted: function () {
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

<style lang="scss" scoped>
    .shopCart{//购物车
        $size:1.2rem;
        @include box((w:$size,h:$size,lh:$size,bdr:50%,ta:center));
        @include position((p:fixed,b:0.3rem,r:0.3rem));
        @include thin(all,$borderColor);
        background-color: $white;
        cursor:pointer;
        box-shadow:0.08rem 0.08rem 0.12rem $borderColor ;
        .iconfont{
            @include box((fs:0.6rem,c:#b5b6b6));
        }
        transition: all ease 400ms;

        $dotSize:0.2rem;
        .hasDot{
            $amountSize:0.4rem;
            @include box((h:$amountSize,lh:$amountSize,ta:center,bdr:0.2rem,c:$white,p:0 0.1rem));
            min-width: 0.4rem;
            background-color: $primary;
            @include position((p:absolute,t:22%,l:60%));
        }
        .dot{

            $amountSize:0.2rem;
            @include box((w:$amountSize,h:$amountSize,lh:$amountSize,bdr:50%));
            background-color: $primary;
            @include position((p:absolute,t:26%,l:68%));
            opacity: 0;
        }
        &.add{
            animation:add 400ms forwards;
            @keyframes add {
                0% {
                    transform:scale(1);
                }
                50% {
                    transform:scale(1.2);
                }
                100% {
                    transform:scale(1);
                }
            }
            .dot{
                animation:fadeInCart 400ms forwards;
                @keyframes fadeInCart {
                    0% {
                        transform:translate3d(1.5rem,-3rem,0);
                        opacity: 0;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        transform:translate3d(0,0,0);
                        opacity: 0;
                    }
                }
            }
        }
        &.decrease{
            animation:decrease 400ms forwards;
            @keyframes decrease {
                0% {
                    transform:scale(1);
                }
                50% {
                    transform:scale(0.8);
                }
                100% {
                    transform:scale(1);
                }
            }
            .dot{
                animation:fadeOutCart 400ms forwards;
                @keyframes fadeOutCart {
                    0% {
                        transform:translate3d(0,0,0);
                        opacity: 1;
                    }
                    100% {
                        transform:translate3d(2rem,2rem,0);
                    }
                }
            }
        }
    }
</style>
