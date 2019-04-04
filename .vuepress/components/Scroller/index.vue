
<!--该组件调用的时候需要在Scroller调用层外面定义一个包裹元素，设置包裹元素的位置 该scroller即可在定义的包裹元素区间内滚动

@required: yes 必须传递的参数
    v-model  用于向父组件传递请求到的列表数据,在父组件中进行渲染列表
    apiUrl   接口调用地址

@required :no
    injectParams ：用于接口调用的时候插入额外的参数

-->

<template>
    <div class="scroller-wraper" >
        <PullRefresh v-model="isRefreshLoading" @refresh="onRefresh">
            <EmptyLists v-if="!lists.length && !isRefreshLoading"/>
            <List v-model="loading"
                  :finished="finished"
                  @load="getList"
                  class="listWraper_local"
            >
                <slot />
                <slot name="listsWraper"></slot>
            </List>
        </PullRefresh>
    </div>
</template>

<script>

    import API from 'utils/API'
    import List from '@/components/List'
    import PullRefresh from '@/components/PullRefresh'
    import EmptyLists from '@/components/EmptyLists'


    export default {
        name: "Scroller",
        data: () => {
            return {
                page:1,
                pageSize:10,
                lists:[],
                loading:false,
                finished:false,
                isRefreshLoading:false,
            }
        },
        props: {
            apiUrl:String,
            injectParams:Object,//需要注入的参数
            value:Array
        },
        async mounted() {
        },
        methods: {
            async loadData(page){
                const pageSize = this.pageSize;

                this.isRefreshLoading = page==1;


                this.loading = true;
                this.finished = false;
                const data = await API.post(this.apiUrl, { page, pageSize ,...(this.injectParams||{}) });


                if(page==1){
                    this.lists = data.result;
                    this.page = 2;
                }else{
                    this.lists = this.lists.concat(data.result||[]);
                    this.page+=1;
                }

                this.loading = false;
                this.isRefreshLoading = false
                this.finished = pageSize > (data.result||[]).length


            },
            async onRefresh() {//刷新数据
                this.loadData(1)
            },
            async getList () {
                await this.loadData(this.page)
            }
        },
        computed: {},
        watch:{
            lists:{
                async handler(val) {
                    this.$emit('input',val||[]);
                },
                deep: true
            }
        },
        components: {
            PullRefresh,
            List,
            EmptyLists
        }
    }
</script>

<style lang="scss" scoped>

    .scroller-wraper{
        @include box((h:100%,w:100%));
        & /deep/ .van-pull-refresh{
            height: 100%;
            overflow-y: auto;
        }
        /deep/ .van-list{
            &>ul,&>div{
                @include clearfix();
            }
        }
    }

</style>
