import request from './request'

const residenceService = {
  mainInfo: (data) => request.post('residence', data),
  updateMain: (id, data) => request.put(`residence/${id}`, data),
  getAttributes: (params) => request.get('/attributes', { params }),
  getFeatures: (params) => request.get('/feature', { params }),
  updateFeatures: (data) => request.post('/residence/feature', data),
  attributes: (data) => request.post('residence/attribute', data),
  getAreaTypes: (params) => request.get(`/residences/area/types`, { params }),
  getAreaTitles: (params) => request.get(`/residences/area/titles`, { params }),
  areaCreate: (data) => request.post('residence/area', data),
  areaList: (id, params) => request.get(`residence/${id}/area`, { params }),
  deleteArea: (residence_id, id) =>
    request.delete(`residence/${residence_id}/area?id=${id}`),
  updateArea: (residence_id, id, params) =>
    request.put(`residence/${residence_id}/area?id=${id}`, params),
  sorting: (data) => request.get('residences/paginate', { data }),
  getResidences: (type) => request.get(`residences/recommended?type=${type}`),
  getResidence: (params) => request.get('residences/paginate', { params }),
  getResidenceById: (id) => request.get(`residences/show/${id}`),
  switchResidence: (id, data) => request.post(`residence/${id}/status`, data),
  statistics: () => request.get(`residence/statistics`),
  setWishlist: (id) => request.post(`wishlist?residence_id=${id}`),
  deleteWishlist: (id) => request.delete(`wishlist?residence_id=${id}`),
  getFooter: (lang) => request.get(`/footer?lang=${lang}`),
  showFooter: (id) => request.get(`/footer/?id=${id}`),
  reviewCreate: (id, data) => request.post(`residences/${id}/review`, data),
}
export default residenceService
