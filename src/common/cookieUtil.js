/**
 * cookie相关操作,getcookie,setcookie
 **/

'use strict';

import Cookies from 'js-cookie'


export default {
  getCookie: function (name) {
    return Cookies.get(name)
  },

  /**
   * 设置cookie
   * @param expire 过期时间, 过期时间是小时数
   */
  setCookie: function (name, value, expire) {
    return Cookies.set(name, value)
  },

  removeCookie: function(name) {
    return Cookies.remove(name)
  }
}




