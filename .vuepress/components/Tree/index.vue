<template>
    <div>
        <div class="container">
            <Item v-for="(node, index) in this.treeData"
                  :key="index"
                  class="item"
                  :itemData="node"
                  :wholeTree="treeData"
                  :disabled="disabled"
                  :allOpen="allOpen"
                  :selectAll="selectAll"
            >
            </Item>
        </div>
    </div>
</template>

<script>
    import API from 'utils/API';
    import {mapGetters, mapActions} from 'vuex'
    import Item from 'components/Tree/TreeItem'

    export default {
        name: 'Tree',
        props: ['treeData','disabled','allOpen','selectAll'],
        data: () => {
          return {
          }
        },
        computed: {
          ...mapGetters([]),
        },
        components: {
            Item
        }
    }
</script>

<style lang="scss" scoped>

</style>
