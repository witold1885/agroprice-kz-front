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
    // this.cookies.set("access_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTY3NTgwNzg1MiwiZXhwIjoxNjc1ODExNDUyLCJuYmYiOjE2NzU4MDc4NTIsImp0aSI6IlNrWUd5QWdkN3E2dEJBRlEiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ZblV5rOjxIVP9q9q_rIvW5DddQcKEzblcGqrPO6lfgc");
    let access_token = this.cookies.get("access_token")
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTY3NTgwNzg1MiwiZXhwIjoxNjc1ODExNDUyLCJuYmYiOjE2NzU4MDc4NTIsImp0aSI6IlNrWUd5QWdkN3E2dEJBRlEiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ZblV5rOjxIVP9q9q_rIvW5DddQcKEzblcGqrPO6lfgc
    if (access_token) {
      this.$user = await this.getUser(access_token)
    }
  },
  methods: {
    async getUser (token) {
      let res = await axios.get('http://localhost:8000/api/user', {
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

<style lang="scss">
@import '@/assets/styles/app.scss';
@import '@/assets/styles/common.scss';
</style>
