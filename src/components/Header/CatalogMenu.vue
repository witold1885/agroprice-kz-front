<template>
	<div
		class="catalog-menu"
	>
		<button
			class="catalog-menu__button d-flex justify-content-between border-green"
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
		</button>
		<div
			class="catalog-menu__dropdown w-100 d-flex absolute background-white shadow-custom"
			:class="{
				'absolute': breakpoint != 'sm',
				'fixed': breakpoint == 'sm'
			}"
			v-if="showMenu"
			v-click-outside="closeMenu"
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
					<div class="catalog-menu__dropdown-categories-item-wrap w-100 d-flex justify-content-between align-items-center">
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
						class="catalog-menu__dropdown-mobile-subcategories flex-fill flex-column justify-content-between"
					>
						<div
							v-for="(subcategory, si) of category.subcategories"
							:key="si"
							class="catalog-menu__dropdown-mobile-subcategories-block d-flex flex-column"
						>
							<a
								class="catalog-menu__dropdown-mobile-subcategories-block-title color-green"
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
								<a class="catalog-menu__dropdown-mobile-subcategories-block-item catalog-menu__dropdown-mobile-subcategories-block-item-all" @click="goTo(subcategory.url)">Показать все</a>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div 
				v-if="selectedCategory"
				class="catalog-menu__dropdown-subcategories flex-fill flex-wrap"
			>
				<div
					v-for="(subcategory, si) of selectedCategory.subcategories"
					:key="si"
					class="catalog-menu__dropdown-subcategories-block d-flex flex-column"
				>
					<a
						class="catalog-menu__dropdown-subcategories-block-title color-green"
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
						<a class="catalog-menu__dropdown-subcategories-block-item catalog-menu__dropdown-subcategories-block-item-all" @click="goTo(subcategory.url)">Показать все</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '@/components/Common/CloseButton'
import vClickOutside from 'click-outside-vue3'

export default {
	components: {
		CloseButton
	},
    directives: {
		clickOutside: vClickOutside.directive
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