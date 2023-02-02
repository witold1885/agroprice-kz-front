<template>
	<div class="account-block justify-content-between">
		<div class="account-block__icon d-flex justify-content-center align-items-center">
			<img :src="require('@/assets/images/account.png')" />
		</div>
		<div class="account-block__link">
			<a>Войти/Регистрация</a>
		</div>
	</div>	
	<button
		class="account-button justify-content-center align-items-center"
	>
		<img
			class="account-button-icon"
			:src="require(`@/assets/images/account.png`)"
		/>
	</button>
</template>