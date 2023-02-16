import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager, defaultConfig, plugin as vueMetaPlugin } from 'vue-meta'
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.config.globalProperties.emitter = emitter

app
  .use(router)
	.use(store)
	.use(createMetaManager(false, {
		...defaultConfig,
		meta: { tag: 'meta', nameless: true },
  }))
	.use(vueMetaPlugin)
  .mount('#app')
