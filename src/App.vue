<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile">Profile</router-link>
  </nav> -->
  <div id="main-container">
    <Header />
    <router-view />    
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useCookies } from "vue3-cookies"
import axios from "axios";
import { API_URL } from '@/store/constants'

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    Header,
    Footer
  },
  async mounted() {
    let access_token = this.cookies.get("access_token")
    if (access_token) {
      this.$user = await this.getUser(access_token)
    }
  },
  methods: {
    async getUser (token) {
      let res = await axios.get(API_URL + '/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        }})
      console.log(res)
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

<style lang="scss">
@import '@/assets/styles/app.scss';
@import '@/assets/styles/common.scss';
</style>
