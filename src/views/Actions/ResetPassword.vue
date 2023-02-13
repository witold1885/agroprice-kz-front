<template>
	<div v-if="token" class="reset-password">		
		<h1 v-if="!reseted" class="auth-dialog__title">Восстановление пароля</h1>
		<h1 v-else class="auth-dialog__title">Пароль изменен</h1>
		<div v-if="!reseted" class="auth-dialog__form d-flex flex-column justify-content-between align-items-center">
			<AuthForm
				action="reset"
				:fields="fields"
				:values="values"
				:rules="rules"
				:resetToken="token"
				:submit-button-text="submitButtonText"
				@reset="onReseted"
			/>
		</div>
		<div v-else class="d-flex flex-column justify-content-center align-items-center">
			<div class="complete-register__success">Пароль на agroprice.kz успешно изменен</div>
			<div class="complete-register__buttons d-flex align-items-center">
				<button class="complete-register__button complete-register__button-save" @click="goHome">На главную</button>
			</div>
		</div>
	</div>
	<div v-if="!token" class="reset-password__error">	
		<h1 class="auth-dialog__title">Восстановление пароля</h1>
		<div class="d-flex flex-column justify-content-center align-items-center">
			<div class="complete-register__success">Ошибка! Ключ для восстановления пароля не найден</div>
			<div class="complete-register__buttons d-flex align-items-center">
				<button class="complete-register__button complete-register__button-save" @click="goHome">На главную</button>
			</div>		
		</div>		
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import errorMessages from '@/components/Auth/errorMessages'
import AuthForm from '@/components/Auth/AuthForm'

export default {
	data () {
		return {
			token: null,
			fields: [
				{
					type: 'email',
					variable: 'email',
					placeholder: 'E-mail'
				},
				{
					type: 'password',
					variable: 'password',
					placeholder: 'Пароль'
				},
				{
					type: 'password',
					variable: 'password_confirmation',
					placeholder: 'Подтверждение пароля'
				}
			],
			values: {
				email: '',
				password: '',
				password_confirmation: ''
			},
			rules: {
				email: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
					email: helpers.withMessage(errorMessages.email, email)
				},
				password: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Пароль'), required),
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '8'), minLength(8))
				},
				password_confirmation: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Подтверждение пароля'), required)
				}
			},
			submitButtonText: 'Сохранить',
			reseted: false
		}
	},
	components: { AuthForm },
	async mounted () {
		if (this.$route.params) {
			this.token = this.$route.params.token
			const checkTokenSuccess = await this.checkResetPassword(this.token)
			if (!checkTokenSuccess) {
				this.token = null
			}
		}
	},
	methods: {
		...mapActions('auth', ['checkResetPassword']),
		onReseted () {
			this.reseted = true
		},
		goHome () {
			this.$router.push('/')
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/profile.scss';
</style>
