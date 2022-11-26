import request from '@/utils/request'

// 获取品牌信息
export const findBrand = (limit) => {
    return request('/home/brand', 'get', {limit})
}

// 获取轮播图
export const findBanner = () => {
    return request('/home/banner', 'get')
}

// 新鲜好物
export const findNew = () => {
    return request('home/new', 'get')
}

// 人气好物
export const findHot = () => {
    return request('home/hot', 'get')
}

// 产品区块
export const findGoods = () => {
    return request('home/goods', 'get')
}

// 最新专题
export const findSpecial = () => {
    return request('home/special', 'get')
}
