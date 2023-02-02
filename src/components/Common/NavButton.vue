<template>	
	<button
		class="nav-button nav-button-prev d-flex justify-content-center align-items-center"
		:class="`border-${color}`"
	>
		<img
			class="nav-button-icon"
			:src="require(`@/assets/images/arrow-${side}-${color}.png`)"
		/>
	</button>
</template>

<script>
export default {
	props: {
		side: {
			type: String,
			default: 'left'
		},
		color: {
			type: String,
			default: 'green'
		}
	}
}
</script>