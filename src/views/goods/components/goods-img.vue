<template>
    <div class="goods-img">
        <!-- 放大图 -->
        <div class="large" v-show="show" :style="[{backgroundImage: `url(${images[currIndex]})`}, bgPosition]"></div>
        <!-- 主图 -->
        <div class="middle" ref="target">
            <img :src="images[currIndex]" alt="">
            <!-- 放大图的遮罩层 -->
            <div class="layer" v-show="show" :style="position"></div>
        </div>
        <!-- 备选小图 -->
        <ul class="small">
            <li v-for="(img, i) in images" :key="i" :class="{active: currIndex === i}">
                <img :src="img" @mouseenter="currIndex = i" alt="">
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core'

    defineProps({
        images: {
            type: Array,
            default: () => []
        }
    })
    // 当前图索引
    const currIndex = ref(0)
    const target = ref(null)
    const show = ref(false)
    const bgPosition = reactive({ backgroundPositionX: 0, backgroundPositionY: 0 })
    const position = reactive({ left: 0, top: 0 })

    // usePreviewImg
    const usePreviewImg = () => {
        // elementX 鼠标基于容器左上角X轴偏移
        // elementY 鼠标基于容器左上角Y轴偏移
        // isOutside 鼠标是否在模板容器外
        const { elementX, elementY, isOutside } = useMouseInElement(target)
        watch([elementX, elementY, isOutside], () => {
          // 控制X轴方向的定位 0-200 之间
          if (elementX.value < 100) position.left = 0
          else if (elementX.value > 300) position.left = 200
          else position.left = elementX.value - 100
          // 控制Y轴方向的定位 0-200 之间
          if (elementY.value < 100) position.top = 0
          else if (elementY.value > 300) position.top = 200
          else position.top = elementY.value - 100
          // 设置大背景的定位
          bgPosition.backgroundPositionX = -position.left * 2 + 'px'
          bgPosition.backgroundPositionY = -position.top * 2 + 'px'
          // 设置遮罩容器的定位
          position.left = position.left + 'px'
          position.top = position.top + 'px'
          // 设置是否显示预览大图
          show.value = !isOutside.value
        })
        return { position, bgPosition, show, target }
    }
    usePreviewImg()

</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.goods-img {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: rgba(0,0,0,0.2);
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>