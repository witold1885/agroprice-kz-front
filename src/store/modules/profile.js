import api from '@/services/api'
import { useCookies } from 'vue3-cookies'

export const namespaced = true

export const state = {
  token: null,
  favorites: [],
  products: [],
  pages: 1,
  product: null,
  error: null,
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setFavorites(state, favorites) {
    state.favorites = favorites
  },
  setProducts(state, products) {
    state.products = products
  },
  setPages(state, pages) {
    state.pages = pages
  },
  setProduct(state, product) {
    state.product = product
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  getToken ({ commit }) {
    const { cookies } = useCookies()
    const token = cookies.get("access_token")
    commit('setToken', token)
  },
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
  },
  async setProfileAvatar ({ commit }, payload) {
    const response = await api.post('/profile/set-avatar', payload)
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
  async getProfileProducts ({ commit }, payload) {
    let searchString = payload.search ? ('?search=' + payload.search) : '' 
    const response = await api.get('/profile/products/all/' + payload.user_id + '/' + payload.page + '/' + payload.status + searchString)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      // return response.data
      commit('setPages', response.data.pages)
      commit('setProducts', response.data.products)
    }
    else {
      console.log(response.data.error)
      // return null
    }
  },
  async getProfileProduct ({ dispatch }, payload) {
    dispatch('getToken')
    const response = await api.get('/profile/products/get/' + payload.product_id, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      return response.data.product
      // commit('setProduct', response.data.product)
    }
    else {
      console.log(response.data.error)
      return null
    }
  },
  async changeProfileProductStatus ({ commit, dispatch }, payload) {
    dispatch('getToken')
    const response = await api.post('/profile/products/change-status', payload, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
        commit('setError', 'Внутренняя ошибка. Попробуйте позже')
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
  async addProductToFavorites ({ dispatch }, payload) {
    dispatch('getToken')
    const response = await api.post('/profile/products/add-favorite', payload, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      return false
    }
  },
  async delProductFromFavorites ({ dispatch }, payload) {
    dispatch('getToken')
    const response = await api.post('/profile/products/del-favorite', payload, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      return false
    }
  },
  async getProfileFavorites ({ commit, dispatch }, payload) {
    dispatch('getToken')
    const response = await api.get('/profile/favorites/all/' + payload.user_id + '/' + payload.page, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      // return response.data
      commit('setPages', response.data.pages)
      commit('setFavorites', response.data.favorites)
    }
    else {
      console.log(response.data.error)
      // return null
    }
  },
}

export const getters = {

}
