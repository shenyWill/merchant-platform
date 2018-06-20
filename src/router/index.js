import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import Secret from '@/components/secret/Index';
import SecretGenerate from '@/components/secret/Generate';
import Product from '@/components/product/Index';
import Application from '@/components/Application/Index';
import Account from '@/components/account/Index';

import StatsDetail from '@/components/stats/Detail';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index,
      children: [{
        path: '/product',
        name: 'Product',
        component: Product
      },
      {
        path: '/application',
        name: 'Application',
        component: Application
      }, {
        path: '/stats',
        name: 'Stats',
        component: StatsDetail
      }, {
        path: '/secret/index',
        name: 'Secret',
        component: Secret
      }, {
        path: '/secret/generate',
        name: 'SecretGenerate',
        component: SecretGenerate
      }, {
        path: '/account',
        name: 'Account',
        component: Account
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
