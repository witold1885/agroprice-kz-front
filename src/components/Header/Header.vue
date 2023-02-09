<template>
	<header class="d-flex flex-column justify-content-between align-items-stretch">
		<div class="header-top d-flex justify-content-between">
			<div class="header-top__left d-flex align-items-center">
				<a href="/" class="header-top__logo">
					<img :src="require('@/assets/images/logo.png')" />
				</a>
				<TopMenu />
			</div>
			<!-- <FavoritesButton class="header__favorites-mobile" border-color="grey"/> -->
			<div class="header-top__buttons d-flex justify-content-end">
				<FavoritesButton class="header__favorites-mobile" border-color="grey"/>
				<AccountBlock />	
				<MobileMenu />	
			</div>
		</div>
		<div class="header-bottom d-flex justify-content-between">
			<CatalogMenu />
			<SearchBlock />
			<FavoritesButton class="header__favorites" border-color="grey"/>
		</div>
	</header>
</template>

<script>
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
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/header.scss';
</style>
