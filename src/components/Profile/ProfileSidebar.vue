<template>
	<div class="profile-sidebar">
		<div v-if="user" class="profile-sidebar__top d-flex align-items-center">
			<div class="profile-sidebar__top-avatar d-flex justify-content-center align-items-center">
				<img class="profile-sidebar__top-avatar-icon" :src="require('@/assets/images/user.png')" />
			</div>
			<div class="profile-sidebar__top-username">{{ user.profile.fullname || `user-${user.name}` }}</div>
		</div>
		<div class="profile-sidebar__menu d-flex flex-column">
			<div
				v-for="(item, index) of menu"
				:key="index"
				class="profile-sidebar__menu-item-wrap d-flex flex-column"
				@click="setAction(item.action)"
			>	
				<div class="profile-sidebar__menu-item d-flex align-items-center">
					<div v-if="item.active" class="profile-sidebar__menu-item-marker"></div>
					<img
						class="profile-sidebar__menu-item-icon"
						:class="`profile-sidebar__menu-item-icon-${item.icon}`"
						:src="require(`@/assets/images/${item.icon}-green.png`)"
					/>
					<div class="profile-sidebar__menu-item-title">{{ item.title }}</div>
				</div>
				<div
					v-if="item.children.length != 0"
					class="profile-sidebar__menu-subitems d-flex flex-column"
				>
					<div
						v-for="(child, index) of item.children"
						:key="index"
						class="profile-sidebar__menu-subitem"
					>
						<div class="profile-sidebar__menu-subitem-title">{{ child.title }}</div>
						<div
							v-if="child.children.length != 0"
							class="profile-sidebar__menu-subitem-children d-flex flex-column"
						>
							<div
								v-for="(subchild, index) of child.children"
								:key="index"
								class="profile-sidebar__menu-subitem-child"
								:class="{ 'profile-sidebar__menu-subitem-child-active': subchild.active }"
							>
								<div v-show="subchild.active" class="profile-sidebar__menu-subitem-child-marker"></div>
								<div class="profile-sidebar__menu-subitem-child-title">{{ subchild.title }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data () {
		return {
			menu: [
				{
					title: '???????????? ??????????????', action: 'none', icon: 'user', active: true, children: [
						{ title: '??????????????????', link: null, active: false, children: [] },
						{ title: '??????????????????', link: null, active: false, children: [] },
					]
				},
				{
					title: '????????????????????', action: 'none', icon: 'ad', active: false, children: [
						{ title: '?????? ????????????????????', link: null, active: false, children: [
							{ title: '????????????????????????????', link: null, active: true, children: [] },
							{ title: '???? ??????????????????', link: null, active: false, children: [] },
							{ title: '??????????????????', link: null, active: false, children: [] },
							{ title: '??????????', link: null, active: false, children: [] },
							{ title: '??????????????', link: null, active: false, children: [] },
						] },
						{ title: '???????????????????? ????????????????????', link: null, active: false, children: [] },
						{ title: '??????????????????', link: null, active: false, children: [] },
					]
				},
				{
					title: '??????????', action: 'logout', icon: 'logout', active: false, children: []
				},
			],
		}
	},
	computed: {
		...mapState('auth', ['user'])
	},
	methods: {
		...mapActions('auth', ['logoutUser']),
		async setAction (action) {
			console.log(action)
			if (action == 'logout') {
				await this.logout()
			}
		},
		async logout () {
			const logoutSuccess = await this.logoutUser()
			if (logoutSuccess) this.$router.push('/')
		}
	}
}
</script>