import api from '@/services/api'

export const namespaced = true

export const state = {
  locations: [],
  error: null,
}

export const mutations = {
  setLocations(state, locations) {
    state.locations = locations
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async getLocations ({ commit }) {
    const response = await api.get('/locations/get/')
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setLocations', response.data.locations)
    }
    else {
      console.log(response.data.error)
    }
  },
  async searchLocations (context, search) {
    const response = await api.get('/locations/search/' + search)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      return response.data.locations
    }
    else {
      console.log(response.data.error)
      return null
    }
  },
}

export const getters = {

}
