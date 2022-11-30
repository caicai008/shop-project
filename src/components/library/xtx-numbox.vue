<template>
    <div class="xtx-numbox">
      <div class="label">数量</div>
      <div class="numbox">
        <a @click="changeNum(-1)" href="javascript:;">-</a>
        <input type="text" readonly :value="modelValue">
        <a @click="changeNum(1)" href="javascript:;">+</a>
      </div>
    </div>
  </template>
  <script>
import { useVModel } from '@vueuse/core';

  export default {
    name: 'XtxNumbox',
    props: {
        label: {
            type: String
        },
        modelValue: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 100
        }
    },
    setup(props, { emit }) {
        const num = useVModel(props, 'modelValue', emit)
        const changeNum = (value) => {
            const newVal = num.value + value
            if(newVal < props.min) return
            if(newVal > props.max) return
            num.value = newVal
            emit('change', changeNum)
        }
        return { num, changeNum }
    }
  }
  </script>
  <style scoped lang="less">
  .xtx-numbox {
    display: flex;
    align-items: center;
    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
    .numbox {
      width: 120px;
      height: 30px;
      border: 1px solid #e4e4e4;
      display: flex;
      > a {
        width: 29px;
        line-height: 28px;
        text-align: center;
        background: #f8f8f8;
        font-size: 16px;
        color: #666;
        &:first-of-type {
          border-right:1px solid #e4e4e4;
        }
        &:last-of-type {
          border-left:1px solid #e4e4e4;
        }
      }
      > input {
        width: 60px;
        padding: 0 5px;
        text-align: center;
        color: #666;
      }
    }
  }
  </style>