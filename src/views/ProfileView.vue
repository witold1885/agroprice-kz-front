<template>
	<div class="profile">
		<Breadcrumbs :breadcrumbs="breadcrumbs" />
		<div class="profile__wrap d-flex">
			<ProfileSidebar />
			<router-view />
		</div>
	</div>
</template>

<script>
import Breadcrumbs from '@/components/Common/Breadcrumbs'
import ProfileSidebar from '@/components/Profile/ProfileSidebar'

export default {
	components: { Breadcrumbs, ProfileSidebar },
	data () {
		return {
			breadcrumbs: [
				{
					text: 'Главная страница',
					link: '/',
					current: false
				},
				{
					text: 'Личный кабинет',
					link: null,
					current: false
				},
			]
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/profile.scss';
</style>
