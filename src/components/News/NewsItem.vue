<template>
	<div class="news-item d-flex flex-column justify-content-between">
		<div class="news-item__info">
			<img class="news-item__image" :src="require(`@/assets/images/news/${item.image}`)" />
			<div class="news-item__badge">Новости</div>
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
				<span class="news-item__stats-date-value">{{ item.date }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default: () => {}
		}
	}
}
</script>