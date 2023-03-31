<template>
	<div v-if="showFilters" class="filters__wrap">
		<div class="filters__wrap-top justify-content-between align-items-center">
			<div class="filters__wrap-top-title">Фильтр</div>
			<div
				class="filters__wrap-top-close d-flex justify-content-center align-items-center"
				@click="showFilters = false"
			>
				<img :src="require('@/assets/images/dialog-close.png')">
			</div>
		</div>
		<div class="filters">
			<div
				v-for="(group, gi) of filters"
				:key="gi"
				class="filters__group"
			>
				<div
					class="filters__group-top d-flex justify-content-between align-items-center"
					@click="group.collapsed = !group.collapsed"
				>
					<div class="filters__group-title">{{ group.title }}</div>
					<img
						v-if="group.collapsable"
						class="filters__group-collapse"
						:class="{ 'filters__group-collapse-collapsed': group.collapsed }"
						:src="require('@/assets/images/collapse.png')"
					/>
				</div>
				<div
					v-show="!group.collapsed"
					class="filters__group-body"
				>
					<div
						v-if="group.type == 'range'"
						class="filters__group-range"
					>
						<div class="filters__group-range-values d-flex justify-content-between align-items-center" 
							style="text-align: center"
						>
							<label :for="`range-${gi}-min`">от</label>
							<input :id="`range-${gi}-min`" type="number" :value="group.minValue" @keyup="changeRangeValue($event, gi, 'min')" />
							<label :for="`range-${gi}-max`">до</label>
							<input :id="`range-${gi}-max`" type="number" :value="group.maxValue" @keyup="changeRangeValue($event, gi, 'max')" />
						</div>

						<MultiRangeSlider
							baseClassName="multi-range-slider-bar-only"
							:minValue="group.minValue"
							:maxValue="group.maxValue"
							:min="group.min"
							:max="group.max"
							:step="1000"
							:rangeMargin="50"
							@input="updateGroupRange($event, gi)"
						/>
					</div>
					<div
						v-if="group.type == 'checkbox'"
						class="filters__group-checkbox"
					>
						<div
							v-for="(item, index) of group.items"
							:key="index"
							class="filters__group-checkbox-item d-flex justify-content-between align-items-center"
						>
							<label :for="`item-${gi}-${index}`">{{ item.name }}</label>
							<div class="filters__group-checkbox-item-switch d-flex justify-content-center align-items-center">
								<input type="checkbox" :id="`item-${gi}-${index}`" :value="index" v-model="group.selectedItems" />
								<img :src="require('@/assets/images/ok.png')" />
							</div>
						</div>
					</div>
					<div
						v-if="group.type == 'dropdown'"
						class="filters__group-dropdown"
					>
						<div 
							class="filters__group-dropdown-field d-flex justify-content-between align-items-center"
							@click="group.showMenu = !group.showMenu"
						>
							<span class="filters__group-dropdown-field-value">{{ group.selectedItem }}</span>
							<img
								class="filters__group-dropdown-field-arrow"
								:class="{ 'filters__group-dropdown-field-arrow-reverse': group.showMenu }"
								:src="require('@/assets/images/arrow-down-green.png')"
							/>						
						</div>
						<div
							v-if="group.showMenu" 
							class="filters__group-dropdown-menu"
						>
							<div
								v-for="(item, index) of group.items"
								:key="index"
								class="filters__group-dropdown-menu-item"
								@click="selectDropdownItem(gi, index)"
							>
								{{ item.name }}
							</div>
						</div>
					</div>
					<div
						v-if="group.type == 'color'"
						class="filters__group-color d-flex flex-wrap"
					>
						<div
							v-for="(item, index) of group.items"
							:key="index"
							class="filters__group-color-item"
							:style="{ backgroundColor: item.color }"
						></div>
					</div>
				</div>
			</div>
			<div class="filters__bottom">
				<button class="filters__submit" @click="submitFilters">Применить</button>
			</div>
		</div>
	</div>
</template>

<script>
import MultiRangeSlider from 'multi-range-slider-vue'
import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

