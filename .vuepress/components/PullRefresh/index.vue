<template>
	<div :class="b()">
		<div
			:class="b('track')"
			:style="style"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			@touchcancel="onTouchEnd"
		>
			<div :class="b('head')">
				<slot v-if="status === 'normal'" name="normal"/>
				<slot v-if="status === 'pulling'" name="pulling">
					<span :class="b('text')">{{ pullingText || $t('pulling') }}</span>
				</slot>
				<slot v-if="status === 'loosing'" name="loosing">
					<span :class="b('text')">{{ loosingText || $t('loosing') }}</span>
				</slot>
				<slot v-if="status === 'loading'" name="loading">
					<div :class="b('loading')">
						<!-- <loading/> -->
						<span>{{ loadingText || $t('loadingTip') }}</span>
					</div>
				</slot>
			</div>
			<slot/>
		</div>
	</div>
</template>

<script>
import create from '@/utils/create';
import scrollUtils from '@/utils/scroll';
import Touch from '../mixins/touch';
import loading from '../Loading'

export default create({
	name: 'pull-refresh',
	components: {
		loading
	},
	mixins: [Touch],

	props: {
		pullingText: String,
		loosingText: String,
		loadingText: String,
		value: {
			type: Boolean,
			required: true
		},
		animationDuration: {
			type: Number,
			default: 300
		},
		headHeight: {
			type: Number,
			default: 1,//1rem
		}
	},

	data() {
		return {
			status: 'normal',
			height: 0,
			duration: 0
		};
	},

	computed: {
		style() {
			return {
				transition: `${this.duration}ms`,
				transform: `translate3d(0,${this.height}px, 0)`
                // transform: `translate3d(0,1rem, 0)`
			};
		}
	},

	mounted() {
		this.scrollEl = scrollUtils.getScrollEventTarget(this.$el);

		console.log(this.dpr);
	},

	watch: {
		value(val) {
			this.duration = this.animationDuration;
			this.getStatus(val ? this.headHeight*this.dpr : 0, val);
		}
	},

	methods: {
		onTouchStart(event) {
			if (this.status === 'loading') {
				return;
			}
			if (this.getCeiling()) {
				this.duration = 0;
				this.touchStart(event);
			}
		},

		onTouchMove(event) {
			if (this.status === 'loading') {
				return;
			}

			this.touchMove(event);

			if (!this.ceiling && this.getCeiling()) {
				this.duration = 0;
				this.startY = event.touches[0].clientY;
				this.deltaY = 0;
			}

			if (this.ceiling && this.deltaY >= 0) {
				if (this.direction === 'vertical') {
					this.getStatus(this.ease(this.deltaY));
					event.preventDefault();
				}
			}
		},

		onTouchEnd() {
			if (this.status === 'loading') {
				return;
			}

			if (this.ceiling && this.deltaY) {
				this.duration = this.animationDuration;
				if (this.status === 'loosing') {
					this.getStatus(this.headHeight*this.dpr, true);
					this.$emit('input', true);
					this.$emit('refresh');
				} else {
					this.getStatus(0);
				}
			}
		},

		getCeiling() {
			this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0;
			return this.ceiling;
		},

		ease(height) {
			let { headHeight } = this;
            headHeight = headHeight * this.dpr;

			return height < headHeight
				? height
				: height < headHeight * 2
					? Math.round(headHeight + (height - headHeight) / 2)
					: Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
		},

		getStatus(height, isLoading) {
			this.height = height;

			const status = isLoading
				? 'loading' : height === 0
					? 'normal' : height < this.headHeight*this.dpr
						? 'pulling' : 'loosing';

			if (status !== this.status) {
				this.status = status;
			}
		}
	}
});
</script>
<style lang="scss" scoped>
@import "./pull-refresh.scss";
</style>

