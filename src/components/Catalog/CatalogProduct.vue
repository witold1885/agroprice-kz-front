<template>
	<a :href="`/product/${product.url}`" class="catalog-product d-flex flex-column justify-content-between">
		<div class="catalog-product__up">
			<div class="catalog-product__date">{{ product.date }}</div>
			<FavoritesButton class="catalog-product__favorite" border-color="green"/>
			<img v-if="product.product_images.length != 0" class="catalog-product__image" :src="`${storageURL}/${product.product_images[0].path}`" />
			<img v-else class="catalog-product__image" :src="require('@/assets/images/no-image.png')" />
			<div class="catalog-product__middle d-flex justify-content-between align-items-center">
				<div class="catalog-product__subcategory">{{ product.category_name }}</div>
				<!-- <div class="catalog-product__location d-flex justify-content-end align-items-center">
					<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
					<div class="catalog-product__location-value">{{ product.location.city }}</div>
				</div> -->
			</div>
			<div class="catalog-product__title">{{ product.name }}</div>
		</div>
		<div class="catalog-product__down">
			<div class="catalog-product__divider"></div>
			<div class="catalog-product__bottom d-flex flex-column justify-content-end">
				<div class="catalog-product__price d-flex flex-column">
					<div class="catalog-product__price-main">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
					<div v-if="product.oldPrice" class="catalog-product__price-old">{{ Intl.NumberFormat('ru-RU').format(product.oldPrice) }} тенге</div>
				</div>
				<div class="catalog-product__stats d-flex justify-content-between align-items-center">
					<!-- <div class="catalog-product__stats-status d-flex align-items-center">
						<img class="catalog-product__stats-status-icon" :src="require('@/assets/images/ok.png')" />
						<div class="catalog-product__stats-status-value">Новый</div>
					</div> -->
					<div class="catalog-product__location d-flex justify-content-end align-items-center">
						<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
						<div class="catalog-product__location-value">{{ product.location.city }}</div>
					</div>
					<div class="catalog-product__stats-views d-flex justify-content-end align-items-center">
						<img class="catalog-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="catalog-product__stats-views-value">{{ product.views || 123 }}</div>
					</div>
				</div>
			</div>
		</div>
	</a>
</template>

<script>
import { STORAGE_URL } from '@/constants'
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
	computed: {
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
    methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		}
	}
}
</script>