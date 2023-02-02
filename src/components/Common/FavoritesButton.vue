<template>
	<div
		class="favorites-button justify-content-center align-items-center"
		:class="`border-${borderColor}`"
	>
		<img class="favorites-button__icon" :src="require('@/assets/images/heart.png')" />
	</div>
</template>

<script>
export default {
	props: {
		borderColor: {
			type: String,
			default: 'grey'
		}
	}
}
</script>