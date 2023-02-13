<template>
	<div class="products-list d-flex flex-wrap">
		<ListProduct
			v-for="i in count"
			:key="i"
			:product="product"
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
		}
	},
	components: { ListProduct },
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
