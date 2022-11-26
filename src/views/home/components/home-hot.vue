<template>
    <div class="home-new">
        <HomePanel title="人气好物" subTitle="爆款推荐 不容错过">
            <template #right><XtxMore path="/" /></template>
            <!-- 面板内容 -->
            <div ref="target" style="position: relative;height: 406px;">
                <transition name="fade" mode="">
                    <ul v-if="goods.length" class="goods-list">
                        <li v-for="item in goods" :key="item.id">
                            <router-link :to="`/product/${item.id}`">
                                <img :src="item.picture" alt="">
                                <p class="name">{{item.title}}</p>
                                <p class="desc">{{item.alt}}</p>
                            </router-link>
                        </li>
                    </ul>
                    <HomeSkeleton v-else bg="#f0f9f4" />
                </transition>
            </div>

        </HomePanel>
    </div>
</template>

<script>
import { ref } from 'vue';
import { findHot } from '@/api/home.js'
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { useLazyData } from '@/hooks/index.js'
export default {
    name: "HomeHot",
    components: { HomePanel, HomeSkeleton },
    setup() {
        // findHot().then(data => {
        //     goods.value = data.result;
        // });
        // 调用懒加载方法
        const {target ,result} = useLazyData(findHot)
        return { goods: result, target };
    },
}

</script>

<style lang="less" scoped>
@import '@/assets/styles/mixins.less';
@import '@/assets/styles/common.less';
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    li {
        width: 306px;
        height: 406px;
        background-color: #f0f9f4;
        .hoverShadow();
        img {
            width: 306px;
            height: 306px;
        }
        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }
        .desc {
                color: #999;
                font-size: 18px;
            }
    }
}
</style>