<template>
	<div class="search">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div class="category__wrap">
			<div class="category__top d-flex justify-content-between align-items-center">
				<h1 class="category__title heading-1">{{ pageTitle }}</h1>
				<LocationMenu />
			</div>
			<div class="category__data d-flex">
				<!-- <CategoryFilters v-if="maxPrice != 0 && minPrice != 0" :maxPrice="maxPrice" :minPrice="minPrice" @filtered="filterProducts" /> -->
				<CategoryProducts v-show="products.length != 0" :products="products" :pages="pages" mode="search" />
			</div>
		</div>		
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import LocationMenu from '@/components/Common/LocationMenu'
import CategoryProducts from '@/components/Catalog/CategoryProducts'

export default {
	components: { Breadcrumbs, LocationMenu, CategoryProducts },
	data () {
		return {
			breadcrumbs: [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Результаты поиска',
					link: null,
					current: true
				},
			],
			q: this.$route.query.q,
			pageTitle: '',
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			products: [],
			pages: 1,
			productsPerPage: 20,
			sort: 'popular',
			locations: null,
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		}
	},
	watch: {
		'$route.query.q' () {
			this.q = this.$route.query.q
			this.onQueryChanged()
		}
	},
	async mounted () {
		await this.init()
		this.emitter.on('change-page', async (page) => {
			await this.getProducts(page)
		})
		this.emitter.on('change-sort', async (sort) => {
			this.sort = sort
			await this.getProducts()
		})
		this.emitter.on('change-location', async (locations) => {
			this.locations = locations
			await this.getProducts()
		})
	},
	methods: {
		...mapActions('catalog', ['getSearchProducts']),
		async init () {
			if (this.q) {
				this.pageTitle = `Результаты поиска по запросу "${this.q}"`
				await this.getProducts()
			}
		},
		async getProducts (page = 1) {
			const productsData = await this.getSearchProducts({
				q: this.q,
				page,
				locations: this.locations,
				sort: this.sort,
			})
			if (productsData) {
				this.products = productsData.products
				const total = productsData.total
				this.pages = Math.ceil(total / this.productsPerPage)
			}
			else {				
				this.products = []
				this.pages = 1
			}
		},
		async onQueryChanged () {
			await this.init()
		}
		
	}

}
</script>

<style lang="scss">
@import '@/assets/styles/catalog.scss';
</style>
