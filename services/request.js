import axios from 'axios'
import { API_URL } from 'constants/env'
import { toast } from 'react-toastify'
import { errors } from '../locales/errors'
import getCookie from '../utils/getCookie'

const request = axios.create({
  baseURL: API_URL,
  timeout: 8000,
})

request.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token')
    const locale = getCookie('locale') || 'ru'
    if (token) {
      config.headers.Authorization = decodeURI(token)
    }
    if (config.method === 'get') {
      config.params = { lang: locale, ...config.params }
    }
    return config
  },

  (error) => errorHandler(error)
)

const errorHandler = (error) => {
  const locale = getCookie('locale') || 'ru'
  if (error?.response) {
    if (error.response?.data?.message) {
      toast.error(errors[locale][error.response.data.statusCode])
    }

    if (error?.response?.status === 403) {
    } else if (error?.response?.status === 401) {
      // store.dispatch(logout())
    }
  }

  return Promise.reject(error.response)
}

request.interceptors.response.use((response) => response.data, errorHandler)

export default request
