
import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/Usuarios',
    component: () => import ('../views/usuario/UsuarioListaPage.vue')
  },
  {
    path: '/folder/Organizadores',
    component: () => import ('../views/organizador/OrganizadorListaPage.vue')
  },
  {
    path: '/folder/Eventos',
    component: () => import ('../views/evento/EventoListaPage.vue')
  },
  {
    path: '/folder/Categorias',
    component: () => import ('../views/categoria/CategoriaListaPage.vue'),
  },
  {
    path: '/folder/Atletas',
    component: () => import ('../views/atleta/AtletaListaPage.vue'),
  },
  {
    path: '/folder/Baterias',
    component: () => import ('../views/bateria/Bateria.vue')
  },
  

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
