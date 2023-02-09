<template>
	<div
		v-if="dialog.visible"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center"
	>
		<div
			class="forgot-dialog"
		>
			<img 
				class="auth-dialog__close"
				:src="require('@/assets/images/dialog-close.png')"
				@click="dialog.visible = false"
			/>
			<div class="forgot-dialog__title">Забыли пароль</div>
			<div class="auth-dialog__form d-flex flex-column justify-content-between align-items-center">
				<form
					class="auth-form d-flex flex-column justify-content-between align-items-center"
				>
					<div v-if="error" class="auth-form__error">{{ error }}</div>
					<input
						type="email"
						class="auth-form__field"
						placeholder="E-mail"
						v-model="v$.email.$model"
						:class="{ 'auth-form__field-error': v$.email.$error }"
					/>
				</form>
				<div class="auth-dialog__form-submit d-flex flex-column align-items-center">
					<VueRecaptcha
						class="auth-dialog__form-submit-captcha"
						:sitekey="siteKey"
						:load-recaptcha-script="true"
						@verify="captchaSuccess"
						@error="captchaError"
					></VueRecaptcha>
					<button
						class="auth-dialog__form-submit-button"
						@click="onSubmit"
					>Отправить запрос</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import axios from 'axios'
import { VueRecaptcha } from 'vue-recaptcha'
import { API_URL, SITE_KEY } from '@/store/constants'

export default {
	setup () {
		return { v$: useVuelidate() }
	},
	props: {
		dialog: {
			visible: {
				type: Boolean,
				default: false
			}
		}
	},
	components: { VueRecaptcha },
	data () {
		return {
			email: '',
			error: null,
			captchaVerified: false
		}
	},
	computed: {
		siteKey () {
			return SITE_KEY
		}
	},
	validations () {
		return {
			email: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
				email: helpers.withMessage(errorMessages.email, email)
			}
		}
	},
	methods: {
		captchaSuccess () {
			this.captchaVerified = true
		},
		captchaError (response) {
			console.log(response)
		},
		async onSubmit () {
			this.v$.$validate()
			if (!this.v$.$error) {
				if (this.captchaVerified) {
					await this.sendRequest()
				}
				else {
					this.error = 'Подтвердите капчу'
				}
			}
			else {
				this.getErrorMessage()
			}
		},
		async sendRequest() {
			let response = await axios.post(API_URL + '/password/forgot', { email: this.email })
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка отправки запроса. Попробуйте позже'
				})
			console.log(response.data)
			if (response.data.success) {
				this.$emit('forgot')
			}
			else {
				console.log(response.data.error)
				this.error = response.data.error
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.error = this.v$.$errors[0].$message
			}
		},
	}
}
</script>