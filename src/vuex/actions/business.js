import request from '@/common/request';


export const getBusinesses = ({commit}, params) => {
  commit('updateLoadingStateBusiness', false);
  request.request({
    url: '/sip/business/page',
    data: params,
    method: 'post'
  })
    .then(function (res) {
      commit('updateLoadingStateBusiness', true);
      const data = res.body;
      if (data.code === 1) {
        commit('GET_BUSINESSES', {data: data.data, more: params.more});
      }
    })
};

export const getBusiness = ({commit}, params) => {
  request.request('/sip/business/detail/'+params.id)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_BUSINESS', {data: data.data});
      }
    })
};
