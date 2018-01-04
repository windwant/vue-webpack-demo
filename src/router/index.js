import Vue from 'vue';
import Router from 'vue-router';


const login = resolve => require(['@/pages/login/login'],resolve);
const home = resolve => require(['@/pages/home/home'],resolve);

/* 用户管理
* */
const userlist = resolve => require(['@/pages/user/userlist'],resolve);

const requireAuth ={
        requireAuth: true
      }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },{
      path: '/login',
      name: '用户登录',
      component: login
    },{
      path: '/home',
      name: '首页',
      component: home,
      redirect: '/userlist',
      children:[
        {
          path: '/userlist',
          name: '用户列表',
          component: userlist,
          meta:requireAuth
        }
      ]
    }
  ]
})
