<template>
	<div
		class="catalog-menu"
	>
		<div
			class="catalog-menu__button d-flex justify-content-between"
			@click="toggleMenu"
		>
			<!-- <div class="catalog-menu__button-icon"> -->
				<img
					class="catalog-menu__button-icon" :src="require('@/assets/images/menu.png')"
				/>
			<!-- </div> -->
			<div
				class="catalog-menu__button-title"
			>
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
					@click="closeMenu"
				/>
			</div>
			<div class="catalog-menu__dropdown-categories">
				<a
					v-for="(category, ci) of menuCategories"
					:key="ci"
					class="catalog-menu__dropdown-categories-item d-flex align-items-center"
					@mouseover="selectedCategory = category"
				>
					<div class="catalog-menu__dropdown-categories-item-wrap d-flex justify-content-between align-items-center">
						<div
							class="catalog-menu__dropdown-categories-item-title"
							@click="goTo(category.url)"
						>{{ category.name }}</div>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-green"
							:src="require('@/assets/images/arrow-right-green.png')"
							@click="category.show = !category.show"
						/>
						<img
							class="catalog-menu__dropdown-categories-item-arrow catalog-menu__dropdown-categories-item-arrow-white"
							:src="require('@/assets/images/arrow-right-white.png')"
							@click="category.show = !category.show"
						/>
					</div>
					<div 
						v-if="category.show && breakpoint == 'sm'"
						class="catalog-menu__dropdown-mobile-subcategories d-flex flex-column justify-content-between"
					>
						<div
							v-for="(subcategory, si) of category.subcategories"
							:key="si"
							class="catalog-menu__dropdown-mobile-subcategories-block d-flex flex-column"
						>
							<a
								class="catalog-menu__dropdown-mobile-subcategories-block-title"
								@click="goTo(subcategory.url)"
							>{{ subcategory.name }}</a>
							<div class="catalog-menu__dropdown-mobile-subcategories-block-items d-flex flex-column">
								<a
									v-for="(subsubcategory, ssi) of subcategory.subsubcategories"
									:key="ssi"
									class="catalog-menu__dropdown-mobile-subcategories-block-item"
									@click="goTo(subsubcategory.url)"
								>
									{{ subsubcategory.name }}
								</a>
							</div>
						</div>
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
						@click="goTo(subcategory.url)"
					>{{ subcategory.name }}</a>
					<div class="catalog-menu__dropdown-subcategories-block-items d-flex flex-column">
						<a
							v-for="(subsubcategory, ssi) of subcategory.subsubcategories"
							:key="ssi"
							class="catalog-menu__dropdown-subcategories-block-item"
							@click="goTo(subsubcategory.url)"
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
			breakpoint: 'lg'
		}
	},
	computed: {
		...mapState('catalog', ['menuCategories']),
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	async mounted () {
		await this.$store.dispatch('catalog/getMenuCategories')
		this.menuCategories.map(cat => cat.show = false)
	},
	methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		},
		toggleMenu () {
			if (this.showMenu == false) {
				this.openMenu()
				return
			}
			if (this.showMenu == true) {
				this.closeMenu()
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
		},
		goTo (url) {
			this.closeMenu()
			this.$router.push({ path: `/catalog/${url}`, query: this.$route.query });
		}
	}
}
</script>