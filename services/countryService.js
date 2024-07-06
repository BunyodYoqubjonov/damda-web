import request from './request'

const countryService = {
    getCountry: (params) => request.get('/countries', {params}),
    getForWhom: (params) => request.get(`residence/client/types`, params),
}
export default countryService