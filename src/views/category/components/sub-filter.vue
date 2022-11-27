<template>
    <div class="sub-filter" v-if="filterData && !filterLoading">
      <div class="item">
        <div class="head">品牌：</div>
        <div class="body">
          <a :class="{active:filterData.selectedBrand===brand.id}" href="javasript:;" v-for="brand in filterData.brands" :key="brand.id">{{brand.name}}</a>
        </div>
      </div>
      <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
        <div class="head">{{p.name}}：</div>
        <div class="body">
          <a :class="{active:p.selectedProp===attr.id}" href="javasript:;" v-for="attr in p.properties" :key="attr.id">{{attr.name}}</a>
        </div>
      </div>
    </div>
    <div v-else class="sub-filter">
      <XtxSkeleton class="item" width="800px" height="40px"  />
      <XtxSkeleton class="item" width="800px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
    </div>
  </template>
<script>
export default {
  name: 'SubFilter',
  props: {
    filterData: {
        type: Object,
        default: () => {}
    },
    filterLoading: {
        type: Boolean,
        default: false
    }
  }
}
</script>
<style scoped lang='less'>
@import '@/assets/styles/variables.less';
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .xtx-skeleton {
      padding: 10px 0;
    }
</style>