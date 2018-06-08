import axios from 'axios'

const service = axios.create({
  // config
})

/*
 * Request Interceptor
 *
 * */
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/*
 * Response Interceptor
 *
 * */
service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default {
  get (url, data) {
    return service.get(url, {
      params: data
    })
  },
  post (url, data = null) {
    return service.post(url, data)
  }
}
