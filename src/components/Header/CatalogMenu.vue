<template>
	<div class="catalog-menu">
		<div
			class="catalog-menu__button d-flex justify-content-between"
			@click="toggleMenu"
		>
			<!-- <div class="catalog-menu__button-icon"> -->
				<img class="catalog-menu__button-icon" :src="require('@/assets/images/menu.png')" />
			<!-- </div> -->
			<div class="catalog-menu__button-title">
				Каталог товаров
			</div>
		</div>
		<div
			class="catalog-menu__dropdown d-flex"
			v-if="showMenu"
		>
			<div class="catalog-menu__dropdown-top justify-content-between">
				<h1 class="catalog-menu__dropdown-top-title">Каталог товаров</h1>
				<CloseButton
					v-if="showMenu"
					class="catalog-menu__dropdown-top-close"
					@click="toggleMenu"
				/>
			</div>
			<div class="catalog-menu__dropdown-categories">
				<div
					v-for="(category, index) of menuCategories"
					:key="index"
					class="catalog-menu__dropdown-categories-item d-flex align-items-center"
					@mouseover="selectedCategory = category.title"
				>
					<div class="catalog-menu__dropdown-categories-item-wrap d-flex justify-content-between align-items-center">
						<div class="catalog-menu__dropdown-categories-item-title">{{ category.title }}</div>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-green"
							:src="require('@/assets/images/arrow-right-green.png')"
						/>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-white"
							:src="require('@/assets/images/arrow-right-white.png')"
						/>
					</div>
				</div>
			</div>
			<div 
				v-if="selectedCategory"
				class="catalog-menu__dropdown-subcategories d-flex flex-wrap justify-content-between"
			>
				<div
					v-for="(b, index) in 9"
					:key="index"
					class="catalog-menu__dropdown-subcategories-block d-flex flex-column"
				>
					<a class="catalog-menu__dropdown-subcategories-block-title">{{ selectedCategory }}</a>
					<div class="catalog-menu__dropdown-subcategories-block-items d-flex flex-column">
						<a
							v-for="(i, index) in getRandomCount()"
							:key="index"
							class="catalog-menu__dropdown-subcategories-block-item"
						>
							Заголовок номер 1
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import categories from '../Catalog/categories'
import CloseButton from '@/components/Common/CloseButton'

export default {
	components: {
		CloseButton
	},
	data () {
		return {
			menuCategories: categories,
			showMenu: false,
			selectedCategory: null,
			min: 3,
			max: 5
		}
	},
	methods: {
		getRandomCount () {
			return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
		},
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
		}
	}
}
</script>