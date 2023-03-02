<template>
	<div v-if="products.length != 0" class="products-list d-flex flex-wrap">
		<ListProduct
			v-for="(product, index) of products"
			:key="index"
			:product="product"
			class="products-list__item"
		/>
	</div>
	<div v-else class="products-grid d-flex flex-wrap">
		<ListProduct
			v-for="i in count"
			:key="i"
			:product="defaultProduct"
			class="products-list__item"
		/>
	</div>
</template>

<script>
import ListProduct from './ListProduct'

export default {
	props: {
		count: {
			type: Number,
			default: 9
		},
		products: {
			type: Array,
			default: () => []
		}
	},
	components: { ListProduct },
	data () {
		return {
			defaultProduct: {
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
