<template>
	<div class="pagination d-flex justify-content-center align-items-center">
		<!-- <div class="pagination__item pagination__item-prev"></div> -->
		<div
			v-for="i in pagesCount"
			:key="i"
			class="pagination__item pagination__item-page d-flex justify-content-center align-items-center"
			:class="{ 'pagination__item-page-active': i == activePage }"
			@click="activePage = i"
		>{{ i }}</div>
		<div
			class="pagination__item pagination__item-next d-flex justify-content-center align-items-center"
			@click="goNextPage"
		>
			<img :src="require('@/assets/images/arrow-right-grey.png')">
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			activePage: 1,
			pagesCount: 5
		}
	},
	methods: {
		goNextPage () {
			this.activePage++
			if (this.activePage > this.pagesCount) {
				this.activePage = 1
			}
		}
	}
}
</script>
