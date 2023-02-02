<template>
	<button
		class="close-button"
		:class="`border-${borderColor}`"
	>
		<img class="close-button__icon" :src="require('@/assets/images/close-left.png')" />
		<img class="close-button__icon" :src="require('@/assets/images/close-right.png')" />
	</button>
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