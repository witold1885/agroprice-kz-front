<template>
	<div class="product">
		<div v-if="galleryImage" class="product__slideshow d-flex justify-content-center align-items-center">
			<div class="product__slideshow-wrap">
				<img class="product__slideshow-nav product__slideshow-nav-prev" :src="require('@/assets/images/arrow-left-white.png')" @click="slidePrev(true)">
				<img :src="`${storageURL}/${galleryImage.path}`" @click="galleryImage = null" />
				<img class="product__slideshow-nav product__slideshow-nav-next" :src="require('@/assets/images/arrow-right-white.png')" @click="slideNext(true)">
			</div>
		</div>
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="product" class="product__wrap">
			<div class="product__main d-flex">
				<h1 v-if="breakpoint == 'sm'" class="product__info-mobile-title">{{ product.name }}</h1>
				<div v-if="activeImage" class="product__images d-flex flex-column justify-content-between">
					<div class="product__images-full" @click="galleryImage = activeImage">
						<img :src="`${storageURL}/${activeImage.path}`" />
					</div>
					<carousel
						ref="carousel"
						:settings="settings"
						class="product__images-list d-flex"
					>
						<template #slides>
							<slide
								v-for="(img, index) of product.product_images"
								:key="index"
								class="product__images-list-item"
								:class="{ 'product__images-list-item-active': img.path == activeImage.path }"
								@click="setActiveImage(index)"
							>
								<img :src="`${storageURL}/${img.path}`" />
							</slide>
						</template>
					</carousel>
						<div
							class="product__images-list-nav product__images-list-nav-prev d-flex justify-content-center align-items-center"
							@click="slidePrev"
						>
							<img :src="require('@/assets/images/arrow-left-green.png')" />
						</div>					
						<div
							class="product__images-list-nav product__images-list-nav-next d-flex justify-content-center align-items-center"
							@click="slideNext"
						>
							<img :src="require('@/assets/images/arrow-right-green.png')" />							
						</div>
				</div>
				<div v-else class="product__images d-flex flex-column justify-content-between">
					<div class="product__images-full">
						<img class="catalog-product__image" :src="require('@/assets/images/no-image.png')" />
					</div>
				</div>
				<div class="product__info">
					<!-- <div v-if="product.price_negotiable" class="product__info-negotiable">Договорная</div> -->
					<div class="product__info-main d-flex flex-column justify-content-between align-items-end">
						<div class="product__info-top">
							<h1 v-if="breakpoint != 'sm'" class="product__info-title">{{ product.name }}</h1>
							<div class="product__info-sell d-flex">
								<div class="product__info-sell-left">
									<div class="product__info-sell-price">
										<div class="product__info-sell-price-text">Цена</div>
										<div class="product__info-sell-price-value">{{ product.price != 0 ? Intl.NumberFormat('ru-RU').format(product.price) + ' тенге' : 'Цена договорная' }}</div>									
										<!-- <div class="product__info-sell-price-condition d-flex align-items-center">
											<div class="product__info-sell-price-condition-text">Состояние:</div>
											<div class="product__info-sell-price-condition-value d-flex align-items-center">
												<img class="product__info-sell-price-condition-value-icon" :src="require('@/assets/images/ok.png')" />
												<div class="product__info-sell-price-condition-value-text">Новый</div>
											</div>
										</div>	 -->								
									</div>
									<div class="product__info-sell-divider"></div>
									<div class="product__info-sell-location d-flex align-items-center">
										<img class="product__info-sell-location-icon" :src="require('@/assets/images/location.png')" />
										<div class="product__info-sell-location-value">{{ product.location.city }}</div>
										
									</div>
								</div>
								<div class="product__info-sell-right">
									<div class="product__info-sell-user">
										<span class="product__info-sell-user-text">Продавец: </span>
										<span class="product__info-sell-user-value">{{ product.contact.person }}</span>
										
									</div>
									<div class="d-flex">
										<div class="product__info-sell-avatar d-flex justify-content-center align-items-center">
											<img :src="require('@/assets/images/logo.png')" />
										</div>
										<div class="product__info-mobile-buttons flex-column">
											<a v-if="!phoneShow" class="product__info-mobile-button-call" @click="phoneShow = true">Показать телефон</a>
											<a v-else :href="`tel:${product.contact.phone}`" class="product__info-mobile-button-phone d-flex justify-content-center align-items-center">{{ product.contact.phone }}</a>
											<a :href="whatsappLink" class="product__info-mobile-button-whatsapp">Написать на Whatsapp</a>
										</div>
									</div>
								</div>
								
							</div>
						</div>
						<div class="product__info-mobile-divider"></div>
						<div class="product__info-bottom">
							<div class="product__info-buttons d-flex flex-wrap justify-content-end align-items-end">
								<div class="product__info-buttons-clearfix"></div>
								<a v-if="!phoneShow" class="product__info-button-call" @click="phoneShow = true">Показать телефон</a>
								<a v-else :href="`tel:${product.contact.phone}`" class="product__info-button-phone d-flex justify-content-center align-items-center">{{ product.contact.phone }}</a>
								<button class="product__info-button-write">Написать продавцу</button>
								<button class="product__info-button-allproducts">Все товары продавца</button>
								<a :href="whatsappLink" class="product__info-button-whatsapp">Написать на Whatsapp</a>
							</div>
							<button type="button" class="product__info-favorite d-flex align-items-center" @click="toggleFavorites">
								<img v-if="isFavorite" class="product__info-favorite-icon" :src="require('@/assets/images/heart-red.png')" />
								<img v-else class="product__info-favorite-icon" :src="require('@/assets/images/heart.png')" />
								<div class="product__info-favorite-text">В избранное</div>									
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="product__tabs">
				<div class="product__tabs-switch d-flex align-items-center">
					<div
						v-for="(tab, index) of tabs"
						:key="index"
						class="product__tabs-switch-item"
						:class="{ 'product__tabs-switch-item-active': activeTab == tab.code }"
						@click="activeTab = tab.code"
					>{{ tab.title }}</div>
					
				</div>
				<div v-if="activeTab == 'description'" class="product__tabs-info product__tabs-info-description">{{ product.description }}</div>
				<div v-if="activeTab == 'features'" class="product__tabs-info product__tabs-info-features d-flex flex-wrap justify-content-between">
					<div
						v-for="i in 12" :key="i"
						class="product__tabs-info-features-item d-flex justify-content-between align-items-end"
					>
						<div class="product__tabs-info-features-item-name">Название</div>
						<div class="product__tabs-info-features-item-divider"></div>
						<div class="product__tabs-info-features-item-value">Описание товара</div>
					</div>
				</div>
				
			</div>
			<ProductsCarousel
				title="Похожие товары"
				:products="product.similar"
			/>
			<!-- <div class="product__divider"></div>
			<div class="product__text">
				Укрепление и развитие структуры способствует подготовки и реализации дальнейших направлений развития. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. С другой стороны начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке форм развития. Товарищи! дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач.
			</div> -->
			<SellBlock />
			<div v-if="sellerProducts.length != 0" class="product__seller-products">
				<div class="product__seller-products-title">Все товары продавца</div>
				<ProductsGrid class="product__seller-products-grid" :products="sellerProducts" />
				<button
					class="products__showmore product__seller-products-showmore"
					@click="showMore"
				>Показать еще</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import products from '@/components/Catalog/products'
