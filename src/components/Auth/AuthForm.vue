<template>
	<form
		class="auth-form d-flex flex-column justify-content-between align-items-center"
	>
		<!-- <component
			v-for="(field, index) of fields"
			:key="index"
			:is="`input-${field.type}`"
		></component> -->
		<div v-if="error" class="auth-form__error">{{ error }}</div>
		<input
			v-for="(field, index) of fields"
			:key="index"
			:type="field.type"
			class="auth-form__field"
			:placeholder="field.placeholder"
			v-model="v$.form[field.type].$model"
			:class="{ 'auth-form__field-error': v$.form[field.type].$error }"
		/>
	</form>
	<div class="auth-dialog__form-submit d-flex flex-column align-items-center">
		<!-- <div class="auth-dialog__form-submit-captcha"> -->
			<VueRecaptcha
				class="auth-dialog__form-submit-captcha"
				:sitekey="siteKey"
				:load-recaptcha-script="true"
				@verify="captchaSuccess"
				@error="captchaError"
			></VueRecaptcha>
		<!-- </div> -->
		<button
			class="auth-dialog__form-submit-button"
			@click="onSubmit"
			:disabled="captchaVerified === false"
		>{{ submitButtonText }}</button>
		<a
			v-if="forgotPasswordLink"
			class="auth-dialog__form-submit-forgot"
		>Забыли пароль?</a>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { useCookies } from 'vue3-cookies'
// import AuthService from "@/services/AuthService"
// import errorMessages from './errorMessages'
import axios from 'axios'
import { VueRecaptcha } from 'vue-recaptcha';

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
		}
	},
	components: { VueRecaptcha },
	data () {
		return {
			form: this.values,
			error: null,
			captchaVerified: false
		}
	},
	computed: {
		siteKey () {
			return '6Lf0hWIkAAAAAADV6WvtBvtrEcBxKaPq1rI9cAKJ'
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
		captchaError (response) {
			console.log(response)
		},
		async onSubmit () {
			if (this.captchaVerified) {
				this.v$.$validate()
				if (!this.v$.$error) {
					await this[this.action]()
				}
				else {
					this.getErrorMessage()
				}
			}
		},
		async login() {
			let response = await axios.post('http://localhost:8000/api/login', this.form)
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка авторизации. Попробуйте позже'
				})
			if (response.data.success) {
				this.handleResponse(response.data, 'login')
			}
		},
		async register () {
			this.error = null;
			// let cookies = inject('cookies')
			const name = this.generateId()
			const password = this.generateString(16)
			console.log('password')
			console.log(password)
			const payload = {
				...this.form,
				...{ name, password, password_confirmation: password }
			}
			let response = await axios.post('http://localhost:8000/api/register', payload)
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка регистрации. Попробуйте позже'
				})
			console.log(response)
			if (response.data.success) {
				this.handleResponse(response.data, 'register')
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