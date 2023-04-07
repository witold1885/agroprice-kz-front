<template>
	<div class="doc">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<component
			v-if="doc"
			:is="doc.component"
		></component>
	</div>
</template>

<script>
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import RulesForPostingInformation from '@/views/Docs/RulesForPostingInformation'
import PrivacyPolicy from '@/views/Docs/PrivacyPolicy'
import TermsOfUse from '@/views/Docs/TermsOfUse'

export default {
	components: { Breadcrumbs },
	data () {
		return {
			breadcrumbs: null,
			docUrl: this.$route.params.doc,
			docs: [
				{
					url: 'rules-for-posting-information',
					name: 'Правила размещения информации',
					component: RulesForPostingInformation
				},
				{
					url: 'privacy-policy',
					name: 'Политика конфиденциальности',
					component: PrivacyPolicy
				},
				{
					url: 'terms-of-use',
					name: 'Пользовательское соглашение',
					component: TermsOfUse
				}
			],
			doc: null
		}
	},
	mounted () {
		this.init()
	},
	methods: {
		init () {
			this.doc = this.docs.find(doc => doc.url == this.docUrl)
			if (this.doc) {
				this.breadcrumbs = this.setDefaultBreadcrumbs()
				this.breadcrumbs.push({
					text: this.doc.name,
					link: null,
					current: true

				})
			}
			else {
				this.$router.push('/404')
			}
		},
		setDefaultBreadcrumbs () {
			return [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				}
			]
		}
	}

}
</script>