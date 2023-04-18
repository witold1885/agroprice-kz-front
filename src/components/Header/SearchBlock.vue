<template>
	<div class="search-block d-flex justify-content-between align-items-center flex-fill relative border-green">
		<input
			class="search-block__field flex-fill h-100 border-none color-black"
			placeholder="Например: Сельхозтехника"
			v-model="q"
			@keyup="search"
		/>
		<button class="search-block__button background-green border-none color-white" @click="fullSearch">Найти</button>
		<div v-if="showMenu" class="search-block__dropdown w-100 d-flex flex-column absolute background-white shadow-custom">
			<div v-if="searchResult.categories.length != 0" class="search-block__categories w-100 d-flex flex-column">
				<div class="search-block__categories-title">Категории</div>
				<div class="search-block__categories-list w-100 d-flex flex-column">
					<a
						v-for="(category, ci) of searchResult.categories"
						:key="ci"
						class="search-block__categories-list-item w-100 d-flex flex-column justify-content-center"
						:href="`/catalog/${category.url}`"
					>
						<div class="search-block__categories-list-item-title color-black">{{ category.name }}</div>
						<div v-if="category.name != category.path" class="search-block__categories-list-item-path">{{ category.path }}</div>
					</a>
				</div>
			</div>
			<div v-if="searchResult.products.length != 0" class="search-block__products w-100 d-flex flex-column">
				<div class="search-block__products-title">Объявления</div>
				<div class="search-block__products-list w-100 d-flex flex-column">
					<a
						v-for="(product, pi) of searchResult.products"
						:key="pi"
						class="search-block__products-list-item w-100 d-flex justify-content-between align-items-center"
						:href="`/product/${product.url}`"
					>
						<div class="search-block__products-list-item-left d-flex align-items-center">
							<img v-if="product.product_images.length != 0" class="search-block__products-list-item-image img-centered" :src="`${storageURL}/${product.product_images[0].path}`" />
							<img v-else class="search-block__products-list-item-image img-centered" :src="require('@/assets/images/no-image.png')" />
							<div class="search-block__products-list-item-info d-flex flex-column justify-content-center">
								<div class="search-block__products-list-item-title color-black">{{ product.name }}</div>
								<div class="search-block__products-list-item-info-bottom align-items-center">
									<div class="search-block__products-list-item-price color-black">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
									<div class="catalog-product__location d-flex align-items-center">
										<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
										<div class="catalog-product__location-value">{{ product.location ? product.location.city : 'Не указано' }}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="search-block__products-list-item-right align-items-center">
							<div class="search-block__products-list-item-price">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>
							<div class="catalog-product__location d-flex align-items-center">
								<img class="catalog-product__location-icon" :src="require('@/assets/images/location.png')" />
								<div class="catalog-product__location-value">{{ product.location ? product.location.city : 'Не указано' }}</div>
							</div>
						</div>
					</a>
				</div>
				<a class="search-block__products-more color-black" @click="fullSearch">Все результаты</a>
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
			q: '',
			showMenu: false
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
		async search (e) {
			if (e.keyCode == 13) {
				this.fullSearch()
				return
			}
			if (this.q.length >= 3) {
				await this.getSearchResult({ q: this.q })
				// console.log(this.searchResult)
				this.showMenu = this.searchResult.products.length != 0 || this.searchResult.categories.length != 0
			}
		},
		fullSearch () {
			this.showMenu = false
			this.$router.replace({ path: '/search', query: { q: this.q } })
		}
	}
}
</script>
