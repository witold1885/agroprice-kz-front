import { createStore } from 'vuex'
import * as auth from './modules/auth'
import * as profile from './modules/profile'
import * as catalog from './modules/catalog'

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
  }
})
