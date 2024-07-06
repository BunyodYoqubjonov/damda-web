import request from './request'

const subscriptionService = {
  getAll: (params) => request.get('/subscriptions/paginate', { params }),
  getMySubscriptions: (params) => request.get('/subscriptions', { params }),
  create: (id, data) => request.post(`/subscription/${id}/attach`, data),
  createTransaction: (id, data) =>
    request.post(`/payments/subscription/${id}/transactions`, data),
}

export default subscriptionService
