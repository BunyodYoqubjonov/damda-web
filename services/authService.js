import authRequest from './authRequest'

const authService = {
  login: (data) => authRequest.post('/login/email', data),
  loginGoogle: (params) => authRequest.post('/google/login', {}, { params }),
  RegisterGoogle: (params) =>
    authRequest.post('/google/register', {}, { params }),
  loginFacebook: (params) =>
    authRequest.post('/facebook/login', {}, { params }),
  RegisterFacebook: (params) =>
    authRequest.post('/facebook/register', {}, { params }),
  register: (params) => authRequest.post('/register', params, null),
  verifyPhoneCode: (params) =>
    authRequest.post('/register/phone/verify', params, null),
  verifyEmailCode: (params) =>
    authRequest.post('/register/email/verify', params, null),
  updatePassword: (params) =>
    authRequest.put('/register/user/details', {}, { params }),
  resetPassword: (data) => authRequest.post('/reset-password/phone', data),
  updatePasswordByLogin: (id, data) =>
    authRequest.put(`/${id}/reset-password`, data),
}

export default authService
