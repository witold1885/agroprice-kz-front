<template>
	<div class="blog">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<h1 class="blog__title heading-1">Блог</h1>
		<div class="blog__wrap d-flex">
			<div class="blog__list d-flex flex-column align-items-center">
				<div class="blog__list-grid d-flex flex-wrap">
					<NewsItem v-for="(item, index) of blogArticles" :key="index" :item="item" :articleType="articleType" class="blog__list-item" />
				</div>
				<Pagination class="blog__list-pagination" :pagesCount="pages" v-show="pages > 1"/>
				<button
					v-show="pages > 1"
					class="blog__list-showmore products__showmore"
					@click="showMore"
				>Показать еще</button>
			</div>
			<div class="blog__sidebar d-flex flex-column">
				<div class="blog__search d-flex flex-column">
					<div class="blog__search-title">Найти</div>
					<input class="blog__search-field" placeholder="Поиск по заголовкам" />					
				</div>
				<div v-if="blogLastArticles.length != 0" class="blog__last">
					<div class="blog__last-title">Последние новости</div>
					<div class="blog__last-list d-flex flex-column">
						<a :href="`/blog/${article.url}`" v-for="(article, index) of blogLastArticles" :key="index" class="blog__last-list-item d-flex flex-column">
							<div class="blog__last-list-item-title">{{ article.title }}</div>
							<div class="blog__last-list-item-date">12.10.2022</div>							
						</a>
					</div>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import NewsItem from '@/components/News/NewsItem'
import news from '@/components/News/news.js'
import Pagination from '@/components/Common/Pagination'

export default {
	components: { Breadcrumbs, NewsItem, Pagination },
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
			articles: news,
			articleType: 'Блог'
		}
	},
	computed: {
		...mapState('info', ['blogArticles', 'blogLastArticles', 'pages']),
		storageURL () {
			return STORAGE_URL
		}
	},
	async mounted () {
		await this.getArticles()
	},
	methods: {
		async getArticles (page = 1, search = '') {
			await this.$store.dispatch('info/getBlogArticles', { page, search })
		},
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/blog.scss';
</style>
