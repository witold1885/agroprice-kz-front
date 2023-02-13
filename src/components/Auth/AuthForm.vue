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
import { mapState, mapActions, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { VueRecaptcha } from 'vue-recaptcha'
import { SITE_KEY } from '@/constants'

export default {
	setup () {
		return { v$: useVuelidate() }
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
			captchaVerified: false,
			captchaError: null
		}
	},
	computed: {
		...mapState('auth', ['error']),
		siteKey () {
			return SITE_KEY
		}
	},
	validations () {
		return {
			form: this.rules,
		}
	},
	methods: {
		...mapActions('auth', ['loginUser', 'registerUser', 'resetPassword']),
		...mapMutations('auth', ['setError']),
		captchaSuccess () {
			this.captchaVerified = true
		},
		captchaFailed (response) {
			console.log(response)
		},
		async onSubmit () {
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
			const loginSuccess = await this.loginUser(this.form)
			if (loginSuccess) this.$emit('login')
		},
		async register () {
			const name = this.generateId()
			const password = this.generateString(16)
			const payload = {
				...this.form,
				...{ name, password, password_confirmation: password }
			}
			const registerSuccess = await this.registerUser(payload)
			if (registerSuccess) this.$emit('register')
		},
		async reset () {
			const payload = { ...this.form, ...{ token: this.resetToken } }
			const resetSuccess = await this.resetPassword(payload)
			if (resetSuccess) this.$emit('reset')
		},
		forgotPassword () {
			this.$emit('forgot')
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.setError(this.v$.$errors[0].$message)
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