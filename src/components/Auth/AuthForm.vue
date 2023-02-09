<template>
	<form
		class="auth-form d-flex flex-column justify-content-between align-items-center"
	>
		<div v-if="error" class="auth-form__error">{{ error }}</div>
		<input
			v-for="(field, index) of fields"
			:key="index"
			:type="field.type"
			class="auth-form__field"
			:placeholder="field.placeholder"
			v-model="v$.form[field.variable].$model"
			:class="{ 'auth-form__field-error': v$.form[field.variable].$error }"
		/>
	</form>
	<div class="auth-dialog__form-submit d-flex flex-column align-items-center">
		<VueRecaptcha
			class="auth-dialog__form-submit-captcha"
			:sitekey="siteKey"
			:load-recaptcha-script="true"
			@verify="captchaSuccess"
			@error="captchaFailed"
		></VueRecaptcha>
		<span v-if="captchaError" class="auth-dialog__form-submit-captcha-error">{{ captchaError }}</span>
		<button
			class="auth-dialog__form-submit-button"
			@click="onSubmit"
		>{{ submitButtonText }}</button>
		<a
			v-if="forgotPasswordLink"
			class="auth-dialog__form-submit-forgot"
			@click="forgotPassword"
		>Забыли пароль?</a>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { useCookies } from 'vue3-cookies'
// import AuthService from "@/services/AuthService"
// import errorMessages from './errorMessages'
import axios from 'axios'
import { VueRecaptcha } from 'vue-recaptcha'
import { API_URL, SITE_KEY } from '@/store/constants'

export default {
	setup () {
		const { cookies } = useCookies()
		return { v$: useVuelidate(), cookies }
	},
	props: {
		action: {
			type: String,
			default: 'login'
		},
		fields: {
			type: Array,
			default: () => []
		},
		values: {
			type: Object,
			default: () => {}
		},
		rules: {
			type: Object,
			default: () => {}
		},
		submitButtonText: {
			type: String,
			default: ''
		},
		forgotPasswordLink: {
			type: Boolean,
			default: false
		},
		resetToken: {
			type: String,
			default: null
		}
	},
	components: { VueRecaptcha },
	data () {
		return {
			form: this.values,
			error: null,
			captchaVerified: false,
			captchaError: null
		}
	},
	computed: {
		siteKey () {
			return SITE_KEY
		}
	},
	validations () {
		return {
			form: this.rules,
		}
	},
	mounted () {

	},
	methods: {
		captchaSuccess () {
			this.captchaVerified = true
		},
		captchaFailed (response) {
			console.log(response)
		},
		async onSubmit () {
			this.error = null
			this.captchaError = null
			this.v$.$validate()
			if (!this.v$.$error) {
				if (this.captchaVerified) {
					console.log(this.action)
					await this[this.action]()
				}
				else {
					this.captchaError = 'Подтвердите, что вы не робот'
				}
			}
			else {
				this.getErrorMessage()
			}
		},
		async login() {
			let response = await axios.post(API_URL + '/login', this.form)
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка авторизации. Попробуйте позже'
				})
			// console.log(response.data)
			if (response.data.success) {
				this.handleResponse(response.data, 'login')
			}
			else {
				console.log(response.data.error)
				this.error = response.data.error
			}
		},
		async register () {
			const name = this.generateId()
			const password = this.generateString(16)
			const payload = {
				...this.form,
				...{ name, password, password_confirmation: password }
			}
			let response = await axios.post(API_URL + '/register', payload)
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка регистрации. Попробуйте позже'
				})
			// console.log(response)
			if (response.data.success) {
				this.handleResponse(response.data, 'register')
			}
			else {
				console.log(response.data.error)
				this.error = response.data.error
			}
		},
		async reset () {
			if (!this.resetToken) {
				this.error = 'Не указан ключ'
				return
			}
			const payload = { ...this.form, ...{ token: this.resetToken } }
			let response = await axios.post(API_URL + '/password/change', payload)
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка восстановления пароля. Попробуйте позже'
				})
			// console.log(response)
			if (response.data.success) {
				this.$emit('reset')
			}
			else {
				console.log(response.data.error)
				this.error = response.data.error
			}

		},
		handleResponse (data, responseType) {
			console.log(`${responseType} success`)
			this.cookies.set('access_token', data.access_token)
			this.$user = data.user
			this.$emit(responseType)
		},
		forgotPassword () {
			this.$emit('forgot')
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.error = this.v$.$errors[0].$message
			}
		},
		generateId () {
			const min = 100001;
			const max = 999999;
			return String(Math.floor(Math.random() * (max - min + 1)) + min)
		},
		generateString (length) {
			let result = ''
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
			let counter = 0
			while (counter < length) {
				result += characters.charAt(Math.floor(Math.random() * characters.length))
				counter += 1
			}
			return result
		}
	}
}
</script>