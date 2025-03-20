import { createRouter, createWebHistory } from 'vue-router';
import productRoutes from '@/modules/products/productRoutes';
import { useAuthStore } from '@/stores/authStore';
import Login from '@/pages/Login.vue';
import Dashboard from '@/modules/dashboard/Dashboard.vue';
import ItemRoutes from '@/modules/products/ItemRoutes';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  ...productRoutes,
  ...ItemRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
