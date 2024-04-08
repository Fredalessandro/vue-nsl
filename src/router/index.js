import { createRouter, createWebHistory } from '@ionic/vue-router';

import Diretor from '@/views/diretor/DiretorListaPage.vue';
import Evento from '@/views/evento/EventoListaPage.vue';
import Categoria from '@/views/categoria/CategoriaListaPage.vue';
import Juiz from '@/views/juiz/JuizListaPage.vue'
import Atleta from '@/views/atleta/AtletaListaPage.vue'
import Login from '@/views/login/login.vue';
import Logout from '@/views/login/logout.vue';
import Registro from '@/views/registro/registro.vue';
import Bateria from '../views/bateria/BateriaLiastaPage.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
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
    path: '/categoria',
    component: Categoria,
  },
  {
    path: '/bateria',
    component: Bateria,
  },
  {
    path: '/juiz',
    component: Juiz,
  },
  {
    path: '/atleta',
    component: Atleta,
  },
  {
    path: '/registro',
    component: Registro,
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
