<template>
	<div class="catalog">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="category" class="category__wrap">
			<div class="category__top d-flex justify-content-between align-items-center">
				<h1 class="category__title heading-1">{{ category.meta_heading || category.name }}</h1>
				<LocationMenu />
			</div>
			<div
				class="category__subcategories-wrap d-flex justify-content-between"
				:style="[ subcategoriesLoaded ? { 'height': 'auto' } : { 'height': '0!important', 'overflow': 'hidden' } ]"
			>
				<div class="category__subcategories d-flex align-items-center">
					<a
						v-for="(child, index) of showSubcategories"
						:key="index"
						class="category__subcategories-item d-flex justify-content-center align-items-center"
						@click="goTo(child.url)"
					>{{ child.name }}</a>
				</div>
				<button
					v-if="showMoreSubcategoriesButton"
					class="category__subcategories-more"
					@click="showMoreSubcategories"
				>Еще</button>
			</div>
			<!-- <div v-if="showButtons.length != 0">
				<span v-for="(button, index) of showButtons" :key="index">{{ button }}</span>
			</div>
			<div v-else>showButtons is empty</div> -->
			<div class="category__data d-flex">
				<CategoryFilters v-if="maxPrice != 0 && minPrice != 0" :maxPrice="maxPrice" :minPrice="minPrice" @filtered="filterProducts" />
				<CategoryProducts v-show="products.length != 0" :products="products" :pages="pages" />
			</div>
			<div
				v-if="category.description"
				class="category__description"
				v-html="category.description"
			></div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import LocationMenu from '@/components/Common/LocationMenu'
import CategoryFilters from '@/components/Catalog/CategoryFilters'
import CategoryProducts from '@/components/Catalog/CategoryProducts'

export default {
	components: { Breadcrumbs, LocationMenu, CategoryFilters, CategoryProducts },
	data () {
		return {
			breadcrumbs: null,
			categoryUrl: this.$route.params.category,
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			canonicalUrl: '',
			products: [],
			pages: 1,
			productsPerPage: 20,
			sort: 'popular',
			locations: null,
			maxPrice: 0,
			minPrice: 0,
			filterMaxPrice: null,
			filterMinPrice: null,
			showSubcategories: [],
			subcategoriesLoaded: false,
			showMoreSubcategoriesButton: false,
			breakpoint: 'lg',
			maxContainerWidth: 1200,
			// showButtons: [],
			isMobileScreen: false
		}
	},
	computed: {
		...mapState('catalog', ['category']),
		storageURL () {
			return STORAGE_URL
		}
	},
	metaInfo () {
		return {
			title: this.metaTitle,
			description: this.metaDescription,
			meta: [
				{ name: 'keywords', content: this.metaKeywords },
			],
			link: [
				{
					rel: 'canonical',
					href: this.canonicalUrl
				}
			]
		}
    },
	created () {
		// window.addEventListener('resize', this.handleResize)
		this.$watch(
			() => this.$route.params.category,
			async (toParams) => {
				this.categoryUrl = toParams
				await this.init()
			}
		)
	},
	unmounted () {
		// window.removeEventListener('resize', this.handleResize)
	},
	watch: {
		'$route' (newValue, oldValue) {
			if (newValue.query != oldValue.query) {
				this.onQueryChanged()
			}
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
		this.handleResize()
	},
	methods: {
		...mapActions('catalog', ['getCategory']),
		...mapActions('catalog', ['getCategoryProducts']),
		handleResize () {
			if (window.innerWidth > 1440) this.maxContainerWidth = 1200
			else if (window.innerWidth > 992) this.maxContainerWidth = 1200 * window.innerWidth / 1440
			else if (window.innerWidth > 768) this.maxContainerWidth = 688
			else if (window.innerWidth > 414) this.maxContainerWidth = 688 * window.innerWidth / 768
			else {
				this.maxContainerWidth = 280 * window.innerWidth / 320
				this.isMobileScreen = true
			}
			this.calcSubcategoriesCount()
		},
		calcSubcategoriesCount() {
			if (!this.isMobileScreen) {
				let subcatButtons = document.querySelectorAll('.category__subcategories-item')
				// console.log(subcatButtons)
				let showButtons = []
				let totalWidth = 0;
				const maxWidth = this.maxContainerWidth - 75
				let maxWidthExceeded = false
				for (let button of subcatButtons) {
					// console.log(button.clientWidth)
					totalWidth += button.clientWidth + 12
					if (totalWidth >= maxWidth) {
						maxWidthExceeded = true
						break
					}
					else {
						showButtons.push(button.innerText)
					}
				}
				// console.log(showButtons)
				// console.log(maxWidthExceeded)
				// this.showButtons = showButtons
				if (maxWidthExceeded) {
					this.showSubcategories = []
					for (let child of this.category.children) {
						if (showButtons.indexOf(child.name) !== -1) {
							this.showSubcategories.push(child)
						}
					}
					this.showMoreSubcategoriesButton = true
				}
				else {
					this.showSubcategories = this.category.children
				}
				this.subcategoriesLoaded = true
				// console.log(this.showSubcategories)
			}
			else {
				this.showSubcategories = []
				let c = 0
				for (let child of this.category.children) {
					this.showSubcategories.push(child)
					c++
					if (c == 2) break
				}
				this.showMoreSubcategoriesButton = true
			}
		},
		showMoreSubcategories () {
			this.showSubcategories = this.category.children
			this.showMoreSubcategoriesButton = false
		},
		async init () {
			if (this.categoryUrl) {
				await this.getCategory(this.categoryUrl)
				if (this.category) {
					this.showSubcategories = this.category.children
					// console.log(this.category)
					this.makeBreadcrumbs()
					this.metaTitle = this.category.meta_title || this.category.name
					this.metaDescription = this.category.meta_description || this.category.name
					this.metaKeywords = this.category.meta_keywords || this.category.name
					this.canonicalUrl = 'https://agroprice.kz/catalog/' + this.category.url
					await this.getProducts()
				}
			}
			else {
				this.$router.push('/')
			}
		},
		makeBreadcrumbs () {
			this.breadcrumbs = this.setDefaultBreadcrumbs()
			for (const item of this.category.path) {
				this.breadcrumbs.push({
					text: item.name,
					link: '/catalog/' + item.url,
					current: item.category_id === this.category.id

				})
			}
		},
		async getProducts (page = 1) {
			const productsData = await this.getCategoryProducts({
				category_id: this.category.id,
				page,
				locations: this.locations,
				sort: this.sort,
				filter_min_price: this.filterMinPrice,
				filter_max_price: this.filterMaxPrice,
			})
			if (productsData) {
				this.products = productsData.products
				const total = productsData.total
				this.maxPrice = productsData.max_price
				this.minPrice = productsData.min_price
				// console.log(this.products)
				this.pages = Math.ceil(total / this.productsPerPage)
			}
			else {				
				this.products = []
				this.maxPrice = 0
				this.minPrice = 100
				this.pages = 1
			}
		},
		async onQueryChanged () {
			await this.getProducts()
		},
		async filterProducts (filterData) {
			this.filterMinPrice = filterData.minPrice
			this.filterMaxPrice = filterData.maxPrice
			await this.getProducts()
		},
		setDefaultBreadcrumbs () {
			return [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				}
			]
		},
		goTo (url) {
			this.$router.push({ path: `/catalog/${url}`, query: this.$route.query });
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/catalog.scss';
</style>
