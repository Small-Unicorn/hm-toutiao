// 入口文件
// 引入需要的依赖模块(js 包 css 其他资源)
// 创建根vue实例
import Vue from 'vue'
import App from './App.vue'

// 产品级别提示 不开启 开发阶段
Vue.config.productionTip = false
// h 渲染app根组件
new Vue({
  render: h => h(App)
}).$mount('#app')
