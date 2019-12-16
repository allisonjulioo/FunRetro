import Vue from 'vue';
import VueRouter from 'vue-router';
import MinhasRetros from '../views/MinhasRetros.vue';
import CreateRetro from '../views/CreateRetro.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/minhas_retros',
    name: 'minhas_retros',
    component: MinhasRetros,
  },
  {
    path: '/retro/:idRetro',
    name: 'retro/:idRetro',
    component: CreateRetro,
  },
  {
    path: '**',
    component: MinhasRetros,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-active',
  routes,
});

export default router;
