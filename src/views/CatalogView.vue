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
					:href="`/#/catalog/${child.url}`"
				>{{ child.name }}</a>
			</div>
			<div class="category__data d-flex">
				<CategoryFilters />
				<CategoryProducts />
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
			metaKeywords: ''
		}
	},
	computed: {
		...mapState('catalog', ['category']),
	},
	metaInfo () {
		return {
			title: this.metaTitle,
			description: this.metaDescription,
			meta: [
				{ name: 'keywords', content: this.metaKeywords },
			],
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
	},
	methods: {
		...mapActions('catalog', ['getCategory']),
		async init () {
			if (this.categoryUrl) {
				await this.getCategory(this.categoryUrl)
				if (this.category) {
					console.log(this.category)
					this.makeBreadcrumbs()
					this.metaTitle = this.category.meta_title || this.category.name
					this.metaDescription = this.category.meta_description || this.category.name
					this.metaKeywords = this.category.meta_keywords || this.category.name
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
					link: '/#/catalog/' + item.url,
					current: item.category_id === this.category.id

				})
			}
		},
		setDefaultBreadcrumbs () {
			return [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				}
			]
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/catalog.scss';
</style>
