import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from './actions/index';
import mutations from './mutations/index';
/* eslint-disable no-new */
const state = {
  competition: {
    totalPages: 0,
    isloadingComplete: false,
    myTeamId: [],
    myTeam: {},
    list: [],
    info: {
      'registerEnd': '',
      'id': '',
      'name': '',
      'url': '',
    },
    teams:[],
    comment: {
      list: [],
      info: [],
      status: 0,
    }
  },
  project: {
    list: [],
    totalPages: 0,
    isloadingComplete: false,
    info: {}
  },
  pic: {
    'url': '',
  },
  userInfo: null
};

export default new Vuex.Store({
  state,
  actions,
  mutations
})
