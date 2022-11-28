<template>
    <div class="container">
        <!-- 面包屑 -->
        <SubBread />
        <!-- 筛选区 -->
        <SubFilter :filterData="filterData" :filterLoading="filterLoading" />
        <!-- 结果区域 -->
        <div class="goods-list">
            <!-- 排序 -->
            <SubSort />
            <!-- 商品列表 -->
            <ul>
                <li v-for="item in goodsList" :key="item.id">
                    <GoodsItem :goods="item" />
                </li>
            </ul>
            <!-- 加载 -->
            <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
import { findSubCategoryFilter } from '@/api/category.js'
import SubSort from './components/sub-sort.vue';
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '@/api/category.js'

const route = useRoute()
const filterData = ref(null)
const filterLoading = ref(false)
// 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
watch(() => route.params.id, (newVal) => {
     // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
    if(newVal && route.path === '/category/sub/' + newVal) {
        filterLoading.value = true
        findSubCategoryFilter(route.params.id).then(({result}) => {
            // 品牌全部
            // console.log(result);
            result.selectedBrand = null
            result.brands.unshift({id: null, name: '全部'})
            // 销售属性全部
            result.saleProperties.forEach(p => {
                p.selectedBrand = null
                p.properties.unshift({id: null, name: '全部'})
            });
            filterData.value = result
            filterLoading.value = false
        })
    }
}, { immediate: true})

    const loading = ref(false)
    const finish = ref(false)
    const goodsList = ref([])
    // 获取分类商品
    const reqParams = {
        page: 1,
        pageSize: 20
    }
    reqParams.categoryId = route.params.id
    const getData = () => {
        loading.value = true
        findSubCategoryGoods(reqParams).then(({result}) => {
            if(result.items.length) {
                goodsList.value.push(...result.items)
                reqParams.page ++
            } else {
                // 加载完毕
                finish.value = true
            }
            // 请求结束
            loading.value = false
        })
    }
    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
        if(newVal && route.path === '/category/sub' + newVal) {
            goodsList.value = []
            reqParams = {
                page: 1,
                pageSize: 20
            }
            finish.value = false
        }
    })

</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>