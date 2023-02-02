<template>
	<div class="mobile-menu">
		<button
			v-if="!showMenu"
			class="mobile-menu__button d-flex flex-column justify-content-center align-items-end"
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
		<div v-if="showMenu" class="mobile-menu__dropdown">
			<div class="mobile-menu__dropdown-items">
				<div
					v-for="(item, index) of menuItems"
					:key="index"
					class="mobile-menu__dropdown-item d-flex align-items-center"
				>
					<div class="mobile-menu__dropdown-item-wrap d-flex justify-content-between align-items-center">
						<a class="mobile-menu__dropdown-item-title">{{ item.title }}</a>
						<img
							class="mobile-menu__dropdown-item-arrow mobile-menu__dropdown-item-arrow-green"
							:src="require('@/assets/images/arrow-right-green.png')"
						/>
						<img
							class="mobile-menu__dropdown-item-arrow mobile-menu__dropdown-item-arrow-white"
							:src="require('@/assets/images/arrow-right-white.png')"
						/>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import CloseButton from '@/components/Common/CloseButton'

export default {
	components: {
		CloseButton
	},
	data () {
		return {
			showMenu: false,			
			menuItems: [
				{ title: 'Новости', active: true },
				{ title: 'О компании', active: false },
				{ title: 'Блог', active: false },
				{ title: 'Вакансии', active: false },
				{ title: 'Обратная связь', active: false },
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
		}
	}
}
</script>