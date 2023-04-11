<template>
	<div class="blog">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<h1 class="blog__title heading-1">Блог</h1>
		<div class="blog__wrap d-flex">
			<div class="blog__list d-flex flex-column align-items-center">
				<div class="blog__list-grid w-100 d-flex flex-wrap">
					<NewsItem v-for="(item, index) of blogArticles" :key="index" :item="item" :articleType="articleType" class="blog__list-item shadow-custom" />
				</div>
				<Pagination class="blog__list-pagination" :pagesCount="pages" v-show="pages > 1"/>
				<button
					v-show="pages > 1"
					class="showmore blog__list-showmore background-white b-green"
					@click="showMore"
				>Показать еще</button>
			</div>
			<BlogSidebar placing="blog" :lastBlogArticles="lastBlogArticles" :blogCategories="blogCategories" @search="searchArticles" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import NewsItem from '@/components/News/NewsItem'
import Pagination from '@/components/Common/Pagination'
import BlogSidebar from '@/components/Blog/Sidebar'

export default {
	components: { Breadcrumbs, NewsItem, Pagination, BlogSidebar },
	data () {
		return {
			breadcrumbs: [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Блог',
					link: null,
					current: true
				}
			],
			articleType: 'Блог'
		}
	},
	computed: {
		...mapState('info', ['blogArticles', 'blogCategories', 'lastBlogArticles', 'pages', 'category_id']),
		storageURL () {
			return STORAGE_URL
		}
	},
	metaInfo () {
		return {
			title: 'Самая полезная информация о сельском хозяйстве в нашем блоге',
			description: 'Блог о сельском хозяйстве. Все самое интересное и полезное от техники доя растений',
			meta: [
				{ name: 'keywords', content: 'блог, новости, agroprice, агропрайс' },
			],
			link: [
				{
					rel: 'canonical',
					href: 'https://agroprice.kz/blog'
				}
			]
		}
    },
	async mounted () {
		await this.$store.dispatch('info/getBlogCategories')
		await this.$store.dispatch('info/getLastBlogArticles')
		await this.getArticles()
		this.emitter.on('change-page', async (page) => {
			await this.getArticles(page)
		})
	},
	watch: {
		category_id () {
			this.onCategorySelected()
		}
	},
	methods: {
		async getArticles (page = 1, search = '') {
			await this.$store.dispatch('info/getBlogArticles', { page, search, category_id: this.category_id })
		},
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : '0' + month
			let day = date.getDate()
			day = day >= 10 ? day : '0' + day
			return `${day}.${month}.${year}`
		},
		async searchArticles (search) {
			await this.getArticles(1, search)
		},
		async onCategorySelected () {
			await this.getArticles()
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/blog.scss';
@import '@/assets/styles/news.scss';
</style>
