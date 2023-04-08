<template>
	<div
		class="blog__sidebar d-flex flex-column"
		:class="{
			'blog__sidebar-inblog': placing == 'blog',
			'blog__sidebar-inarticle': placing == 'article'
		}"
	>
		<div v-if="searchBlockVisible" class="blog__search d-flex flex-column">
			<div class="blog__search-title">Найти</div>
			<input
				class="blog__search-field"
				placeholder="Поиск по заголовкам"
				v-model="search"
				@keyup="searchArticles"
			/>					
		</div>
		<div v-if="lastBlogArticles.length != 0" class="blog__last">
			<div class="blog__last-title">Последние статьи</div>
			<div class="blog__last-list d-flex flex-column">
				<a :href="`/blog/${article.url}`" v-for="(article, index) of lastBlogArticles" :key="index" class="blog__last-list-item d-flex flex-column">
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
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	props: {
		lastBlogArticles: {
			type: Array,
			default: () => []
		},
		blogCategories: {
			type: Array,
			default: () => []
		},
		placing: {
			type: String,
			default: 'blog'
		}
	},
	data () {
		return {
			search: '',
			searchBlockVisible: this.$route.path == '/blog'
		}
	},
	watch: {
		'$route.path' (newValue) {
			this.searchBlockVisible = newValue == '/blog'
		}
	},
	methods: {
		...mapMutations('info', ['setBlogCategoryId']),
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : '0' + month
			let day = date.getDate()
			day = day >= 10 ? day : '0' + day
			return `${day}.${month}.${year}`
		},
		async searchArticles () {
			this.$emit('search', this.search)
		},
		async selectCategory (category_id) {
			this.setBlogCategoryId(category_id)
			if (this.$route.path != '/blog') {
				this.$router.push('/blog')
			}
		}
	}
}
</script>
