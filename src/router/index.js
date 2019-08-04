// 初始化路由对象 导入路由 给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    // 跳转路由 $router.push('/login')或者$router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home }
  ]
})
// 导出
export default router
