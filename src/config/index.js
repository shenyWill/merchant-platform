export default {
  serverURL: 'http://172.16.19.135:8084/aicloudmerchant',
  prepro: '',
  loginAPI: '/aicloudmerchant/merchant/useraccount/login',
  logout: '/aicloudmerchant/merchant/useraccount/loginout',
  user: '/aicloudmerchant/merchant/useraccount/currentuser',

  product: {
    all: '/aicloudmerchant/merchant/userproduct/all',
    list: '/aicloudmerchant/merchant/userproduct/page',
    add: '',
    update: '',
    faceCompare: '/aicloudmerchant/merchant/test/rl',
    faceAuth: '/aicloudmerchant/merchant/test/rz',
    appList: '/aicloudmerchant/merchant/test/signapps'
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
    detail: '/aicloudmerchant/merchant/userapp/detail',
    type: '/aicloudmerchant/merchant/userapp/types',
    add: '/aicloudmerchant/merchant/userapp/add',
    notsign: '/aicloudmerchant/merchant/userapp/notsigns',
    bind: '/aicloudmerchant/merchant/userapp/bindproduct',
    modify: '/aicloudmerchant/merchant/userapp/modify',
    products: '/aicloudmerchant/merchant/userapp/signs'
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
