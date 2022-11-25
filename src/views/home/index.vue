<template>
    <!-- 二级路由首页组件 -->
    <div class="home-page">
        <div class="home-entry">
            <div class="container">
                <!-- 左侧分类 -->
                <HomeCategory />
                <!-- 轮播图 -->
                <HomeBanner />
            </div>
        </div>
    </div>
</template>

<script setup>
import HomeCategory from './components/home-category.vue';
import HomeBanner from './components/home-banner.vue'

</script>

<style lang="scss" scoped>

</style>