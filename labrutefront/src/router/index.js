import Home from "../views/Home.vue";
import Arene from "../views/Arene.vue";
import Brute from "../views/Brute.vue";
import Fight from "../views/Fight.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "CatchAll",
    redirect: "/",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/arene/:id",
    name: "Arene",
    component: Arene,
  },
  {
    path: "/brute/:id",
    name: "Brute",
    component: Brute,
  },
  {
    path: "/arene/:id/:idtofight",
    name: "Fight",
    component: Fight,
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
