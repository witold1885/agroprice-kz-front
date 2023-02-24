import api from '@/services/api'

export const namespaced = true

export const state = {

}

export const mutations = {

}

export const actions = {
  async saveProduct (context, payload) {
    console.log(payload)
    const response = await api.post('/product/save/', payload, { headers: { "Content-Type": "multipart/form-data" } })
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    return {
      success: response.data.success,
      error: response.data.error || null
    }
  }
}

export const getters = {

}
