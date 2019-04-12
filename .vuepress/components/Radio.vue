<template>
    <div :class="b({ disabled: isDisabled })" @click="$emit('click')">
        <span :class="b('input')">
             <input
                      :value="name"
                      v-model="currentValue"
                      type="radio"
                      :class="b('control')"
                      :disabled="isDisabled"
             >
             <icon :name="currentValue === name ? 'checked' : 'check'"/>
        </span>
        <span v-if="$slots.default" :class="b('label')" @click="onClickLabel">
            <slot/>
        </span>
    </div>
</template>

<script>
    import create from '../utils/create';
    import findParent from './mixins/find-parent';
    import Icon from './Icon/';


    export default create({
        name: 'radio',

        mixins: [findParent],

        props: {
            name: null,
            value: null,
            disabled: Boolean
        },

        computed: {
            currentValue: {
                get() {
                    return this.parent ? this.parent.value : this.value;
                },

                set(val) {
                    (this.parent || this).$emit('input', val);
                }
            },

            isDisabled() {
                return this.parent
                    ? this.parent.disabled || this.disabled
                    : this.disabled;
            }
        },

        created() {
            this.findParent('van-radio-group');
        },

        methods: {
            onClickLabel() {
                if (!this.isDisabled) {
                    this.currentValue = this.name;
                }
            }
        },
        components: {
            Icon
        },
    });
</script>
<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    $van-radio-size: 18px;

    .van-radio {
        overflow: hidden;
        user-select: none;
        display: inline-block;
        &__input,
        &__label {
            display: inline-block;
            vertical-align: middle;
        }

        &__input {
            position: relative;
            height: $van-radio-size;
        }

        &__control {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            margin: 0;
            width: 100%;
            height: 100%;
        }

        &__label {
            line-height: $van-radio-size;
            margin-left: 0.2rem;
        }

        .van-icon {
            pointer-events: none;
            font-size: $van-radio-size;
            display: block;
        }

        .van-icon-checked {
            color:$primary;
        }

        .van-icon-check {
            color: $gray-dark;
        }

        &--disabled {
            .van-icon {
                color: $gray-light;
                border-radius: 100%;
                background-color: $background-color;
            }
        }
    }

</style>
