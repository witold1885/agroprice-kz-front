import api from '@/services/api'

export const namespaced = true

export const state = {

}

export const mutations = {

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
  }
}

export const getters = {

}
