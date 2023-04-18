<template>
	<div class="profile-product w-100 d-flex justify-content-between relative background-lightgrey">
		<div class="profile-product__left h-100 d-flex">
			<img v-if="product.product_images.length != 0" class="profile-product__image img-centered" :src="`${storageURL}/${product.product_images[0].path}`" />
			<img v-else class="profile-product__image img-centered" :src="require('@/assets/images/no-image.png')" />
			<div class="profile-product__info h-100 d-flex flex-column justify-content-between">
				<div class="profile-product__info-main">
					<div class="profile-product__info-title color-green">{{ product.name }}</div>
					<div class="profile-product__info-price color-black">{{ product.price }} тенге</div>					
				</div>
				<div class="profile-product__info-stats d-flex align-items-center">
					<div class="profile-product__info-stats-item d-flex align-items-center">
						<img class="profile-product__info-stats-item-icon" :src="require('@/assets/images/eye-darker.png')" />
						<span class="profile-product__info-stats-item-value color-black">324</span>
					</div>
					<div class="profile-product__info-stats-item d-flex align-items-center">
						<img class="profile-product__info-stats-item-icon" :src="require('@/assets/images/call.png')" />
						<span class="profile-product__info-stats-item-value color-black">78</span>
					</div>
					<div class="profile-product__info-stats-item d-flex align-items-center">
						<img class="profile-product__info-stats-item-icon" :src="require('@/assets/images/heart-red.png')" />
						<span class="profile-product__info-stats-item-value color-black">7543</span>
					</div>					
				</div>
			</div>
		</div>
		<div class="profile-product__right h-100 d-flex flex-column justify-content-center align-items-end">
			<div class="profile-product__buttons d-flex justify-content-end align-items-center">
				<div
					v-if="statuses[product.status].text"
					class="profile-product__status d-flex justify-content-center align-items-center border-none"
					:class="{ 'profile-product__status-bordered border-green': statuses[product.status].border }"
				>
					<img class="profile-product__status-icon" :src="require(`@/assets/images/${statuses[product.status].icon}`)" />
					<span class="profile-product__status-text">{{ statuses[product.status].text }}</span>
				</div>
				<button v-if="canPublish" class="profile-product__publish background-green color-white border-none" @click="publish">Быстрая публикация</button>
			</div>
			<div class="profile-product__links d-flex justify-content-end align-items-center">
				<div class="profile-product__links-item d-flex">
					<img class="profile-product__links-item-icon" :src="require('@/assets/images/bar-chart.png')" />
					<span class="profile-product__links-item-text">Статистика</span>					
				</div>
				<div class="profile-product__links-item d-flex">
					<img class="profile-product__links-item-icon" :src="require('@/assets/images/megaphone.png')" />
					<span class="profile-product__links-item-text">Рекламировать</span>					
				</div>
			</div>
		</div>
		<div class="profile-product__options absolute">
			<div class="profile-product__options-menu relative">
				<button
					class="profile-product__options-menu-button d-flex flex-column justify-content-center align-items-center border-green"
					@click="showMenu = !showMenu"
				>
					<div class="profile-product__options-menu-button-dot" v-for="i in 3" :key="i"></div>
				</button>
				<div v-if="showMenu" class="profile-product__options-menu-dropdown d-flex flex-column justify-content-around absolute background-white shadow-custom">
					<div v-if="canPublish" class="profile-product__options-menu-dropdown-link" @click="publish">Опубликовать</div>
					<div class="profile-product__options-menu-dropdown-link" @click="edit">Редактировать</div>
					<div v-if="canArchivate" class="profile-product__options-menu-dropdown-link" @click="archivate">В архив</div>
					<div v-if="canDelete" class="profile-product__options-menu-dropdown-link" @click="deleteProduct">Удалить</div>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'

export default {
	props: {
		product: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			showMenu: false,
			statuses: {
				published: {
					icon: 'ok.png', text: 'Опубликован', border: true
				},
				accepted: {
					icon: 'ok.png', text: 'Опубликован', border: true
				},
				moderating: {
					icon: 'ok.png', text: null
				},
				declined: {
					icon: 'ok.png', text: null
				},
				archive: {
					icon: 'archive.png', text: 'Архив', border: false
				},
				trash: {
					icon: 'ok.png', text: null
				}
			}
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		},
		canPublish () {
			return ['archive', 'trash'].indexOf(this.product.status) !== -1
		},
		canArchivate () {
			return ['published', 'accepted', 'trash'].indexOf(this.product.status) !== -1
		},
		canDelete () {
			return this.product.status !== 'trash'
		}
	},
	methods: {
		...mapActions('profile', ['changeProfileProductStatus']),
		async publish () {
			await this.changeStatus('published')
		},
		async edit () {
			this.$router.push(`/edit-product/${this.product.id}`)
		},
		async archivate () {
			await this.changeStatus('archive')
		},
		async deleteProduct () {
			await this.changeStatus('trash')
		},
		async changeStatus (status) {
			const changeSuccess = await this.changeProfileProductStatus({ product_id: this.product.id, status })
			console.log(changeSuccess)
			this.emitter.emit('product-status-changed')
		}
	}
}
</script>
