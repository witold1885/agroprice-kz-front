<template>
	<div
		v-if="dialog.visible"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center"
	>
		<div
			class="contact-dialog"
		>
			<img 
				class="auth-dialog__close"
				:src="require('@/assets/images/dialog-close.png')"
				@click="closeDialog"
			/>
			<div class="contact-dialog__title">Обратная связь</div>
			<div class="auth-dialog__form contact-dialog__form d-flex flex-column justify-content-between align-items-center">
				<form
					class="auth-form d-flex flex-column justify-content-between align-items-center"
				>
					<div v-if="error" class="auth-form__error">{{ error }}</div>
					<input
						type="text"
						class="auth-form__field"
						placeholder="Тема письма"
						v-model="v$.subject.$model"
						:class="{ 'auth-form__field-error': v$.subject.$error }"
						autocomplete
					/>
					<input
						type="email"
						class="auth-form__field"
						placeholder="Ваша почта"
						v-model="v$.email.$model"
						:class="{ 'auth-form__field-error': v$.email.$error }"
						autocomplete
					/>
					<textarea
						class=" contact-dialog__form-textarea"
						placeholder="Текст письма"
						v-model="v$.message.$model"
						:class="{ 'create-product__form-textarea-error': v$.message.$error }"
					></textarea>
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
			subject: '',
			email: '',
			message: '',
			captchaVerified: false,
			captchaError: null
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapState('info', ['error']),
		siteKey () {
			return SITE_KEY
		}
	},
	validations () {
		return {
			subject: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'Тема письма'), required)
			},
			email: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'Ваша почта'), required),
				email: helpers.withMessage(errorMessages.email, email)
			},
			message: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'Текст письма'), required)
			}
		}
	},
	methods: {
		...mapActions('info', ['sendFeedback']),
		...mapMutations('info', ['setError']),
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
			const success = await this.sendFeedback({
				user_id: this.user ? this.user.id : null,
				subject: this.subject,
				email: this.email,
				message: this.message
			})
			if (success) {
				this.$emit('sent')
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.setError(this.v$.$errors[0].$message)
			}
		},
		closeDialog () {
			this.$emit('closed')
		}
	}
}
</script>