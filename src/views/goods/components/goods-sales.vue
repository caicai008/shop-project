<template>
    <ul class="goods-sales">
        <li>
            <p>销量人气</p>
            <p>200+</p>
            <p><i class="iconfont icon-task-filling"></i>销量人气</p>
        </li>
        <li>
            <p>商品评价</p>
            <p>400+</p>
            <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
        </li>
        <li>
            <p>收藏人气</p>
            <p>600+</p>
            <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
        </li>
        <li>
            <p>品牌信息</p>
            <p>苏宁电器</p>
            <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
        </li>
    </ul>
</template>

<script setup>

</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.goods-sales {
    display: flex;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 140px;
    li {
        flex: 1;
        position: relative;
        ~ li::after {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            height: 60px;
            border-left: 1px solid #e4e4e4;
        }
        p {
            &:first-child {
                color: #999;
            }
            &:nth-child(2) {
                color: @priceColor;
                margin-top: 10px;
            }
            &:last-child {
                color: #666;
                margin-top: 10px;
                i {
                    color: @xtxColor;
                    font-size: 14px;
                    margin-right: 2px;
                }
                &:hover {
                    color: @xtxColor;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>