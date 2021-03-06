/**
 * 房源相关接口
 */
import http from '../utils/axios'

export function getFilterData(id) {
  return http.get('/houses/condition', {
    params: {
      id
    }
  })
}

// 根据筛选条件获取房源列表
export function getListByFilters(cityId, filters, start = 1, end = 20) {
  return http.get('/houses', {
    params: {
      cityId,
      ...filters,
      start,
      end
    }
  })
}

// 根据房源ID获取对应房源到详情数据
export function getDetailById(id) {
  return http.get(`/houses/${id}`)
}