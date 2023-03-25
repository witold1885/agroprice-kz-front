import api from '@/services/api'

export const namespaced = true

export const state = {
  error: null,
}

export const mutations = {
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async saveProfile ({ commit }, payload) {
    const response = await api.post('/complete', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка сохранения профиля. Попробуйте позже')
      })
    // console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
    return false
  },
  async updateProfile ({ commit }, payload) {
    const response = await api.post('/profile/update', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка сохранения профиля. Попробуйте позже')
      })
    // console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
    return false
  }
}

export const getters = {

}
