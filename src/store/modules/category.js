// 分类模块

import { topCategory } from "../../api/constants"
import { findAllCategory } from "../../api/category"


export default {
    namespaced: true,
    state () {
      return {
        // 分类信息集合
        list: topCategory.map(item => ({ name: item}))
      }
    },
    mutations: {
      // 获取头部导航分类列表
      setList(state, headCategory) {
        state.list = headCategory
      },
      // 显示二级分类
      show(state, id) {
        const category = state.list.find(item => item.id === id)
        category.open = true
      },
      // 隐藏二级分类
      hide(state, id) {
        const category = state.list.find(item => item.id === id)
        category.open = false
      }
    },
    actions: {
      async getList({ commit }) {
        const {result} = await findAllCategory()
        // 给一级分类加上一个控制二级分类显示隐藏的数据open
        result.forEach(item => {
          item.open = false
        });
        commit('setList', result)
      }
    }
}