import api from '@/services/api'

export const namespaced = true

export const state = {
  banner: null,
  error: null,
}

export const mutations = {
  setBanner(state, banner) {
    state.banner = banner
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async getBanner ({ commit }, payload) {
    const response = await api.get('/info/banner/' + payload.code)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setBanner', response.data.banner)
    }
    else {
      console.log(response.data.error)
    }
  },
  async sendFeedback ({ commit }, payload) {
    const response = await api.post('/info/send-feedback', payload)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
      return false
    }
  }
}

export const getters = {

}
