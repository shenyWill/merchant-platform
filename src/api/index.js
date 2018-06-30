import axios from 'axios';
import router from '@/router';
import {
  Message
} from 'element-ui';

const service = axios.create({
  // config
});

/*
 * Request Interceptor
 *
 * */
service.interceptors.request.use(config => {
  let reg = new RegExp('[|&;$%\'"<>()+,]');
  let NoFilterKey = ['publickey', 'apiCode', 'boundIp'];
  const request = config.data;
  for (let item in request) {
    if (NoFilterKey.indexOf(item) < 0) {
      if (reg.test(request[item])) {
        Message({
          type: 'error',
          message: '请不要输入不合法的特殊字符！'
        });
        return;
      }
    }
  }
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
  get(url, data) {
    return service.get(url, {
      params: data
    });
  },
  post(url, data = null, config = {}) {
    return service.post(url, data, config);
  }
};
