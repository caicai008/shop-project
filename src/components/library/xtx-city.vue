<template>
    <div class="xtx-city" ref="target">
      <div class="select" @click="toggleDialog" :class="{active}">
        <span class="placeholder">请选择配送地址</span>
        <span class="value"></span>
        <i class="iconfont icon-angle-down"></i>
      </div>
      <div class="option" v-if="active">
        <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
      </div>
    </div>
  </template>
  <script>
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  export default {
    name: 'XtxCity',
    setup () {
      // 控制展开收起,默认收起
      const active = ref(false)
      const openDialog = () => {
        active.value = true
      }
      const closeDialog = () => {
        active.value = false
      }
      // 切换展开收起
      const toggleDialog = () => {
        if (active.value) closeDialog()
        else openDialog()
      }
      // 点击其他位置隐藏
      const target = ref(null)
      onClickOutside(target, () => {
        closeDialog()
      })
      return { active, toggleDialog, target }
    }
  }
  </script>
  <style scoped lang="less">
  .xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;
    .select {
      border: 1px solid #e4e4e4;
      height: 30px;
      padding: 0 5px;
      line-height: 28px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
      .placeholder {
        color: #999;
      }
      .value {
        color: #666;
        font-size: 12px;
      }
      i {
        font-size: 12px;
        margin-left: 5px;
      }
    }
    .option {
      width: 542px;
      border: 1px solid #e4e4e4;
      position: absolute;
      left: 0;
      top: 29px;
      background: #fff;
      min-height: 30px;
      line-height: 30px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      > span {
        width: 130px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        padding: 0 3px;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
  </style>