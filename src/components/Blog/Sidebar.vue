<template>
	<div
		class="blog__sidebar d-flex flex-column"
		:class="{
			'blog__sidebar-ingrid': placing == 'grid',
			'blog__sidebar-inarticle': placing == 'article'
		}"
	>
		<div v-if="searchBlockVisible" class="blog__search w-100 d-flex flex-column">
			<div class="blog__search-title color-black">Найти</div>
			<input
				class="blog__search-field background-white border-none color-black"
				placeholder="Поиск по заголовкам"
				v-model="search"
				@keyup="searchArticles"
			/>					
		</div>
		<div v-if="lastArticles.length != 0" class="blog__last w-100">
			<div class="blog__last-title color-black">Последние статьи</div>
			<div class="blog__last-list d-flex flex-column">
				<a :href="`/${view}/${article.url}`" v-for="(article, index) of lastArticles" :key="index" class="blog__last-list-item d-flex flex-column">
					<div class="blog__last-list-item-title color-black">{{ article.title }}</div>
					<div class="blog__last-list-item-date color-black">{{ formatDate(new Date(article.date)) }}</div>						
				</a>
			</div>					
		</div>
		<div v-if="categories.length != 0" class="blog__categories w-100">
			<div class="blog__categories-title color-black">Категории блога</div>
			<div class="blog__categories-list d-flex flex-column">
				<a
					v-for="(category, index) of categories"
					:key="index"
					class="blog__categories-list-item color-black"
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
		lastArticles: {
			type: Array,
			default: () => []
		},
		categories: {
			type: Array,
			default: () => []
		},
		view: {
			type: String,
			default: 'blog'
		},
		placing: {
			type: String,
			default: 'grid'
		}
	},
	data () {
		return {
			search: '',
			searchBlockVisible: this.placing == 'grid'
		}
	},
	watch: {
		'$route.path' (newValue) {
			this.searchBlockVisible = (newValue == '/blog' || newValue == '/news')
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
