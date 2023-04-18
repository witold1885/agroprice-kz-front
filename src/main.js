import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager, defaultConfig, plugin as vueMetaPlugin } from 'vue-meta'
import mitt from 'mitt'
const emitter = mitt()
import Vue3TouchEvents from 'vue3-touch-events'

const app = createApp(App)

app.config.globalProperties.emitter = emitter

const handleResize = () => {
	let breakpoint
	if (window.innerWidth > 992) breakpoint = 'lg'
	else if (window.innerWidth > 414) breakpoint = 'md'
	else breakpoint = 'sm'
	app.config.globalProperties.breakpoint = breakpoint
}

handleResize()
window.addEventListener('resize', handleResize)

app
  .use(router)
	.use(store)
	.use(createMetaManager(false, {
		...defaultConfig,
		meta: { tag: 'meta', nameless: true },
  }))
	.use(vueMetaPlugin)
	.use(Vue3TouchEvents)
  .mount('#app')
