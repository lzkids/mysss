/**
 * 首页相关接口
 */
import http from "../utils/axios";
//   获取轮播图
export function getSwiper() {
  return http.get("/home/swiper");
}

//  获取租房小组数据

export function getGroup(area = "AREA|88cff55c-aaa4-e2e0") {
  return http.get("/home/groups", {
    params: {
      area,
    },
  });
}

// 获取新闻咨询

export function getNews(area = "AREA|88cff55c-aaa4-e2e0") {
  return http.get("/home/news", {
    params: {
      area,
    },
  });
}
