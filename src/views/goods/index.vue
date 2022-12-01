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
                    <!-- 图片 -->
                    <GoodsImg :images="goods.mainPictures" />
                    <!-- 销售数据--写死的 -->
                    <GoodsSales />
                </div>
                <div class="spec">
                    <!-- 名字 -->
                    <GoodsName :goods="goods" />
                    <!-- 规格 -->
                    <GoodsSku :goods="goods" />
                    <!-- 数量 -->
                    <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
                    <!-- 按钮 -->
                    <XtxButton type="primary"  style="margin-top:20px;">加入购物车</XtxButton>
                </div>
            </div>
            <!-- 同款推荐 -->
            <GoodsRelevant :goodsId="goods.id" />
            <!-- 商品详情 -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品详情 + 商品评价 -->
                    <GoodsTabs :goods="goods" />
                    <!-- 注意事项 -->
                    <div class="goods-warn"></div>
                </div>
                <!-- 24热榜+专题推荐 -->
                <div class="goods-aside">
                    <GoodsHot :goodsId="goods.id" :type="1" />
                    <GoodsHot :goodsId="goods.id" :type="2" />
                </div>
            </div>
            <!-- 注意事项 -->
            <GoodsWarn />
        </div>
    </div>
</template>

<script setup>
import { nextTick, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { findGoods } from '@/api/product.js'
import GoodsImg from './components/goods-img.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsTabs from './components/goods-tabs.vue';
import GoodsHot from './components/goods-hot.vue';
import GoodsWarn from './components/goods-warn.vue';

    const route = useRoute()
    const goods = ref(null)
    const num = ref(1)
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

    provide('goods', goods)
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
.goods-footer {
    display: flex;
    margin-top: 20px;
    .goods-article {
    width: 940px;
    margin-right: 20px;
    }
    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

</style>