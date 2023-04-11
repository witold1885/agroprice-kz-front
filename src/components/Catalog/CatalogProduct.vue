<template>
	<a :href="`/product/${product.url}`" class="catalog-product d-flex flex-column justify-content-between relative background-white">
		<div class="catalog-product__up w-100">
			<FavoritesButton class="catalog-product__favorite absolute background-white" border-color="green" :product_id="product.id" />
			<img v-if="product.product_images.length != 0" class="catalog-product__image w-100" :src="`${storageURL}/${product.product_images[0].path}`" />
			<img v-else class="catalog-product__image w-100" :src="require('@/assets/images/no-image.png')" />
			<div class="catalog-product__middle w-100 d-flex justify-content-between align-items-center">
				<div class="catalog-product__subcategory">{{ product.category_name }}</div>
			</div>
			<div class="catalog-product__title">{{ product.name }}</div>
		</div>
		<div class="catalog-product__down w-100">
			<div class="catalog-product__divider w-100"></div>
			<div class="catalog-product__bottom w-100 d-flex flex-column justify-content-end">
				<div class="catalog-product__price d-flex flex-column">
					<div class="catalog-product__price-main">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
					<div v-if="product.oldPrice" class="catalog-product__price-old">{{ Intl.NumberFormat('ru-RU').format(product.oldPrice) }} тенге</div>
				</div>
				<div class="catalog-product__stats w-100 d-flex justify-content-between align-items-center">
					<div class="catalog-product__location d-flex align-items-center">
						<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
						<div class="catalog-product__location-value">{{ product.location ? product.location.city : 'Не указано' }}</div>
					</div>
					<div class="catalog-product__date">{{ formatDate(new Date(product.created_at)) }}</div>
					<div class="catalog-product__stats-views d-flex justify-content-end align-items-center">
						<img class="catalog-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="catalog-product__stats-views-value">{{ product.views }}</div>
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
	computed: {
		storageURL () {
			return STORAGE_URL
		}
	},
    methods: {
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : '0' + month
			let day = date.getDate()
			day = day >= 10 ? day : '0' + day
			return `${day}.${month}.${year}`
		}
	}
}
</script>