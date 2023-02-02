<template>
	<div class="main-catalog">
		<h1 class="main-catalog__title heading-1">Главный каталог</h1>
		<div class="main-catalog__grid d-flex flex-wrap justify-content-between">
			<CategoryCard
				v-for="(category, index) of catalogCategories"
				:key="index"
				:category="category"
			/>
		</div>
		<SellBlock />
		<ProductsCarousel
			title="Последние товары"
			:products="lastProducts"
		/>
	</div>
</template>

<script>
import categories from './categories'
import products from './products'
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
			catalogCategories: categories,
			lastProducts: products 
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/catalog.scss';
</style>
