<template>
  <div id="main-container">
    <Header />
    <router-view />    
  </div>
  <Footer />
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState('auth', ['user']),
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
