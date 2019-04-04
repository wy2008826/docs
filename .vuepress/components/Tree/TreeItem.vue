<template>
    <div class="container">
        <ul>
            <li class="item">
                <CheckBox 
                        v-model="itemData.isSelect" 
                        @input="() => {handleStateChange(itemData)}"
                        :disabled="disabled"
                        class="checkbox" >
                    <div  v-text="itemData.menuName"  class="name"></div>
                </CheckBox>

                
                <span v-if="itemData.children && itemData.children.length"
                      @click="itemData.isOpen = !itemData.isOpen"
                      class="sign icon iconfont"
                      :class="itemData.isOpen ? 'icon-arrow-bottom' : 'icon-arrow-top'"
                ></span>

                <ul v-show="itemData.isOpen">
                    <Item v-if='itemData.children && itemData.children.length'
                          :key='node.menuCode'
                          v-for="(node) in itemData.children"
                          :itemData="node"
                          :wholeTree="wholeTree"
                          :parent='itemData'
                          :disabled="disabled"
                          :allOpen="allOpen"
                          :selectAll='selectAll'
                          @handleParent="handleParent(node,itemData)"
                    ></Item>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import CheckBox from 'components/CheckBox';

    import flattenDeep from 'utils/flattenDeep'

    export default {
        name: 'Item',
        props: ['itemData', 'wholeTree', 'parent','disabled','allOpen','selectAll'],
        data: function () {
            return {
            }
        },
        mounted() {
            this.allOpen ? this.itemData.isOpen = true : this.itemData.isOpen = this.itemData.isSelect
            this.selectAll ? this.itemData.isSelect = true : false
        },
        methods: {
            handleStateChange(node) {
                this.handleChildren(node);
                this.$emit('handleParent');
            },
            handleChildren(node) {
                const currState = node.isSelect
                if (node.children && node.children.length) {
                    for (let i = 0; i < node.children.length; i++) {
                        node.children[i].isSelect = currState
                        this.handleChildren(node.children[i])
                    }
                }
            },
            handleParent(curItem, parent) {
                const currState = curItem.isSelect;
                if (parent) {
                    if (currState) {
                        parent.isSelect = currState;
                    } else {
                        const isEverySilbingsNotSelected = (parent.children || []).every(_ => !_.isSelect);
                        if (isEverySilbingsNotSelected) {
                            parent.isSelect = false;
                        }
                    }
                    this.$emit('handleParent', parent, this.$parent.parent);
                }
            },
        },
        watch: {
            selectAll(n,o){
                this.selectAll ? this.itemData.isSelect = true : this.itemData.isSelect = false
            }
        },
        components: {
            CheckBox
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background: #fff;
    }

    .item {
        @include box((d:block, w:100%, lh:.8rem));
        padding-left: .3rem;
        .checkbox {
            vertical-align: middle;
            @include box((m:0 0.1rem 0 0,w:3rem));
        }
        .sign {
            @include position((p:absolute, r:.3rem));
            font-size: .35rem;
            padding-left:1rem 
        }
    }

    .name {
        @include box((d:inline-block, w:1.5rem))
    }
</style>
