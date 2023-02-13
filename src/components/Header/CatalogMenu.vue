<template>
	<div
		class="catalog-menu"
	>
		<div
			class="catalog-menu__button d-flex justify-content-between"
			@mouseover="openMenu"
		>
			<!-- <div class="catalog-menu__button-icon"> -->
				<img
					class="catalog-menu__button-icon" :src="require('@/assets/images/menu.png')"
					@mouseover="openMenu"
				/>
			<!-- </div> -->
			<div
				class="catalog-menu__button-title"
				@mouseover="openMenu"
			>
				Каталог товаров
			</div>
		</div>
		<div
			class="catalog-menu__dropdown d-flex"
			v-if="showMenu"
			@mouseleave="closeMenu"
		>
			<div class="catalog-menu__dropdown-top justify-content-between">
				<h1 class="catalog-menu__dropdown-top-title">Каталог товаров</h1>
				<CloseButton
					v-if="showMenu"
					class="catalog-menu__dropdown-top-close"
					@click="closeMenu"
				/>
			</div>
			<div class="catalog-menu__dropdown-categories">
				<a
					v-for="(category, ci) of menuCategories"
					:key="ci"
					class="catalog-menu__dropdown-categories-item d-flex align-items-center"
					@mouseover="selectedCategory = category"
					:href="`/#/catalog/${category.url}`"
				>
					<div class="catalog-menu__dropdown-categories-item-wrap d-flex justify-content-between align-items-center">
						<div class="catalog-menu__dropdown-categories-item-title">{{ category.name }}</div>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-green"
							:src="require('@/assets/images/arrow-right-green.png')"
						/>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-white"
							:src="require('@/assets/images/arrow-right-white.png')"
						/>
					</div>
				</a>
			</div>
			<div 
				v-if="selectedCategory"
				class="catalog-menu__dropdown-subcategories d-flex flex-wrap justify-content-between"
			>
				<div
					v-for="(subcategory, si) of selectedCategory.subcategories"
					:key="si"
					class="catalog-menu__dropdown-subcategories-block d-flex flex-column"
				>
					<a
						class="catalog-menu__dropdown-subcategories-block-title"
						:href="`/#/catalog/${subcategory.url}`"
					>{{ subcategory.name }}</a>
					<div class="catalog-menu__dropdown-subcategories-block-items d-flex flex-column">
						<a
							v-for="(subsubcategory, ssi) of subcategory.subsubcategories"
							:key="ssi"
							class="catalog-menu__dropdown-subcategories-block-item"
							:href="`/#/catalog/${subsubcategory.url}`"
						>
							{{ subsubcategory.name }}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '@/components/Common/CloseButton'

export default {
	components: {
		CloseButton
	},
	data () {
		return {
			showMenu: false,
			selectedCategory: null,
			min: 3,
			max: 5
		}
	},
	computed: {
		...mapState('catalog', ['menuCategories']),
	},
	async mounted () {
		await this.$store.dispatch('catalog/getMenuCategories')
	},
	methods: {
		toggleMenu () {
			if (this.showMenu == false) {
				document.getElementById('app').style.maxHeight = '100vh'
				document.getElementById('app').style.overflow = 'hidden'
				this.showMenu = true
				return
			}
			if (this.showMenu == true) {
				document.getElementById('app').style.maxHeight = 'unset'
				document.getElementById('app').style.overflow = 'unset'
				this.showMenu = false
				return
			}
		},
		openMenu () {
			document.getElementById('app').style.maxHeight = '100vh'
			document.getElementById('app').style.overflow = 'hidden'
			this.showMenu = true
		},
		closeMenu () {
			document.getElementById('app').style.maxHeight = 'unset'
			document.getElementById('app').style.overflow = 'unset'
			this.showMenu = false
		}
	}
}
</script>