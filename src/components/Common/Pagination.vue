<template>
	<div class="pagination d-flex justify-content-center align-items-center">
		<!-- <div class="pagination__item pagination__item-prev"></div> -->
		<div
			class="pagination__item pagination__item-prev d-flex justify-content-center align-items-center"
			@click="goPrevPage"
		>
			<img :src="require('@/assets/images/arrow-right-grey.png')">
		</div>
		<div
			v-for="i in pagesCount"
			v-show="isShowingPage(i) || isDotsPage(i)"
			:key="i"
			class="pagination__item pagination__item-page d-flex justify-content-center align-items-center"
			:class="{ 'pagination__item-page-active': i == activePage, 'pagination__item-page-dot': isDotsPage(i) }"
			@click="setActivePage(i)"
		>{{ isDotsPage(i) ? '...' : i }}</div>
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
	props: {
		pagesCount: {
			type: Number,
			default: 1
		}
	},
	data () {
		return {
			activePage: 1,
			// pagesCount: 5
		}
	},
	methods: {
		isShowingPage (page) {
			return page == 1 || page == 2 || page == this.activePage - 1 || page == this.activePage || page == this.activePage + 1 || page == this.pagesCount - 1 || page == this.pagesCount
		},
		isDotsPage (page) {
			if (this.pagesCount >= 9) {
				if (this.activePage <= 2) return page == 3
				else if (this.activePage >= this.pagesCount - 1) return page == this.pagesCount - 2
				else if (this.activePage >= 4 && this.activePage <= this.pagesCount - 3) return page == 3 || page == this.pagesCount - 2
				else if (this.activePage == 3) return page == this.pagesCount - 2
				else if (this.activePage == this.pagesCount - 2) return page == 3
			}
			return false
		},
		setActivePage (page) {
			if (!this.isDotsPage(page)) {
				this.activePage = page
				this.changePage()
			}
		},
		goPrevPage () {
			this.activePage--
			if (this.activePage < 1) {
				this.activePage = this.pagesCount
			}
			this.changePage()
		},
		goNextPage () {
			this.activePage++
			if (this.activePage > this.pagesCount) {
				this.activePage = 1
			}
			this.changePage()
		},
		changePage () {
			let headingTitle = document.querySelector('.heading-1')
			headingTitle.scrollIntoView({ behavior: 'smooth' })
			this.emitter.emit('change-page', this.activePage)
		}
	}
}
</script>
