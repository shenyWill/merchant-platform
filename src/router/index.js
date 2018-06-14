import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import Product from '@/components/product/Index';
import Application from '@/components/Application/Index';

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
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
