
/**
 * 登录获取接口
 */
import http from "../utils/axios.js";

 export function login(data) {
     return http.post('/user/login',data)
 }

//  登录人信息
export function getUser() {
    return http.get('/user')
}

// 退出登录
export function logout() {
    return http.post('/user/logout')
}

// 更具id判断是否登录
export function checkFavById(id) {
    return http.get(`/user/favorites/${id}`)
}

// 添加收藏
export function addFav(id){
    return http.post(`/user/favorites/${id}`)
}

// 删除收藏
export function delFav(id) {
    return http.delete(`/user/favorites/${id}`)
}
// 获取已发布房源
export const getUserHouses = () => {
    return http.get('/user/houses')
}