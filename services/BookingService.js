import request from './request'

const bookingService = {
  areaType: (params) => request.get('residence/area/types', { params }),
  getReviews: (id) => request.get(`/residences/${id}`),
  deleteByID: (id) => request.delete(`/booking/${id}`),
  create: (data) => request.post('/booking', data),
  deleteAll: (data) => request.delete(`/booking/users/mass/delete`, { data }),
  list: (params) => request.get(`/bookings/paginate`, { params }),
  detailsList: (id, locale) => request.get(`/booking/${id}`),
  getStatuses: () => request.get('/booking/status/types'),
  myResidenceBookings: (params) =>
    request.get('/bookings/residences/paginate', { params }),
  myResidenceBookingStatusChange: (id, data) =>
    request.post(`/booking/${id}/status/update`, data),
  myResidenceBookingDelete: (data) =>
    request.delete(`/booking/owners/mass/delete`, { data }),
}
export default bookingService
