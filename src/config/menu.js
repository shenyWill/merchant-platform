export default [
  {
    icon: 'icon-shouye',
    name: '首　页',
    route: '/product'
  },
  {
  icon: 'icon-bag',
  name: '服务中心',
  children: [{
    name: '产品服务',
    icon: '',
    route: '/product/service'
  }, {
    name: '产品测试',
    icon: '',
    route: '/product/test'
  }]
}, {
  icon: 'icon-yingyongguanli',
  name: '应用管理',
  route: '/application'
}, {
  icon: 'icon-chart',
  name: '数据统计',
  children: [{
    name: '调用统计',
    icon: '',
    route: '/stats'
  }, {
    name: '调用明细',
    icon: '',
    route: '/count'
  }]
}, {
  icon: 'icon-user',
  name: '账号管理',
  route: '/account'
}];
