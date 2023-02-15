<template>
	<div class="breadcrumbs">
		<div class="breadcrumbs__list d-flex align-items-center">
			<div
				v-for="(breadcrumb, index) of breadcrumbs"
				:key="index"
				class="breadcrumbs__item d-flex align-items-center"
			>
				<a
					v-if="!breadcrumb.current"
					class="breadcrumbs__item-link"
					@click="goTo(breadcrumb.link)"
				>{{ breadcrumb.text }}</a>
				<span
					v-else
					class="breadcrumbs__item-link breadcrumbs__item-link-current"
				>{{ breadcrumb.text }}</span>
				<img v-if="!breadcrumb.current" class="breadcrumbs__item-separator" :src="require('@/assets/images/arrow-right-green.png')" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		breadcrumbs: {
			type: Array,
			default: () => []
		}
	},
	methods: {		
		goTo (url) {
			console.log(url)
			if (url.includes('/catalog/')) {
				this.$router.push({ path: url, query: this.$route.query });
			}
			else {
				this.$router.push(url)
			}
		}
	}
}
</script>
