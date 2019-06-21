import App from '../App.vue'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../components/basic.vue')), 'basic'),
    // redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: r => require.ensure([], () => r(require('../page/welcome/welcome.vue')), 'welcome')
      },
      {
        path: '/competitions',
        name: 'competitions',
        component: r => require.ensure([], () => r(require('../page/competitions/competitions.vue')), 'competitions')
      },
      {
        path: '/competition/:id',
        name: 'competition',
        redirect: '/competition/:id/1',
        component: r => require.ensure([], () => r(require('../page/competition/competition.vue')), 'competition'),
        children: [
          {
            path: '/competition/:id/1',
            name: 'cdetail',
            component: r => require.ensure([], () => r(require('../page/competition/competitionDetail.vue')), 'cdetail')
          },
          {
            path: '/competition/:id/2',
            name: 'cteam',
            component: r => require.ensure([], () => r(require('../page/competition/competitionTeam.vue')), 'cteam')
          },
          {
            path: '/competition/:id/3',
            name: 'cmyteam',
            meta: {
              requireAuth: true
            },
            component: r => require.ensure([], () => r(require('../page/competition/competitionMyTeam.vue')), 'cmyteam')
          },
        ]
      }
    ]
  }]
}]
