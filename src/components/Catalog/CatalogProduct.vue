<template>
	<a :href="`/product/${product.url}`" class="catalog-product d-flex flex-column justify-content-between relative background-white">
		<div class="catalog-product__up w-100">
			<FavoritesButton class="catalog-product__favorite absolute background-white" border-color="green" :product_id="product.id" />
			<img v-if="product.product_images.length != 0" class="catalog-product__image w-100 img-centered" :src="`${storageURL}/${product.product_images[0].path}`" />
			<img v-else class="catalog-product__image w-100 img-centered" :src="require('@/assets/images/no-image.png')" />
			<div class="catalog-product__middle w-100 d-flex justify-content-between align-items-center">
				<div class="catalog-product__subcategory">{{ product.category_name }}</div>
			</div>
			<div class="catalog-product__title color-black">{{ product.name }}</div>
		</div>
		<div class="catalog-product__down w-100">
			<div class="catalog-product__divider w-100"></div>
			<div class="catalog-product__bottom w-100 d-flex flex-column justify-content-end">
				<div class="catalog-product__price d-flex flex-column">
					<div class="catalog-product__price-main color-black">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
					<div v-if="product.oldPrice" class="catalog-product__price-old">{{ Intl.NumberFormat('ru-RU').format(product.oldPrice) }} тенге</div>
				</div>
				<div class="catalog-product__stats w-100 d-flex justify-content-between align-items-center">
					<div class="catalog-product__location d-flex align-items-center">
						<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
						<div class="catalog-product__location-value color-black">{{ product.location ? product.location.city : 'Не указано' }}</div>
					</div>
					<div class="catalog-product__date">{{ formatDate(new Date(product.created_at)) }}</div>
					<div class="catalog-product__stats-views d-flex justify-content-end align-items-center">
						<img class="catalog-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="catalog-product__stats-views-value color-black">{{ product.views }}</div>
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
			localBreakpoint: 'xl'
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		}
	},
	created () {
		window.addEventListener('resize', this.handleResize)
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted () {
		this.handleResize()
	},
    methods: {
		handleResize () {
			if (window.innerWidth > 1440) this.localBreakpoint = 'xl'
			else if (window.innerWidth > 992) this.localBreakpoint = 'lg'
			else if (window.innerWidth > 768) this.localBreakpoint = 'md'
			else if (window.innerWidth > 414) this.localBreakpoint = 'sm'
			else this.localBreakpoint = 'xs'
			this.getFavoriteSize()
		},
		getFavoriteSize () {
			let size
			if (this.localBreakpoint == 'xl') size = '35px'
			else if (this.localBreakpoint == 'lg') size = 'calc(35 * 100vw / 1440)'
			else if (this.localBreakpoint == 'md') size = '35px'
			else if (this.localBreakpoint == 'sm') size = 'calc(35 * 100vw / 768)'
			else if (this.localBreakpoint == 'xs') size = 'calc(31 * 100vw / 320)'
			else size = 'auto'
			let favButtons = document.querySelectorAll('.catalog-product__favorite')
			for (let favButton of favButtons) {
				favButton.style.cssText = `width:${size};height:${size}`
			}
		},
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