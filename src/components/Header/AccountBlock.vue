<template>
	<div
		class="account-block justify-content-between"
		@click="handleAccount"
	>
		<div class="account-block__icon d-flex justify-content-center align-items-center">
			<img :src="require('@/assets/images/account.png')" />
		</div>
		<div v-if="user" class="account-block__link">
			<a>{{ user.profile.name || `user-${user.name}` }}</a>
		</div>
		<div v-else class="account-block__link">
			<a>Войти/Регистрация</a>
		</div>
	</div>	
	<button
		class="account-button justify-content-center align-items-center"
		@click="authDialog.visible = true"
	>
		<img
			class="account-button-icon"
			:src="require(`@/assets/images/account.png`)"
		/>
	</button>
	<AuthDialog :dialog="authDialog" @login="afterLogin" @register="infoRegister" />
	<InfoDialog :dialog="infoDialog" />	
</template>

<script>
import { useCookies } from "vue3-cookies"
import axios from "axios";
import AuthDialog from '@/components/Auth/AuthDialog'
import InfoDialog from '@/components/Auth/InfoDialog'

export default {
	setup () {
		const { cookies } = useCookies()
		return { cookies }
	},
	components: {
		AuthDialog,
		InfoDialog
	},
	data () {
		return {
			user: null,
			authDialog: {
				visible: false,
				name: 'login'
			},
			infoDialog: {
				visible: false,
				message: ''
			}
		}
	},
	async mounted () {
		let access_token = this.cookies.get("access_token")
		if (access_token) {
			this.user = await this.getUser(access_token)
		}
	},
	methods: {
		handleAccount () {
			if (!this.user) {
				this.authDialog.visible = true
			}
			else {
				this.$router.push('/profile')
			}
		},
		afterLogin () {
			window.location.reload(true)
		},
		infoRegister () {
			this.authDialog.visible = false
			this.infoDialog.message = 'Регистрация прошла успешно. Письмо с ссылкой для подтверждения отправлено на Ваш E-mal'
			this.infoDialog.visible = true
		},
		async getUser (token) {
			let res = await axios.get('http://localhost:8000/api/user', {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json"
				}})
			if (res.data.id) {
				return res.data
			}
			else {
				console.log(res.data.status)
				return null
			}
		},
	}

}
</script>