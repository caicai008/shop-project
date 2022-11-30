<template>
    <div class="goods-sku">
      <dl v-for="item in goods.specs" :key="item.id">
        <dt>{{item.name}}</dt>
        <dd>
            <template v-for="val in item.values" :key="val.name">
                <img v-if="val.picture" :class="{selected:val.selected, disabled: val.disabled}" @click="clickSpecs(item,val)" :src="val.picture" :title="val.name" alt="">
                <span v-else :class="{selected: val.selected,  disabled: val.disabled}" @click="clickSpecs(item,val)">{{val.name}}</span>
            </template>
        </dd>
      </dl>
    </div>
</template>
<script>
import getPowerSet from '@/vender/power-set.js'
    const split  = '★'
    // 根据skus数据得到路径字典对象
    const getPathMap = (skus) => {
        const pathMap = {}
        skus.forEach(sku => {
            // 1. 过滤出有库存有效的sku
            if(sku.inventory) {
                // 2. 得到sku属性值数组
                const specs = sku.specs.map(spec => spec.valueName)
                 // 3. 得到sku属性值数组的子集
                 const powerSet = getPowerSet(specs)
                // 4. 设置给路径字典对象
                // console.log(powerSet);
                powerSet.forEach(set => {
                    const key = set.join(split)
                    // console.log(key);
                    if(pathMap[key]) {
                         // 已经有key往数组追加
                         pathMap[key].push(sku.id)
                    } else {
                         // 没有key设置一个数组
                         pathMap[key] = [sku.id]
                    }
                })
            }
        })
        return pathMap
    }

    // 得到当前选中规格集合
    const getSelectedArr = (specs) => {
        const selectedArr = []
        specs.forEach(spec => {
            const selectedVal = spec.values.find(val => val.selected)
            selectedArr.push(selectedVal ? selectedVal.name : undefined)
        })
        return selectedArr
    }

    // 更新按钮的禁用状态
    const updateDisabledStatus = (specs, pathMap) => {
        specs.forEach((spec, i) => {
            const selectedArr = getSelectedArr(specs)
            spec.values.forEach(val => {
            // 已经选中的按钮不用判断
            if (val.name === selectedArr[i]) return false
            // 未选中的替换对应的值
            selectedArr[i] = val.name
            // 过滤无效值得到key
            const key = selectedArr.filter(v => v).join(split)
            // 设置禁用状态
            val.disabled = !pathMap[key]
            })
        })
    }
export default {
        name: 'GoodsSku',
        props: {
            goods: {
                type: Object,
                default: () => {}
            }
        },
    setup(props) {
        const pathMap = getPathMap(props.goods.skus)
        // console.log(pathMap);
        // 组件初始化的时候更新禁用状态
        updateDisabledStatus(props.goods.specs, pathMap)


        const clickSpecs = (item, val) => {
            // 如果是禁用状态不作为
            if (val.disabled) return false
            if(val.selected) {
                val.selected = false
            } else {
                item.values.forEach(bv => {
                    bv.selected = false
                });
                val.selected = true
            }
            // 点击的时候更新禁用状态
            updateDisabledStatus(props.goods.specs, pathMap)
        }
        return { clickSpecs }
    }
}
</script>
<style scoped lang="less">
@import '@/assets/styles/variables.less';

  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
      border-color: @xtxColor;
    }
    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }
  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        > img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }
        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }
  </style>