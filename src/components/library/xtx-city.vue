<template>
    <div class="xtx-city" ref="target">
      <div class="select" @click="toggleDialog" :class="{active}">
        <span class="placeholder">请选择配送地址</span>
        <span class="value"></span>
        <i class="iconfont icon-angle-down"></i>
      </div>
      <div class="option" v-if="active">
        <div v-if="isLoading" class="loading"></div>
        <template v-else>
            <span class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
        </template>
      </div>
    </div>
  </template>
<script>
  import { ref, computed } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import axios from 'axios'
  export default {
    name: 'XtxCity',
    setup () {
        // 控制展开收起,默认收起
        const active = ref(false)
        const cityData = ref([])
        const isLoading = ref(false)
        const openDialog = () => {
            active.value = true
            // 打开组件发起网络请求
            isLoading.value = true
            getCityData().then(data => {
                cityData.value = data
                // console.log(data);
                isLoading.value = false
            })
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
        // 获取城市数据
        const getCityData = () => {
            // 这个位置可能有异常操作，封装成promise
            return new Promise((resolve, rejects) => {
                if(window.cityData) {
                    // 有缓存
                    resolve(window.cityData)
                } else {
                    // 无缓存 发请求
                    const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
                    axios.get(url).then(res => {
                        // 避免重复发起请求
                        window.cityData = res.data
                        resolve(res.data)
                    })
                }
            })
        }
        // 定义计算属性
        const currList = computed(() => {
            const currList = cityData.value
            // TODO 根据点击的省份城市获取对应的列表
            return currList
        })
      return { active, toggleDialog, target, currList, isLoading }
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
      .loading {
            height: 290px;
            width: 100%;
            background: url(../../assets/images/loading.gif) no-repeat center;
        }
    }
  }
  </style>