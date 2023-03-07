<template>
  <div class="home">
    <Banner />
    <h1 class="heading-1" style="height: 0; color: white; margin: 0;">Сельскохозяйственная техника в Казахстане купить</h1>
    <MainCatalog />
    <NewsCarousel
      title="Новости"
      :news="homeNews"
    />
  </div>
</template>

<script>
import Banner from '@/components/Banner/Banner'
import MainCatalog from '@/components/Catalog/MainCatalog'
import NewsCarousel from '@/components/News/NewsCarousel'
import news from '@/components/News/news.js'

export default {
  name: 'HomeView',
  components: {
    Banner,
    MainCatalog,
    NewsCarousel,
  },
  data () {
    return {
      homeNews: news
    }
  }
}
</script>
