<template>
	<div
		v-if="dialog.visible"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center fixed"
	>
		<div
			class="info-dialog background-white"
		>
			<div class="info-dialog__top w-100 d-flex justify-content-center align-items-end relative">
				<img
					class="auth-dialog__close absolute" :src="require('@/assets/images/dialog-close.png')"
					@click="dialog.visible = false"
				/>
			</div>
			<div class="info-dialog__body">
				{{ dialog.message }}
			</div>
		</div>		
	</div>
</template>

<script>
export default {
	props: {
		dialog: {
			visible: {
				type: Boolean,
				default: false
			},
			message: {
				type: String,
				default: 'login'
			}
		}
	}
}
</script>