import axios from 'axios'
import { API_URL } from 'constants/env'

const request = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  timeoutErrorMessage: 'timeout',
})

request.interceptors.request.use(
  (config) => {
    return config
  },

  (error) => errorHandler(error)
)

const errorHandler = (error, hooks) => {
  if (error?.response) {
    if (error?.response?.status === 403) {
    } else if (error?.response?.status === 401) {
    }
  }

  if (error.code === 'ECONNABORTED') {
    return Promise.reject({
      data: {
        message: 'Timeout',
      },
    })
  }

  return Promise.reject(error.response)
}

request.interceptors.response.use((response) => response.data, errorHandler)

export default request
