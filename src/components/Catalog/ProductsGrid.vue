<template>
	<div class="products-grid d-flex flex-wrap">
		<CatalogProduct
			v-for="i in count"
			:key="i"
			:product="product"
			class="products-grid__item"
		/>
	</div>
</template>

<script>
import CatalogProduct from './CatalogProduct'

export default {
	props: {
		count: {
			type: Number,
			default: 20
		}
	},
	components: { CatalogProduct },
	data () {
		return {
			product: {
				subcategory: 'Сеялки',
				title: '8-ми рядковая анкерная пневматическая сеялка',
				price: '1 581 643 тенге',
				oldPrice: '1 581 643 тенге',
				image: 'last-product.png',
				location: 'Усть-Каменогорск',
				date: '12.01.2023',
				status: 'Новый',
				views: 324
			}
		}
	}
}
</script>
