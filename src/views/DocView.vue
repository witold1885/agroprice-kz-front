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

export default {
	components: { Breadcrumbs },
	data () {
		return {
			breadcrumbs: null,
			docUrl: this.$route.params.doc,
			docs: [
				{ url: 'rules-for-posting-information', name: 'Правила размещения информации', component: RulesForPostingInformation },
				{ url: 'privacy-policy', name: '' },
				{ url: 'terms-of-use', name: '' },
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