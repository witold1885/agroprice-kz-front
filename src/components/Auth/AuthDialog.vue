<template>
	<div
		v-if="activeTab && dialog.visible"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center fixed"
	>
		<div
			class="auth-dialog background-white"
			:class="`auth-dialog-${activeTab.name}`"
		>
			<div class="auth-dialog__top w-100 d-flex justify-content-center align-items-end">
				<img 
					class="auth-dialog__close absolute"
					:src="require('@/assets/images/dialog-close.png')"
					@click="dialog.visible = false"
				/>
				<div class="auth-dialog__tabs d-flex justify-content-between">
					<div
						v-for="(tab, index) of tabs"
						:key="index"
						class="auth-dialog__tabs-item d-flex justify-content-center"
						:class="{ 'auth-dialog__tabs-item-active color-black': tab.active }"
						@click="selectTab(tab.name)"
					>{{ tab.tabText }}</div>
				</div>
			</div>
			<div class="auth-dialog__title heading-1">{{ activeTab.title }}</div>
			<div class="auth-dialog__form d-flex flex-column justify-content-between align-items-center">
				<AuthForm
					:action="activeTab.name"
					:fields="activeTab.fields"
					:values="activeTab.values"
					:rules="activeTab.rules"
					:submit-button-text="activeTab.submitButtonText"
					:forgot-password-link="activeTab.forgotPasswordLink"
					@login="emitEvent('login')"
					@register="emitEvent('register')"
					@forgot="emitEvent('forgot')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import AuthForm from './AuthForm'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import errorMessages from './errorMessages'

export default {
	props: {
		dialog: {
			visible: {
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: 'login'
			}
		}
	},
	components: { AuthForm },
	data () {
		return {
			tabs: [
				{
					name: 'login',
					tabText: 'Войти',
					title: 'Выполнить вход',
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
						}
					],
					values: {
						email: '',
						password: ''
					},
					rules: {
						email: {
							required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
							email: helpers.withMessage(errorMessages.email, email)
						},
						password: {
							required: helpers.withMessage(errorMessages.required.replace(':field', 'Пароль'), required),
							minLength: helpers.withMessage(errorMessages.minLength.replace(':length', '8'), minLength(8))
						}
					},
					submitButtonText: 'Войти',
					active: false,
					forgotPasswordLink: true
				},
				{
					name: 'register',
					tabText: 'Регистрация',
					title: 'Регистрация',
					fields: [
						{
							type: 'email',
							variable: 'email',
							placeholder: 'E-mail'
						},
					],
					values: {
						email: ''
					},
					rules: {
						email: {
							required: helpers.withMessage(errorMessages.required.replace(':field', 'E-mail'), required),
							email: helpers.withMessage(errorMessages.email, email)
						}
					},
					submitButtonText: 'Зарегистрироваться',
					active: false,
					forgotPasswordLink: false
				},
			],
			activeTab: null
		}
	},
	watch: {
		'dialog.name' () {
			this.selectTab(this.dialog.name)
		}
	},
	mounted () {
		this.selectTab(this.dialog.name)
	},
	methods: {
		selectTab (name) {
			this.tabs.forEach(tab => {
				if (tab.name == name) {
					tab.active = true
					this.activeTab = tab
					this.dialog.name = name
				}
				else tab.active = false
			})
		},
		emitEvent (event) {
			this.$emit(event)
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/auth.scss';
</style>
