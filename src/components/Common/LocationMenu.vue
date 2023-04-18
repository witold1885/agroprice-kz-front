<template>
	<div class="location-menu relative">
		<div
			class="location-menu__field border-green"
			@click="showMenu = true"
		>
			{{ selectedLocations.length != 0 ? selectedLocations.join(', ') : 'Весь Казахстан' }}
		</div>
		<div
			v-if="showMenu"
			class="auth-dialog__shadow d-flex justify-content-center align-items-center fixed"
		>
			<div class="location-menu__dropdown relative background-white">
				<img 
					class="location-menu__dropdown-close location-menu__dropdown-close-desktop absolute"
					:src="require('@/assets/images/dialog-close-white.png')"
					@click="showMenu = false"
				/>
				<img 
					class="location-menu__dropdown-close location-menu__dropdown-close-mobile absolute"
					:src="require('@/assets/images/dialog-close.png')"
					@click="showMenu = false"
				/>
				<div class="location-menu__dropdown-top d-flex justify-content-center align-items-center relative">
					<input class="location-menu__dropdown-search background-lightgrey border-none color-black" placeholder="Поиск по области, городу, району, микрорайону" />
					<img class="location-menu__dropdown-search-icon absolute" :src="require('@/assets/images/search-grey.png')">
				</div>
				<div 
					v-if="showMenu && locations.length != 0"
					class="location-menu__dropdown-body-desktop"
				>
					<div class="location-menu__dropdown-body-column background-lightgrey">
						<div 
							class="location-menu__dropdown-body-column-item"
							:class="{ 'location-menu__dropdown-body-column-item-active': selectedLocationsIds.length == 0 }"
							@click="resetAll()"
						>
							Весь Казахстан
						</div>
						<div 
							v-for="(location, index) of locations.except.cities"
							:key="index"
							class="location-menu__dropdown-body-column-item"
							:class="{ 'location-menu__dropdown-body-column-item-active': isActive(location.id) }"
							@click="toggleLocation(location.id)"
						>
							{{ location.city }}
						</div>
						<div 							
							v-for="(location, index) of locations.regions"
							:key="index"
							class="location-menu__dropdown-body-column-item"
							@click="openRegion = location"
						>
							{{ location.region }}
						</div>
						
					</div>
					<div class="location-menu__dropdown-body-column">
						<div v-if="openRegion">
							<div
								class="location-menu__dropdown-body-column-item"
								@click="toggleLocations(openRegion.cities_ids)"
							>
								Вся {{ openRegion.region }}
							</div>
							<div
								v-for="(location, index) of openRegion.cities"
								:key="index"
								class="location-menu__dropdown-body-column-item"
								:class="{ 'location-menu__dropdown-body-column-item-active': isActive(location.id) }"
								@click="toggleLocation(location.id)"
							>
								{{ location.city }}
							</div>
						</div>
					</div>
				</div>
				<div 
					v-if="showMenu && locations.length != 0"
					class="location-menu__dropdown-body-mobile flex-column"
				>
					<div class="location-menu__dropdown-body-menu">
						<div class="location-menu__dropdown-body-menu-field d-flex justify-content-between align-items-center" @click="showMobileRegionsMenu = true">
							<div class="location-menu__dropdown-body-menu-field-value">{{ openRegion ? openRegion.region : 'Весь Казахстан' }}</div>
							<img class="location-menu__dropdown-body-menu-field-icon" :src="require('@/assets/images/arrow-down-green.png')" />				
						</div>
						<div v-if="showMobileRegionsMenu" class="location-menu__dropdown-body-menu-list">
							<div 
								class="location-menu__dropdown-body-menu-list-item"
								:class="{ 'location-menu__dropdown-body-menu-list-item-active': selectedLocationsIds.length == 0 }"
								@click="resetAll()"
							>
								Весь Казахстан
							</div>
							<div 
								v-for="(location, index) of locations.except.cities"
								:key="index"
								class="location-menu__dropdown-body-menu-list-item"
								:class="{ 'location-menu__dropdown-body-menu-list-item-active': isActive(location.id) }"
								@click="selectLocation(location)"
							>
								{{ location.city }}
							</div>
							<div 							
								v-for="(location, index) of locations.regions"
								:key="index"
								class="location-menu__dropdown-body-menu-list-item"
								@click="selectOpenRegion(location)"
							>
								{{ location.region }}
							</div>							
						</div>						
					</div>
					<div class="location-menu__dropdown-body-menu">
						<div class="location-menu__dropdown-body-menu-field d-flex justify-content-between align-items-center" @click="showMobileCitiesMenu = true">
							<div class="location-menu__dropdown-body-menu-field-value">
								{{ selectedLocations.length != 0 ? selectedLocations.join(', ') : (openRegion ? `Вся ${openRegion.region}` : 'Все города') }}
							</div>
							<img class="location-menu__dropdown-body-menu-field-icon" :src="require('@/assets/images/arrow-down-green.png')" />				
						</div>
						<div v-if="showMobileCitiesMenu && openRegion" class="location-menu__dropdown-body-menu-list">
							<div
								class="location-menu__dropdown-body-menu-list-item"
								@click="toggleLocations(openRegion.cities_ids)"
							>
								Вся {{ openRegion.region }}
							</div>
							<div
								v-for="(location, index) of openRegion.cities"
								:key="index"
								class="location-menu__dropdown-body-menu-list-item"
								:class="{ 'location-menu__dropdown-body-menu-list-item-active': isActive(location.id) }"
								@click="selectLocation(location)"
							>
								{{ location.city }}
							</div>
						</div>						
					</div>
				</div>
				<div class="location-menu__dropdown-bottom d-flex justify-content-center align-items-center">
					<button
						class="location-menu__dropdown-submit background-green color-white border-none"
						@click="submitSelection"
					>Выбрать</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data () {
		return {
			showMenu: false,
			openRegion: null,
			selectedLocationsIds: [],
			selectedLocations: [],
			showMobileRegionsMenu: false,
			showMobileCitiesMenu: false,
		}
	},
	computed: {
		...mapState('location', ['locations'])
	},
	async mounted () {
		await this.$store.dispatch('location/getLocations')
		if (this.$route.query.locations) {
			this.selectedLocationsIds = this.$route.query.locations.split(',').map(id => Number(id))
			console.log('selectedLocationsIds')
			console.log(this.selectedLocationsIds)
			this.submitSelection()
		}
	},
	methods: {
		toggleLocation (location_id) {
			const locationIndex = this.selectedLocationsIds.findIndex(item => item == location_id)
			if (locationIndex !== -1) {
				this.selectedLocationsIds.splice(locationIndex, 1)
			}
			else {
				this.selectedLocationsIds.push(location_id)
			}
			// console.log(this.selectedLocationsIds)
		},
		toggleLocations (locations_ids) {
			let allSelected = true
			for (const location_id of locations_ids) {
				const locationIndex = this.selectedLocationsIds.findIndex(item => item == location_id)
				if (locationIndex === -1) {
					allSelected = false
					break
				}
			}
			for (const location_id of locations_ids) {
				const locationIndex = this.selectedLocationsIds.findIndex(item => item == location_id)
				if (locationIndex !== -1) {
					this.selectedLocationsIds.splice(locationIndex, 1)
				}
				if (!allSelected) {
					this.selectedLocationsIds.push(location_id)
				}
			}
			// console.log(this.selectedLocationsIds)
		},
		selectOpenRegion (location) {
			this.openRegion = location
			this.showMobileRegionsMenu = false
		},
		selectLocation (location) {
			this.selectedLocationsIds = [location.id]
			this.selectedLocations = [location.city]
			this.showMobileRegionsMenu = false
			this.showMobileCitiesMenu = false
		},
		isActive (location_id) {
			return this.selectedLocationsIds.find(item => item == location_id)
		},
		submitSelection () {
			this.selectedLocations = []
			for (const location of this.locations.except.cities) {
				if (this.selectedLocationsIds.indexOf(location.id) !== -1) {
					this.selectedLocations.push(location.city)
				}
			}
			for (const region of this.locations.regions) {
				for (const location of region.cities) {
					if (this.selectedLocationsIds.indexOf(location.id) !== -1) {
						this.selectedLocations.push(location.city)
					}
				}
			}
			/*if (this.selectedLocationsIds.length != 0) {
				this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...{ locations: this.selectedLocationsIds.join(',') } } })
			}
			else {
				let query = JSON.parse(JSON.stringify(this.$route.query))
				delete query.locations
				this.$router.replace({ path: this.$route.path, query: query });
			}*/
			if (this.selectedLocationsIds.length != 0) {
				this.emitter.emit('change-location', this.selectedLocationsIds.join(','))
			}
			else {
				this.emitter.emit('change-location', null)
			}
			this.showMenu = false
		},
		resetAll () {
			this.selectedLocationsIds = []
			this.selectedLocations = []
			this.openRegion = null
			this.showMobileRegionsMenu = false
		}
	}
}
</script>
