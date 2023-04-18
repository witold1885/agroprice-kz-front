<template>
	<footer class="footer w-100 background-lightgrey">
		<div class="footer__wrap h-100 d-flex">
			<div class="footer__left d-flex">
				<div class="footer__info d-flex flex-column">
					<a href="/" class="footer__logo">
						<img class="w-100 h-100" :src="require('@/assets/images/logo.png')" />
					</a>
					<div class="footer__socials d-flex">
						<a
							v-for="(soc, index) of socials"
							:key="index"
							class="footer__socials-button d-flex justify-content-center align-items-center background-green"
						>
							<img class="footer__socials-button-icon" :src="require(`@/assets/images/socials/${soc.name}-${breakpoint}.png`)">
						</a>
					</div>
					<div class="footer__contacts d-flex flex-column">
						<div class="footer__contacts-location d-flex">
							<img class="footer__contacts-location-icon" :src="require('@/assets/images/location.png')" />
							<span class="footer__contacts-location-value">
								г. Астана, ул. Сыганак 29, оф. н.п. 5
							</span>
						</div>
						<!-- <div class="footer__contacts-phone d-flex align-items-center">
							<img class="footer__contacts-phone-icon" :src="require('@/assets/images/phone.png')" />
							<span class="footer__contacts-phone-value">
								+7 (707) 400-11-31
							</span>
						</div> -->
					</div>
					<div class="footer__copyright">© 2022 «Agroprice»</div>
				</div>
				<div class="footer__account footer__account-mobile flex-column">
					<div class="footer__account-title color-black">Моя учетная запись</div>
					<div class="footer__account-buttons d-flex">
						<button class="footer__account-button footer__account-button-signin background-green border-none color-white" @click="login">Войти</button>
						<button class="footer__account-button footer__account-button-signup background-transparent border-green color-black" @click="register">Зарегистрироваться</button>
					</div>
				</div>
				<div class="footer__nav d-flex">
					<div
						v-for="(navItem, index) of navItems"
						:key="index"
						class="footer__nav-item d-flex flex-column"
					>
						<div class="footer__nav-item-title color-black">{{ navItem.title }}</div>
						<div class="footer__nav-item-list d-flex flex-column">
							<a
								v-for="(item, index) of navItem.items"
								:key="index"
								:href="item.link"
							>{{ item.title }}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="footer__right d-flex">
				<div class="footer__account footer__account-desktop flex-column">
					<div class="footer__account-title color-black">Моя учетная запись</div>
					<div class="footer__account-buttons d-flex">
						<button class="footer__account-button footer__account-button-signin background-green border-none color-white" @click="login">Войти</button>
						<button class="footer__account-button footer__account-button-signup background-transparent border-green color-black" @click="register">Зарегистрироваться</button>
					</div>
				</div>
				<div class="footer__payments d-flex flex-column">
					<div class="footer__payments-info">Платежи осуществляются с помощью:</div>
					<div class="footer__payments-cards d-flex">
						<img
							v-for="(card, index) of cards"
							:key="index"
							class="footer__payments-card"
							:src="require(`@/assets/images/${card}.png`)"
						/>
					</div>
				</div>
			</div>
			<div class="footer__copyright-mobile">© 2022 «Agroprice»</div>
		</div>
	</footer>
</template>

<script>
// import TopMenu from './TopMenu'
// import AccountBlock from './AccountBlock'
// import CatalogMenu from './CatalogMenu'
// import SearchBlock from './SearchBlock'
// import FavoritesButton from '@/components/Common/FavoritesButton'

export default {
	components: {
	},
	data () {
		return {
			socials: [
				{ name: 'facebook' },
				{ name: 'telegram' },
				{ name: 'whatsapp' },
				{ name: 'instagram' },
			],
			cards: ['mastercard', 'visa'],
			navItems: [
				{
					title: 'Компания',
					items: [
						{ title: 'О сервисе', link: null },
						{ title: 'Вакансии', link: null },
						{ title: 'Контакты', link: null },
					]
				},
				{
					title: 'Услуги',
					items: [
						{ title: 'Размещение объявления', link: null },
						{ title: 'Баннерное размещение', link: null },
					]
				},
				{
					title: 'Документы',
					items: [
						{ title: 'Правила размещения информации', link: '/doc/rules-for-posting-information' },
						{ title: 'Политика конфиденциальности', link: '/doc/privacy-policy' },
						{ title: 'Пользовательское соглашение', link: '/doc/terms-of-use' },
					]
				},
			]
		}
	},
	methods: {
		login () {
			this.emitter.emit('auth', this.$route.path)
		},
		register () {
			this.emitter.emit('reg', this.$route.path)
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/footer.scss';
</style>
