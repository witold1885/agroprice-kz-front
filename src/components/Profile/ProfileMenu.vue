<template>
	<div class="profile-menu">
		<div
			class="profile-menu__button d-flex justify-content-center align-items-center"
		>
			<div class="profile-menu__button-icon d-flex flex-column justify-content-between">
				<img :src="require('@/assets/images/burger-white-line.png')" />
				<img :src="require('@/assets/images/burger-white-line.png')" />
				<img :src="require('@/assets/images/burger-white-line.png')" />
			</div>
			<div class="profile-menu__button-title">
				Меню личного кабинета
			</div>
		</div>
	</div>
</template>

<script>
// import categories from '../Catalog/categories'
// import CloseButton from '@/components/Common/CloseButton'

export default {
	/*components: {
		CloseButton
	},*/
	data () {
		return {
			// menuCategories: categories,
			// showMenu: false,
		}
	},
	methods: {

	}
}
</script>