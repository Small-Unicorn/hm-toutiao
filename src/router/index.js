// 初始化路由对象 导入路由 给main.js使用
// 路由路由路由
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    // 跳转路由 $router.push('/login')或者$router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home,
    //     redirect: '/welcome',
    //     children: [
    //         { path: '/welcome', name: 'welcome', component: Welcome }
    //     ]
    // }
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ] },
    // 路径404前边都不匹配 执行404
    { path: '*', name: '404', component: NotFound }
  ]
})
// 导出
export default router
