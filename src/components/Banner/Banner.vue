<template>
	<div class="banner">
		<div class="banner__title">Льготный кредит на развитие</div>
		<div class="banner__subtitle">
			Увеличивайте продажи и повышайте узнаваемость - используйте услуги продвижения экосистемы Своё
		</div>
		<button class="banner__button">Узнать подробнее</button>
		<img
			class="banner__image"
			:src="require('@/assets/images/banner-traktor.png')"
		/>
		<div class="banner__nav d-flex justify-content-between align-items-center">
			<NavButton
				side="left"
				color="white"
				class="banner__nav-button-left"
				@click="switchBanner('left')"
			/>
			<!-- <div
				class="banner__nav-button d-flex justify-content-center align-items-center banner__nav-button-left"
				@click="switchBanner('left')"
			>
				<div class="banner__nav-button-icon">
					<img :src="require('@/assets/images/arrow-left.png')" />
				</div>
			</div> -->
			<div class="banner__nav-dots d-flex justify-content-between align-items-center">
				<div
					v-for="(banner, index) of banners"
					:key="index"
					class="banner__nav-dots-item"
					:class="{ 'banner__nav-dots-item-active': banner.active }"
					@click="setActiveBanner(banner.num)"
				></div>
			</div>
			<NavButton
				side="right"
				color="white"
				class="banner__nav-button-right"
				@click="switchBanner('right')"
			/>
			<!-- <div
				class="banner__nav-button d-flex justify-content-center align-items-center banner__nav-button-right"
				@click="switchBanner('right')"
			>
				<div class="banner__nav-button-icon">
					<img :src="require('@/assets/images/arrow-right.png')" />
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import NavButton from '@/components/Common/NavButton'

export default {
	components: {
    NavButton,
	},
	data () {
		return {
			banners: [
				{ num: 1, active: false },
				{ num: 2, active: true },
				{ num: 3, active: false },
				{ num: 4, active: false },
			]
		}
	},
	methods: {
		switchBanner (side) {
			const activeBanner = this.banners.find(banner => banner.active)
			let nextBannerNum
			if (side == 'left') {
				nextBannerNum = activeBanner.num == 1 ? this.banners.length : activeBanner.num - 1
			}
			if (side == 'right') {
				nextBannerNum = activeBanner.num == this.banners.length ? 1 : activeBanner.num + 1
			}
			this.setActiveBanner(nextBannerNum)
		},
		setActiveBanner (num) {
			this.banners = this.banners.map(banner => {
				return {
					num: banner.num,
					active: banner.num === num
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/banner.scss';
</style>
