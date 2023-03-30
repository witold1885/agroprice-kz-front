import api from '@/services/api'

export const namespaced = true

export const state = {
  product: null,
  error: null,
}

export const mutations = {
  setProduct (state, product) {
    state.product = product
  },
}

export const actions = {
  async saveProduct (context, payload) {
    const response = await api.post('/product/save/', payload, { headers: { "Content-Type": "multipart/form-data" } })
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    return {
      success: response.data.success,
      error: response.data.error || null,
      line: response.data.line || null
    }
  },
  async getProduct ({ commit }, productUrl) {
    const response = await api.get('/product/get/' + productUrl)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setProduct', response.data.product)
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
  },
  async increaseProductViews (context, payload) {
    const response = await api.post('/product/increase-views/', payload)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      return false
    }
  },
}

export const getters = {

}
