import api from '@/services/api'
import { capitalize } from '@/services/helpers'

export const namespaced = true

export const state = {
  banner: null,

  blogCategories: [],
  blogArticles: [],
  lastBlogArticles: [],
  blogPages: 1,
  blogArticle: null,
  category_id: null,

  newsCategories: [],
  newsArticles: [],
  lastNewsArticles: [],
  newsPages: 1,
  newsArticle: null,

  error: null
}

export const mutations = {
  setBanner(state, banner) {
    state.banner = banner
  },
  setBlogCategories(state, categories) {
    state.blogCategories = categories
  },
  setArticles(state, data) {
    state[`${data.view}Articles`] = data.articles
  },
  setLastArticles(state, data) {
    state[`last${capitalize(data.view)}Articles`] = data.lastArticles
  },
  setPages(state, data) {
    state[`${data.view}Pages`] = data.pages
  },
  setArticle(state, data) {
    state[`${data.view}Article`] = data.article
  },
  setBlogCategoryId(state, category_id) {
    state.category_id = category_id
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
  },
  async getBlogCategories ({ commit }) {
    const response = await api.get('/blog/categories')
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setBlogCategories', response.data.categories)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getArticles ({ commit }, payload) {
    const response = await api.post(`/${payload.view}/articles`, payload)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setPages', { view: payload.view, pages: response.data.pages })
      commit('setArticles', { view: payload.view, articles: response.data.articles })
    }
    else {
      console.log(response.data.error)
    }
  },
  async getLastArticles ({ commit }, payload) {
    const response = await api.get(`/${payload.view}/last-articles`)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setLastArticles', { view: payload.view, lastArticles: response.data.lastArticles })
    }
    else {
      console.log(response.data.error)
    }
  },
  async getArticle ({ commit }, payload) {
    const response = await api.get(`/${payload.view}/article/${payload.articleUrl}`)
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      commit('setArticle', { view: payload.view, article: response.data.article })
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
  },
  async increaseArticleViews (context, payload) {
    const response = await api.post(`/${payload.view}/increase-views/`, payload)
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
  }
}

export const getters = {

}
