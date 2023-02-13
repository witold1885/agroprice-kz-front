import api from '@/services/api'

export const namespaced = true

export const state = {
  mainCategories: [],
  menuCategories: [],
  category: null,
  error: null,
}

export const mutations = {
  setCategory(state, category) {
    state.category = category
  },
  setMainCategories(state, categories) {
    state.mainCategories = categories
  },
  setMenuCategories(state, categories) {
    state.menuCategories = categories
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async getCategory ({ commit }, categoryUrl) {
    const response = await api.get('/catalog/category/' + categoryUrl)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setCategory', response.data.category)
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
  },
  async getMainCategories ({ commit }) {
    const response = await api.get('/catalog/main-categories/')
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setMainCategories', response.data.categories)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getMenuCategories ({ commit }) {
    const response = await api.get('/catalog/menu-categories/')
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setMenuCategories', response.data.categories)
    }
    else {
      console.log(response.data.error)
    }
  }
}

export const getters = {

}
