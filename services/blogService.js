import request from './request'

const blogService = {
  getBlog: (params) => request.get(`/blog`, { params }, null),
  showBlog: (id, locale) => request.get(`/blog/${id}?lang=${locale}`),
  getBlogCategory: (params) => request.get(`/blog-category`, { params }),
}

export default blogService
