
import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '',
    redirect: '/folder/Inbox',
  },
  {
    path: '/folder/login',
    component: () => import ('../views/login/login.vue')
  },
  {
    path: '/folder/registro',
    component: () => import ('../views/registro/registro.vue')
  },
  {
    path: '/folder/diretor',
    component: () => import ('../views/diretor/DiretorListaPage.vue'),
  },
  {
    path: '/folder/eventos',
    component: () => import ('../views/evento/EventoListaPage.vue'),
  },
  {
    path: '/folder/categorias',
    component: () => import ('../views/categoria/CategoriaListaPage.vue'),
  },
  {
    path: '/folder/atletas',
    component: () => import ('../views/atleta/AtletaListaPage.vue'),
  },
  {
    path: '/folder/baterias',
    component: () => import ('../views/bateria/Bateria.vue'),
  },
  

];

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../configuration/firebaseConfig.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router
