import axios from 'axios'
import { API_URL } from '@/constants'

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: true, // required to handle the CSRF token
})

export default api
