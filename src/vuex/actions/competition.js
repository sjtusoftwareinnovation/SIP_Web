import request from '@/common/request';

export const getCompetitions = ({commit}, params) => {
  commit('updateLoadingStateCompetition', false);
  request.request({
    url: '/sip/competition/page',
    data: params,
    method: 'post'
  })
    .then(function (res) {
      commit('updateLoadingStateCompetition', true);
      const data = res.body;
      if (data.code === 1) {
        commit('GET_COMPETITIONS', {data: data.data, more: params.more});
      }
    })
};

export const getCompetition = ({commit}, params) => {
  request.request('/sip/competition/detailTeam/'+params.id)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_COMPETITION', {data: data.data});
      }else {
        commit('GET_COMPETITION', {data: {competition:{},teamList:[]}});
      }
    })
};

export const createCompetition = ({commit}, params) => {
  request.request({
    url: '/sip/competition/add',
    method: 'post',
    data: params
  }).withCredentials()
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        iView.Message.success("竞赛创建成功");
        commit('CREATE_COMPETITION', {data: data.data});
      }else{
        iView.Message.error(data.message);
      }
    })
};

export const modifyCompetition = ({commit}, params) => {
  request.request({
    url: '/sip/competition/modify',
    method: 'post',
    data: params
  }).withCredentials()
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        iView.Message.success("竞赛修改成功");
        commit('MODIFY_COMPETITION', {data: data.data});
      }else{
        iView.Message.error("竞赛修改失败");
      }
    })
};

