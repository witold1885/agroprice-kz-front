<template>
	<div class="blog">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<h1 class="blog__title heading-1">{{ headingTitle }}</h1>
		<div class="blog__wrap d-flex">
			<div class="blog__list d-flex flex-column align-items-center">
				<div class="blog__list-grid w-100 d-flex flex-wrap">
					<NewsItem v-for="(item, index) of articles" :key="index" :item="item" :view="view" :articleType="headingTitle" class="blog__list-item shadow-custom" />
				</div>
				<Pagination class="blog__list-pagination" :pagesCount="pages" v-show="pages > 1"/>
				<button
					v-show="pages > 1"
					class="showmore blog__list-showmore background-white border-green"
					@click="showMore"
				>Показать еще</button>
			</div>
			<BlogSidebar v-if="view == 'blog'" placing="grid" view="blog" :lastArticles="lastBlogArticles" :categories="blogCategories" @search="searchArticles" />
			<BlogSidebar v-if="view == 'news'" placing="grid" view="news" :lastArticles="lastNewsArticles" @search="searchArticles" />
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
	props: {
		view: {
			type: String,
			default: 'blog'
		}
	},
	components: { Breadcrumbs, NewsItem, Pagination, BlogSidebar },
	data () {
		return {
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			canonicalUrl: '',
			headingTitle: '',
			breadcrumbs: [],
			articles: [],
			pages: 1
		}
	},
	computed: {
		...mapState('info', [
			'blogArticles',
			'blogCategories',
			'lastBlogArticles',
			'blogPages',
			'category_id',
			'newsArticles',
			'newsCategories',
			'lastNewsArticles',
			'newsPages',
		]),
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
				{ rel: 'canonical', href: this.canonicalUrl }
			]
		}
    },
	async mounted () {
		console.log(this.view)
		this.setMeta()
		if (this.view == 'blog') await this.$store.dispatch('info/getBlogCategories')
		await this.$store.dispatch('info/getLastArticles', { view: this.view })
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
		setMeta () {
			this.setBreadcrumbs()
			if (this.view == 'blog') {
				this.metaTitle = 'Самая полезная информация о сельском хозяйстве в нашем блоге'
				this.metaDescription = 'Блог о сельском хозяйстве. Все самое интересное и полезное от техники доя растений'
				this.metaKeywords = 'блог, новости, agroprice, агропрайс'
				this.canonicalUrl = 'https://agroprice.kz/blog'
				this.headingTitle = 'Блог'
			}
			if (this.view == 'news') {
				this.metaTitle = 'Самая полезная информация о сельском хозяйстве в нашем блоге'
				this.metaDescription = 'Блог о сельском хозяйстве. Все самое интересное и полезное от техники доя растений'
				this.metaKeywords = 'блог, новости, agroprice, агропрайс'
				this.canonicalUrl = 'https://agroprice.kz/news'
				this.headingTitle = 'Новости'
			}
		},
		setBreadcrumbs () {
			let breadCrumbText
			if (this.view == 'blog') breadCrumbText = 'Блог'
			if (this.view == 'news') breadCrumbText = 'Новости'
			this.breadcrumbs = [
				{ text: 'Главная страница', link: '/', current: false },
				{ text: breadCrumbText, link: null, current: true }
			]
		},
		async getArticles (page = 1, search = '') {
			await this.$store.dispatch('info/getArticles', { view: this.view, page, search, category_id: this.category_id })
			this.articles = this[`${this.view}Articles`]
			this.pages = this[`${this.view}Pages`]
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
