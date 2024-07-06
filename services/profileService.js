import request from './request'

const profileService = {
  getUserDetails: (params) => request.get('users/detail', { params }),
  fileUpload: (data) => request.post('galleries', data),
  deleteImage: (id) => request.delete(`galleries/${id}`),
  updateUserDetails: (params) => request.put('users/detail', params),
  updatePassword: (params) => request.put('users/password', params),
  getBookings: (params) => request.get('residence/bookings', { params }),
  myResidences: (params) => request.get('/users/residences', { params }),
  getMyResidenceById: (id, params) =>
    request.get(`/users/residences/${id}`, { params }),
}

export default profileService
