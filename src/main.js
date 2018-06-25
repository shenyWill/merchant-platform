// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import config from './config';
import api from './api';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
import './assets/css/common.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);

async function getUser () {
  const response = await api.post(config.account.user);
  if (response.data.resCode === '200') {
    return response.data.data;
  } else {
    return null;
  }
}

router.beforeEach(async (to, from, next) => {
  let user = store.state.user;
  if (!user && to.path !== '/login') user = await getUser();
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
