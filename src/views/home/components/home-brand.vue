<template>
    <div class="home-brand">
        <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
            <template #right>
                <a @click="toggle(-1)" :class="{disable: index === 0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
                <a @click="toggle(1)" :class="{disable: index === 1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
            </template>
            <div class="box" ref="target">
                <transition name="fade" mode="">
                    <ul v-if="brands.length" class="list" :style="{transform: `translateX(${-index * 1240}px)`}">
                        <li v-for="item in brands" :key="item.id">
                            <router-link to="/">
                                <img :src="item.picture" alt="">
                            </router-link>
                        </li>
                    </ul>
                    <div v-else class="skeleton">
                        <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"  />
                    </div>
                </transition>
            </div>
        </HomePanel>

    </div>
</template>

<script>
import { ref } from 'vue';
import HomePanel from './home-panel.vue';
import { findBrand } from '@/api/home.js';
import { useLazyData } from '@/hooks/index.js';
export default{
    name: '',
    components: { HomePanel },
    setup() {
        // const brands = ref([])
        // findBrand().then(data => {
        //     // console.log(data);
        //     brands.value = data.result
        // })
        const { target, result } = useLazyData(() => findBrand(10))

        // 切换效果
        const index = ref(0)
        const toggle = (step) => {
            const newIndex = index.value + step
            // 小于0 或者大于1禁止切换
            if(newIndex < 0 || newIndex > 1) return
            index.value = newIndex
        }

        return { brands: result, target, index, toggle}
    }
}
</script>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.iconfont {
    width: 20px;
    height: 20px;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: #27BA9B;
    &::before {
        font-size: 12px;
        position: relative;
        top: -2px;
    }
    &.disable {
        background: #ccc;
        cursor: not-allowed;
    }
}

.box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;
    .list {
        transition: all .5s linear;
        width: 200%;
        display: flex;
        li {
            margin-right: 10px;
            width: 240px;
            &:nth-child(5n) {
                margin-right: 0;
            }
            img {
                width: 240px;
                height: 305px;
            }
        }
    }
}
.skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>