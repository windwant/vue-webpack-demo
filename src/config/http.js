import axios from 'axios';
import router from '../router/';
import { getStore,clearStore } from './utils.js';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(getStore('userName')){
    	 //config.headers.common['Authorization'] = getStore('userName');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log(error);
    if (error.response) {
    	if(error.response.status == 401){
				clearStore();
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
    	}
    }
    return Promise.reject(error);
});


export default axios;
