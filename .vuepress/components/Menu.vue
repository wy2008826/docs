<template>
    <div class="menu">
        <div>
            <router-link ref="menu1" tag="div" to="/index" active-class="menu_checked">
                <p class="no icon iconfont icon-home" ></p>
                <p class="yes icon iconfont icon-homefill" ></p>
                <span>首页</span>
            </router-link>
        </div>
        <div>
            <router-link ref="menu1" tag="div" to="/noticeDirectory" active-class="menu_checked">
                <p class="no icon iconfont icon-xiaoxi-copy" >
                    <span v-if="hasNotReadNotice=='1'" class="red_dot"></span>
                </p>
                <p class="yes icon iconfont icon-xiaoxi" >
                    <span  v-if="hasNotReadNotice=='1'" class="red_dot"></span>
                </p>
                <span>消息</span>
            </router-link>
        </div>
        <div>
            <router-link ref="menu1" tag="div" to="/college/index" active-class="menu_checked">
                <p class="no icon iconfont icon-xueli-copy" ></p>
                <p class="yes icon iconfont icon-xueli" ></p>
                <span>学院</span>
            </router-link>
        </div>

        <!--<div>-->
            <!--<router-link ref="menu2" tag="div"  to="/order" active-class="menu_checked">-->
                <!--<p class="no icon iconfont icon-order"></p>-->
                <!--<p class="yes icon iconfont icon-orderfill"></p>-->
                <!--<span>订单</span>-->
            <!--</router-link>-->
        <!--</div>-->
        <div>
            <router-link  ref="menu3" tag="div"  to="/my" active-class="menu_checked">
                <p class="no icon iconfont icon-user">
                    <!--<span v-if="hasNotReadNotice=='1'" class="red_dot"></span>-->
                </p>
                <p class="yes icon iconfont icon-user-fill">
                    <!--<span  v-if="hasNotReadNotice=='1'" class="red_dot"></span>-->
                </p>
                <span>我的</span>
            </router-link>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Menu',
        props:['hasNotReadNotice'],
        mounted(){

        },
        methods:{
            isActive(ref){
                // return this.$refs[ref];
                return true;
            }
        },
    }
</script>
<style lang="scss" scoped>
    .menu {
        /*max-width: 750px;*/
        border-top: 1px solid $borderColor;
        @include box((bg:#fff,d:flex,fs:0.22rem,lh:1));
        @include position((p:fixed,b:0,r:0,l:0,z:10));

        div{
            @include box((fx:1,ta:center,c:$black9));
        }
        span {
            @include box((d:block,m:0.04rem 0,c:$black9));
        }

    }
    .icon{
        @include box((w:0.54rem,h:0.54rem,m:0.14rem auto 0,d:block,fs:0.48rem));
        position: relative;
        &.yes{
            @include box((d:none));
        };
        &.no{
            @include box((d:block));
        };
    }
    .menu_checked{
        .icon{
            color: $primary;
            &.yes{
                @include box((d:block));
            }
            &.no{
                @include box((d:none));
            };
        }
        span{color: $primary;}
        animation:bounce 400ms forwards;
        @keyframes bounce {
            0% {
                transform:scale(0.8);
            }
            50% {
                transform:scale(1.2);
            }
            100% {
                transform:scale(1);
            }
        }

    }

    .red_dot{
        $size:0.14rem;
        @include box((d:block,w:$size,h:$size,bdr:50%));
        background: $red;
        vertical-align: middle;
        @include position((p:absolute,l:0.4rem,t:0.06rem));
    }
</style>
