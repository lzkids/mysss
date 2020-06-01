/**
 * 城市相关接口
 */

import http from "../utils/axios";

//  获取当前地图位置
export function getCurrCity(name) {
  return http.get("/area/info", {
    params: {
      name,
    },
  });
}

// 获取城市列表
export function getCityList(level = 1) {
  return http.get("/area/city", {
    params: {
      level,
    },
  });
}

// 获取热门城市
export function getHotCity() {
  return http.get('/area/hot');
}
