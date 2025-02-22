import { createWebHashHistory, createRouter } from "vue-router";

import Home from "@views/Home.vue";
import NewGame from "@views/NewGame.vue";
import RunGame from "@/views/RunGame.vue";
import EndGame from "@/views/EndGame.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/newgame",
    name: "NewGame",
    component: NewGame
  },
  { 
    path: "/rungame",
    name: "RunGame",
    component: RunGame
  },
  {
    path: "/endgame",
    name: "EndGame",
    component: EndGame
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
