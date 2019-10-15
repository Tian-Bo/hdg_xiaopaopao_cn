// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import i18n from './locale'
// import filters from './filters'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
// import Toast from './components/toast/index'
// Vue.use(Toast);

// Vue.config.productionTip = false

// // 如果是非线上环境，加载 VConsole（移动端适用）
// // if (process.env.NODE_ENV !== 'production') {
// //     var VConsole = require('vconsole/dist/vconsole.min.js');
// //     var vConsole = new VConsole();
// // }

// // 全局过滤器
// Object.keys(filters).forEach(filterName => {
//     Vue.filter(filterName, filters[filterName])
// })

// /* eslint-disable no-new */
// new Vue({
//     router,
//     store,
//     i18n,
//     render: h => h(App)
// }).$mount('#app')



// hdg begin 
/*
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-07-10 18:32:23
 * @LastEditTime: 2019-10-11 15:23:09
 */
// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fonts from './assets/fonts/iconfont.css'
import newFonts from './assets/fonts/new_iconfont.css'
import newFontsJs from './assets/fonts/new_iconfont.js'
import filters from './assets/js/filters.js'
import axios from 'axios'
import { UrlSearch } from './assets/js/Urlsearch'
import { BaseUrl } from "./assets/js/BaseUrl";
import { Loading, Message } from 'element-ui'
import qs from 'qs';
import VueClipboard from 'vue-clipboard2'
import VCharts from 'v-charts'


// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})


let Request = new UrlSearch();
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.$Request = Request;
Vue.prototype.$RequestUrl = BaseUrl();
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VCharts);
/* eslint-disable no-new */

axios.defaults.baseURL = 'https://apis.huodongge.cn';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

var loadinginstace;
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.status !== 0) {
      if (res.status == 1) {
            if (res.message == "修改失败") {
                return
            }
            Message.error({
                message: res.message
            })
      }
      if (res.status == -1) {
        //   window.location.href = "/merchant/home"
      }
  }
  return response;
}, function (error) {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
              error.message = "错误请求"
              break;
            case 401:
              error.message = "未授权登录"
              break;
            case 403:
              error.message = "拒绝访问"
              break;
            case 404:
              error.message = "请求错误，未找到"
              break;
            case 405:
              error.message = "请求方法错误"
              break;
            case 500:
              error.message = "服务器出错"
              break;
            default:
              error.message = `连接错误${error.response.status}`
        }
    }
    return Promise.reject(error);
  });


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// hdg end