export default {
	props: {
		maxPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		}
	},
	components: { MultiRangeSlider },
	data () {
		return {
			filters: [
				{
					title: 'Цена',
					type: 'range',
					min: this.minPrice,
					max: this.maxPrice,
					minValue: this.minPrice,
					maxValue: this.maxPrice,
					collapsable: false,
					collapsed: false
				},
				/*{
					title: 'Бренд',
					type: 'checkbox',
					items: [
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
						{ name: 'Бренд 1' },
					],
					collapsable: true,
					collapsed: true,
					selectedItems: []
				},*/
				/*{
					title: 'Материал',
					type: 'checkbox',
					items: [
						{ name: 'Искусственная кожа' },
						{ name: 'Кожа' },
						{ name: 'Коттон' },
						{ name: 'Нейлон' },
						{ name: 'Полиэстер' },
						{ name: 'Экокожа' },
						{ name: 'Канвас' },
					],
					collapsable: true,
					collapsed: true,
					selectedItems: []
				},*/
				/*{
					title: 'Особенности',
					type: 'checkbox',
					items: [
						{ name: 'Заголовок 1' },
						{ name: 'Заголовок 1' },
						{ name: 'Заголовок 1' },
						{ name: 'Заголовок 1' },
						{ name: 'Заголовок 1' },
					],
					collapsable: true,
					collapsed: true,
					selectedItems: []
				},*/
				/*{
					title: 'Список',
					type: 'dropdown',
					items: [
						{ name: 'Категория 1' },
						{ name: 'Категория 2' },
						{ name: 'Категория 3' },
						{ name: 'Категория 4' },
					],
					collapsable: true,
					collapsed: false,
					selectedItem: 'Категория 1',
					showMenu: false
				},*/
				/*{
					title: 'Цвет',
					type: 'color',
					items: [
						{ color: '#FFFFFF' },
						{ color: '#3A3A3A' },
						{ color: '#D8D8D8' },
						{ color: '#5D97ED' },
						{ color: '#87CCF9' },
						{ color: '#F7E95C' },
						{ color: '#68AC68' },
						{ color: '#D10074' },
						{ color: '#FF8310' },
						{ color: '#93D175' },
						{ color: '#CC1C10' },
						{ color: '#8EA45B' },
					],
					collapsable: true,
					collapsed: false
				},*/
			],
			showFilters: false,
			breakpoint: 'lg'
		}
	},
	watch: {
		minPrice (newValue) {
			const priceFilter = this.filters.find(filter => filter.title == 'Цена')
			priceFilter.min = newValue
			priceFilter.minValue = newValue
		},
		maxPrice (newValue) {
			const priceFilter = this.filters.find(filter => filter.title == 'Цена')
			priceFilter.max = newValue
			priceFilter.maxValue = newValue
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
		this.emitter.on('open-filters', () => {
			console.log('get open-filters')
			this.openFilters()
		})
	},
	methods: {
		handleResize () {
			if (window.innerWidth > 992) this.breakpoint = 'lg'
			else if (window.innerWidth > 414) this.breakpoint = 'md'
			else this.breakpoint = 'sm'
			if (this.breakpoint == 'lg') {
				this.showFilters = true
			}
			else {
				this.showFilters = false
			}
		},
		updateGroupRange (e, gi) {
			// console.log(e)
			// console.log(gi)
			this.filters[gi].minValue = e.minValue
			this.filters[gi].maxValue = e.maxValue
		},
		changeRangeValue (e, gi, side) {
			// console.log(e.target.value)
			// console.log(Number(e.target.value))
			this.filters[gi][`${side}Value`] = e.target.value ? Number(e.target.value) : 0
		},
		selectDropdownItem (gi, index) {
			// console.log(gi)
			// console.log(index)
			this.filters[gi].selectedItem = this.filters[gi].items[index].name
			this.filters[gi].showMenu = false
		},
		openFilters () {
			if (this.breakpoint == 'md' || this.breakpoint == 'sm') {
				this.showFilters = true
			}
		},
		submitFilters () {
			const priceFilter = this.filters.find(filter => filter.title == 'Цена')
			this.$emit('filtered', { minPrice: priceFilter.minValue, maxPrice: priceFilter.maxValue })
		}
	}
}
</script>
