<template>
    <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
      <ul class="carousel-body">
        <li class="carousel-item" v-for="(item, i) in sliders" :key="i" :class="{fade: index === i}">
          <RouterLink to="/">
            <img :src="item.imgUrl" alt="">
          </RouterLink>
        </li>
      </ul>
      <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
      <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
      <div class="carousel-indicator">
        <span v-for="(item, i) in sliders" :key="i" :class="{active: index === i}"></span>
      </div>
    </div>
  </template>

  <script>
import { onUnmounted, ref, watch } from 'vue';

  export default {
    name: 'XtxCarousel',
    props: {
        sliders: {
            type: Array,
            default: () => []
        },
        duration: {
            type: Number,
            default: 3000
        },
        autoPlay: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        // 默认显示图片的索引
        const index = ref(0)

        // 自动播放
        let timer = null
        const autoPlayFn = () => {
            clearInterval(timer)
            timer = setInterval(() => {
                index.value ++
                if(index.value > (props.sliders.length - 1)) {
                    index.value = 0
                }
            }, props.duration);
        }

        // 需要监听sliders数据变化，判断如果有数据且autoPlay是true
        watch(() => props.sliders, (newVal) => {
          if (newVal.length && props.autoPlay) {
            autoPlayFn()
          }
        }, { immediate: true })

        // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
        const stop = () => {
            if(timer) clearInterval(timer)
        }
        const start = () => {
            if(props.sliders.length && props.autoPlay) {
                autoPlayFn()
            }
        }

        // 上一张下一张
        const toggle = (step) => {
          const newIndex = index.value + step
          // 到最后一张图-往后
          if(newIndex > (props.sliders.length -1)) {
            index.value = 0
            return
          }
          // 到第一张图-往前
          if(newIndex < 0) {
            index.value = props.sliders.length - 1
            return
          }
          // 正常
          index.value = newIndex
        }

        // 组件销毁，清除定时器
        onUnmounted(() => {
          clearInterval(timer)
        })

        return { index, start, stop, toggle }
    }
  }
  </script>
  <style scoped lang="less">
  .xtx-carousel{
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;
    .carousel{
      &-body {
        width: 100%;
        height: 100%;
      }
      &-item {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: opacity 0.5s linear;
        &.fade {
          opacity: 1;
          z-index: 1;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-indicator {
        position: absolute;
        left: 0;
        bottom: 20px;
        z-index: 2;
        width: 100%;
        text-align: center;
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          cursor: pointer;
          ~ span {
            margin-left: 12px;
          }
          &.active {
            background:  #fff;
          }
        }
      }
      &-btn {
        width: 44px;
        height: 44px;
        background: rgba(0,0,0,.2);
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 228px;
        z-index: 2;
        text-align: center;
        line-height: 44px;
        opacity: 0;
        transition: all 0.5s;
        &.prev{
          left: 20px;
        }
        &.next{
          right: 20px;
        }
      }
    }
    &:hover {
      .carousel-btn {
        opacity: 1;
      }
    }
  }
  </style>
