// hooks 封装逻辑，提供响应式数据。

import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue"

/**
 *
 * @param {Element} target - Dom 对象
 * @param {Function} apiFn - API 函数
 */
export const useLazyData = (apiFn) => {
    const result = ref([])
    const target = ref(null)
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }], observerElement) => {
          if (isIntersecting) {
            stop()
            // 调用API获取数据
            apiFn().then(data => {
              result.value = data.result
            })
          }
        },{
          // 产品区域需要滚动比较多才能去加载数据。
          threshold: 0
        }
      )
    return {result, target}
}