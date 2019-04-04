<template>
    <form class="search" @submit="searchLists">
        <input
            class="input"
            type="text"
            @input="$emit('input',$event.target.value,$event)"
            :placeholder="placeholder"
        >
        <button class="btn" @click="searchLists">
            <span class="icon iconfont icon-search"></span>
        </button>
    </form>
</template>

<script>
export default {
    name: "Search",
    data: () => {
        return {};
    },
    props: ["placeholder", "target", "search"],
    methods: {
        async searchLists(e) {
            e.preventDefault();
            this.search && this.search();
        }
    },
    watch: {
        searchVal(n, o) {
            this.$emit("input", n);
        }
    }
};
</script>

<style lang="scss" scoped>
    .search {
        @include box((ta:left, lh:1rem, p:0 0 0 .5rem, bg:rgb(242, 242, 242)));
        .input {
            @include box((lh:normal,h:0.7rem, bdr:.1rem, w:85%, p:0.05rem .1rem));
            font-size: .3rem;
        }
        .btn {
            @include box((lh:1rem, m:0 0 0 .1rem, w:10%, bg:rgba(0, 0, 0, 0)));
            .icon {
                font-size: .35rem;
            }
        }
    }
</style>

