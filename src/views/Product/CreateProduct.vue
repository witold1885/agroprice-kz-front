<template>
	<div class="create-product">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div v-if="!productCreated">
			<h1 class="create-product__title heading-1">Создать обьявление</h1>
			<CreateForm />
		</div>
		<div v-else class="create-product__success">
			<h1 class="create-product__success-title heading-1">Объявление создано успешно!</h1>
			<div class="create-product__success-info">Ваше объявление успешно создано и добавлено в очередь на модерацию</div>
			<div class="create-product__success-buttons d-flex justify-content-center align-items-center">
				<button class="create-product__success-button background-green color-white border-none" @click="goHome">На главную</button>
				<button class="create-product__success-button background-green color-white border-none" @click="createMore">Создать еще</button>
			</div>
		</div>
	</div>
</template>

<script>
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
					text: 'Создать объявление',
					link: null,
					current: true
				},
			],
			productCreated: false
		}
	},
	async mounted() {
		this.emitter.on('product-created', () => {
			this.productCreated = true
		})
	},
	methods: {
		goHome () {
			this.$router.push('/')
		},
		createMore () {
			this.productCreated = false
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
</style>
