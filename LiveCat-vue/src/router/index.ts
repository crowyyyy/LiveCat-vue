import { createRouter, createWebHashHistory } from "vue-router";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import UIRoutes from "./ui.routes";
import LandingRoutes from "./landing.routes";
import UtilityRoutes from "./utility.routes";
import PagesRoutes from "./pages.routes";
import ChartsRoutes from "./charts.routes";
import AppsRoutes from "./apps.routes";
import DataRoutes from "./data.routes";
import AiRoutes from "./ai.routes";
import SettingRoutes from "@/router/setting.routes";


export const routes = [
  {
    path: "/",
    redirect: "/setting/plugin_setting/plugins",
    meta: {},
  } as any,
  {
    path: "/setting/plugin_setting/plugins",
    meta: {
      requiresAuth: true,
      layout: "landing",
    },
    // component: () => import("@/views/pages/DashBoard.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/errors/NotFoundPage.vue"),
  },
  ...UserRoutes,
  ...LandingRoutes,
  ...AuthRoutes,
  ...PagesRoutes,
  ...UtilityRoutes,
  ...UIRoutes,
  ...ChartsRoutes,
  ...AppsRoutes,
  ...DataRoutes,
  ...AiRoutes,
  ...SettingRoutes
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

const router = createRouter({
  history: createWebHashHistory(),
  // hash模式：createWebHashHistory，history模式：createWebHistory
  // process.env.NODE_ENV === "production"

  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
