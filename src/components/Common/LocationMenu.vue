<template>
		<div class="location-menu">
			<div
				class="location-menu__field"
				@click="showMenu = true"
			>
				{{ selectedLocations.length != 0 ? selectedLocations.join(', ') : 'Весь Казахстан' }}
			</div>
	<div
		v-if="showMenu"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center"
	>
			<div class="location-menu__dropdown">
				<div class="location-menu__dropdown-top d-flex justify-content-center align-items-center">
					<img 
						class="auth-dialog__close"
						:src="require('@/assets/images/dialog-close.png')"
						@click="showMenu = false"
					/>
					<h2 class="location-menu__dropdown-title">Выбор местоположения</h2>
				</div>
				<div 
					v-if="showMenu && locations.length != 0"
					class="location-menu__dropdown-body"
				>
					<div class="location-menu__dropdown-body-row d-flex flex-wrap">
						<div 
							class="location-menu__dropdown-body-row-item"
							:class="{ 'location-menu__dropdown-body-row-item-active': selectedLocationsIds.length == 0 }"
							@click="resetAll()"
						>
							Весь Казахстан
						</div>
					</div>
					<div class="location-menu__dropdown-body-divider"></div>
					<div class="location-menu__dropdown-body-row d-flex flex-wrap">
						<div 
							v-for="(location, index) of locations.except.cities"
							:key="index"
							class="location-menu__dropdown-body-row-item"
							:class="{ 'location-menu__dropdown-body-row-item-active': isActive(location.id) }"
							@click="toggleLocation(location.id)"
						>
							{{ location.city }}
						</div>
					</div>
					<div class="location-menu__dropdown-body-divider"></div>
					<div v-if="!openRegion" class="location-menu__dropdown-body-row">
						<div class="location-menu__dropdown-body-row-items d-flex flex-wrap">
							<div 							
								v-for="(location, index) of locations.regions"
								:key="index"
								class="location-menu__dropdown-body-row-region"
								@click="openRegion = location"
							>
								{{ location.region }}
							</div>
						</div>
					</div>
					<div v-else class="location-menu__dropdown-body-row">
						<div class="location-menu__dropdown-body-row-actions d-flex justify-content-between align-items-center">
							<div
								class="location-menu__dropdown-body-row-actions-back"
								@click="openRegion = null"
							>
								Назад
							</div>
							<div
								class="location-menu__dropdown-body-row-actions-all"
								@click="toggleLocations(openRegion.cities_ids)"
							>
								Вся {{ openRegion.region }}
							</div>
						</div>
						<div class="location-menu__dropdown-body-row-items d-flex flex-wrap">
							<div							
								v-for="(location, index) of openRegion.cities"
								:key="index"
								class="location-menu__dropdown-body-row-item"
								:class="{ 'location-menu__dropdown-body-row-item-active': isActive(location.id) }"
								@click="toggleLocation(location.id)"
							>
								{{ location.city }}
							</div>
						</div>
					</div>
				</div>
				<div class="location-menu__dropdown-bottom d-flex justify-content-end align-items-center">
					<button
						class="location-menu__dropdown-submit"
						@click="submitSelection"
					>OK</button>
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
			if (this.selectedLocationsIds.length != 0) {
				this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...{ locations: this.selectedLocationsIds.join(',') } } })
			}
			else {
				let query = JSON.parse(JSON.stringify(this.$route.query))
				delete query.locations
				this.$router.replace({ path: this.$route.path, query: query });
			}
			this.showMenu = false
		},
		resetAll () {
			this.selectedLocationsIds = []
			this.selectedLocations = []
		}
	}
}
</script>