import ProductsCarousel from '@/components/Catalog/ProductsCarousel'
import SellBlock from '@/components/Catalog/SellBlock'
import ProductsGrid from '@/components/Catalog/ProductsGrid'

export default {
	components: { Breadcrumbs, Carousel, Slide, ProductsCarousel, SellBlock, ProductsGrid },
	data () {
		return {
			breadcrumbs: null,
			productUrl: this.$route.params.product,
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			canonicalUrl: '',
			activeImageIndex: 0,
			activeImage: null,
			tabs: [
				{ title: 'Описание', code: 'description' },
				{ title: 'Характеристики', code: 'features' },
			],
			activeTab: 'description',
			similarProducts: products,
			gridCount: 5,
			settings: {
				itemsToShow: 5,
				itemsToSlide: 1,
				// wrapAround: true,
				snapAlign: 'start',
				breakpoints: {
					993: {
						itemsToShow: 5
					},
					415: {
						itemsToShow: 4
					},
					1: {
						itemsToShow: 4
					}
				}
			},
			galleryImage: null,
			whatsappLink: null,
			sellerProductsLimit: 10,
			phoneShow: false,
			breakpoint: 'lg'
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapState('product', ['product']),
		...mapState('catalog', ['sellerProducts']),
		storageURL () {
			return STORAGE_URL
		},
		isFavorite () {
			if (!this.user || !this.product) return false
			const favorite = this.user.favorites.findIndex(item => item.product_id == this.product.id)
			return favorite !== -1
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
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
		await this.init()
		await this.makeWhatsappLink()
	},
	methods: {
		...mapActions('product', ['getProduct', 'increaseProductViews']),
		...mapActions('profile', ['addProductToFavorites', 'delProductFromFavorites']),
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		},
		makeWhatsappLink () {
			let whatsappPhone = this.product.user.profile.whatsapp || this.product.user.profile.phone
			if (whatsappPhone) {
				whatsappPhone = whatsappPhone.replace('+', '').replace('(', '').replace(')', '').replace(/-/g, '').replace(/ /g, '')
				const text = `Я пишу вам с сервиса Agroprice.kz, хотел поитересоваться по товару "${this.product.name}" https://agroprice.kz/${this.product.url} `
				this.whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`
			}
		},
		async toggleFavorites () {
			if (this.user) {
				if (this.product) {
					if (!this.isFavorite) {
						const addSuccess = await this.addProductToFavorites({ user_id: this.user.id, product_id: this.product.id })
						if (addSuccess) {
							this.user.favorites.push({ user_id: this.user.id, product_id: this.product.id })
						}
					}
					else {
						const delSuccess = await this.delProductFromFavorites({ user_id: this.user.id, product_id: this.product.id })
						if (delSuccess) {
							const favIndex = this.user.favorites.findIndex(item => item.product_id == this.product.id)
							this.user.favorites.splice(favIndex, 1)
						}
					}
				}
			}
			else {
				this.emitter.emit('auth', this.$route.path)
			}
		},
		async init () {
			if (this.productUrl) {
				await this.getProduct(this.productUrl)
				if (this.product) {
					console.log(this.product)
					this.makeBreadcrumbs()
					this.metaTitle = this.product.name
					this.metaDescription = this.product.name
					this.metaKeywords = this.product.name
					this.canonicalUrl = 'https://agroprice.kz/product/' + this.product.url
					if (this.product.product_images.length != 0) {
						this.activeImageIndex = 0
						this.setActiveImage(0)
					}
					await this.$store.dispatch('catalog/getSellerProducts', { seller_id: this.product.user.id, limit: this.sellerProductsLimit })
					this.increaseProductViews({ product_id: this.product.id })
				}
			}
			else {
				this.$router.push('/')
			}
		},
		makeBreadcrumbs () {
			this.breadcrumbs = this.setDefaultBreadcrumbs()
			// for (const item of this.category.path) {
				this.breadcrumbs.push({
					text: this.product.name,
					link: '/product/' + this.product.url,
					current: true

				})
			// }
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
		},
		setActiveImage (index) {
			this.activeImageIndex = index
			this.activeImage = this.product.product_images[index]
		},
		slidePrev (gallery = false) {
			this.activeImageIndex--
			if (this.activeImageIndex < 0) {
				this.activeImageIndex = this.product.product_images.length - 1
			}
			this.setActiveImage(this.activeImageIndex)
			this.$refs.carousel.slideTo(this.activeImageIndex)
			if (gallery) this.galleryImage = this.activeImage
		},
		slideNext (gallery = false) {
			this.activeImageIndex++
			if (this.activeImageIndex > this.product.product_images.length - 1) {
				this.activeImageIndex = 0
			}
			this.setActiveImage(this.activeImageIndex)
			this.$refs.carousel.slideTo(this.activeImageIndex)
			if (gallery) this.galleryImage = this.activeImage
		},
		getSeller () {

		},
		async showMore () {
			// this.gridCount += 5
			this.sellerProductsLimit += 10
			await this.$store.dispatch('catalog/getSellerProducts', { seller_id: this.product.user.id, limit: this.sellerProductsLimit })
		},
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
@import '@/assets/styles/catalog.scss';
</style>
