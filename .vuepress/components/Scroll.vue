
<template>
    <div class="wrap dataLists" ref="bs0">
        <div ref="wrap0" class="container" up="下拉刷新" down="上拉加载" v-show="dataLists.length">
            <ul class="listWraper" ref="listWraper">
                <li v-for="i in 100" v-text="i">

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import BScroll from 'better-scroll'

    export default {
        name: 'Scroll',
        data() {
            return {
                isLoading: false,//正在加载
            }
        },
        created(){

        },
        async mounted(){
            await this.loadNavData()//加载初始化列表
            this.$nextTick(() => {
                this.createScroll()
            })
            const bs = this.$refs.bs0
            const listWraper = this.$refs.listWraper
            listWraper.style.minHeight = bs.getBoundingClientRect().height + 'px'
        },
        methods: {

            async loadNavData(){//获取对应的数据列表
                let i = this.navInd
                const param = {
                    status: i,//0 可使用 1 历史优惠券
                    type: 2,//1 现金红包 2 虚拟红包  目前都是传2
                    numPerPage: 20,
                    pageNum: this[i].pageNum + 1,
                }

                this.isLoading = true
                const obj = await API.get(API.getRedpacketList, param)
                this.isLoading = false

                this[i].lists = this[i].lists.concat(obj.recordList || [])
                this[i].totalPage = obj.totalPage
                this[i].pageNum = obj.currentPage

                this.$nextTick(() => {
                    this.scroll && this.scroll.refresh()
                })
            },
            createScroll(){
                const bs = this.$refs.bs0
                const scroll = this.scroll = new BScroll(bs, {
                    click: true,
                    preventDefault: true
                })

                const wrap = this.$refs.wrap0
                let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                scroll.on('touchend', async (pos) => {
                    diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                    if (pos.y > 50) {
                        wrap.setAttribute('up', '刷新中')

                        this[this.navInd].pageNum = 0
                        setTimeout(async () => {
                            scroll.scrollTo(0, 50)
                            this[this.navInd].lists = []
                            await this.loadNavData()
                            wrap.setAttribute('down', '下拉加载')
                            scroll.scrollTo(0, 0)
                        }, 100)
                    }
                    if (diff - pos.y > 50) {
                        if (this[this.navInd].pageNum < this[this.navInd].totalPage && !this.isLoading) {
                            await this.loadNavData()
                            this.$nextTick(() => {
                                scroll.refresh()
                                diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                            })
                        } else {
                            wrap.setAttribute('down', '已全部加载')
                        }
                    }
                })
            }
        },
        computed: {
            dataLists(){
                return this[this.navInd].lists
            }
        },
        components: {

        }
    }
</script>
<style lang="scss" scoped>
    .no_lists {
        @include box((m:1.7rem auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0.48rem auto 0));
            @include bg_img('my/empty_coupon.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .wrap {
        @include box((p:0 0.3rem, w:100%));
        @include position((p:absolute, t:0.88rem, l:0, b:0.8rem, z:0))
        overflow: hidden;
        .container {
            position: relative;
            padding-top: 0.3rem;
            $beforeAfterH: 0.5rem;
            &:before {
                content: attr(up);
                @include position((p:absolute, l:0, t:- $beforeAfterH, z:10));
                @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
            }
            &:after {
                content: attr(down);
                @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
                position: absolute;
            }
            .card {
                padding-bottom: 0.3rem;
            }
        }
    }

    .history_rules {
        @include box((lh:0.37rem, ta:center, fs:0.26rem, p:0.2rem 0, w:100%));
        @include position((p:fixed, l:0, b:0));
        span {
            @include box((p:0 0.3rem));
            color: $black9;
            @include thin(left, #E5E5E5);
        }
        a {
            @include box((p:0 0.3rem));
            color: $blue;
        }
    }
</style>
