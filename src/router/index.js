import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import WebsiteLayout from "@/layouts/WebsiteLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

// Modules
import SizeTypeRoutes from "@/pages/admin/sizeType/SizeTypeRoutes";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Home.vue"),
    meta: { layoutComponent: WebsiteLayout, title: "Home" },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login.vue"),
    meta: { layoutComponent: AuthLayout, title: "Login", guestOnly: true },
  },
  {
    path: "/dashboard",
    meta: {
      layoutComponent: DashboardLayout,
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/pages/admin/dashboard/Dashboard.vue"),
        meta: { title: "Dashboard Overview" },
      },
      ...SizeTypeRoutes, // Spread directly; handle meta inside the module file
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 1. Set Title
  document.title = `${to.meta.title || "App"} | AppBuilder Pro`;

  // 2. Security Checks
  const isAuthenticated = authStore.isAuthenticated;

  // Use .matched.some to ensure nested routes inherit security
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isGuestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requiresAuth && !isAuthenticated) return next("/login");
  if (isGuestOnly && isAuthenticated) return next("/dashboard");

  next();
});

export default router;
