import api from '@/services/api'

export const namespaced = true

export const state = {
  banner: null,
  blogCategories: [],
  blogArticles: [],
  blogLastArticles: [],
  lastBlogArticles: [],
  pages: 1,
  blogArticle: null,
  error: null
}

export const mutations = {
  setBanner(state, banner) {
    state.banner = banner
  },
  setBlogCategories(state, categories) {
    state.blogCategories = categories
  },
  setBlogArticles(state, articles) {
    state.blogArticles = articles
  },
  setBlogLastArticles(state, lastArticles) {
    state.blogLastArticles = lastArticles
  },
  setLastBlogArticles(state, lastArticles) {
    state.lastBlogArticles = lastArticles
  },
  setPages(state, pages) {
    state.pages = pages
  },
  setBlogArticle(state, article) {
    state.blogArticle = article
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
    console.log(response.data)
    if (response.data.success) {
      commit('setBlogCategories', response.data.categories)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getBlogArticles ({ commit }, payload) {
    const response = await api.post('/blog/articles', payload)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setPages', response.data.pages)
      commit('setBlogArticles', response.data.articles)
      commit('setBlogLastArticles', response.data.lastArticles)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getLastBlogArticles ({ commit }) {
    const response = await api.get('/blog/last-articles')
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setLastBlogArticles', response.data.lastArticles)
    }
    else {
      console.log(response.data.error)
    }
  },
  async getBlogArticle ({ commit }, articleUrl) {
    const response = await api.get('/blog/article/' + articleUrl)
      .catch((error) => {
        console.log(error)
      })
    console.log(response.data)
    if (response.data.success) {
      commit('setBlogArticle', response.data.article)
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
  },
  async increaseArticleViews (context, payload) {
    const response = await api.post('/blog/increase-views/', payload)
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
  }
}

export const getters = {

}
