<template>
	<div class="mobile-menu">
		<button
			v-if="!showMenu"
			class="mobile-menu__button d-flex flex-column justify-content-center align-items-end background-transparent border-grey"
			@click="openMenu"
		>
			<img :src="require('@/assets/images/burger-long-line.png')" />
			<img :src="require('@/assets/images/burger-short-line.png')" />
			<img :src="require('@/assets/images/burger-long-line.png')" />
		</button>
		<CloseButton
			v-if="showMenu"
			@click="closeMenu"
		/>	
		<div v-if="showMenu" class="mobile-menu__dropdown fixed background-white">
			<div class="mobile-menu__dropdown-items w-100">
				<a
					v-for="(item, index) of menuItems"
					:key="index"
					class="mobile-menu__dropdown-item d-flex align-items-center"
					:href="item.link"
					@click="setAction(item.action)"
				>
					<div class="mobile-menu__dropdown-item-wrap d-flex justify-content-between align-items-center">
						<a class="mobile-menu__dropdown-item-title color-black">{{ item.title }}</a>
						<img
							class="mobile-menu__dropdown-item-arrow mobile-menu__dropdown-item-arrow-green"
							:src="require('@/assets/images/arrow-right-green.png')"
						/>
						<img
							class="mobile-menu__dropdown-item-arrow mobile-menu__dropdown-item-arrow-white"
							:src="require('@/assets/images/arrow-right-white.png')"
						/>
					</div>
				</a>
			</div>
			
		</div>
	</div>
	<ContactDialog :dialog="contactDialog" @sent="onFeedbackSent" @closed="closeContactForm" />
</template>

<script>
import CloseButton from '@/components/Common/CloseButton'
import ContactDialog from '@/components/Common/ContactDialog'

export default {
	components: {
		CloseButton,
		ContactDialog
	},
	data () {
		return {
			showMenu: false,			
			/*menuItems: [
				{ title: 'Новости', active: true, action: null },
				{ title: 'О компании', active: false, action: null },
				{ title: 'Блог', active: false, action: null },
				{ title: 'Вакансии', active: false, action: null },
				{ title: 'Обратная связь', active: false, action: this.openContactForm },
			],*/
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
		openMenu () {
			document.getElementById('app').style.maxHeight = '100vh'
			document.getElementById('app').style.overflow = 'hidden'
			this.showMenu = true
		},
		closeMenu () {
			document.getElementById('app').style.maxHeight = 'unset'
			document.getElementById('app').style.overflow = 'unset'
			this.showMenu = false
		},
		setAction (action) {
			if (action == 'contact-form') {
				this.openContactForm()
			}
		},
		openContactForm () {
			this.showMenu = false
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