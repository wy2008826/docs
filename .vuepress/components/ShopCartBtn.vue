<template>
    <router-link tag="div" :to="href||''" class="shopCartBtn"
                 :class="{add:shopCardActive.add,decrease:shopCardActive.decrease}"
    >
        <p class="cartText" :class="{add:shopCardActive.add,decrease:shopCardActive.decrease}">
            查看购物车<span v-text="'('+goodsAmount+')'"></span>
        </p>
    </router-link>
</template>

<script>
    export default {
        name: "ShopCartBtn",
        data: () => {
            return {

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
    .shopCartBtn{//购物车
        @include box((h:1rem));
        @include position((p:fixed,b:0,r:0,l:0));
        background-color: $white;
        @include thin(top,$borderColor);

        .cartText{
            @include box((lh:0.64rem,w:5rem,ta:center,bdr:0.4rem,m:0.18rem auto,c:$primary));
            @include thin(all,$primary);
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
        .cartText.add{
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
        .cartText.decrease{
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
