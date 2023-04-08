<template>
	<div class="article">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="blogArticle" class="article__wrap d-flex">
			<!-- <div class="article__date d-flex flex-column justify-content-center align-items-center">
				<div class="article__date-day">{{ prettyDay }}</div>
				<div class="article__date-month">{{ prettyMonth }}</div>				
			</div> -->
			<!-- <img class="article__image" :src="`${storageURL}/${blogArticle.image}`" /> -->
			<!-- <h1 class="article__title heading-1">{{ blogArticle.title }}</h1> -->
			<div class="article__main">
				<div class="article__content" v-html="blogArticle.content"></div>
				<div class="article__social d-flex align-items-center">
					<div class="article__social-text">Нажмите чтобы поделиться статьей:</div>
					<div class="article__social-icons d-flex align-items-center">
						<img class="article__social-icon" :src="require('@/assets/images/socials/fb.png')">
						<img class="article__social-icon" :src="require('@/assets/images/socials/tt.png')">
						<img class="article__social-icon" :src="require('@/assets/images/socials/vk.png')">
						<img class="article__social-icon" :src="require('@/assets/images/socials/ok.png')">
						<img class="article__social-icon" :src="require('@/assets/images/socials/wa.png')">
					</div>
				</div>
			</div>
			<BlogSidebar placing="article" :lastBlogArticles="lastBlogArticles" :blogCategories="blogCategories" />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import BlogSidebar from '@/components/Blog/Sidebar'

export default {
	components: { Breadcrumbs, BlogSidebar },
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
			],
			breakpoint: 'xl',
			contentImages: []
		}
	},
	computed: {
		...mapState('info', ['blogArticle', 'blogCategories', 'lastBlogArticles']),
		storageURL () {
			return STORAGE_URL
		},
		prettyDay () {
			if (this.blogArticle) {
				const ts = Date.parse(this.blogArticle.date)
				const date = new Date(ts)
				let day = date.getDate()
				if (day < 10) day = '0' + day
				return day
			}
			return null
		},
		prettyMonth () {
			if (this.blogArticle) {
				const ts = Date.parse(this.blogArticle.date)
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
	created () {
		window.addEventListener('resize', this.handleResize)
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	async mounted () {
		await this.$store.dispatch('info/getBlogCategories')
		await this.$store.dispatch('info/getLastBlogArticles')
		// console.log(this.blogCategories)
		await this.init()
	},
	methods: {
		...mapActions('info', ['getBlogArticle', 'increaseArticleViews']),
		handleResize () {
			if (window.innerWidth > 1440) this.breakpoint = 'xl'
			else if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 768) this.breakpoint = 'md'
			else if (window.innerWidth > 414) this.breakpoint = 'sm'
			else this.breakpoint = 'xs'
			this.fixImagesSize()
		},
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
					this.setImagesPath()
					this.handleResize()
				}
			}
			else {
				this.$router.push('/')
			}
		},
		setImagesPath () {
			let contentImages = document.querySelectorAll('.article__content img')
			for (let image of contentImages) {
				const src = image.src
				image.src = src
					.replace('https://agroprice.kz', 'https://manager.agroprice.kz')
					.replace('http://localhost:8080', 'https://manager.agroprice.kz')
				this.contentImages.push({ width: image.width, height: image.height })
			}
		},
		fixImagesSize () {
			let lines = document.querySelectorAll('.article__content p')
			let i = 0
			for (let line of lines) {
				let images = line.querySelectorAll('img')
				// console.log(images)
				if (images.length == 1) {
					let image = images[0]
					let contentImage = this.contentImages[i]
					const rate = contentImage.width / contentImage.height
					let width, height
					if (this.breakpoint == 'xl') {
						width = 860
						height = 860 / rate
					}
					else if (this.breakpoint == 'lg') {
						width = 860 * window.innerWidth / 1440
						height = width / rate
					}
					else if (this.breakpoint == 'md') {
						width = 688
						height = 688 / rate
					}
					else if (this.breakpoint == 'sm') {
						width = 688 * window.innerWidth / 768
						height = width / rate
					}
					else if (this.breakpoint == 'xs') {
						width = 280 * window.innerWidth / 320
						height = width / rate
					}
					image.style.cssText += `width:${width}px;height:${height}px;`;
				}
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

<style lang="scss">
@import '@/assets/styles/blog.scss';
</style>
