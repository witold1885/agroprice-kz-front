<template>
	<div class="complete-register">
		<h1 class="complete-register__title">Завершите регистрацию</h1>
		<form class="complete-register__form d-flex flex-column">
			<div v-if="error" class="complete-register__form-error">{{ error }}</div>
			<div class="complete-register__form-customer d-flex align-items-end">
				<div class="complete-register__form-customer-name d-flex flex-column">
					<div v-if="profile.type == 'company'" class="complete-register__form-label">
						Название организации<span class="complete-register__form-required">*</span>
					</div>
					<div v-else class="complete-register__form-label">
						Имя<span class="complete-register__form-required">*</span>
					</div>
					<input class="complete-register__form-field" v-model="v$.profile.name.$model" autocomplete />
				</div>
				<div class="complete-register__form-customer-type d-flex align-items-center">
					<div class="complete-register__form-customer-type-item d-flex align-items-center">
						<div class="complete-register__form-customer-type-item-switch d-flex justify-content-center align-items-center">
							<input type="radio" id="private" value="private" v-model="profile.type" />
							<img :src="require('@/assets/images/ok.png')" />
						</div>
						<label for="private">Частное лицо</label>
					</div>
					<div class="complete-register__form-customer-type-item d-flex align-items-center">
						<div class="complete-register__form-customer-type-item-switch d-flex justify-content-center align-items-center">
							<input type="radio" id="company" value="company" v-model="profile.type" />
							<img :src="require('@/assets/images/ok.png')" />
						</div>
						<label for="company">Организация</label>
					</div>

				</div>
			</div>
			<!-- <div class="complete-register__form-phone d-flex align-items-end">
				<div class="complete-register__form-phone-specify d-flex flex-column">
					<div class="complete-register__form-label">
						Номер телефона<span class="complete-register__form-required">*</span>
					</div>
					<input class="complete-register__form-field" placeholder="+7 (7__) ___ -___-__" v-model="v$.profile.phone.$model" autocomplete />					
				</div>
				<button type="button" class="complete-register__form-phone-submit">Подтвердить</button>
			</div> -->
			<div class="complete-register__form-email d-flex align-items-end">
				<div class="complete-register__form-email-specified d-flex flex-column">
					<div class="complete-register__form-label complete-register__form-label-disabled">
						Почта
					</div>
					<div class="complete-register__form-email-specified-value">{{ email }}</div>					
				</div>
			</div>
			<div class="complete-register__form-password d-flex align-items-end">
				<div class="complete-register__form-password-specify d-flex flex-column">
					<div class="complete-register__form-label">
						Пароль<span class="complete-register__form-required">*</span>
					</div>
					<input type="password" class="complete-register__form-field" v-model="v$.password.$model" />
				</div>
				<div class="complete-register__form-password-confirm d-flex flex-column">
					<div class="complete-register__form-label">
						Подтверждение пароля<span class="complete-register__form-required">*</span>
					</div>
					<input type="password" class="complete-register__form-field" v-model="v$.password_confirmation.$model" />
				</div>
			</div>
			<div v-if="successMessage" class="complete-register__form-success">{{ successMessage }}</div>
		</form>
		<div class="complete-register__buttons d-flex align-items-center">
			<button class="complete-register__button complete-register__button-save" @click="saveProfile">Сохранить</button>
			<button class="complete-register__button complete-register__button-cancel">Отмена</button>
		</div>
	</div>
</template>

<script>
import { useCookies } from "vue3-cookies"
import axios from "axios";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import { API_URL } from '@/store/constants'

export default {
	setup () {
		const { cookies } = useCookies()
		return { v$: useVuelidate(), cookies }
	},
	data () {
		return {
			profile: {
				name: '',
				type: 'private',
				phone: null
			},
			email: '',
			password: '',
			password_confirmation: '',
			error: null,
			successMessage: null
		}
	},
	validations () {
		return {
			profile: {
				name: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Имя'), required),
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '2'), minLength(2))
				},
				/*phone: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Номер телефона'), required),
				},*/
			},
			password: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'Пароль'), required),
				minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '8'), minLength(8))
			},
			password_confirmation: {
				required: helpers.withMessage(errorMessages.required.replace(':field', 'Подтверждение пароля'), required)
			}
		}
	},
	async mounted () {
		let access_token = this.cookies.get("access_token")
		if (access_token) {
			this.$user = await this.getUser(access_token)
			this.email = this.$user.email
			this.profile.name = this.$user.profile.name
			this.profile.type = this.$user.profile.type
			this.profile.phone = this.$user.profile.phone
		}
	},
	methods: {
		async saveProfile () {
			this.error = null
			this.successMessage = null
			this.v$.$validate()
			if (!this.v$.$error) {
				if (this.password !== this.password_confirmation) {
					this.error = errorMessages.sameAsPassword
					return
				}
				let response = await axios.post(API_URL + '/complete', {
					user_id: this.$user.id,
					profile: this.profile,
					password: this.password,
					password_confirmation: this.password,
				})
				.catch((error) => {
					console.log(error)
					this.error = 'Ошибка сохранения профиля. Попробуйте позже'
				})
				if (response.data.success) {
					this.successMessage = 'Регистрация успешно завершена'
					window.location.reload(true)
				}
				else {
					console.log(response.data.error)
					this.error = response.data.error
				}
			}
			else {
				this.getErrorMessage()
				return
			}
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
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.error = this.v$.$errors[0].$message
			}
		}
	}
}
</script>