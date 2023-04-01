<template>
	<div class="search">
		<!-- <Breadcrumbs :breadcrumbs="breadcrumbs" /> -->
		
	</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import { STORAGE_URL } from '@/constants'
// import Breadcrumbs from '@/components/Common/Breadcrumbs'
// import LocationMenu from '@/components/Common/LocationMenu'
// import CategoryProducts from '@/components/Catalog/CategoryProducts'

export default {
	// components: { Breadcrumbs, LocationMenu, CategoryProducts },
	data () {
		return {
			breadcrumbs: null,
			search: this.$route.query.q,
			metaTitle: '',
			metaDescription: '',
			metaKeywords: '',
			products: [],
			pages: 1,
			productsPerPage: 20,
			sort: 'popular',
			locations: null,
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		}
	},
	async mounted () {
		await this.init()
	},
	methods: {
		
	}

}
</script>
