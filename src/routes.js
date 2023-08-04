import Home from "./components/home.vue";
import signup from "./components/Signup.vue";
import login from "./components/Login.vue";
import notFound from "./components/Notfound.vue";
import add from "./components/add.vue";
import product from "./components/product.vue";
import user from "./components/user.vue";
import deshboard from "./components/deshboard.vue";
import update from "./components/update.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "signup",
    component: signup,
    path: "/signup",
  },
  {
    name: "login",
    component: login,
    path: "/login",
  },
  {
    name: "notFound",
    component: notFound,
    path: "/:catchAll(.*)",
  },
  {
    name: "add",
    component: add,
    path: "/add",
  },
  {
    name: "product",
    component: product,
    path: "/products/:id",
    props: true,
  },
  {
    name: "user",
    component: user,
    path: "/user/:id",
  },
  {
    name: "deshboard",
    component: deshboard,
    path: "/deshboard",
  },
  {
    name: "update",
    component: update,
    path: "/update/:id",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem("user-info");
  if (userInfo && (to.name === "login" || to.name === "signup")) {
    next({ name: "Home" });
  } else if (!userInfo && to.name !== "login" && to.name !== "signup") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
