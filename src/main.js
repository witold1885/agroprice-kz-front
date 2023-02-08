import { createApp } from 'vue'
// import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import store from './store'

/*const app = createApp(App)
	// .use(VueCookie)
	// .provide('cookies', app.config.globalProperties.$cookies)
	.use(store)
	.use(router)
	.mount('#app')*/

const app = createApp(App)

app.config.globalProperties = {
  user: null
}

app.use(store)
  .use(router)
  .mount('#app')
