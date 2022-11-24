<template>

    <!-- 一级路由布局容器 -->
    <!-- 顶部导航组件 -->
    <AppTopnav />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 吸顶头部 -->
    <AppHeaderSticky />
    <main>
        <!-- 二级路由挂载点 -->
        <router-view></router-view>
    </main>
    <!-- 底部组件 -->
    <AppFooter />
</template>

<script setup>
import AppHeader from '../components/app-header.vue';
import AppTopnav from '../components/app-topnav.vue';
import AppFooter from '../components/app-footer.vue';
import { useStore } from 'vuex'
import AppHeaderSticky from '../components/app-header-sticky.vue';

const store = useStore()
store.dispatch('category/getList')
</script>

<style lang="less" scoped>

</style>