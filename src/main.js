// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import api from './api';
import config from './config';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
import './assets/css/common.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);

async function getUser () {
  const response = await api.post(config.account.user);
  if (response.data.resCode === '200') {
    const user = response.data.data;
    store.commit('SET_USER', user);
    return user;
  } else {
    return null;
  }
}

router.beforeEach(async (to, from, next) => {
  let user = store.state.user;
  if (!user) user = await getUser();
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    });
    return;
  }
  if (user && to.path === '/login') {
    next({
      path: '/product'
    });
    return;
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
