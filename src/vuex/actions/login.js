import request from '@/common/request';
import cookieUtil from '@/common/cookieUtil';
import iView from 'iview'

export const login = ({commit}, params) => {
  request.request({
    url: '/sip/user/login',
    method: 'post',
    data: params.data
  })
    .then(resp => {
      if (resp.body.code === 1) {
        commit('GET_USER_INFO', resp.body.data);
        // cookieUtil.setCookie('userInfo', JSON.stringify(resp.body.data));
        params.successCall()
      } else {
        params.errCallback()
      }
    })
};


export const signup = ({commit}, params) => {
  request.request({
    url: '/sip/user',
    method: 'post',
    data: params.data
  })
    .then(resp => {
      if (resp.body.code === 1) {
        params.successCall()
      } else {
        params.errCallback(resp.body.message);
      }
    })
};

export const logout = ({commit}, params) => {
  request.request('/sip/user/logout')
    .then(resp => {
      if (resp.body.code === 1) {
        // cookieUtil.setCookie('userInfo', null);
        cookieUtil.removeCookie('userInfo');
        commit('GET_USER_INFO', null);
        params.successCall()
      } else {
        params.errCallback(resp.body.message);
      }
    })
};

// 获取用户信息
export const getUserInfo = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    if (state.userInfo && state.userInfo.id) {
      resolve(state.userInfo)
    }else {
      commit('GET_USER_INFO', null);
    }
    request.request('/sip/user/isLogged').then(response => {

      if (response.body.code === 1) {
        commit('GET_USER_INFO', response.body.data.user);
        console.log("commit GET_USER_INFO")

        resolve(response.body.data.user)
      } else {
        commit('GET_USER_INFO', null);
        reject()
      }
    }).catch(error => {
      reject(error)
    })
  })
}

// export const getUserInfo = ({commit}) => {
//   const userInfo = cookieUtil.getCookie('userInfo');
//   if (userInfo) {
//     commit('GET_USER_INFO', JSON.parse(userInfo));
//   } else {
//     commit('GET_USER_INFO', null);
//   }
// };

