/**
 * 封装axios
 */

import axios from "axios";
import { Toast } from "antd-mobile";

const BASE_URL = 'https://api-haoke-web.itheima.net'
//  创建axios实例
const myAxios = axios.create({
  baseURL: BASE_URL,
});

// 响应拦截器
// Add a request interceptor
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    Toast.loading("Loading...", 0);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    Toast.hide();
    // 简化数据
    const data = response.data;
    let _res = {
      status: data.status,
      description: data.description,
      data: data.body,
    };
   
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return _res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { BASE_URL };
export default myAxios;
