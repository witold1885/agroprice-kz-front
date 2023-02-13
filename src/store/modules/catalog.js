import api from '@/services/api'

export const namespaced = true

export const state = {
  category: null,
  error: null,
}

export const mutations = {
  setCategory(state, category) {
    state.category = category
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
  }
}

export const getters = {

}
