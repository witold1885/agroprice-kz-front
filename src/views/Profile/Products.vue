<template>
	<div class="profile-products">
		<div class="profile-products__top d-flex flex-column">
			<div class="profile-products__top-line d-flex justify-content-between align-items-center">
				<h1 class="profile-products__title">Поиск по объявлениям</h1>
				<button class="profile-products__add-btn" @click="goProductCreate">Добавить объявление</button>
			</div>
			<div class="profile-products__top-line d-flex justify-content-between align-items-center">
				<div class="profile-products__top-search d-flex justify-content-between align-items-center">
					<input
						class="profile-products__top-search-field"
						placeholder="Поиск"
						v-model="search"
					/>
					<button class="profile-products__top-search-button d-flex justify-content-center align-items-center" @click="goSearch">
						<img :src="require('@/assets/images/search.png')">
					</button>
				</div>
				<div class="profile-products__top-sort">
					<span class="profile-products__top-sort-label">Сортировать по:</span>&nbsp;
					<span class="profile-products__top-sort-value">Дате добавления</span>					
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
		<Pagination :pagesCount="pages" v-show="pages > 1"/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ProductItem from '@/components/Profile/ProductItem'
import Pagination from '@/components/Common/Pagination'

export default {
	components: { ProductItem, Pagination },
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
			console.log('CHanging page to ' + page)
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
