<template>
	<div
		v-if="user"
		class="account-block account-block__user justify-content-between"
	>
		<div
			class="account-block__avatar d-flex justify-content-center align-items-center"
			@click="handleAccount"
		>
			<img :src="require('@/assets/images/fake-avatar.png')" />
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
			<img :src="require('@/assets/images/account.png')" />
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
	<AuthDialog :dialog="authDialog" @login="afterLogin" @register="infoRegister" @forgot="initForgot" />
	<ForgotDialog :dialog="forgotDialog" @forgot="infoForgot"/>
	<InfoDialog :dialog="infoDialog" />
</template>

<script>
import { useCookies } from "vue3-cookies"
import axios from "axios";
import AuthDialog from '@/components/Auth/AuthDialog'
import ForgotDialog from '@/components/Auth/ForgotDialog'
import InfoDialog from '@/components/Auth/InfoDialog'
import { API_URL } from '@/store/constants'

export default {
	setup () {
		const { cookies } = useCookies()
		return { cookies }
	},
	components: {
		AuthDialog,
		ForgotDialog,
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
			},
			forgotDialog: {
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
		initForgot () {
			this.authDialog.visible = false
			this.forgotDialog.visible = true
		},
		infoForgot () {
			this.forgotDialog.visible = false
			this.infoDialog.message = 'Запрос на восстановление пароля создан успешно. Письмо с ссылкой для подтверждения отправлено на Ваш E-mal'
			this.infoDialog.visible = true
		},
		async getUser (token) {
			let res = await axios.get(API_URL + '/user', {
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
		async logout () {
			let access_token = this.cookies.get("access_token")
			let response = await axios.post(API_URL + '/logout', {}, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-type": "application/json"
				}})
				.catch((error) => {
					console.log(error)
				})
			console.log(response.data)
			if (response.data.success) {
				this.cookies.remove('access_token')
				this.$user = null
				window.location.reload(true)
				this.$router.push('/')
			}
		},
	}

}
</script>
