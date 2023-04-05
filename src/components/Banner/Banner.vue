<template>
	<div v-if="activeImage" class="banner">
		<!-- <div class="banner__title">Льготный кредит на развитие</div>
		<div class="banner__subtitle">
			Увеличивайте продажи и повышайте узнаваемость - используйте услуги продвижения экосистемы Своё
		</div> -->
		<button class="banner__button" @click="goFurther(activeImage.link)">{{ activeImage.button_text }}</button>
		<img
			v-if="breakpoint == 'lg'"
			class="banner__image"
			:src="`${storageURL}/${activeImage.path}`"
		/>
		<img
			v-if="breakpoint == 'md'"
			class="banner__image"
			:src="`${storageURL}/${activeImage.path_md}`"
		/>
		<img
			v-if="breakpoint == 'sm'"
			class="banner__image"
			:src="`${storageURL}/${activeImage.path_sm}`"
		/>
		<div class="banner__nav d-flex justify-content-between align-items-center">
			<NavButton
				side="left"
				color="white"
				class="banner__nav-button-left"
				@click="changeImage('left')"
			/>
			<div class="banner__nav-dots d-flex justify-content-between align-items-center">
				<div
					v-for="(image, index) of images"
					:key="index"
					class="banner__nav-dots-item"
					:class="{ 'banner__nav-dots-item-active': image.show }"
					@click="changeActiveImage(image.num)"
				></div>
			</div>
			<NavButton
				side="right"
				color="white"
				class="banner__nav-button-right"
				@click="changeImage('right')"
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { STORAGE_URL } from '@/constants'
import NavButton from '@/components/Common/NavButton'

export default {
	components: {
    NavButton,
	},
	data () {
		return {
			images: [],
			activeImage: null,
			autoplayInterval: null,
			breakpoint: 'lg'
		}
	},
	computed: {
		...mapState('info', ['banner']),
		storageURL () {
			return STORAGE_URL
		}
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	async mounted () {
		await this.$store.dispatch('info/getBanner', { code: 'main' })
		console.log(this.banner)
		this.images = this.banner.images
		this.activeImage = this.images.find(image => image.show)
		this.setAutoplay()
	},
	methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		},
		changeImage (side) {
			this.stopAutoplay()
			this.switchImage(side)
		},
		switchImage (side) {
			let nextImageNum
			if (side == 'left') {
				nextImageNum = this.activeImage.num == 1 ? this.images.length : this.activeImage.num - 1
			}
			if (side == 'right') {
				nextImageNum = this.activeImage.num == this.images.length ? 1 : this.activeImage.num + 1
			}
			this.setActiveImage(nextImageNum)
		},
		changeActiveImage (num) {
			this.stopAutoplay()
			this.setActiveImage(num)
		},
		setActiveImage (num) {
			this.images = this.images.map(image => {
				return {
					...image,
					show: image.num === num
				}
			})
			this.activeImage = this.images.find(image => image.show)
		},
		setAutoplay () {
			if (this.banner.autoplay) {
				this.autoplayInterval = setInterval(() => {
					this.switchImage('right')
				}, this.banner.duration * 1000);
			}
		},
		stopAutoplay () {
			if (this.autoplayInterval) {
				clearInterval(this.autoplayInterval)
			}
		},
		goFurther (link) {
			this.$router.push(link)
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/banner.scss';
</style>
