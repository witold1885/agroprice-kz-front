<template>
	<div class="catalog-product d-flex flex-column">
		<img class="catalog-product__image" :src="require(`@/assets/images/products/${product.image.replace('.png', '-' + breakpoint + '.png')}`)" />
		<div class="catalog-product__subcategory">{{ product.subcategory }}</div>
		<div class="catalog-product__title">{{ product.title }}</div>
		<div class="catalog-product__bottom d-flex justify-content-between">
			<div class="catalog-product__price d-flex flex-column">
				<div class="catalog-product__price-main">{{ product.price }}</div>
				<div class="catalog-product__price-old">{{ product.oldPrice }}</div>
			</div>
			<FavoritesButton class="catalog-product__favorite" border-color="green"/>
		</div>
	</div>
</template>

<script>
import FavoritesButton from '@/components/Common/FavoritesButton'

export default {
	props: {
		product: {
			type: Object,
			default: () => {}
		}
	},
	components: {
		FavoritesButton
	},
	data () {
		return {
			breakpoint: 'lg'
		}
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
    methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		}
	}
}
</script>