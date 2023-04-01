<template>
	<div class="search-block d-flex justify-content-between align-items-center">
		<input
			class="search-block__field"
			placeholder="Например: Сельхозтехника"
			v-model="q"
			@keyup="search"
		/>
		<button class="search-block__button">Найти</button>
		<div v-if="searchResult.products.length != 0 || searchResult.categories.length != 0" class="search-block__dropdown d-flex flex-column">
			<div v-if="searchResult.products.length != 0" class="search-block__products d-flex flex-column">
				<div class="search-block__products-title">Объявления</div>
				<div class="search-block__products-list d-flex flex-column">
					<a
						v-for="(product, pi) of searchResult.products"
						:key="pi"
						class="search-block__products-list-item d-flex justify-content-between align-items-center"
						:href="`/product/${product.url}`"
					>
						<div class="search-block__products-list-item-left d-flex align-items-center">
							<img v-if="product.product_images.length != 0" class="search-block__products-list-item-image" :src="`${storageURL}/${product.product_images[0].path}`" />
							<img v-else class="search-block__products-list-item-image" :src="require('@/assets/images/no-image.png')" />
							<div class="search-block__products-list-item-title">{{ product.name }}</div>
						</div>
						<div class="search-block__products-list-item-right d-flex align-items-center">
							<div class="search-block__products-list-item-price">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
							<div class="catalog-product__location d-flex align-items-center">
								<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
								<div class="catalog-product__location-value">{{ product.location ? product.location.city : 'Не указано' }}</div>
							</div>
						</div>
					</a>
				</div>
				<a :href="`/search?q=${q}`" class="search-block__products-more">Все результаты</a>
			</div>
			<div v-if="searchResult.categories.length != 0" class="search-block__categories d-flex flex-column">
				<div class="search-block__categories-title">Категории</div>
				<div class="search-block__categories-list d-flex flex-column">
					<a
						v-for="(category, ci) of searchResult.categories"
						:key="ci"
						class="search-block__categories-list-item d-flex flex-column justify-content-center"
						:href="`/catalog/${category.url}`"
					>
						<div class="search-block__categories-list-item-title">{{ category.name }}</div>
						<div v-if="category.name != category.path" class="search-block__categories-list-item-path">{{ category.path }}</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'

export default {
	data () {
		return {
			q: ''
		}
	},
	computed: {
		...mapState('catalog', ['searchResult']),
		storageURL () {
			return STORAGE_URL
		}
	},
	methods: {
		...mapActions('catalog', ['getSearchResult']),
		async search () {
			console.log(this.q)
			if (this.q.length >= 3) {
				await this.getSearchResult({ q: this.q })
				console.log(this.searchResult)
			}
		}
	}
}
</script>
