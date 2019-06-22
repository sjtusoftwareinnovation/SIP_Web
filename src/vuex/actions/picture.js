import request from '@/common/request';
import superagent from 'superagent';
import consts from '@/common/consts';
import iView from 'iview'

export const upLoad = ({commit},  params) => {

    request.request({
          url: '/sip/image',
          method: 'post',
          headers: {'Content-Type': 'multipart/form-data'}
        })
        .attach('image', params.img)
        .then(function (res) {
          const data = res.body;
          if (data.code === 1) {
            // iView.Message.success('');
            params.successCb("http://202.121.181.180:8080/sip/"+data.data)
            // commit('UP_LOAD', {data: data.data});
          }else {
            params.failCb();
          }
        })
};
