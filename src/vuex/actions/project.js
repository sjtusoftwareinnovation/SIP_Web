import request from '@/common/request';


export const getProjects = ({commit}, params) => {
  request.request({
    url: '/sip/project/page',
    method: 'POST',
    data: params
  })
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_PROJECTS', {data: data.data, more: params.more});
      }
    })
};

export const getProject = ({commit}, params) => {
  request.request('/sip/project/'+params.id)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_PROJECT', {data: data.data});
      }
    })
};


export const addProject = ({commit}, params) => {
  params.data.type = params.data.type[0];
  request.request({
    url:'/sip/project',
    method: 'post',
    data: params.data
  })
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        params.successCb(data.data.id);
      }else {
        params.failCb();
      }
    })
};
