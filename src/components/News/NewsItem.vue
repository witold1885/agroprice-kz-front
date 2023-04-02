<template>
	<a :href="`/blog/${item.url}`" class="news-item d-flex flex-column justify-content-between">
		<div class="news-item__info">
			<img class="news-item__image" :src="`${storageURL}/${item.image}`" />
			<div class="news-item__badge">{{ articleType }}</div>
			<div class="news-item__title">{{ item.title }}</div>
		</div>
		<div class="news-item__stats d-flex justify-content-between align-items-center">
			<div class="news-item__stats-views d-flex align-items-center">
				<img
					class="news-item__stats-views-icon"
					:src="require('@/assets/images/eye.png')"
				/>
				<span class="news-item__stats-views-value">{{ item.views }}</span>
			</div>
			<div class="news-item__stats-date d-flex align-items-center">
				<img
					class="news-item__stats-date-icon"
					:src="require('@/assets/images/calendar.png')"
				/>
				<span class="news-item__stats-date-value">{{ formatDate(new Date(item.created_at)) }}</span>
			</div>
		</div>
	</a>
</template>

<script>
import { STORAGE_URL } from '@/constants'

export default {
	props: {
		item: {
			type: Object,
			default: () => {}
		},
		articleType: {
			type: String,
			default: 'Новости'
		}
	},
	computed: {
		storageURL () {
			return STORAGE_URL
		}
	},
    methods: {
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			month = month >= 10 ? month : '0' + month
			let day = date.getDate()
			day = day >= 10 ? day : '0' + day
			return `${day}.${month}.${year}`
		}
	}
}
</script>