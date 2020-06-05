/**
 * 全局公共方法
 */
// 导入地图
import { getCurrCity } from "../../api/city";

// 定义token
const HZW_TOKEN = 'skj_wifn'

// 存储本地数据
export function setLocalData(key, val) {
  localStorage.setItem(key, val);
}
// 获取本地数据
export function getLocalData(key) {
  return localStorage.getItem(key);
}

// 删除本地数据
export function delLcoaclData(key) {
  localStorage.setItem(key);
}

const CURR_CITY = "curr_city";

export function getCity() {
  // 本地获取
  const curCity = JSON.parse(getLocalData(CURR_CITY));
  // 没有获取到
  if (!curCity) {
    return new Promise((reslove, reject) => {
      //  解构
      const { BMap } = window;
      const myCity = new BMap.LocalCity();
      myCity.get(async (result) => {
        const cityName = result.name;
        const { status, data } = await getCurrCity(cityName);
        if (status === 200) {
          // 存储本地
          setLocalData(CURR_CITY, JSON.stringify(data));
          reslove(data);
        } else {
          reject("error");
        }
      });
    });
  } else {
    //   获取到就读取
    return Promise.resolve(curCity);
  }
}

export { CURR_CITY, HZW_TOKEN };
