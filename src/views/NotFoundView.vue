<template>
	<div>
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<h1 class="heading-1">Страница не найдена</h1>
		<div class="create-product__success-info">Запрашиваемая страница не найдена</div>
		<div class="create-product__success-buttons d-flex justify-content-center align-items-center">
			<button class="create-product__success-button" @click="goHome">На главную</button>
		</div>
		
	</div>
</template>

<script>
import Breadcrumbs from '@/components/Common/Breadcrumbs'

export default {
	components: { Breadcrumbs },
	data () {
		return {
			breadcrumbs: [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Страница не найдена',
					link: null,
					current: true
				},
			],
		}
	},
	methods: {
		goHome () {
			this.$router.push('/')
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
</style>
