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

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
*/
export const findSubCategoryFilter = (id) => {
    return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
*/
export const findSubCategoryGoods = (params) => {
    return request('/category/goods/temporary', 'post', params)
}