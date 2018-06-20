// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
/* eslint-disable no-unused-vars */
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
Vue.use(ElementUI);
/* eslint-enable no-unused-vars */

Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

