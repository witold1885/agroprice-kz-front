<template>
	<div class="create-product">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<h1 class="create-product__title heading-1">Создать обьявление</h1>
		<CreateForm />
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
			]
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/product.scss';
</style>
