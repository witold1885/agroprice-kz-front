<template>
	<div class="sell-block w-100 d-flex flex-column justify-content-center align-items-center">
		<div class="sell-block__text color-white">
			Продавайте свои товары
		</div>
		<button class="sell-block__button border-white color-white" @click="goProductCreate">
			Подать объявление
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('auth', ['user']),
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
	},
	methods: {
		goProductCreate () {
			if (!this.user) {
				this.emitter.emit('auth', '/create-product')
			}
			else {
				this.$router.push('/create-product')
			}
		}
	}
}
</script>
