import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useLoadingStore } from '@/shared/stores/useLoadingStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/modules/trades/pages/MarketplacePage.vue'),
    meta: { showLoginPrompt: true } // Permite que visitantes vejam as cartas, mas mostra prompt de login para interagir
  },
  {
    path: '/marketplace',
    redirect: '/'
  },
  {
    path: '/trades',
    name: 'trades',
    component: () => import('@/modules/trades/pages/TradesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/modules/auth/pages/RegisterPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/modules/users/pages/DashboardPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized) => {
  const auth = useAuthStore()
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()

  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { 
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  // Se a rota é para visitantes (login/register) e o usuário está autenticado
  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'home' }
  }
})

router.afterEach(() => {
  const loadingStore = useLoadingStore()
  loadingStore.stopLoading()
})

export default router 