import request from '@/utils/request'

// 获取品牌信息
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit: 6 })
}