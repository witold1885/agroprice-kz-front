<template>
	<div
		class="favorites-button justify-content-center align-items-center"
		:class="`border-${borderColor}`"
		@click.prevent="toggleFavorites"
	>
		<img v-if="isFavorite" class="favorites-button__icon" :src="require('@/assets/images/heart-red.png')" />
		<img v-else class="favorites-button__icon" :src="require('@/assets/images/heart.png')" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	props: {
		borderColor: {
			type: String,
			default: 'grey'
		},
		product_id: {
			type: Number,
			default: null
		}
	},
	computed: {
		...mapState('auth', ['user']),
		isFavorite () {
			if (!this.user || !this.product_id) return false
			const favorite = this.user.favorites.findIndex(item => item.product_id == this.product_id)
			return favorite !== -1
		}
	},
    methods: {
		...mapActions('profile', ['addProductToFavorites', 'delProductFromFavorites']),
		async toggleFavorites () {
			if (this.user) {
				if (this.product_id) {
					if (!this.isFavorite) {
						const addSuccess = await this.addProductToFavorites({ user_id: this.user.id, product_id: this.product_id })
						console.log(addSuccess)
						if (addSuccess) {
							this.user.favorites.push({ user_id: this.user.id, product_id: this.product_id })
						}
					}
					else {
						const delSuccess = await this.delProductFromFavorites({ user_id: this.user.id, product_id: this.product_id })
						console.log(delSuccess)
						if (delSuccess) {
							const favIndex = this.user.favorites.findIndex(item => item.product_id == this.product_id)
							this.user.favorites.splice(favIndex, 1)
							this.emitter.emit('favorite-deleted')
						}
					}
				}
			}
			else {
				this.emitter.emit('auth', this.$route.path)
			}
		}
	}
}
</script>