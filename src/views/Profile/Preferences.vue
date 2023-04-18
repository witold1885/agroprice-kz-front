<template>
	<div class="preferences">
		<h1 v-if="!preferencesSaved" class="preferences__title heading-1">Настройки</h1>
		<h1 v-else class="preferences__title heading-1">Настройки сохранены</h1>
		<ProfileMenu />
		<div v-if="!preferencesSaved" class="preferences__form d-flex relative background-lightgrey">
			<div class="preferences__form-avatar justify-content-center align-items-center">
				<div class="preferences__form-avatar-wrap d-flex justify-content-center align-items-center">
					<img class="preferences__form-avatar-icon" :src="require('@/assets/images/user.png')" />
				</div>
			</div>
			<div class="preferences__form-columns d-flex">
				<div class="preferences__form-column d-flex flex-column">
					<div
						v-for="(field, index) of fields"
						:key="index"
						class="preferences__form-field d-flex flex-column"
					>
						<div class="preferences__form-field-label">{{ field.label }}</div>
						<div v-if="!field.edit" class="preferences__form-field-value color-black">
							{{ field.value || 'не указано' }}
							<img
								class="preferences__form-field-value-edit"
								:src="require('@/assets/images/edit.png')"
								@click="editField(index)"
							/>
						</div>
						<div v-else>
							<input
								v-if="index == 'phone'"
								class="preferences__form-field-input background-white border-none color-black"
								v-model="field.value"
								@keyup.native.enter="onFieldEdited($event, index)"
								v-maska
								data-maska="['+7 (7##) ###-##-##']"
								@maska="onMaska"
							/>
							<input
								v-else
								class="preferences__form-field-input background-white border-none color-black"
								v-model="field.value"
								@keyup.native.enter="onFieldEdited($event, index)"
							/>
						</div>
					</div>
				</div>
				<div class="preferences__form-column d-flex flex-column">
					<div class="preferences__form-field d-flex flex-column">
						<div class="preferences__form-field-label">{{ birthdate.label }}</div>
						<div v-show="!birthdate.edit" class="preferences__form-field-value color-black">
							{{ birthdate.value || 'не указано' }}
							<img
								class="preferences__form-field-value-edit"
								:src="require('@/assets/images/edit.png')"
								@click="editBirthdate"
							/>
						</div>
						<Datepicker
							v-show="birthdate.edit"
							class="preferences__form-field-input background-white border-none color-black"
							v-model="pickedDate"
							:locale="locale"
							inputFormat="dd.MM.yyyy"
						/>
					</div>
					<div class="preferences__form-field d-flex flex-column">
						<div class="preferences__form-field-label">{{ gender.label }}</div>
						<div v-if="!gender.edit" class="preferences__form-field-value color-black">
							{{ gender.value }}
							<img
								class="preferences__form-field-value-edit"
								:src="require('@/assets/images/edit.png')"
								@click="editGender"
							/>
						</div>
						<select
							v-else
							class="preferences__form-field-input background-white border-none color-black"
							v-model="gender.value"
							@change="gender.edit = false"
						>
							<option value="не указано">не указано</option>
							<option value="Мужской">Мужской</option>
							<option value="Женский">Женский</option>
						</select>
					</div>
				</div>
			</div>
			<span v-if="error || validateError" class="preferences__form-error w-100 absolute color-red">{{ error || validateError }}</span>
		</div>
		<div v-if="!preferencesSaved" class="preferences__buttons d-flex align-items-center">
			<button class="preferences__button preferences__button-save background-green border-none color-white" @click="saveProfile">Сохранить</button>
			<button class="preferences__button preferences__button-cancel background-transparent border-green color-black">Отмена</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProfileMenu from '@/components/Profile/ProfileMenu'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'
import Datepicker from 'vue3-datepicker'
import { ru } from 'date-fns/locale'
import { ref } from 'vue'
import { vMaska } from "maska"

export default {
	setup () {
		const pickedDate = ref(new Date())
		const locale = ru
		return { v$: useVuelidate(), pickedDate, locale }
	},
	directives: { maska: vMaska },
	components: { ProfileMenu, Datepicker },
	data () {
		return {
			profile: {
				fullname: '',
				phone: null
			},
			email: '',
			fields: {
				fullname: {
					label: 'ФИО',
					value: '',
					edit: false
				},
				email: {
					label: 'E-mail',
					value: '',
					edit: false
				},
				phone: {
					label: 'Телефон',
					value: null,
					edit: false
				},
			},
			phoneEntered: true,
			birthdate: {
				label: 'Дата рождения',
				value: null,
				edit: false
			},
			gender: {
				label: 'Пол',
				value: 'не указано',
				edit: false
			},
			validateError: null,
			preferencesSaved: false
		}
	},
	validations () {
		return {
			fields: {
				fullname: {
					value: {
						required: helpers.withMessage(errorMessages.required.replace(':field', 'ФИО'), required),
						minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '2'), minLength(2))
					}
				},
				email: {
					value: {
						required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
						email: helpers.withMessage(errorMessages.email, email)
					}
				},
				phone: {
					value: {
						required: helpers.withMessage(errorMessages.required.replace(':field', 'Телефон'), required)
					}
				}
			}
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapState('profile', ['error'])
	},
	watch: {
		pickedDate (newValue) {
			this.birthdate.value = this.formatDate(newValue)
			this.birthdate.edit = false
		}
	},
	async mounted () {
		await this.$store.dispatch('auth/getUser')
		if (this.user) {
			this.fields.email.value = this.user.email
			this.fields.fullname.value = this.user.profile.fullname
			this.fields.phone.value = this.user.profile.phone
			this.birthdate.value = this.user.profile.birthdate
			this.gender.value = this.user.profile.gender || 'не указано'
		}
		else {
			this.emitter.emit('auth', this.$route.path)
		}
	},
	methods: {
		...mapActions('profile', ['updateProfile']),
		editField (field) {
			this.fields[field].edit = true
		},
		onFieldEdited (e, field) {
			this.fields[field].edit = false
		},
		onMaska (event) {
			this.phoneEntered = event.detail.completed
		},
		editBirthdate () {
			this.birthdate.edit = true
		},
		editGender () {
			this.gender.edit = true
		},
		async saveProfile () {
			this.v$.$validate()
			if (this.v$.$error) {
				this.getErrorMessage()
				return
			}
			if (this.fields.phone.value && !this.phoneEntered) {
				this.validateError = errorMessages.phone
				return
			}
			let payload = { user_id: this.user.id }
			for (let field in this.fields) {
				payload[field] = this.fields[field].value
			}
			payload.birthdate = this.birthdate.value
			payload.gender = this.gender.value
			console.log(payload)
			const saveSuccess = await this.updateProfile(payload)
			if (saveSuccess) {
				await this.$store.dispatch('auth/getUser')
				this.preferencesSaved = true
			}
		},
		getErrorMessage () {
			if (this.v$.$errors.length != 0) {
				this.validateError = this.v$.$errors[0].$message
			}
		},
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : '0' + month
			let day = date.getDate()
			day = day >= 10 ? day : '0' + day
			return `${day}.${month}.${year}`
		}
	}
}
</script>
