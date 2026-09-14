import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return sessionStorage.getItem('eduplay-auth') === 'true'
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/pages/Library.vue')
  },
  {
    path: '/my-games',
    name: 'MyGames',
    component: () => import('@/pages/MyGames.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/Settings.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const isLoginRoute = to.path === '/login'

  if (!isLoginRoute && !isAuthenticated()) {
    next('/login')
    return
  }

  if (isLoginRoute && isAuthenticated()) {
    next('/')
    return
  }

  next()
})
