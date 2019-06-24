import request from '@/common/request';
import iView from 'iview'

export const getTeamsAll = ({commit}, params) => {
  request.request('/sip/team/teamStatus/'+params)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_TEAMS_ALL', {data: data.data});
      }
    })
};

export const createTeam = ({commit}, params) => {
  request.request({
    url: '/sip/team',
    method: 'post',
    data: params.data
  })
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        params.successCb();
        getTeamId({commit}, {uid: params.leader, cid: params.competitionId})
      } else {
        params.failCb(data.message);
        console.log(data);
      }
    })
};

export const cancelApply = ({commit}, params) => {

  request.request({
    url: '/sip/teamUser/' + params.data.id,
    method: 'delete',
  }).then(function (res) {
    const data = res.body;
    if (data.code === 1) {
      params.successCb();
    } else {
      params.failCb(data.message);
      console.log(data);
    }
  })
};

export const handleApply = ({commit}, params) => {

  request.request({
    url: '/sip/teamUser',
    method: 'put',
    data: params.data
  }).then(function (res) {
    const data = res.body;
    if (data.code === 1) {
      params.successCb();
      getTeam({commit}, {tid: params.data.teamId})
      getApplyList({commit}, {tid: params.data.teamId})
    } else {
      params.failCb(data.message);
      console.log(data);
    }
  })
};

export const modifyTeam = ({commit}, params) => {
  console.log(params);
  request.request({
    url: '/sip/team',
    method: 'put',
    data: params.data
  }).then(function (res) {
    const data = res.body;
    if (data.code === 1) {
      commit('UPDATE_TEAM', {data: params.data});
      params.successCb(params.data.status);
    } else {
      params.failCb(data.message);
      console.log(data);
    }
  })
};

export const addTeamMember = ({commit}, params) => {
  request.request({
    url: '/sip/team' + params.id + '/add',
    method: 'post',
    data: {
      'userId': params.uid,
    }
  })
};


export const applyTeam = ({commit}, params) => {
  request.request({
    url: '/sip/teamUser',
    method: 'post',
    data: params.data
  })
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        params.successCb()
      } else {
        if (data.code === 2) {
          params.failCb('您已经申请过或者有队伍了，请勿重复申请！');
        } else {
          params.failCb('请求失败');
          console.log(data)
        }
      }

    })
};

export const applyNo = ({commit}, params) => {
  request.request({
    url: '/sip/teamUser/' + params.tid,
    method: 'delete',
  })
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        iView.Message.success('已拒绝');
        commit('APPLY_NO', {data: data.data.teamId});
      } else {
        iView.Message.success('请求失败');
      }
    })
};

export const getTeam = ({commit}, params) => {
  request.request('/sip/team/' + params.tid)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_TEAM', {data: data.data});
      }
    })
};

export const getMyTeam = ({commit}, params) => {
  request.request('/sip/team/competitionTeam?userId=' + params.uid + '&competitionId=' + params.cid)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        if (data.data.length > 0) {
          let mTeam = data.data.filter(t => t.tstatus == 1);
          let mApplyTeam = data.data.filter(t => t.tstatus == 0);
          let mRejectTeam = data.data.filter(t => t.tstatus == -1);
          if (mTeam.length > 0) {
            getTeam({commit}, {tid: mTeam[0].team.id});
          } else if (mApplyTeam.length > 0) {
            mApplyTeam[0].team.tstatus = 0;
            mApplyTeam[0].team.applyId = mApplyTeam[0].applyId;
            commit('GET_TEAM', {data: mApplyTeam[0]});
          } else if (mRejectTeam.length > 0) {
            mRejectTeam[0].team.tstatus = -1;
            commit('GET_TEAM', {data: mRejectTeam[0]});
          } else {
            commit('GET_TEAM', {data: {}});
          }
        }
      } else {
        commit('GET_TEAM', {data: {}});
      }

    })
};

// export const getMyTeam = ({commit}, params) => {
//   request.request('/sip/team/competitionTeam/userId=' + params.uid + '&competitionId=' + params.cid)
//     .then(function (res) {
//       const data = res.body;
//       if (data.code === 1) {
//         commit('GET_TEAMID', {data: data.data});
//         if (data.data.length > 0) {
//           getTeam({commit}, {tid: data.data[0]});
//           getApplyList({commit}, {tid: data.data[0]})
//         }
//       } else {
//         commit('GET_TEAMID', {data: []});
//         commit('GET_TEAM', {data: {}});
//       }
//
//     })
// };

export const getApplyList = ({commit}, params) => {
  request.request('/sip/teamUser/' + params.tid)
    .then(function (res) {
      const data = res.body;
      if (data.code === 1) {
        commit('GET_APPLYLIST', {data: data.data});
      }
    })
};

export const deleteTeam = ({commit}, params) => {
  request.request({
    url: '/sip/team/' + params.id,
    method: 'delete',
  }).then(function (res) {
    const data = res.body;
    if (data.code === 1) {
      params.successCb()
    } else {
      params.failCb()
    }
  })
};

export const removeMember = ({commit}, params) => {
  request.request({
    url: '/sip/teamUser/deleteMember?teamId=' + params.teamId + '&userId=' + params.userId,
    method: 'put',
  }).then(function (res) {
    const data = res.body;
    if (data.code === 1) {
      params.successCb()
    } else {
      params.failCb()
    }
  })
};


