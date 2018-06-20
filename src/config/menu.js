export default [{
  icon: 'icon-bag',
  name: '产品管理',
  route: '/product'
}, {
  icon: 'icon-yingyongguanli',
  name: '应用管理',
  route: '/application'
}, {
  icon: 'icon-chart',
  name: '数据统计',
  children: [{
    name: '调用明细',
    icon: '',
    route: '/stats'
  }, {
    name: '监控统计',
    icon: '',
    route: '/stats'
  }]
}, {
  icon: 'icon-user',
  name: '账号管理',
  route: '/account'
}];
