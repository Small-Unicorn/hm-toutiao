// 初始化路由对象 导入路由 给main.js使用
// 路由路由路由
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'
import Image from '@/views/image'
import Publish from '@/views/publish'

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
    // 二级路由
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish }
      ] },
    // 路径404前边都不匹配 执行404
    { path: '*', name: '404', component: NotFound }
  ]
})
// 全局前置导航守卫
// 全局钩子函数 跳转之前
router.beforeEach((to, from, next) => {
  // // 若是登录路由 放行
  // if (to.path === 'login') return next()
  // // 放行获取用户信息 如果没有 拦截登陆
  // if (store.getUser().token) return next('/login')
  // // 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
// 导出
export default router
