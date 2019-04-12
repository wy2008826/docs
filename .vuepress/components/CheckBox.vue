<template>
    <div :class="b()">
        <Icon
                name="success"
                :class="[
        b('icon'),
        `van-checkbox--${shape}`, {
          'van-checkbox--disabled': isDisabled,
          'van-checkbox--checked': checked
      }]"
                @click="onClick"
        />
        <span v-if="$slots.default" :class="b('label')" @click="onClick('label')">
      <slot/>
    </span>
    </div>
</template>

<script>
    import create from '../utils/create';
    import findParent from './mixins/find-parent';
    import Icon from './Icon/';

    export default create({
        name: 'checkbox',

        mixins: [findParent],

        props: {
            name: null,
            value: null,
            disabled: Boolean,
            labelDisabled: {
                type: Boolean,
                default: false
            },
            shape: {
                type: String,
                default: 'round'
            }
        },

        computed: {
            checked: {
                get() {
                    return this.parent
                        ? this.parent.value.indexOf(this.name) !== -1
                        : this.value;
                },

                set(val) {
                    const {parent} = this;
                    if (parent) {
                        const parentValue = this.parent.value.slice();
                        if (val) {
                            if (parent.max && parentValue.length >= parent.max) {
                                return;
                            }
                            /* istanbul ignore else */
                            if (parentValue.indexOf(this.name) === -1) {
                                parentValue.push(this.name);
                                parent.$emit('input', parentValue);
                            }
                        } else {
                            const index = parentValue.indexOf(this.name);
                            /* istanbul ignore else */
                            if (index !== -1) {
                                parentValue.splice(index, 1);
                                parent.$emit('input', parentValue);
                            }
                        }
                    } else {
                        this.$emit('input', val);
                    }
                }
            },

            isDisabled() {
                return (this.parent && this.parent.disabled) || this.disabled;
            }
        },

        watch: {
            value(val) {
                this.$emit('change', val);
            }
        },

        created() {
            this.findParent('van-checkbox-group');
        },

        methods: {
            onClick(target) {
                if (!this.isDisabled && !(target === 'label' && this.labelDisabled)) {
                    this.checked = !this.checked;
                }
            }
        },
        components:{
            Icon
        }
    });
</script>

<style lang="scss" scoped>
    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    $van-checkbox-size: 18px;

    .van-checkbox {
        overflow: hidden;
        user-select: none;
        display: inline-block;
        &__icon,
        &__label {
            display: inline-block;
            vertical-align: middle;
            line-height: $van-checkbox-size;
        }

        &__icon {
            font-size: 0.24rem;
            color: transparent;
            text-align: center;
            border: 1px solid #aaa;
            width: $van-checkbox-size;
            height: $van-checkbox-size;
            box-sizing: border-box;
        }

        &__label {
            margin-left: 0.2rem;
        }

        &--round {
            border-radius: 100%;
        }

        &--checked {
            color: #fff;
            border-color: $primary;
            background-color:  $primary;
        }

        &--disabled {
            color: $background-color;
            border-color: $gray-light;
            background-color: currentColor;

        }

        &--disabled   {
            &.van-checkbox--checked{
                border-color: $gray-light;
                background-color: $theme1;
            }
        }
    }

</style>
