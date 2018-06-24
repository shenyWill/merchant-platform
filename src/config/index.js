export default {
  serverURL: 'http://172.16.19.135:8084/aicloudmerchant',
  prepro: '',
  loginAPI: '/aicloudmerchant/merchant/useraccount/login',
  user: '/aicloudmerchant/merchant/useraccount/currentuser',

  product: {
    all: '/aicloudmerchant/merchant/userproduct/all',
    detail: '/aicloudmerchant/merchant/userapp/detail',
    list: '/aicloudmerchant/merchant/userproduct/page',
    modify: '/aicloudmerchant/merchant/userapp/modify',
    add: '',
    update: '',
    test: ''
  },

  account: {
    list: '',
    user: '/aicloudmerchant/merchant/useraccount/currentuser',
    merchant: '/aicloudmerchant/merchant/userinfo/detail',
    changePwd: '/aicloudmerchant/merchant/useraccount/modifypassword',
    changeEmail: '/aicloudmerchant/merchant/useraccount/modifyemail',
    changeMobile: '/aicloudmerchant/merchant/useraccount/modifyphone',
    validateImage: '/aicloudmerchant/imageservlet'
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
    day: '/aicloudmerchant/merchant/userrecord/grouphour',
    week: '/aicloudmerchant/merchant/userrecord/groupweek',
    month: '/aicloudmerchant/merchant/userrecord/groupcurrmonth',
    upmonth: '/aicloudmerchant/merchant/userrecord/groupupmonth',
    year: '/aicloudmerchant/merchant/userrecord/groupyear',
    searchDay: '/aicloudmerchant/merchant/userrecord/groupday',
    page: '/aicloudmerchant/merchant/userrecord/page'
  },

  secret: {
    generate: '/aicloudmerchant/merchant/userapp/signkey'
  }
};
