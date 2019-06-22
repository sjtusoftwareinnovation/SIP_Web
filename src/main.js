// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import iView from 'iview'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import '../my-theme/index.less'
import  store from './vuex/'
import cookieUtil from '@/common/cookieUtil';

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://dawninshadow.com:7001'

Vue.prototype.$highlight = highlight
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueRouter)
Vue.use(iView)

Vue.prototype.$Notice.config({
  top: 50,
  duration: 3
});

Vue.prototype.$Message.config({
  top: 50,
  duration: 3
});

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return Vue.prototype.$highlight.highlightAuto(code).value
  }
})
Vue.prototype.$marked = marked


const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router, // router这个名字不能改
  store
  // render: h => h(App)
}).$mount('#app')
