<template>
	<div class="catalog">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="category" class="category__wrap">
			<div class="category__top d-flex justify-content-between align-items-center">
				<h1 class="category__title heading-1">{{ category.meta_heading || category.name }}</h1>
				<LocationMenu />
			</div>
			<div class="category__subcategories d-flex align-items-center">
				<a
					v-for="(child, index) of category.children"
					:key="index"
					class="category__subcategories-item d-flex justify-content-center align-items-center"
					@click="goTo(child.url)"
				>{{ child.name }}</a>
			</div>
			<div class="category__data d-flex">
				<CategoryFilters />
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
			productsPerPage: 20
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
		this.$watch(
			() => this.$route.params.category,
			async (toParams) => {
				this.categoryUrl = toParams
				await this.init()
			}
		)
	},
	async mounted () {
		await this.init()
		this.emitter.on('change-page', async (page) => {
			console.log('CHanging page to ' + page)
			await this.getProducts(page)
		})
	},
	methods: {
		...mapActions('catalog', ['getCategory']),
		...mapActions('catalog', ['getCategoryProducts']),
		async init () {
			if (this.categoryUrl) {
				await this.getCategory(this.categoryUrl)
				if (this.category) {
					console.log(this.category)
					this.makeBreadcrumbs()
					this.metaTitle = this.category.meta_title || this.category.name
					this.metaDescription = this.category.meta_description || this.category.name
					this.metaKeywords = this.category.meta_keywords || this.category.name
					this.canonicalUrl = 'https://agroprice.kz/' + this.category.url
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
			const productsData = await this.getCategoryProducts({ category_id: this.category.id, page })
			this.products = productsData.products
			const total = productsData.total
			// console.log(this.products)
			this.pages = Math.ceil(total / this.productsPerPage)
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
