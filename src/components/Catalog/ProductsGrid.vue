<template>
	<div v-if="products.length != 0" class="products-grid w-100 d-flex flex-wrap">
		<CatalogProduct
			v-for="(product, index) of products"
			:key="index"
			:product="product"
			class="products-grid__item background-white shadow-custom"
		/>
	</div>
	<div v-else class="products-grid d-flex flex-wrap">
		<CatalogProduct
			v-for="i in count"
			:key="i"
			:product="defaultProduct"
			class="products-grid__item background-white shadow-custom"
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
		},
		products: {
			type: Array,
			default: () => []
		}
	},
	components: { CatalogProduct },
	data () {
		return {
			defaultProduct: {
				category_name: 'Сеялки',
				name: '8-ми рядковая анкерная пневматическая сеялка',
				price: 1581643,
				oldPrice: '1 581 643',
				product_images: [{ path: 'last-product.png' }],
				location: { city: 'Усть-Каменогорск' },
				date: '12.01.2023',
				status: 'Новый',
				views: 324
			}
		}
	}
}
</script>
