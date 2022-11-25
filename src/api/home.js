import request from '@/utils/request'

// 获取品牌信息
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit: 6 })
}

// 获取轮播图
export const findBanner = () => {
    return request('/home/banner', 'get')
}