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
						autocomplete
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
					>Отправить запрос</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import { VueRecaptcha } from 'vue-recaptcha'
import { SITE_KEY } from '@/constants'

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
			email: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
				email: helpers.withMessage(errorMessages.email, email)
			}
		}
	},
	methods: {
		...mapActions('auth', ['forgotPassword']),
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
					await this.sendRequest()
				}
				else {
					this.captchaError = 'Подтвердите, что вы не робот'
				}
			}
			else {
				this.getErrorMessage()
			}
		},
		async sendRequest() {
			const success = await this.forgotPassword({ email: this.email })
			if (success) {
				this.$emit('forgot')
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.setError(this.v$.$errors[0].$message)
			}
		},
	}
}
</script>