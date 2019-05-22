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

