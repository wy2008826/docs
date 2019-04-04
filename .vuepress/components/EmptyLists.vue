<template>
    <div v-html="text||'暂无列表数据'" class="empty"></div>
</template>

<script>
    export default {
        name: "EmptyLists",
        data: () => {
            return {}
        },
        props: ['text'],
        mounted: function () {
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

<style lang="scss" scoped>
    .empty{
        @include box((ta:center,fs:0.28rem,lh:4rem,c:$black9))
    }
</style>
