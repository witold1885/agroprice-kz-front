<template>
	<div class="product">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="product" class="product__wrap">
			<div class="product__main d-flex align-items-end">
				<div v-if="activeImage" class="product__images d-flex flex-column justify-content-between">
					<div class="product__images-full">
						<img :src="`${storageURL}/${activeImage.path}`" />
					</div>
					<div class="product__images-list d-flex align-items-center">
						<div
							v-for="(img, index) of product.product_images"
							:key="index"
							class="product__images-list-item"
						>
							<img :src="`${storageURL}/${img.path}`" />
						</div>						
					</div>
				</div>
				<div class="product__info">
					<div v-if="product.price_negotiable" class="product__info-negotiable">Договорная</div>
					<div class="product__info-main d-flex flex-column justify-content-between align-items-end">
						<div class="product__info-top">
							<div class="product__info-title">{{ product.name }}</div>
							<div class="product__info-sell d-flex">
								<div class="product__info-sell-left">
									<div class="product__info-sell-price">
										<div class="product__info-sell-price-text">Цена</div>
										<div class="product__info-sell-price-value">{{ Intl.NumberFormat('ru-RU').format(product.price) }} тенге</div>									
										<div class="product__info-sell-price-condition d-flex align-items-center">
											<div class="product__info-sell-price-condition-text">Состояние:</div>
											<div class="product__info-sell-price-condition-value d-flex align-items-center">
												<img class="product__info-sell-price-condition-value-icon" :src="require('@/assets/images/ok.png')" />
												<div class="product__info-sell-price-condition-value-text">Новый</div>
											</div>
										</div>									
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
										<span class="product__info-sell-user-value">{{ product.user ? product.user.profile.fullname : '' }}</span>
										
									</div>
									<div class="product__info-sell-avatar d-flex justify-content-center align-items-center">
										<img :src="require('@/assets/images/logo.png')" />
									</div>
								</div>
								
							</div>
						</div>
						<div class="product__info-bottom">
							<div class="product__info-buttons d-flex flex-wrap justify-content-end align-items-end">
								<div class="product__info-buttons-clearfix"></div>
								<button class="product__info-button-call">Позвонить</button>
								<button class="product__info-button-write">Написать продавцу</button>
								<button class="product__info-button-allproducts">Все товары продавца</button>
								<button class="product__info-button-whatsapp">Написать на Whatsapp</button>
							</div>
							<button type="button" class="product__info-favorite d-flex align-items-center">
								<img class="product__info-favorite-icon" :src="require('@/assets/images/heart.png')" />
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
			<div class="product__divider"></div>
			<div class="product__text">
				Укрепление и развитие структуры способствует подготовки и реализации дальнейших направлений развития. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. С другой стороны начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке форм развития. Товарищи! дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач.
			</div>
			<SellBlock />
			<div class="product__seller-products">
				<div class="product__seller-products-title">Все товары продавца</div>
				<ProductsGrid class="product__seller-products-grid" :products="randomProducts" />
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
import products from '@/components/Catalog/products'
import ProductsCarousel from '@/components/Catalog/ProductsCarousel'
import SellBlock from '@/components/Catalog/SellBlock'
import ProductsGrid from '@/components/Catalog/ProductsGrid'

export default {
	components: { Breadcrumbs, ProductsCarousel, SellBlock, ProductsGrid },
	data () {
		return {
			breadcrumbs: null,
			productUrl: this.$route.params.product,
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			activeImage: null,
			tabs: [
				{ title: 'Описание', code: 'description' },
				{ title: 'Характеристики', code: 'features' },
			],
			activeTab: 'description',
			similarProducts: products,
			gridCount: 5,
		}
	},
	computed: {
		...mapState('product', ['product']),
		...mapState('catalog', ['randomProducts']),
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
		}
    },
	async mounted () {
		await this.init()
		await this.$store.dispatch('catalog/getRandomProducts')
		console.log(this.storageURL)
		console.log(STORAGE_URL)
	},
	methods: {
		...mapActions('product', ['getProduct']),
		async init () {
			if (this.productUrl) {
				await this.getProduct(this.productUrl)
				if (this.product) {
					console.log(this.product)
					this.makeBreadcrumbs()
					this.metaTitle = this.product.name
					this.metaDescription = this.product.name
					this.metaKeywords = this.product.name
					this.activeImage = this.product.product_images[0]
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
		showMore () {
			this.gridCount += 5
		},
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
</style>
