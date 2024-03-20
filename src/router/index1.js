import { createRouter, createWebHistory } from '@ionic/vue-router';

import Diretor from '@/views/diretor/DiretorListaPage.vue';
import Evento from '@/views/evento/EventoListaPage.vue';
import Login from '@/views/login/login.vue';
import Logout from '@/views/login/logout.vue';

const routes = [
  {
    path: '/',
    redirect: '/diretor',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/diretor',
    component: Diretor,
    beforeEnter: (to, from, next) => {
      // Clear cache before entering the route
      // You can add your cache-clearing logic here
      next();
    }
  },
  {
    path: '/evento',
    component: Evento,
    beforeEnter: (to, from, next) => {
      // Clear cache before entering the route
      // You can add your cache-clearing logic here
      next();
    }
  },
  {
    path: '/logout',
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
