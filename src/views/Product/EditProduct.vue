<template>
	<div class="create-product">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="!productEdited">
			<h1 class="create-product__title heading-1">Редактировать обьявление</h1>
			<CreateForm v-if="product" :editingProduct="product" />
		</div>
		<div v-else class="create-product__success">
			<h1 class="create-product__success-title heading-1">Объявление изменено успешно!</h1>
			<div class="create-product__success-info">Ваше объявление успешно изменено</div>
			<div class="create-product__success-buttons d-flex justify-content-center align-items-center">
				<button class="create-product__success-button background-green color-white border-none" @click="goHome">На главную</button>
				<button class="create-product__success-button background-green color-white border-none" @click="createMore">Создать новое объявление</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import CreateForm from '@/components/Product/CreateForm'

export default {
	components: { Breadcrumbs, CreateForm },
	data () {
		return {
			breadcrumbs: [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Личный кабинет',
					link: '/profile',
					current: false
				},
				{
					text: 'Редактировать объявление',
					link: null,
					current: true
				},
			],
			product: null,
			productEdited: false
		}
	},
	computed: {
		...mapState('auth', ['user'])
	},
	async mounted() {
		await this.$store.dispatch('auth/getUser')
		if (!this.user) {
			this.$router.push('/create-product')
		}
		console.log(this.$route.params)
		await this.getProduct()
		this.emitter.on('product-edited', () => {
			this.productEdited = true
		})
	},
	methods: {
		...mapActions('profile', ['getProfileProduct']),
		async getProduct () {
			this.product = await this.getProfileProduct({ product_id: this.$route.params.product_id })
			console.log(this.product)
		},
		goHome () {
			this.$router.push('/')
		},
		createMore () {
			this.$router.push('/create-product')
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
</style>
