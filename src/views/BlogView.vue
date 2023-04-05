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
					<input
						class="blog__search-field"
						placeholder="Поиск по заголовкам"
						v-model="search"
						@keyup="searchArticles"
					/>					
				</div>
				<div v-if="blogLastArticles.length != 0" class="blog__last">
					<div class="blog__last-title">Последние статьи</div>
					<div class="blog__last-list d-flex flex-column">
						<a :href="`/blog/${article.url}`" v-for="(article, index) of blogLastArticles" :key="index" class="blog__last-list-item d-flex flex-column">
							<div class="blog__last-list-item-title">{{ article.title }}</div>
							<div class="blog__last-list-item-date">{{ formatDate(new Date(article.date)) }}</div>							
						</a>
					</div>					
				</div>
				<div class="blog__categories">
					<div class="blog__categories-title">Категории блога</div>
					<div class="blog__categories-list d-flex flex-column">
						<a
							v-for="(category, index) of blogCategories"
							:key="index"
							class="blog__categories-list-item"
							@click="selectCategory(category.id)"
						>
							{{ category.name }}			
						</a>
						<a
							class="blog__categories-list-item"
							@click="selectCategory(null)"
						>
							Все категории		
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import NewsItem from '@/components/News/NewsItem'
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
			articleType: 'Блог',
			search: ''
		}
	},
	computed: {
		...mapState('info', ['blogCategories', 'blogArticles', 'blogLastArticles', 'pages', 'category_id']),
		storageURL () {
			return STORAGE_URL
		}
	},
	async mounted () {
		await this.$store.dispatch('info/getBlogCategories')
		await this.getArticles()
		this.emitter.on('change-page', async (page) => {
			await this.getArticles(page)
		})
	},
	methods: {
		...mapMutations('info', ['setBlogCategoryId']),
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
		async searchArticles () {
			await this.getArticles(1, this.search)
		},
		async selectCategory (category_id) {
			this.setBlogCategoryId(category_id)
			await this.getArticles()
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/blog.scss';
@import '@/assets/styles/news.scss';
</style>
