<template>
	<div class="list-product d-flex justify-content-between">
		<div class="list-product__left d-flex">
			<img class="list-product__image" :src="require(`@/assets/images/products/${product.image.replace('.png', '-' + breakpoint + '.png')}`)" />
			<div class="list-product__info">
				<div class="list-product__subcategory d-flex justify-content-between align-items-center">
					{{ product.subcategory }}
					<div class="list-product__date">{{ product.date }}</div>
				</div>
				<div class="list-product__location list-product__location-mobile">
					<img class="list-product__location-icon" :src="require('@/assets/images/location.png')" />
					<div class="list-product__location-value">{{ product.location }}</div>
				</div>
				<div class="list-product__title">{{ product.title }}</div>
				<div class="list-product__description">
					Укрепление и развитие структуры способствует подготовки и реализации дальнейших направлений развития.
				</div>
				<div class="list-product__price-main">{{ product.price }}</div>				
				<div class="list-product__stats list-product__stats-mobile align-items-center">
					<div class="list-product__stats-status d-flex align-items-center">
						<img class="list-product__stats-status-icon" :src="require('@/assets/images/ok.png')" />
						<div class="list-product__stats-status-value">{{ product.status }}</div>
					</div>
					<div class="list-product__stats-views d-flex justify-content-end align-items-center">
						<img class="list-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="list-product__stats-views-value">{{ product.views }}</div>
					</div>
				</div>
			</div>
		</div>
		<FavoritesButton class="list-product__favorite" border-color="green"/>
		<div class="list-product__right d-flex flex-column justify-content-between align-items-end">
			<div class="list-product__right-top">
				<div class="list-product__date">{{ product.date }}</div>
				<div class="list-product__location d-flex">
					<img class="list-product__location-icon" :src="require('@/assets/images/location.png')" />
					<div class="list-product__location-value">{{ product.location }}</div>
				</div>
			</div>
			<div class="list-product__right-bottom">				
				<div class="list-product__stats d-flex justify-content-end align-items-center">
					<div class="list-product__stats-status d-flex align-items-center">
						<img class="list-product__stats-status-icon" :src="require('@/assets/images/ok.png')" />
						<div class="list-product__stats-status-value">{{ product.status }}</div>
					</div>
					<div class="list-product__stats-views d-flex justify-content-end align-items-center">
						<img class="list-product__stats-views-icon" :src="require('@/assets/images/eye-darker.png')" />
						<div class="list-product__stats-views-value">{{ product.views }}</div>
					</div>
				</div>
			</div>
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
	components: { FavoritesButton },
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