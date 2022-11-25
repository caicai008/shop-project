<template>
    <div class="home-new">
        <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
            <template #right><XtxMore path="/" /></template>
            <!-- 面板内容 -->
            <ul class="goods-list">
                <li v-for="item in goods" :key="item.id">
                    <router-link :to="`/product/${item.id}`">
                        <img :src="item.picture" alt="">
                        <p class="name ellipsis">{{item.name}}</p>
                        <p class="price">{{item.price}}</p>
                    </router-link>
                </li>
            </ul>
        </HomePanel>
    </div>
</template>

<script>
import { ref } from 'vue';
import { findNew } from '@/api/home.js'
import HomePanel from './home-panel.vue';
export default {
    name: "HomeNew",
    components: { HomePanel },
    setup() {
        const goods = ref([]);
        findNew().then(data => {
            goods.value = data.result;
        });
        return { goods };
    },
}

</script>

<style lang="less" scoped>
@import '@/assets/styles/mixins.less';
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
        .price {
                color: #CF4444;
            }
    }
}
</style>