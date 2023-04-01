import api from '@/services/api'

export const namespaced = true

export const state = {
  mainCategories: [],
  menuCategories: [],
  randomProducts: [],
  sellerProducts: [],
  searchResult: {
    products: [],
    categories: [],
  },
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
  setRandomProducts(state, products) {
    state.randomProducts = products
  },
  setSellerProducts(state, products) {
    state.sellerProducts = products
  },
  setSearchResult(state, data) {
    state.searchResult.products = data.products
    state.searchResult.categories = data.categories
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
  },
  async getChildCategories (context, parent_id) {
    const response = await api.get('/catalog/child-categories/' + parent_id)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      return response.data.categories
    }
    else {
      console.log(response.data.error)
      return null
    }
  },
  async getCategoryProducts (context, payload) {
    // const response = await api.get('/catalog/category-products/' + category_id + '/' + page + '/' + limit)
    // const response = await api.get('/catalog/category-products/' + payload.category_id + '/' + payload.page)
    const response = await api.post('/catalog/category-products', payload)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      return response.data
    }
    else {
      console.log(response.data.error)
      return null
    }
  },
  async getRandomProducts ({ commit }) {
    const response = await api.get('/catalog/random-products/')
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setRandomProducts', response.data.products)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getSellerProducts ({ commit }, payload) {
    const response = await api.post('/catalog/seller-products/', payload)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setSellerProducts', response.data.products)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getSearchResult ({ commit }, payload) {
    const response = await api.post('/catalog/search/', payload)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setSearchResult', response.data)
    }
    else {
      console.log(response.data.error)
    }
  }
}

export const getters = {

}
