import axios from '../config/axios.js';

/*
* 获取验证码,登录
* */
export const login = (data) =>axios('http://localhost:8080/login',data);
/*
* 菜单
* */
export const getMenu = (data) =>axios('menu.json',data);
/**
 * 获取数据
 */
export const getData = (data) =>axios('data.json',data);
