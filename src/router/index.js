
import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/Usuario',
    component: () => import ('../views/usuario/UsuarioListaPage.vue')
  },
  {
    path: '/folder/Organizador',
    component: () => import ('../views/OrganizadorPage.vue')
  },
  {
    path: '/folder/Organizador',
    component: () => import ('../views/OrganizadorPage.vue')
  },
  {
    path: '/folder/Evento',
    component: () => import ('../views/EventoPage.vue')
  },
  {
    path: '/folder/Bateria',
    component: () => import ('../views/bateria/BateriaOrganograma.vue')
  },
  

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
