<template>
	<div class="products d-flex flex-column" :style="[ mode == 'search' ? { 'width': '100%!important' } : {} ]">
		<div class="products__actions w-100 d-flex justify-content-between align-items-center">
			<div class="products__actions-sort d-flex align-items-center">
				<div class="products__actions-sort-legend">Сортировать по:</div>
				<div
					v-for="(method, index) of sortMethods"
					:key="index"
					class="products__actions-sort-method"
					:class="{ 'products__actions-sort-method-selected background-white border-green': method.selected }"
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
				<button class="products__actions-ad background-green border-none color-white" @click="goProductCreate">Подать объявление</button>
				<button
					v-show="breakpoint != 'sm' || (breakpoint == 'sm' && view == 'grid')"
					class="products__actions-view products__actions-view-grid d-flex justify-content-center align-items-center background-lightgrey border-none"
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
					class="products__actions-view products__actions-view-list d-flex justify-content-center align-items-center background-lightgrey border-none"
					:class="{ 'products__actions-view-active': view == 'list' }"
					@click="changeView('list')"
				>
					<div class="products__actions-view-list-icon d-flex flex-column justify-content-between">
						<div
							v-for="i in 3"
							:key="i"
							class="products__actions-view-list-icon-part w-100 d-flex justify-content-between"
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
					class="products__actions-filter align-items-center background-green border-none"
					@click="openFilters"
				>
					<img :src="require('@/assets/images/filter.png')">
					<span>Фильтр</span>
				</button>
			</div>
		</div>
		<ProductsGrid v-if="view == 'grid'" v-show="products.length != 0" :count="gridCount" :products="products" />
		<ProductsList v-if="view == 'list'" v-show="products.length != 0" :count="listCount" :products="products" />
		<Pagination :pagesCount="pages" v-show="pages > 1"/>
		<button
			class="showmore products__showmore background-white border-green"
			@click="showMore"
		>Показать еще</button>
	</div>
</template>

<script>
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import Pagination from '@/components/Common/Pagination'

export default {
	props: {
		products: {
			type: Array,
			default: () => []
		},
		pages: {
			type: Number,
			default: 1
		},
		mode: {
			type: String,
			default: 'category'
		}
	},
	components: { ProductsGrid, ProductsList, Pagination },
	data () {
		return {
			sortMethods: [
				{ name: 'Сначала новое', type: 'new', selected: true },
				{ name: 'Сначала подешевле', type: 'cheap', selected: false },
				{ name: 'Сначала подороже', type: 'expensive', selected: false },
				{ name: 'Сначала популярные', type: 'popular', selected: false },
			],
			selectedMethod: null,
			showSortMenu: false,
			view: 'grid',
			gridCount: 20,
			listCount: 9
		}
	},
	mounted () {
		this.selectSortMethod(0)
	},
	methods: {
		selectSortMethod (index) {
			for (const i in this.sortMethods) {
				this.sortMethods[i].selected = i == index				
			}
			this.selectedMethod = this.sortMethods.find(method => method.selected)
			this.showSortMenu = false
			/*if (this.selectedMethod) {
				this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...{ sort: this.selectedMethod.type } } })
			}
			else {
				let query = JSON.parse(JSON.stringify(this.$route.query))
				delete query.sort
				this.$router.replace({ path: this.$route.path, query: query });
			}*/
			if (this.selectedMethod) {
				this.emitter.emit('change-sort', this.selectedMethod.type)
			}
		},
		changeView (view) {
			if (this.breakpoint != 'sm') {
				this.view = view
			}
			else {
				if (this.view == 'grid') this.view = 'list'
				else if (this.view == 'list') this.view = 'grid'
			}
		},
		showMore () {
			if (this.view == 'grid') this.gridCount += 20
			if (this.view == 'list') this.listCount += 9
		},
		openFilters () {
			this.emitter.emit('open-filters')
		},
		goProductCreate () {
			this.$router.push('/create-product')
		}
	}
}
</script>
