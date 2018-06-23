import axios from 'axios';
import router from '@/router';

const service = axios.create({
  // config
});

/*
 * Request Interceptor
 *
 * */
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

/*
 * Response Interceptor
 *
 * */
service.interceptors.response.use(response => {
  if (response.data.resCode === '1004') {
    router.push('/login');
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export default {
  get (url, data) {
    return service.get(url, {
      params: data
    });
  },
  post (url, data = null, config = {}) {
    return service.post(url, data, config);
  }
};
