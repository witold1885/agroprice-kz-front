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
	<AuthDialog
		:dialog="authDialog"
		@login="afterLogin"
		@register="infoRegister"
		@forgot="initForgot"
	/>
	<ForgotDialog :dialog="forgotDialog" @forgot="infoForgot"/>
	<InfoDialog :dialog="infoDialog" />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AuthDialog from '@/components/Auth/AuthDialog'
import ForgotDialog from '@/components/Auth/ForgotDialog'
import InfoDialog from '@/components/Auth/InfoDialog'

export default {
	components: {
		AuthDialog,
		ForgotDialog,
		InfoDialog
	},
	data () {
		return {
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
	computed: {
		...mapState('auth', ['user']),
	},
	methods: {
		...mapActions('auth', ['logoutUser']),
		handleAccount () {
			if (!this.user) {
				this.authDialog.visible = true
			}
			else {
				this.$router.push('/profile')
			}
		},
		afterLogin () {
			this.authDialog.visible = false
			this.$router.push('/')
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
		async logout () {
			const logoutSuccess = await this.logoutUser()
			if (logoutSuccess) this.$router.push('/')
		}
	}

}
</script>
