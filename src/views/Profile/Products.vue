<template>
	<div class="profile-products">
		<div class="profile-products__top profile-products__top-mobile w-100 flex-column">
			<h1 class="profile-products__title heading-1">Поиск по объявлениям</h1>
			<ProfileMenu class="profile-products__top-mobile-menu" />
			<div class="profile-products__top-search d-flex justify-content-between align-items-center background-white">
				<input
					class="profile-products__top-search-field flex-fill h-100 border-none"
					placeholder="Поиск"
					v-model="search"
				/>
				<button class="profile-products__top-search-button d-flex justify-content-center align-items-center background-green border-none" @click="goSearch">
					<img :src="require('@/assets/images/search.png')">
				</button>
			</div>
			<button class="profile-products__add-btn background-green border-none color-white" @click="goProductCreate">Добавить объявление</button>
			<div class="profile-products__top-sort">
				<span class="profile-products__top-sort-label">Сортировать по:</span>&nbsp;
				<span class="profile-products__top-sort-value color-green">Дате добавления</span>					
			</div>
		</div>
		<div class="profile-products__top profile-products__top-desktop w-100 flex-column">
			<div class="profile-products__top-line w-100 d-flex justify-content-between align-items-center">
				<h1 class="profile-products__title heading-1">Поиск по объявлениям</h1>
				<button class="profile-products__add-btn background-green border-none color-white" @click="goProductCreate">Добавить объявление</button>
			</div>
			<div class="profile-products__top-line w-100 d-flex justify-content-between align-items-center">
				<div class="profile-products__top-search d-flex justify-content-between align-items-center background-white">
					<input
						class="profile-products__top-search-field flex-fill h-100 border-none"
						placeholder="Поиск"
						v-model="search"
					/>
					<button class="profile-products__top-search-button d-flex justify-content-center align-items-center background-green border-none" @click="goSearch">
						<img :src="require('@/assets/images/search.png')">
					</button>
				</div>
				<div class="profile-products__top-sort">
					<span class="profile-products__top-sort-label">Сортировать по:</span>&nbsp;
					<span class="profile-products__top-sort-value color-green">Дате добавления</span>					
				</div>
			</div>
		</div>
		<div v-if="products.length != 0" class="profile-products__list d-flex flex-column">
			<ProductItem
				v-for="(product, index) of products"
				:key="index"
				:product="product"
			/>
		</div>
		<Pagination :pagesCount="pages" v-show="pages > 1" />
		<div class="profile-products__showmore" v-show="pages > 1">
			<button
				class="showmore background-white b-green"
				@click="showMore"
			>Показать еще</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileMenu from '@/components/Profile/ProfileMenu'
import ProductItem from '@/components/Profile/ProductItem'
import Pagination from '@/components/Common/Pagination'

export default {
	components: { ProfileMenu, ProductItem, Pagination },
	data () {
		return {
			search: ''
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapState('profile', ['products', 'pages']),
	},
	watch: {
		'$route.params.status' (newValue) {
			this.onStatusChanged(newValue)
		}
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
		await this.getProducts(1)
		this.emitter.on('product-status-changed', async () => {
			await this.getProducts(1)
		})
		this.emitter.on('change-page', async (page) => {
			await this.getProducts(page)
		})
	},
	methods: {
		async getProducts (page = 1, search = '') {
			await this.$store.dispatch('profile/getProfileProducts', { user_id: this.user.id, page, status: this.$route.params.status, search })
		},
		async onStatusChanged () {
			await this.getProducts(1)
		},
		goProductCreate () {
			this.$router.push('/create-product')
		},
		async goSearch () {
			await this.getProducts(1, this.search)
		}
	}
}
</script>
