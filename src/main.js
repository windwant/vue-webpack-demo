// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from "iview";
import "iview/dist/styles/iview.css";

import "./assets/css/common.scss";
import {getStore} from "./config/utils";

Vue.use(iView);
Vue.config.productionTip = false;


// 路由跳转前
router.beforeEach((to, from, next) => {
  document.title = to.name
  // 判断是否登录
  if (to.matched.some(r => r.meta.requireAuth)) {
    if(getStore('userName')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
