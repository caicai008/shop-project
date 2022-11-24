import request from '@/utils/request'

// 获取首页头部数据分类
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}