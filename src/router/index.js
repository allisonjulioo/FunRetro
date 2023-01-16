import Axios from "axios";
import Vue from "vue";
import Router from "vue-router";
import Boards from "../views/Boards/Boards.vue";
import CreateBoard from "../views/CreateBoard.vue";
import LoginComponent from "../views/Login.vue";

Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem("access_token");
Vue.use(Router);

const authGuard = (to, from, next) => {
  const loggedIn = localStorage.getItem("uitoken");

  if (!loggedIn) {
    return next("/login");
  }

  next();
};

const routes = [
  {
    path: "/boards",
    name: "boards",
    component: Boards,
    beforeEnter: authGuard,
  },
  {
    path: "/board/:idBoard",
    name: "board/:idBoard",
    component: CreateBoard,
    beforeEnter: authGuard,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: Boards,
  },
];

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  apiUrl: process.env.VUE_APP_API_URL,
  linkExactActiveClass: "is-active",
  routes,
});

export default router;
