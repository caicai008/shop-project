// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
import defaultImg from '@/assets/images/200.png'

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// 获取所有的.vue文件
export const getComponentAll = () => {
	// 读取所有的.vue文件
	const files = import.meta.globEager('./*.vue');
	const components = [];
	// 找到所有的组件
	for (const key in files) {
		if (Object.prototype.hasOwnProperty.call(files, key)) {
			components.push(files[key].default);
		}
	}
	return components;
};


export default {
    install(app) {
      defineDirective(app)
      // app.component(XtxSkeleton.name, XtxSkeleton)
      // app.component(XtxCarousel.name, XtxCarousel)
      // app.component(XtxMore.name, XtxMore)
      // app.component(XtxBread.name, XtxBread)
      // app.component(XtxBreadItem.name, XtxBreadItem)

      // 遍历组件集合,注册组件
      getComponentAll().forEach((Component) => {
        // 注册组件
        app.component(Component.name, Component);
      });
    }
}

const defineDirective = (app) => {
    // 图片懒加载指令
    app.directive('lazy', {
      mounted (el, binding) {
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
            // 进入可视区，停止监视
          if (isIntersecting) {
            observer.unobserve(el)
            el.onerror = () => {
                el.src = defaultImg
            }
            el.src = binding.value
          }
        }, {
          threshold: 0.01
        })
        // 开始监视
        observer.observe(el)
      }
    })
  }