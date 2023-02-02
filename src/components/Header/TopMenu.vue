<template>
	<div class="top-menu justify-content-between">
		<a
			v-for="(item, index) of menuItems"
			:key="index"
			class="top-menu__item"
			:class="{ 'top-menu__item-active': item.active }"
		>
			{{ item. title }}
		</a>
	</div>
</template>

<script>
export default {
	data () {
		return {
			menuItems: [
				{ title: 'Новости', active: true },
				{ title: 'О компании', active: false },
				{ title: 'Блог', active: false },
				{ title: 'Вакансии', active: false },
				{ title: 'Обратная связь', active: false },
			]
		}
	}
}
</script>
