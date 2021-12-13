import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../vue/EcSite.vue"),
  },
  {
    path: "/ex01",
    component: () => import("../vue/Ex01.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../vue/EcSite.vue"),
  },
  {
    path: "/ecsite",
    component: () => import("../vue/EcSite.vue"),
  },
  {
    path: "/login",
    component: () => import("../vue/Login.vue"),
  },
  {
    path: "/registeradmin",
    component: () => import("../vue/RegisterAdmin.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../vue/ItemList.vue"),
  },
  {
    path: "/itemDetail/:id",
    component: () => import("../vue/ItemDetail.vue"),
  },
  {
    path: "/shoppingCart",
    component: () => import("../vue/ShoppingCart.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../vue/OrderConfirm.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../vue/OrderFinished.vue"),
  },
  {
    path: "/logout",
    component: () => import("../vue/Logout.vue"),
  },
  {
    path: "/mypage",
    component: () => import("../vue/Mypage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
