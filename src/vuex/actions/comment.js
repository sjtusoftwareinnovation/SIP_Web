import request from '@/common/request';


export const getComments = ({commit}, params) => {
  request.request('/sip/competition/showComments/'+ params.id)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_COMMENTS', {data: data.data});
      }
    })
};



export const addComment = ({commit}, params) => {
    request.request({
      url: '/sip/competition/addComment',
      method: 'post',
      data: params.data
    })
      .then(function (res) {
        const data = res.body;
        if (data.code === 1) {
          params.sCb();
        }else {
          params.failCb();
        }
      })
};
