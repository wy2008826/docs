<template>
    <div :class="b()">
        <div :class="b('toolbar')" class="van-hairline--top-bottom" v-if="showToolbar">
            <slot>
                <div :class="b('cancel')" @click="emit('cancel')">{{ cancelButtonText || $t('cancel') }}</div>
                <div :class="b('title')" class="van-ellipsis" v-if="title" v-text="title"/>
                <div :class="b('confirm')" @click="emit('confirm')">{{ confirmButtonText || $t('confirm') }}</div>
            </slot>
        </div>
        <div v-if="loading" :class="b('loading')">
            <loading/>
        </div>
        <div :class="`${b('columns')} column${cols}`"  :style="columnsStyle" @touchmove.prevent>
            <picker-column
                    v-for="(item, index) in currentColumns"
                    :key="index"
                    :value-key="valueKey"
                    :options="item.values"
                    :class-name="item.className"
                    :default-index="item.defaultIndex || initialIndex"
                    :item-height="itemHeight"
                    :visible-item-count="visibleItemCount"
                    @change="onChange(index)"
            />
            <div :class="b('frame')" class="van-hairline--top-bottom" :style="frameStyle"/>
        </div>
    </div>
</template>

<script>
    import create from '../utils/create';
    import PickerColumn from './PickerColumn';
    import deepClone from '../utils/deep-clone';

    export default create({
        name: 'picker',

        components: {
            PickerColumn
        },

        props: {
            title: String,
            loading: Boolean,
            showToolbar: Boolean,
            confirmButtonText: {
                type: String,
                default: '确认'
            },
            cancelButtonText: {
                type: String,
                default: '取消'
            },
            initialIndex: {//初始化的选中项索引
                type: Number,
                default: 0
            },
            visibleItemCount: {
                type: Number,
                default: 5
            },
            valueKey: {
                type: String,
                default: 'text'
            },
            itemHeight: {
                type: Number,
                default: 40
            },
            columns: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                children: [],
                currentColumns: [],
                cols:1,
            };
        },

        watch: {
            columns: {
                handler() {
                    const columns = this.columns.map(deepClone);
                    this.isSimpleColumn = columns.length && !columns[0].values;
                    this.currentColumns = this.isSimpleColumn ? [{values: columns}] : columns;
                    this.cols=this.currentColumns.length || 1;
                },
                immediate: true
            }
        },

        computed: {
            frameStyle() {
                return {
                    height: (this.itemHeight / (1)) + 'px'
                };
            },

            columnsStyle() {
                return {
                    height: (this.itemHeight / (1)) * this.visibleItemCount + 'px'
                };
            }
        },

        methods: {
            emit(event) {
                if (this.isSimpleColumn) {
                    this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
                } else {
                    this.$emit(event, this.getValues(), this.getIndexes());
                }
            },

            onChange(columnIndex) {
                if (this.isSimpleColumn) {
                    this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
                } else {
                    this.$emit('change', this, this.getValues(), columnIndex);
                }
            },

            // get column instance by index
            getColumn(index) {
                return this.children[index];
            },

            // get column value by index
            getColumnValue(index) {
                return (this.getColumn(index) || {}).currentValue;
            },


            // set column value by index
            setColumnValue(index, value) {
                const column = this.getColumn(index);
                column && column.setValue(value);
            },

            // get column option index by column index
            getColumnIndex(columnIndex) {
                return (this.getColumn(columnIndex) || {}).currentIndex;
            },

            // set column option index by column index
            setColumnIndex(columnIndex, optionIndex) {
                const column = this.getColumn(columnIndex);
                column && column.setIndex(optionIndex);
            },

            // get options of column by index
            getColumnValues(index) {
                return (this.currentColumns[index] || {}).values;
            },

            // set options of column by index
            setColumnValues(index, options) {
                const column = this.currentColumns[index];
                if (column) {
                    column.values = options;
                }
            },

            // get values of all columns
            getValues() {
                return this.children.map(child => child.currentValue);
            },

            // set values of all columns
            setValues(values) {
                values.forEach((value, index) => {
                    this.setColumnValue(index, value);
                });
            },

            // get indexes of all columns
            getIndexes() {
                return this.children.map(child => child.currentIndex);
            },

            // set indexes of all columns
            setIndexes(indexes) {
                indexes.forEach((optionIndex, columnIndex) => {
                    this.setColumnIndex(columnIndex, optionIndex);
                });
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    ul,li{
        list-style: none;
    }
    .van-picker {
        overflow: hidden;
        user-select: none;
        position: relative;
        background-color: $white;
        -webkit-text-size-adjust: 100%; /* avoid iOS text size adjust */
        .column1{
            .van-picker-column{
                width:7.5rem;
                ul,li{
                    width:7.5rem;
                }
            }
        }
        .column2{
            .van-picker-column{
                width:3.75rem;
                ul,li{
                    width:3.75rem;
                }
            }
        }
        .column3{
            .van-picker-column{
                width:2.5rem;
                ul,li{
                    width:2.5rem;
                }
            }
        }
        .column4{
            .van-picker-column{
                width:1.875rem;
                ul,li{
                    width:1.875rem;
                }
            }
        }

        &__toolbar {
            display: flex;
            height: 60px;
            line-height: 60px;
            justify-content: space-between;
        }

        &__cancel,
        &__confirm {
            color: $blue;
            padding: 0 0.3rem;

            &:active {
                background-color: $active-color;
            }
        }

        &__title {
            max-width: 50%;
            text-align: center;
        }

        &__columns {
            display: flex;
            position: relative;
            overflow: hidden;

        }

        &__loading {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            position: absolute;
            background-color: rgba(255, 255, 255, .9);

            circle {
                stroke: $blue;
            }
        }

        &__loading .van-loading,
        &__frame {
            top: 50%;
            left: 0;
            width: 100%;
            z-index: 1;
            position: absolute;
            pointer-events: none;
            transform: translateY(-50%);
        }

        &-column {
            flex: 1;
            //overflow: hidden;
            font-size: 14px;
            text-align: center;

            &__item {
                padding: 0 10px;
                color: $gray-dark;

                &--selected {
                    color: $black;
                }

                &--disabled {
                    opacity: .3;
                }
            }
        }
    }

</style>
