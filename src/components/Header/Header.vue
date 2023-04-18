<template>
	<header class="w-100 d-flex flex-column justify-content-between align-items-stretch">
		<div class="header-top d-flex justify-content-between">
			<div class="header-top__left d-flex align-items-center">
				<a href="/" class="header-top__logo">
					<img class="w-100" :src="require('@/assets/images/logo.png')" />
				</a>
				<TopMenu />
			</div>
			<!-- <FavoritesButton class="header__favorites-mobile" border-color="grey"/> -->
			<div class="header-top__buttons d-flex justify-content-end">
				<FavoritesButton
					class="header__favorites-mobile"
					border-color="grey"
				/>
				<AccountBlock />	
				<MobileMenu />	
			</div>
		</div>
		<div class="header-bottom d-flex justify-content-between relative">
			<CatalogMenu />
			<SearchBlock />
			<FavoritesButton
				class="header__favorites"
				border-color="grey"
				@click="goFavorites"
			/>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import TopMenu from './TopMenu'
import AccountBlock from './AccountBlock'
import CatalogMenu from './CatalogMenu'
import SearchBlock from './SearchBlock'
import FavoritesButton from '@/components/Common/FavoritesButton'
import MobileMenu from './MobileMenu'

export default {
	components: { 
		TopMenu,
		AccountBlock,
		CatalogMenu,
		SearchBlock,
		FavoritesButton,
		MobileMenu
	},
	computed: {
		...mapState('auth', ['user']),
	},
	created () {
		window.addEventListener('resize', this.handleResize)
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted () {
		this.getMobileFavoritesShow()
		this.getDesktopFavoritesShow()
	},
	methods: {
		handleResize () {
			this.getMobileFavoritesShow()
			this.getDesktopFavoritesShow()
		},
		getMobileFavoritesShow () {
			const display = this.breakpoint == 'sm' ? 'flex' : 'none'
			let favMobile = document.querySelector('.header__favorites-mobile') 
			favMobile.style.cssText = `display:${display};`
			if (this.breakpoint == 'sm') {
				favMobile.style.cssText += `width:calc(35 * 100vw / 320);height:calc(35 * 100vw / 320);border-radius:calc(5 * 100vw / 320)`
			}
		},
		getDesktopFavoritesShow () {
			const display = this.breakpoint == 'sm' ? 'none' : 'flex'
			let favDesktop = document.querySelector('.header__favorites') 
			favDesktop.style.cssText = `display:${display};`
		},
		goFavorites () {
			if (this.user) {
				this.$router.push('/profile/favorites')
			}
			else {
				this.emitter.emit('auth', this.$route.path)
			}
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/header.scss';
</style>
