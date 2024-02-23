
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
    path: '/folder/login',
    name: 'Login',
    component: () => import ('../views/login/login.vue')
  },
  {
    path: '/folder/registro',
    name: 'Registro',
    component: () => import ('../views/registro/registro.vue')
  },
  {
    path: '/folder/diretor',
    name: 'Diretor',
    component: () => import ('../views/diretor/DiretorListaPage.vue'),
  },
  {
    path: '/folder/eventos',
    name: 'Evento',
    component: () => import ('../views/evento/EventoListaPage.vue'),
  },
  {
    path: '/folder/categorias',
    name: 'Categoria',
    component: () => import ('../views/categoria/CategoriaListaPage.vue'),
  },
  {
    path: '/folder/atletas',
    name: 'Atleta',
    component: () => import ('../views/atleta/AtletaListaPage.vue'),
  },
  {
    path: '/folder/baterias',
    name: 'Bateria',
    component: () => import ('../views/bateria/Bateria.vue'),
  },
  

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router
