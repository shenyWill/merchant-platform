export default {
  serverURL: 'http://172.16.19.135:8084/aicloudmerchant',
  prepro: '',
  loginAPI: '/aicloudmerchant/merchant/useraccount/login',

  product: {
    all: '/aicloudmerchant/merchant/userproduct/all',
    list: '/aicloudmerchant/merchant/userproduct/page',
    add: '',
    update: '',
    test: ''
  },

  account: {
    list: ''
  },

  application: {
    list: '/aicloudmerchant/merchant/userapp/page',
    type: '/aicloudmerchant/merchant/userapp/types',
    add: '/aicloudmerchant/merchant/userapp/add',
    notsign: '/aicloudmerchant/merchant/userapp/notsigns',
    bind: '/aicloudmerchant/merchant/userapp/bindproduct',
    modify: '/aicloudmerchant/merchant/userapp/modify'
  },

  stat: {
  }
};
