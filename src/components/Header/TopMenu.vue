<template>
	<div class="top-menu justify-content-between">
		<a
			v-for="(item, index) of menuItems"
			:key="index"
			class="top-menu__item"
			:class="{ 'top-menu__item-active': item.active }"
			@click="item.action"
		>
			{{ item. title }}
		</a>
	</div>
	<ContactDialog :dialog="contactDialog" @sent="onFeedbackSent" />
</template>

<script>
import ContactDialog from '@/components/Common/ContactDialog'

export default {
	components: { ContactDialog },
	data () {
		return {
			menuItems: [
				{ title: 'Новости', active: true, action: null },
				{ title: 'О компании', active: false, action: null },
				{ title: 'Блог', active: false, action: null },
				{ title: 'Вакансии', active: false, action: null },
				{ title: 'Обратная связь', active: false, action: this.openContactForm },
			],
			contactDialog: { visible: false }
		}
	},
	methods: {
		openContactForm () {
			this.contactDialog.visible = true
		},
		onFeedbackSent () {
			this.contactDialog.visible = false
			alert('Ваше обращение успешно отправлено')
		}
	}
}
</script>
