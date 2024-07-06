import axios from 'axios'
import { API_URL_AUTH } from 'constants/env'
import { toast } from 'react-toastify'
import { errors } from '../locales/errors'
import getCookie from '../utils/getCookie'

const authRequest = axios.create({
  baseURL: API_URL_AUTH,
  timeout: 8000,
})

authRequest.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token')
    if (token) {
      config.headers.Authorization = decodeURI(token)
    }
    return config
  },

  (error) => errorHandler(error)
)

const errorHandler = (error, hooks) => {
  const locale = getCookie('locale') || 'ru'
  if (error?.response) {
    if (error.response?.data?.message) {
      toast.error(errors[locale][error.response.data.statusCode])
    }

    if (error?.response?.status === 403) {
    } else if (error?.response?.status === 401) {
      //   store.dispatch(logout())
    }
  }

  return Promise.reject(error.response)
}

authRequest.interceptors.response.use((response) => response.data, errorHandler)

export default authRequest
