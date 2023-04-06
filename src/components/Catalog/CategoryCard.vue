<template>
	<a
		class="category-card"
		:href="`/catalog/${category.url}`"
	>
		<div class="category-card__title">{{ breakpoint == 'sm' && category.name == 'Сельскохозяйственная техника' ? 'Сельхозтехника' : category.name }} <span class="category-card__title-count">{{ category.productsCount }}</span></div>
		<!-- <div class="category-card__subtitle">Объявлений ({{ category.productsCount }})</div> -->
		<img
			v-if="category.image"
			class="category-card__image"
			:src="`${storageURL}/${category.image}`"
		/>
	</a>
</template>

<script>
import { STORAGE_URL } from '@/constants'

export default {
	props: {
		category: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			breakpoint: 'lg',
			// imageWidth: `${this.category.imageSize.lg.width}px`,
			// imageHeight: `${this.category.imageSize.lg.height}px`
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		},
		/*categoryShowName (name) {
			if (this.breakpoint == 'sm') {
				if (name == 'Сельскохозяйственная техника') return 'Сельхозтехника'
			}
		}*/
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted () {
		// this.imageWidth = this.getImageSize('width')
		// this.imageHeight = this.getImageSize('height')
	},
    methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
			// this.imageWidth = this.getImageSize('width')
			// this.imageHeight = this.getImageSize('height')
		},
		getPosition (side) {
			if (window.innerWidth > 1440) return `${this.category.position.lg[side]}px`
			if (window.innerWidth > 992) return `calc(${this.category.position.lg[side]} * 100vw / 1440)`
			if (window.innerWidth > 768) return `${this.category.position.md[side]}px`
			if (window.innerWidth > 414) return `calc(${this.category.position.md[side]} * 100vw / 768)`
		},
		getImageSize (dim) {
			if (window.innerWidth > 1440) return `${this.category.imageSize.lg[dim]}px`
			if (window.innerWidth > 992) return `calc(${this.category.imageSize.lg[dim]} * 100vw / 1440)`
			if (window.innerWidth > 768) return `${this.category.imageSize.md[dim]}px`
			if (window.innerWidth > 414) return `calc(${this.category.imageSize.md[dim]} * 100vw / 768)`
		}
	}
}
</script>
