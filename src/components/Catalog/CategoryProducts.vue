<template>
	<div class="products d-flex flex-column">
		<div class="products__actions d-flex justify-content-between align-items-center">
			<div class="products__actions-sort d-flex align-items-center">
				<div class="products__actions-sort-legend">Сортировать по:</div>
				<div
					v-for="(method, index) of sortMethods"
					:key="index"
					class="products__actions-sort-method"
					:class="{ 'products__actions-sort-method-selected': method.selected }"
					@click="selectSortMethod(index)"
				>{{ method.name }}</div>
				<div v-if="selectedMethod" class="products__actions-sort-dropdown">
					<div
						class="products__actions-sort-dropdown-field d-flex justify-content-between align-items-center"
						@click="showSortMenu = !showSortMenu"
					>
						<span class="products__actions-sort-dropdown-field-value">{{ selectedMethod.name }}</span>
						<img class="products__actions-sort-dropdown-field-arrow" :src="require('@/assets/images/arrow-down-green.png')">
					</div>
					<div
						v-if="showSortMenu"
						class="products__actions-sort-dropdown-menu"
					>
						<div
							v-for="(method, index) of sortMethods"
							:key="index"
							class="products__actions-sort-dropdown-menu-item"
							@click="selectSortMethod(index)"
						>{{ method.name }}</div>						
					</div>					
				</div>
			</div>
			<div class="products__actions-buttons d-flex justify-content-end align-items-center">
				<button class="products__actions-ad">Подать объявление</button>
				<button
					v-show="breakpoint != 'sm' || (breakpoint == 'sm' && view == 'grid')"
					class="products__actions-view products__actions-view-grid d-flex justify-content-center align-items-center"
					:class="{ 'products__actions-view-active': view == 'grid' }"
					@click="changeView('grid')"
				>
					<div class="products__actions-view-grid-icon d-flex flex-wrap">
						<div
							v-for="i in 4"
							:key="i"
							class="products__actions-view-grid-icon-part"
							:class="{ 'products__actions-view-icon-part-active': view == 'grid' }"
						></div>
					</div>
				</button>
				<button
					v-show="breakpoint != 'sm' || (breakpoint == 'sm' && view == 'list')"
					class="products__actions-view products__actions-view-list d-flex justify-content-center align-items-center"
					:class="{ 'products__actions-view-active': view == 'list' }"
					@click="changeView('list')"
				>
					<div class="products__actions-view-list-icon d-flex flex-column justify-content-between">
						<div
							v-for="i in 3"
							:key="i"
							class="products__actions-view-list-icon-part d-flex justify-content-between"
						>
							<div
								class="products__actions-view-list-icon-part-short"
								:class="{ 'products__actions-view-icon-part-active': view == 'list' }"
							></div>
							<div
								class="products__actions-view-list-icon-part-long"
								:class="{ 'products__actions-view-icon-part-active': view == 'list' }"
							></div>
						</div>
					</div>
				</button>
				<button
					class="products__actions-filter align-items-center"
					@click="openFilters"
				>
					<img :src="require('@/assets/images/filter.png')">
					<span>Фильтр</span>
				</button>
			</div>
		</div>
		<ProductsGrid v-if="view == 'grid'" :count="gridCount" />
		<ProductsList v-if="view == 'list'" :count="listCount" />
		<Pagination />
		<button
			class="products__showmore"
			@click="showMore"
		>Показать еще</button>
	</div>
</template>

<script>
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import Pagination from '@/components/Common/Pagination'

export default {
	components: { ProductsGrid, ProductsList, Pagination },
	data () {
		return {
			sortMethods: [
				{ name: 'Сначала популярные', type: 'popular', selected: true },
				{ name: 'Сначала подешевле', type: 'cheap', selected: false },
				{ name: 'Сначала подороже', type: 'expensive', selected: false },
				{ name: 'Сначала новое', type: 'new', selected: false },
			],
			selectedMethod: null,
			showSortMenu: false,
			view: 'grid',
			gridCount: 20,
			listCount: 9,
			breakpoint: 'lg'
		}
	},
	created () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	unmounted () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted () {
		this.selectSortMethod(0)
	},
	methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
		},
		selectSortMethod (index) {
			for (const i in this.sortMethods) {
				this.sortMethods[i].selected = i == index				
			}
			this.selectedMethod = this.sortMethods.find(method => method.selected)
			this.showSortMenu = false
		},
		changeView (view) {
			if (this.breakpoint != 'sm') {
				this.view = view
			}
			else {
				if (this.view == 'grid') this.view = 'list'
				else if (this.view == 'list') this.view = 'grid'
			}
			console.log(this.view)
		},
		showMore () {
			if (this.view == 'grid') this.gridCount += 20
			if (this.view == 'list') this.listCount += 9
		},
		openFilters () {
			console.log('emit open-filters')
			this.emitter.emit('open-filters')
		}
	}
}
</script>
