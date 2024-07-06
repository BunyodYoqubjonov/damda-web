import axios from '../utils/axios'

export const fetchMultipleUrls = async (requests) => {
  let data
  try {
    data = await Promise.all(
      requests.map(async (request) => {
        const response = request.endpoint
          ? await axios({
              url: request.endpoint,
              method: request?.method || 'GET',
              ...(request.body && { data: request.body }),
              headers: {
                Authorization: request.token,
              },
            })
              .then((res) => res)
              .catch((err) => {
                console.log('err => ', err)
                return err?.data
              })
          : await axios
              .get(request)
              .then((res) => res)
              .catch((err) => {
                console.log('err => ', err)
                return err?.data
              })
        return response || null
      })
    )
  } catch (error) {
    console.log('fetchMultipleUrls =>', error)
  }
  return data
}
