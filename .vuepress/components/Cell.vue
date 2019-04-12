<template>
	<div
		:class="[
      b({
        center,
        required,
        clickable: isLink || clickable
      }),
      { 'van-hairline': border }
    ]"
		@click="onClick"
	>
		<slot name="icon">
			<icon v-if="icon" :class="b('left-icon')" :name="icon"/>
		</slot>
		<div v-if="isDef(title) || $slots.title" :class="b('title')">
			<slot name="title">
				<span v-text="title"/>
				<div v-if="label" v-text="label" :class="b('label')"/>
			</slot>
		</div>
		<div
			v-if="isDef(value) || $slots.default"
			:class="b('value', { alone: !$slots.title && !title })"
		>
			<slot>
				<span v-text="value"/>
			</slot>
		</div>
		<slot name="right-icon">
			<icon v-if="isLink" :class="b('right-icon')" name="arrow"/>
		</slot>
		<slot name="extra"/>
	</div>
</template>

<script>
import Icon from './Icon/';
import RouterLink from './mixins/router-link';
import create from '../utils/create-basic';

export default create({
	name: 'cell',
	components: {
		Icon
	},
	mixins: [RouterLink],
	props: {
		icon: String,
		label: String,
		center: Boolean,
		isLink: Boolean,
		required: Boolean,
		clickable: Boolean,
		title: [String, Number],
		value: [String, Number],
		border: {
			type: Boolean,
			default: true
		}
	},

	methods: {
		onClick() {
			this.$emit('click');
			this.routerLink();
		}
	}
});
</script>
<style lang="scss" scoped>
	@import '../public/scss/iconfont/iconfont.css';
	@import '../public/scss/mixin.scss';
	@import '../public/scss/index.scss';


	.van-cell {
		width: 100%;
		display: flex;
		padding: 0.2rem 0.3rem;
		box-sizing: border-box;
		line-height: 48px;
		position: relative;
		background-color: $white;
		color: $text-color;
		font-size: 14px;
		overflow: hidden;

		&:not(:last-child)::after {
			left: 10px;
			right: 0;
			width: auto;
			transform: scale(1, 0.5);
			border-bottom-width: 0.02rem;
		}

		&-group {
			background-color: $white;
		}

		&__label {
			font-size: 14px;
			line-height: 1.2;
			color: $gray-darker;
		}

		&__title,
		&__value {
			flex: 1;
		}

		&__value {
			overflow: hidden;
			text-align: right;
			vertical-align: middle;

			&--alone {
				text-align: left;
			}
		}

		&__left-icon {
			font-size: 14px;
			line-height: 48px;
			margin-right: 10px;
		}

		&__right-icon {
			color: $gray-dark;
			font-size: 0.24rem;
			line-height: 0.48rem;
			margin-left: 0.1rem;
		}

		&--clickable {
			&:active {
				background-color: $active-color;
			}
		}

		&--required {
			overflow: visible;

			&::before {
				content: '*';
				position: absolute;
				left: 0.14rem;
				font-size: 0.28rem;
				color: $red;
			}
		}

		&--center {
			align-items: center;
		}
	}

</style>

