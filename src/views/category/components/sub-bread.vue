<template>
    <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-if="category.top" :to="`/category/${category.top}`">{{category.top.name}}</XtxBreadItem>
        <XtxBreadItem v-if="category.sub">{{category.sub.name}}</XtxBreadItem>
    </XtxBread>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const category = computed(() => {
            const cate = {}
            store.state.category.list.forEach(top => {
                if(top.children) {
                    const sub = top.children.find(sub => sub.id === route.params.id)
                    if(sub) {
                        cate.top = {id: top.id, name: top.name}
                        cate.sub = {id: sub.id, name: sub.name}
                    }
                }
            });
            return cate
        })

        return { category }
    }
}
</script>

<style lang="less" scoped>

</style>