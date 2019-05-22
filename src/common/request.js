import superagent from 'superagent';
import consts from '@/common/consts';

const defaultOpt = {
  method: 'GET',
  credentials: 'include',
  timeout: 6000,
  headers: {}
};

function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      return isFinite(v) ? v : '';
    default:
      return '';
  }
}

function queryString(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).map((k) => {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map((v) => {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
    encodeURIComponent(stringifyPrimitive(obj));
}

export default {
  request: (url, options, method = 'get') => {
    if (typeof url === 'object') {
      options = url;
      url = options.url;
      delete options.url;
    }
    if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
      url = consts.apiHost + url;
    }

    options = Object.assign({}, defaultOpt, options);
    options.method = (options.method || method).toUpperCase();
    let headers = options.headers || {};
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    if (options.method === 'GET') {
      options.body = options.body || options.data || options.params;
      let sep = url.indexOf('?') > 0 ? '&' : '?';
      url = options.body ? url + sep + queryString(options.body) : url;
      delete options.body;
      return superagent
        .get(url)
        .withCredentials()
        .set(headers)

    } else if (options.method === 'POST') {
      options.body = options.body || options.data;

      switch (headers['Content-Type']) {
        case 'application/json':
          options.body = JSON.stringify(options.body);
          break;
        case 'application/x-www-form-urlencoded':
          options.body = queryString(options.body);
          break;
        case 'multipart/form-data':
          // delete options.headers['Content-Type'];
          return superagent
            .post(url);
        default:
          break;
      }
      return superagent
        .post(url)
        .withCredentials()
        .set(headers)
        .send(options.body)
    } else if (options.method === 'DELETE') {
      options.body = options.body || options.data;
      return superagent
        .delete(url)
        .withCredentials()
        .set(headers)
        .send(options.body)
    } else if (options.method === 'PUT') {
      options.body = options.body || options.data;
      return superagent
        .put(url)
        .withCredentials()
        .set(headers)
        .send(options.body)
    }
  }
};
