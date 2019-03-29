import App from '../App.vue'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../components/basic.vue')), 'basic'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: r => require.ensure([], () => r(require('../page/welcome/welcome.vue')), 'welcome')
      }
    ]
  }]
}]
