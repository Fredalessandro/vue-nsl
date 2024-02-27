
import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import ('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/login/login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import ('../views/registro/registro.vue')
  },
  {
    path: '/diretor',
    name: 'Diretor',
    component: () => import ('../views/diretor/DiretorListaPage.vue'),
  },
  {
    path: '/eventos',
    name: 'Evento',
    component: () => import ('../views/evento/EventoListaPage.vue'),
  },
  {
    path: '/categorias',
    name: 'Categoria',
    component: () => import ('../views/categoria/CategoriaListaPage.vue'),
  },
  {
    path: '/atletas',
    name: 'Atleta',
    component: () => import ('../views/atleta/AtletaListaPage.vue'),
  },
  {
    path: '/baterias',
    name: 'Bateria',
    component: () => import ('../views/bateria/Bateria.vue'),
  },
  

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router
