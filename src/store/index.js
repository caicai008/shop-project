import { createStore } from 'vuex'
// vuex 持久化工具

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

// 创建vuex仓库并导出
export default createStore({
  modules: {
    user,
    cart,
    category
  }
})