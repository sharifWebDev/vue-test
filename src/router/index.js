import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// Layouts
import WebsiteLayout from "@/layouts/Website/WebsiteLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/Dashboard/DashboardLayout.vue";

const routes = [
  /* ================= Website (Customer Landing) ================= */
  {
    path: "/",
    component: WebsiteLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
        meta: { title: "Home" },
      },
    ],
  },

  /* ================= Auth ================= */
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
          title: "Login",
          guestOnly: true,
        },
      },
    ],
  },

  /* ================= Admin Dashboard ================= */
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () =>
          import("@/pages/admin/dashboard/Dashboard.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "hk-prod-size-types",
        name: "SizeTypes",
        component: () =>
          import("@/pages/admin/sizeType/SizeTypeManagement.vue"),
        meta: { title: "Size Types" },
      },
    ],
  },

  /* ================= 404 ================= */
  {
    path: "/:pathMatch(.*)*",
    component: WebsiteLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/NotFound.vue"),
        meta: { title: "404" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* ================= Guards ================= */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  document.title = `${to.meta.title || "App"} | AppBuilder Pro`;

  const isAuth = authStore.isAuthenticated;

  if (to.matched.some(r => r.meta.requiresAuth) && !isAuth) {
    return next("/login");
  }

  if (to.matched.some(r => r.meta.guestOnly) && isAuth) {
    return next("/dashboard");
  }

  next();
});

export default router;
