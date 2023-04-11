<template>
	<div
		v-if="user"
		class="account-block account-block__user justify-content-between"
	>
		<div
			class="account-block__avatar d-flex justify-content-center align-items-center br-100"
			@click="handleAccount"
		>
			<img class="w-100 h-100 img-centered" v-if="user.profile.avatar" :src="`${storageURL}/${user.profile.avatar}`" />
			<img class="w-100 h-100 img-centered" v-else :src="require('@/assets/images/fake-avatar.png')" />
		</div>
		<div
			class="account-block__link account-block__link-user"
			@click="handleAccount"
		>
			<a>{{ user.profile.fullname || `user-${user.name}` }}</a>
		</div>
		<div
			class="account-block__exit d-flex justify-content-center align-items-center"
			@click="logout"
		>
			<img :src="require('@/assets/images/logout-grey.png')" />
		</div>
	</div>	
	<div
		v-else
		class="account-block account-block__guest justify-content-between"
		@click="handleAccount"
	>
		<div class="account-block__icon d-flex justify-content-center align-items-center">
			<img class="w-100" :src="require('@/assets/images/account.png')" />
		</div>
		<div class="account-block__link account-block__link-login">
			<a>Войти/Регистрация</a>
		</div>
	</div>	
	<button
		class="account-button justify-content-center align-items-center"
		@click="handleAccount"
	>
		<img
			class="account-button-icon"
			:src="require(`@/assets/images/account.png`)"
		/>
	</button>
</template>

<script>
import { STORAGE_URL } from '@/constants'
import { mapState, mapActions } from 'vuex'

export default {
	computed: {
		...mapState('auth', ['user']),
		storageURL () {
			return STORAGE_URL
		}
	},
	methods: {
		...mapActions('auth', ['logoutUser']),
		handleAccount () {
			if (!this.user) {
				this.emitter.emit('auth', '/profile')
			}
			else {
				this.$router.push('/profile')
			}
		},
		async logout () {
			const logoutSuccess = await this.logoutUser()
			if (logoutSuccess) this.$router.push('/')
		}
	}

}
</script>
