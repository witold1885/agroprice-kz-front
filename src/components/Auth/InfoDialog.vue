<template>
	<div
		v-if="dialog.visible"
		class="auth-dialog__shadow d-flex justify-content-center align-items-center"
	>
		<div
			class="info-dialog"
		>
			<div class="info-dialog__top d-flex justify-content-center align-items-end">
				<img
					class="auth-dialog__close" :src="require('@/assets/images/dialog-close.png')"
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