
/**
 * 登录获取接口
 */
import http from "../utils/axios.js";

 export function login(data) {
     return http.post('/user/login',data)
 }