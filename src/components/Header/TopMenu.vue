<template>
	<div class="top-menu justify-content-between">
		<a
			v-for="(item, index) of menuItems"
			:key="index"
			class="top-menu__item color-black"
			:class="{ 'top-menu__item-active': item.active }"
			:href="item.link"
			@click="setAction(item.action)"
		>
			{{ item. title }}
		</a>
	</div>
	<ContactDialog :dialog="contactDialog" @sent="onFeedbackSent" @closed="closeContactForm" />
</template>

<script>
import ContactDialog from '@/components/Common/ContactDialog'

export default {
	components: { ContactDialog },
	data () {
		return {
			contactDialog: { visible: false }
		}
	},
	computed: {
		menuItems () {
			return [
				{ title: 'Новости', active: this.$route.path.indexOf('/news') !== -1, action: null, link: '/news' },
				{ title: 'О компании', active: false, action: null },
				{ title: 'Блог', active: this.$route.path.indexOf('/blog') !== -1, action: null, link: '/blog' },
				{ title: 'Вакансии', active: false, action: null },
				{ title: 'Обратная связь', active: this.contactDialog.visible, action: 'contact-form' },
			]
		}
	},
	methods: {
		setAction (action) {
			if (action == 'contact-form') {
				this.openContactForm()
			}
		},
		openContactForm () {
			this.contactDialog.visible = true
		},
		onFeedbackSent () {
			this.contactDialog.visible = false
			alert('Ваше обращение успешно отправлено')
		},
		closeContactForm () {
			this.contactDialog.visible = false
		}
	}
}
</script>
