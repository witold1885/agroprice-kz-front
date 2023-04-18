<template>
	<div class="complete-register">
		<h1 v-if="!registerCompleted" class="complete-register__title heading-1">Завершите регистрацию</h1>
		<h1 v-else class="complete-register__title heading-1">Регистрация завершена</h1>
		<ProfileMenu />
		<form v-if="!registerCompleted" class="complete-register__form d-flex flex-column relative background-lightgrey">
			<div v-if="error" class="complete-register__form-error w-100 absolute">{{ error }}</div>
			<div class="complete-register__form-customer d-flex align-items-end">
				<div class="complete-register__form-customer-name d-flex flex-column">
					<div v-if="profile.type == 'company'" class="complete-register__form-label">
						Название организации<span class="complete-register__form-required color-red">*</span>
					</div>
					<div v-else class="complete-register__form-label">
						Имя<span class="complete-register__form-required color-red">*</span>
					</div>
					<input class="complete-register__form-field background-white border-none color-black" v-model="v$.profile.fullname.$model" autocomplete />
				</div>
				<div class="complete-register__form-customer-type d-flex align-items-center">
					<div class="complete-register__form-customer-type-item d-flex align-items-center">
						<div class="complete-register__form-customer-type-item-switch d-flex justify-content-center align-items-center relative background-white">
							<input class="w-0 h-0 absolute" type="radio" id="private" value="private" v-model="profile.type" />
							<img :src="require('@/assets/images/ok.png')" />
						</div>
						<label for="private">Частное лицо</label>
					</div>
					<div class="complete-register__form-customer-type-item d-flex align-items-center">
						<div class="complete-register__form-customer-type-item-switch d-flex justify-content-center align-items-center relative background-white">
							<input class="w-0 h-0 absolute" type="radio" id="company" value="company" v-model="profile.type" />
							<img :src="require('@/assets/images/ok.png')" />
						</div>
						<label for="company">Организация</label>
					</div>

				</div>
			</div>
			<div class="complete-register__form-phone d-flex align-items-end">
				<div class="complete-register__form-phone-specify d-flex flex-column">
					<div class="complete-register__form-label">
						Номер телефона<span class="complete-register__form-required color-red">*</span>
					</div>
					<input
						class="complete-register__form-field background-white border-none color-black"
						v-model="v$.profile.phone.$model"
						v-maska
						data-maska="['+7 (7##) ###-##-##']"
						@maska="onPhoneMaska"
						autocomplete
					/>
				</div>
				<!-- <button type="button" class="complete-register__form-phone-submit background-green border-none color-white">Подтвердить</button> -->
			</div>
			<div class="complete-register__form-phone d-flex align-items-end">
				<div class="complete-register__form-phone-specify d-flex flex-column">
					<div class="complete-register__form-label">
						Whatsapp<span class="complete-register__form-required color-red">*</span>
					</div>
					<input
						class="complete-register__form-field background-white border-none color-black"
						v-model="v$.profile.whatsapp.$model"
						v-maska
						data-maska="['+7 (7##) ###-##-##']"
						@maska="onWhatsappMaska"
						autocomplete
					/>
				</div>
				<!-- <button type="button" class="complete-register__form-phone-submit">Подтвердить</button> -->
			</div>
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
						Пароль<span class="complete-register__form-required color-red">*</span>
					</div>
					<input type="password" class="complete-register__form-field background-white border-none color-black" v-model="v$.password.$model" />
				</div>
				<div class="complete-register__form-password-confirm d-flex flex-column">
					<div class="complete-register__form-label">
						Подтверждение пароля<span class="complete-register__form-required color-red">*</span>
					</div>
					<input type="password" class="complete-register__form-field background-white border-none color-black" v-model="v$.password_confirmation.$model" />
				</div>
			</div>
		</form>
		<div v-else class="complete-register__success color-black">Поздравляем! Регистрация на agroprice.kz завершена успешно</div>
		<div v-if="!registerCompleted" class="complete-register__buttons d-flex align-items-center">
			<button class="complete-register__button complete-register__button-save background-green border-none color-white" @click="save">Сохранить</button>
			<button class="complete-register__button complete-register__button-cancel background-transparent border-green color-black">Отмена</button>
		</div>
		<div v-else class="complete-register__buttons d-flex align-items-center">
			<button class="complete-register__button complete-register__button-save background-green border-none color-white" @click="goHome">На главную</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import { vMaska } from "maska"
import ProfileMenu from '@/components/Profile/ProfileMenu'

export default {
	setup () {
		return { v$: useVuelidate() }
	},
	directives: { maska: vMaska },
	components: { ProfileMenu },
	data () {
		return {
			profile: {
				fullname: '',
				type: 'private',
				phone: null,
				whatsapp: null
			},
			email: '',
			password: '',
			password_confirmation: '',
			phoneEntered: false,
			error: null,
			registerCompleted: false,
		}
	},
	validations () {
		return {
			profile: {
				fullname: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Имя'), required),
					minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '2'), minLength(2))
				},
				phone: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Номер телефона'), required),
				},
				whatsapp: {
					required: helpers.withMessage(errorMessages.required.replace(':field', 'Whatsapp'), required),
				},
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
	computed: {
		...mapState('auth', ['user']),
		...mapState('profile', ['error'])
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
		if (this.user) {
			this.email = this.user.email
			this.profile.fullname = this.user.profile.fullname
			this.profile.type = this.user.profile.type
			this.profile.phone = this.user.profile.phone
			this.profile.whatsapp = this.user.profile.whatsapp
			this.registerCompleted = this.user.status !== 'incomplete'
		}
	},
	methods: {
		...mapActions('profile', ['saveProfile']),
		onPhoneMaska (event) {
			this.phoneEntered = event.detail.completed
		},
		onWhatsappMaska (event) {
			this.phoneEntered = event.detail.completed
		},
		async save () {
			this.v$.$validate()
			if (!this.v$.$error) {
				if (this.password !== this.password_confirmation) {
					this.error = errorMessages.sameAsPassword
					return
				}
				const completeSuccess = await this.saveProfile({
					user_id: this.user.id,
					profile: this.profile,
					password: this.password,
					password_confirmation: this.password,
				})
				if (completeSuccess) {
					this.registerCompleted = true
				}
			}
			else {
				this.getErrorMessage()
				return
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.error = this.v$.$errors[0].$message
			}
		},
		goHome () {
			this.$router.push('/')
		}
	}
}
</script>