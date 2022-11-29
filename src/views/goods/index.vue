<template>
    <div class="goods-page" v-if="goods">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
                <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
                <XtxBreadItem to="/">{{goods.name}}</XtxBreadItem>
            </XtxBread>
            <!-- 商品信息 -->
            <div class="goods-info">
                <div class="media">
                    <GoodsImg :images="goods.mainPictures" />
                    <GoodsSales />
                </div>
                <div class="spec">
                    <GoodsName :goods="goods" />
                </div>
            </div>
            <!-- 同款推荐 -->
            <!-- 商品详情 -->
        </div>
    </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { findGoods } from '@/api/product.js'
import GoodsImg from './components/goods-img.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';

    const route = useRoute()
    const goods = ref(null)
    // 出现路由地址商品ID发生变化，但是不会重新初始化组件
    watch(() => route.params.id, (newVal) => {
        if(newVal && route.path === '/product/' + newVal) {
            findGoods(route.params.id).then(data => {
                // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
                console.log(data.result);
                goods.value = null
                nextTick(() => {
                    goods.value = data.result
                })
            })
        }
    }, { immediate: true})

</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>