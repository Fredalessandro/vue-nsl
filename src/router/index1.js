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
  },
  {
    path: '/evento',
    component: Evento,
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
