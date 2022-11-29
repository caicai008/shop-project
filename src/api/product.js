import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
*/
export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}