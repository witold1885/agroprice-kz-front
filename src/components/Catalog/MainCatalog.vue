<template>
	<div class="main-catalog">
		<div class="main-catalog__title heading-1">Главный каталог</div>
		<div class="main-catalog__grid d-flex flex-wrap justify-content-between">
			<CategoryCard
				v-for="(category, index) of mainCategories"
				:key="index"
				:category="category"
			/>
		</div>
		<SellBlock />
		<ProductsCarousel
			v-if="randomProducts.length != 0"
			title="Последние товары"
			:products="randomProducts"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
// import categories from './categories'
// import products from './products'
import CategoryCard from './CategoryCard'
import SellBlock from './SellBlock'
import ProductsCarousel from './ProductsCarousel'

export default {
	components: {
		CategoryCard,
		SellBlock,
		ProductsCarousel
	},
	data () {
		return {
			// catalogCategories: categories,
			// lastProducts: products 
		}
	},
	computed: {
		...mapState('catalog', ['mainCategories', 'randomProducts']),
	},
	async mounted () {
		await this.$store.dispatch('catalog/getMainCategories')
		await this.$store.dispatch('catalog/getRandomProducts')
		console.log(this.randomProducts)
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/catalog.scss';
</style>
