<template>
	<div class="article">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="blogArticle" class="article__wrap">
			<div class="article__date d-flex flex-column justify-content-center align-items-center">
				<div class="article__date-day">{{ prettyDay }}</div>
				<div class="article__date-month">{{ prettyMonth }}</div>				
			</div>
			<img class="article__image" :src="`${storageURL}/${blogArticle.image}`" />
			<div class="article__author">Автор: {{ blogArticle.author }}</div>
			<h1 class="article__title heading-1">{{ blogArticle.title }}</h1>
			<div class="article__content" v-html="blogArticle.content"></div>
			<div class="article__social d-flex justify-content-between align-items-center">
				<div class="article__social-text">Нажмите что бы поделиться новостью:</div>
				<div class="article__social-icons d-flex align-items-center">
					<img class="article__social-icon" :src="require('@/assets/images/socials/fb.png')">
					<img class="article__social-icon" :src="require('@/assets/images/socials/tt.png')">
					<img class="article__social-icon" :src="require('@/assets/images/socials/vk.png')">
					<img class="article__social-icon" :src="require('@/assets/images/socials/ok.png')">
					<img class="article__social-icon" :src="require('@/assets/images/socials/wa.png')">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'

export default {
	components: { Breadcrumbs },
	data () {
		return {
			breadcrumbs: null,
			articleUrl: this.$route.params.article,
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			canonicalUrl: '',
			months: [
				'Янв',
				'Фев',
				'Мар',
				'Апр',
				'Май',
				'Июн',
				'Июл',
				'Авг',
				'Сен',
				'Окт',
				'Ноя',
				'Дек',
			]
		}
	},
	computed: {
		...mapState('info', ['blogArticle']),
		storageURL () {
			return STORAGE_URL
		},
		prettyDay () {
			if (this.blogArticle) {
				const ts = Date.parse(this.blogArticle.created_at)
				const date = new Date(ts)
				let day = date.getDate()
				if (day < 10) day = '0' + day
				return day
			}
			return null
		},
		prettyMonth () {
			if (this.blogArticle) {
				const ts = Date.parse(this.blogArticle.created_at)
				const date = new Date(ts)
				let month = this.months[date.getMonth()] 
				return month
			}
			return null
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
	async mounted () {
		await this.init()
	},
	methods: {
		...mapActions('info', ['getBlogArticle', 'increaseArticleViews']),
		async init () {
			if (this.articleUrl) {
				await this.getBlogArticle(this.articleUrl)
				if (this.blogArticle) {
					// console.log(this.blogArticle)
					this.makeBreadcrumbs()
					this.metaTitle = this.blogArticle.title
					this.metaDescription = this.blogArticle.title
					this.metaKeywords = this.blogArticle.title
					this.canonicalUrl = 'https://agroprice.kz/blog/' + this.blogArticle.url
					this.increaseArticleViews({ article_id: this.blogArticle.id })
					let contentImages = document.querySelectorAll('.article__content img')
					for (let image of contentImages) {
						const src = image.src
						console.log(src)
						image.src = src
							.replace('https://agroprice.kz', 'https://manager.agroprice.kz')
							.replace('http://localhost:8080', 'https://manager.agroprice.kz')
					}
				}
			}
			else {
				this.$router.push('/')
			}
		},
		makeBreadcrumbs () {
			this.breadcrumbs = this.setDefaultBreadcrumbs()
			this.breadcrumbs.push({
				text: this.blogArticle.title,
				link: '/blog/' + this.blogArticle.url,
				current: true

			})
		},
		setDefaultBreadcrumbs () {
			return [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Блог',
					link: '/blog',
					current: false
				}
			]
		}
	}
}
</script>
