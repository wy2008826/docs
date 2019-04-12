<template>
    <div
            :class="b({
      on: value,
      disabled
    })"
            :style="style"
            @click="onClick"
    >
        <div :class="b('node')">
            <!--<loading v-if="loading" :class="b('loading')"/>-->
        </div>
    </div>
</template>

<script>
    import create from '../utils/create';

    export default create({
        name: 'switch',

        props: {
            value: Boolean,
            loading: Boolean,
            disabled: Boolean,
            size: {
                type: String,
                default: '0.4rem'
            }
        },

        computed: {
            style() {
                return {
                    fontSize: this.size
                };
            }
        },

        methods: {
            onClick() {
                if (!this.disabled && !this.loading) {
                    this.$emit('input', !this.value);
                    this.$emit('change', !this.value);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>

    @import '../public/scss/iconfont/iconfont.css';
    @import '../public/scss/mixin.scss';
    @import '../public/scss/index.scss';

    .van-switch {
        height: 20px;
        width: 32px;
        display: inline-block;
        position: relative;
        background: $black9;
        box-sizing: content-box;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 16px;

        &__node {
            top: 0;
            left: 0;
            z-index: 1;
            width: 20px;
            height: 20px;
            transition: .3s;
            position: absolute;
            border-radius: 100%;
            background-color: $white;
            box-shadow: 0 3px 1px 0 rgba(0, 0, 0, .05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, .05);
        }

        &__loading {
            top: 25%;
            left: 25%;
            width: 50%;
            height: 50%;
        }

        &--on {
            background-color: $primary;

            .van-switch__node {
                transform: translateX(12px);
            }
        }

        &--disabled {
            opacity: .4;
        }
    }


</style>
