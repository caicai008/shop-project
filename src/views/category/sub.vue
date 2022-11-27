<template>
    <div class="container">
        <SubBread />
        <SubFilter :filterData="filterData" :filterLoading="filterLoading" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
import { findSubCategoryFilter } from '@/api/category.js'

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

</script>

<style lang="less" scoped>

</style>