<template>
    <div class="goods-tabs">
        <nav>
            <a @click="clickTab('GoodsDetail')" :class="{active: activeName === 'GoodsDetail'}" href="javascript:;">商品详情</a>
            <a @click="clickTab('GoodsComment')" :class="{active: activeName === 'GoodsComment'}" href="javascript:;">商品评价<span>(500+)</span></a>
        </nav>
        <!-- 商品详情 -->
        <!-- <GoodsDetail v-if="activeName === 'detail'" /> -->
        <!-- 商品评价 -->
        <!-- <GoodsComment v-else /> -->
        <component :is="activeName === 'GoodsDetail' ? GoodsDetail: GoodsComment"></component>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import GoodsComment from './goods-comment.vue';
import GoodsDetail from './goods-detail.vue';

    const activeName = ref('GoodsDetail')
    const clickTab  = (name) => {
        activeName.value = name
    }

</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>