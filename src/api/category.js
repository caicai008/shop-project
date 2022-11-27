import request from '@/utils/request'

// 获取首页头部数据分类
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}

/**
 * 获取单个顶级分类信息
 * @param {String} id 顶级分类id
 * @returns
 */
export const findTopCategory = (id) => {
    return request('/category', 'get', {id})
}