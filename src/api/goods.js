import request from '@/utils/request'

/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
 export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
  }