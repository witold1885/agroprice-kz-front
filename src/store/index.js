import { createStore } from 'vuex'
import * as auth from './modules/auth'
import * as profile from './modules/profile'
import * as catalog from './modules/catalog'
import * as location from './modules/location'
import * as info from './modules/info'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    profile,
    catalog,
    location,
    info,
  }
})
