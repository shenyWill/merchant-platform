/*
 * Basic Usage:
 *
 * import api from '@/api'
 *
 * GET():
 * api.get(url, data)
 *  .then(res => {
 *  })
 *
 *
 * POST():
 * api.post(url, {
 *  ...data
 *  })
 *  .then(res => {
 *  })
 * */
import axios from 'axios'
import config from '@/config'
import router from '@/router'

const service = axios.create({
  
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
  get(url, data) {
    return service.get(url, {
      params: data,
    })
  },
  post(url, data=null) {
    return service.post(url, data)
  },
}
