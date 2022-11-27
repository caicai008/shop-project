<!-- <template>
    <div class="xtx-bread">
        <slot />
    </div>
</template> -->

<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render() {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 5. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 6. 把动态创建的节点渲染再xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if(i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right'}))
      }
    })

    return h('div', {class: 'xtx-bread'}, dymanicItems)
  }
}

</script>

<style lang="less">
@import '@/assets/styles/variables.less';
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
        cursor: pointer;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // &:last-child {
    //     display: none;
    // }
  }
}
</style>