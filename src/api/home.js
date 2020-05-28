
/**
 * 首页相关接口
 */
import http from "../utils/axios";
//   获取轮播图
 export function getSwiper() {
     return http.get('/home/swiper')
 }

//  获取租房小组数据

// export function getGroup(area = '')