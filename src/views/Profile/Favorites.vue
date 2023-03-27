<template>
	<div class="profile-favorites">		
		<div class="profile-favorites__top d-flex flex-column">
			<div class="profile-favorites__top-line d-flex justify-content-between align-items-center">
				<h1 class="profile-favorites__title">Избранное</h1>
				<button class="profile-favorites__add-btn" @click="goProductCreate">Добавить объявление</button>
			</div>
			<div class="profile-favorites__top-line profile-favorites__top-fields d-flex align-items-center">
				<div class="profile-favorites__top-menu">
					<div class="profile-favorites__top-menu-field d-flex justify-content-between align-items-center">
						<span class="profile-favorites__top-menu-field-value">Избранное</span>
						<img class="profile-favorites__top-menu-field-icon" :src="require('@/assets/images/arrow-down-green.png')">
					</div>
				</div>
				<div class="profile-favorites__top-menu">
					<div class="profile-favorites__top-menu-field d-flex justify-content-between align-items-center">
						<span class="profile-favorites__top-menu-field-value">Фильтр</span>
						<img class="profile-favorites__top-menu-field-icon" :src="require('@/assets/images/arrow-down-green.png')">
					</div>
				</div>
				<input class="profile-favorites__top-search" placeholder="Поиск по объявлениям" />
			</div>
		</div>
		<ProductsGrid v-if="favorites.length != 0" class="profile-favorites__list" :products="favorites" />
		<Pagination :pagesCount="pages" v-show="pages > 1" />
		<div class="profile-favorites__showmore" v-show="pages > 1">
			<button
				class="products__showmore"
				@click="showMore"
			>Показать еще</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductsGrid from '@/components/Catalog/ProductsGrid'
import Pagination from '@/components/Common/Pagination'

export default {
	data() {
		return {
			search: '',
			page: 1
		}
	},
	components: { ProductsGrid, Pagination },
	computed: {
		...mapState('auth', ['user']),
		...mapState('profile', ['favorites', 'pages']),
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
		await this.getFavorites()
		this.emitter.on('change-page', async (page) => {
			this.page = page
			await this.getFavorites()
		})
		this.emitter.on('favorite-deleted', async () => {
			await this.getFavorites()
		})
	},
	methods: {
		...mapActions('profile', ['getProfileFavorites']),
		async getFavorites () {
			await this.$store.dispatch('profile/getProfileFavorites', { user_id: this.user.id, page: this.page })
		},
		goProductCreate () {
			this.$router.push('/create-product')
		}
	}
}
</script>