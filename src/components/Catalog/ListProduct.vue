<template>
	<a :href="`/product/${product.url}`" class="list-product w-100 d-flex justify-content-between relative background-white shadow-custom">
		<div class="list-product__left h-100 d-flex">
			<img v-if="product.product_images.length != 0" class="list-product__image h-100 img-centered" :src="`${storageURL}/${product.product_images[0].path}`" />
			<img v-else class="catalog-product__image h-100" :src="require('@/assets/images/no-image.png')" />
			<div class="list-product__info h-100 d-flex flex-column justify-content-between">
				<div>
					<div class="list-product__subcategory d-flex justify-content-between align-items-center">
						{{ product.category_name }}
						<div class="list-product__date">{{ product.date }}</div>
					</div>
					<div class="list-product__location list-product__location-mobile">
						<img class="list-product__location-icon" :src="require('@/assets/images/location.png')" />
						<div class="list-product__location-value">{{ product.location.city }}</div>
					</div>
					<div class="list-product__title color-black">{{ product.name }}</div>
					<!-- <div class="list-product__description color-black">
						Укрепление и развитие структуры способствует подготовки и реализации дальнейших направлений развития.
					</div> -->
					<div class="list-product__price-main color-black">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>				
				</div>
				<div class="list-product__location d-flex align-items-center">
					<img class="list-product__location-icon" :src="require('@/assets/images/location.png')" />
					<div class="list-product__location-value color-black">{{ product.location.city }}</div>
				</div>
				<div class="list-product__stats list-product__stats-mobile align-items-center">
					<!-- <div class="list-product__stats-status d-flex align-items-center">
						<img class="list-product__stats-status-icon" :src="require('@/assets/images/ok.png')" />
						<div class="list-product__stats-status-value">Новый</div>
					</div> -->
					<div class="list-product__stats-views d-flex justify-content-end align-items-center">
						<img class="list-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="list-product__stats-views-value color-black">{{ product.views || 123 }}</div>
					</div>
				</div>
			</div>
		</div>
		<FavoritesButton class="list-product__favorite absolute" border-color="green" :product_id="product.id" />
		<div class="list-product__right h-100 d-flex flex-column justify-content-between align-items-end">
			<div class="list-product__right-top">
				<div class="list-product__date">{{ product.date }}</div>
				<!-- <div class="list-product__location d-flex">
					<img class="list-product__location-icon" :src="require('@/assets/images/location.png')" />
					<div class="list-product__location-value color-black">{{ product.location.city }}</div>
				</div> -->
			</div>
			<div class="list-product__right-bottom">				
				<div class="list-product__stats d-flex justify-content-end align-items-center">
					<!-- <div class="list-product__stats-status d-flex align-items-center">
						<img class="list-product__stats-status-icon" :src="require('@/assets/images/ok.png')" />
						<div class="list-product__stats-status-value">Новый</div>
					</div> -->
					<div class="list-product__stats-views d-flex justify-content-end align-items-center">
						<img class="list-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="list-product__stats-views-value color-black">{{ product.views || 123 }}</div>
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
	components: { FavoritesButton },
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
			let favButtons = document.querySelectorAll('.list-product__favorite')
			for (let favButton of favButtons) {
				favButton.style.cssText = `width:${size};height:${size}`
			}
		}
	}
}
</script>