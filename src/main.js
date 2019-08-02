// 入口文件
// 引入需要的依赖模块(js 包 css 其他资源)
// 创建根vue实例
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// @是一个路径的别名 是src路径 在vue-cli项目下有效
// index是目录的索引文件 默认使用的索引文件 index.js index.vue index.json
import router from '@/router'

// 产品级别提示 不开启 开发阶段
Vue.config.productionTip = false
Vue.use(ElementUI)

// h 渲染app根组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
