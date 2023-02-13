<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ${siteName}` : `${siteName}` }}</template>
    <template v-slot:description="{ content }">{{ content }}</template>
    <template v-slot:keywords="{ metaInfo }">{{ metaInfo.content }}</template>
  </metainfo>
  <div id="main-container">
    <Header />
    <router-view />    
  </div>
  <Footer />
</template>

<script>
import { SITE_NAME } from '@/constants'
import { useMeta } from 'vue-meta'
import { mapState } from 'vuex'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  setup () {
    useMeta({
      title: 'Главная страница',
      description: 'Agroprice',
      meta: [
        { name: 'keywords', content: 'Agroprice'},
      ],
      htmlAttrs: { lang: 'ru', amp: true }
    })
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState('auth', ['user']),
    siteName () {
      return SITE_NAME
    }
  },
  async mounted() {
    await this.$store.dispatch('auth/getUser')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/app.scss';
@import '@/assets/styles/common.scss';
</style>
