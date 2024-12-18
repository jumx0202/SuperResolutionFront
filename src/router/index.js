import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store.js';// 导入 Vuex store
import {ElMessage} from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    // {
    //   path: '/ability',
    //   name: 'ability',
    //   component: () => import('../views/ability.vue')
    // },
    // {
    //   path: '/history',
    //   name: 'history',
    //   component: () => import('../views/History.vue')
    // },
    {
      path: '/ability2',
      name: 'ability2',
      component: () => import('../views/ability2.vue')
    },
    {
      path: '/history2',
      name: 'history2',
      component: () => import('../views/History2.vue')
    },
    {
      path: '/',
      name: 'home1',
      component: () => import('../views/Home.vue')
    },
  ]
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  // 获取 Vuex 中的登录状态
  const isLoggedIn = store.getters.isAuthenticated;

  // 如果目标页面不是登录页面且用户未登录
  if (to.name !== 'login' && !isLoggedIn) {
    ElMessage.warning("请先登录")
    next({ name: 'login' }); // 重定向到登录页面
  } else {
    next(); // 继续访问目标页面
  }
});

export default router;
