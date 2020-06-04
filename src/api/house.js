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
