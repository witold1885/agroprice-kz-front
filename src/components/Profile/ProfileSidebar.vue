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
import { useCookies } from "vue3-cookies"
import axios from "axios";
import { API_URL } from '@/store/constants'

export default {
	setup () {
		const { cookies } = useCookies()
		return { cookies }
	},
	data () {
		return {
			menu: [
				{
					title: 'Личный кабинет', action: 'none', icon: 'user', active: true, children: [
						{ title: 'Настройки', link: null, active: false, children: [] },
						{ title: 'Сообщения', link: null, active: false, children: [] },
					]
				},
				{
					title: 'Объявление', action: 'none', icon: 'ad', active: false, children: [
						{ title: 'Мои объявления', link: null, active: false, children: [
							{ title: 'Опубликованные', link: null, active: true, children: [] },
							{ title: 'На модерации', link: null, active: false, children: [] },
							{ title: 'Отклонено', link: null, active: false, children: [] },
							{ title: 'Архив', link: null, active: false, children: [] },
							{ title: 'Корзина', link: null, active: false, children: [] },
						] },
						{ title: 'Разместить объявление', link: null, active: false, children: [] },
						{ title: 'Избранное', link: null, active: false, children: [] },
					]
				},
				{
					title: 'Выйти', action: 'logout', icon: 'logout', active: false, children: []
				},
			],
			user: null
		}
	},
	async mounted () {		
		let access_token = this.cookies.get("access_token")
		if (access_token) {
			this.user = await this.getUser(access_token)
		}
	},
	methods: {
		async setAction (action) {
			console.log(action)
			if (action == 'logout') {
				await this.logout()
			}
		},
		async logout () {
			let access_token = this.cookies.get("access_token")
			let response = await axios.post(API_URL + '/logout', {}, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-type": "application/json"
				}})
				.catch((error) => {
					console.log(error)
				})
			console.log(response.data)
			if (response.data.success) {
				this.cookies.remove('access_token')
				this.$user = null
				window.location.reload(true)
				this.$router.push('/')
			}
		},
		async getUser (token) {
			let res = await axios.get(API_URL + '/user', {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json"
				}})
			if (res.data.id) {
				return res.data
			}
			else {
				console.log(res.data.status)
				return null
			}
		}
	}
}
</script>