<template>
	<div class="search">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div class="category__wrap">
			<div class="category__top d-flex justify-content-between align-items-center">
				<h1 class="category__title heading-1">{{ pageTitle }}</h1>
				<LocationMenu />
			</div>
			<!-- <div class="category__subcategories d-flex align-items-center">
				<a
					v-for="(child, index) of category.children"
					:key="index"
					class="category__subcategories-item d-flex justify-content-center align-items-center"
					@click="goTo(child.url)"
				>{{ child.name }}</a>
			</div> -->
			<div class="category__data d-flex">
				<!-- <CategoryFilters v-if="maxPrice != 0 && minPrice != 0" :maxPrice="maxPrice" :minPrice="minPrice" @filtered="filterProducts" /> -->
				<CategoryProducts v-show="products.length != 0" :products="products" :pages="pages" mode="search" />
			</div>
		</div>		
	</div>
</template>

<script>
import { /*mapState, */mapActions } from 'vuex'
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
		// ...mapState('catalog', ['searchProducts']),
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
				/*if (this.category) {
					// console.log(this.category)
					this.makeBreadcrumbs()
					this.metaTitle = this.category.meta_title || this.category.name
					this.metaDescription = this.category.meta_description || this.category.name
					this.metaKeywords = this.category.meta_keywords || this.category.name
					this.canonicalUrl = 'https://agroprice.kz/catalog/' + this.category.url
					await this.getProducts()
				}*/
			}
		},
		async getProducts (page = 1) {
			const productsData = await this.getSearchProducts({
				q: this.q,
				page,
				locations: this.locations,
				sort: this.sort,
			})
			this.products = productsData.products
			const total = productsData.total
			// console.log(this.products)
			this.pages = Math.ceil(total / this.productsPerPage)

		},
		async onQueryChanged () {
			await this.init()
		}
		
	}

}
</script>
