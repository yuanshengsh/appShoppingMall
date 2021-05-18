import axios from "axios";
import cookie from 'react-cookies';

// 设置请求得基准地址
axios.defaults.baseURL = 'http://www.adaday.cn:8080/'
const $http = axios.create();

// 设置请求头
$http.interceptors.request.use(config => {
    console.log('config',config);
    console.log('token',cookie);
    // 给请求头加上Authorization,authJWT的字段,值为token
    config.headers.Authorization = cookie.load('token')
    // config.headers.authJWT = window.sessionStorage.getItem('token')
    return config
})
  
// 导出
export default $http;