import api from '@/services/api'
import { useCookies } from 'vue3-cookies'

export const namespaced = true

export const state = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  setToken (state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  setError(state, error) {
    state.error = error
  },
}

export const actions = {
  getToken ({ commit }) {
    const { cookies } = useCookies()
    const token = cookies.get("access_token")
    commit('setToken', token)
  },
  saveToken ({ commit }, token) {
    const { cookies } = useCookies()
    cookies.set('access_token', token)
    commit('setToken', token)
  },
  deleteToken ({ commit }) {
    const { cookies } = useCookies()
    cookies.remove('access_token')
    commit('setToken', null)
  },
  async getUser ({ commit, dispatch }) {
    dispatch('getToken')
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
    // console.log(response)
    if (response.data.id) {
      commit('setUser', response.data)
    }
    else {
      console.log(response.data.status)
      commit('setUser', null)
    }
  },
  async loginUser ({ commit, dispatch }, payload) {
    commit('setError', null)
    const response = await api.post('/login', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка авторизации. Попробуйте позже')
      })
    // console.log(response.data)
    if (response.data.success) {
      dispatch('saveToken', response.data.access_token)
      commit('setUser', response.data.user)
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
    return false
  },
  async registerUser ({ commit, dispatch }, payload) {
    commit('setError', null)
    const response = await api.post('/register', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка регистрации. Попробуйте позже')
      })
    // console.log(response)
    if (response.data.success) {
      dispatch('saveToken', response.data.access_token)
      commit('setUser', response.data.user)
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
    return false
  },
  async forgotPassword ({ commit }, payload) {
    commit('setError', null)
    const response = await api.post('/password/forgot', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка отправки запроса. Попробуйте позже')
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
  async checkResetPassword (context, resetToken) {
    const response = await api.get('/password/check/' + resetToken)
      .catch((error) => {
        console.log(error)
      })
    return response.data.existToken ? true : false
  },
  async resetPassword ({ commit }, payload) {
    commit('setError', null)
    if (!payload.token) {
      commit('setError', 'Ошибка. Не указан ключ')
      return
    }
    const response = await api.post('/password/change', payload)
      .catch((error) => {
        console.log(error)
        commit('setError', 'Ошибка восстановления пароля. Попробуйте позже')
      })
    // console.log(response)
    if (response.data.success) {
      return true
    }
    else {
      console.log(response.data.error)
      commit('setError', response.data.error)
    }
    return false
  },
  async logoutUser ({ commit, dispatch }) {
    dispatch('getToken')
    const response = await api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-type": "application/json"
      }})
      .catch((error) => {
        console.log(error)
      })
    // console.log(response.data)
    if (response.data.success) {
      dispatch('deleteToken')
      commit('setUser', null)
      return true
    }
    return false
  },
  setGuest(context, { value }) {
    window.localStorage.setItem("guest", value)
  },
}

export const getters = {
  authUser: (state) => {
    return state.user
  },
  error: (state) => {
    return state.error
  },
  loading: (state) => {
    return state.loading
  },
  loggedIn: (state) => {
    return !!state.user
  },
  guest: () => {
    const storageItem = window.localStorage.getItem("guest")
    if (!storageItem) return false
    if (storageItem === "isGuest") return true
    if (storageItem === "isNotGuest") return false
  },
}
