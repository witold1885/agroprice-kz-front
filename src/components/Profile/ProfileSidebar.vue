<template>
	<div class="profile-sidebar background-lightgrey">
		<div v-if="user" class="profile-sidebar__top d-flex align-items-center">
			<img v-if="user.profile.avatar" class="profile-sidebar__top-avatar" :src="`${storageURL}/${user.profile.avatar}`" @click="selectAvatar" />
			<div v-else class="profile-sidebar__top-avatar d-flex justify-content-center align-items-center br-100" @click="selectAvatar">
				<img class="profile-sidebar__top-avatar-icon" :src="require('@/assets/images/user.png')" />
			</div>
			<input
				type="file"
				style="display: none"
				ref="avatar"
				@change="onAvatarSelected"
			>
			<div class="profile-sidebar__top-username color-black">{{ user.profile.fullname || `user-${user.name}` }}</div>
		</div>
		<div class="profile-sidebar__menu d-flex flex-column">
			<div
				v-for="(item, index) of menu"
				:key="index"
				class="profile-sidebar__menu-item-wrap d-flex flex-column"
				
			>	
				<div
					class="profile-sidebar__menu-item d-flex align-items-center relative"
					:class="{ 'profile-sidebar__menu-item-active': item.active }"
				>
					<div class="profile-sidebar__menu-item-marker absolute background-green"></div>
					<img
						class="profile-sidebar__menu-item-icon"
						:class="`profile-sidebar__menu-item-icon-${item.icon}`"
						:src="require(`@/assets/images/${item.icon}-green.png`)"
					/>
					<div class="profile-sidebar__menu-item-title color-black" @click="setAction(item.action)">{{ item.title }}</div>
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
						<div class="profile-sidebar__menu-subitem-title" @click="goFurther(child.link)">{{ child.title }}</div>
						<div
							v-if="child.children.length != 0"
							class="profile-sidebar__menu-subitem-children d-flex flex-column"
						>
							<div
								v-for="(subchild, index) of child.children"
								:key="index"
								class="profile-sidebar__menu-subitem-child relative"
								:class="{ 'profile-sidebar__menu-subitem-child-active': subchild.active }"
							>
								<div class="profile-sidebar__menu-subitem-child-marker absolute background-green"></div>
								<div class="profile-sidebar__menu-subitem-child-title" @click="goFurther(subchild.link)">{{ subchild.title }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { STORAGE_URL } from '@/constants'
import { mapState, mapActions } from 'vuex'

export default {
	data () {
		return {
			status: this.$route.params.status
		}
	},
	computed: {
		...mapState('auth', ['user']),
		storageURL () {
			return STORAGE_URL
		},
		menu() {
			return [
				{
					title: 'Личный кабинет', action: 'none', icon: 'user', active: this.$route.path == '/profile/preferences', children: [
						{ title: 'Настройки', link: '/profile/preferences', active: this.$route.path == '/profile/preferences', children: [] },
						{ title: 'Сообщения', link: null, active: false, children: [] },
					]
				},
				{
					title: 'Объявление', action: 'none', icon: 'ad', active: this.$route.path.indexOf('/profile/products') !== -1, children: [
						{ title: 'Мои объявления', link: '/profile/products', active: false, children: [
							{ title: 'Опубликованные', link: '/profile/products/published', active: this.$route.path == '/profile/products/published', children: [] },
							{ title: 'На модерации', link: '/profile/products/moderating', active: this.$route.path == '/profile/products/moderating', children: [] },
							{ title: 'Отклонено', link: '/profile/products/declined', active: this.$route.path == '/profile/products/declined', children: [] },
							{ title: 'Архив', link: '/profile/products/archive', active: this.$route.path == '/profile/products/archive', children: [] },
							{ title: 'Корзина', link: '/profile/products/trash', active: this.$route.path == '/profile/products/trash', children: [] },
						] },
						{ title: 'Разместить объявление', link: '/create-product', active: false, children: [] },
						{ title: 'Избранное', link: '/profile/favorites', active: false, children: [] },
					]
				},
				{
					title: 'Выйти', action: 'logout', icon: 'logout', active: false, children: []
				},
			]
		}
	},
	methods: {
		...mapActions('auth', ['logoutUser']),
		...mapActions('profile', ['setProfileAvatar']),
		async setAction (action) {
			if (action == 'logout') {
				await this.logout()
			}
		},
		goFurther (link) {
			if (link) {
				this.$router.push(link)
			}
		},
		async logout () {
			const logoutSuccess = await this.logoutUser()
			if (logoutSuccess) this.$router.push('/')
		},
		selectAvatar() {
			this.$refs.avatar.click()
		},
		async onAvatarSelected(e) {
			let files = e.target.files
			if (files && files[0]) {
				let file = files[0]
				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
				if (!allowedTypes.includes(file.type)) {
					alert('Недопустимый формат файла!')
					return
				}
				let payload = new FormData()
				payload.append('avatar', file)
				payload.append('user_id', this.user.id)
				const saveSuccess = await this.setProfileAvatar(payload)
				if (saveSuccess) {
					await this.$store.dispatch('auth/getUser')
				}
			}
		},
	}
}
</script>