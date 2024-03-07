<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button autohide="false" menu="side-menu"></ion-menu-button>
        </ion-buttons>
        <ion-title v-if="selectedIndex > -1">{{ appPages[selectedIndex].title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-menu v-if="store.getters.getUser" content-id="main-content" menu-id="side-menu">

      <ion-content>
        <ion-list id="inbox-list">
          <ion-item class="ion-justify-content-center ion-align-items-center">
            <ion-avatar>
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar" />
            </ion-avatar>
          </ion-item>  
          <ion-item class="ion-justify-content-center ion-align-items-center">
            <ion-label>{{ store.getters.getUser.displayName || store.getters.getUser.email }}</ion-label> 
          </ion-item>
          <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
            <!--@click="selectedIndex = i"-->
            <ion-item v-if="p.labelMenu!=null" @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false"
              class="hydrated" :class="{ selected: selectedIndex === i }">
              <!--<ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>-->
              <ion-label>{{ p.labelMenu }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>

    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <div></div>

  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import store from './store';

 
const router = useRouter();
const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Cadastro de Diretor de prova',
    labelMenu: 'Diretor de prova',
    url: '/diretor',
    //iosIcon: null,
    //mdIcon: null,
  },
  {
    title: 'Cadastro de Eventos',
    labelMenu: 'Eventos',
    url: '/Eventos',
    //iosIcon: paperPlaneOutline,
    //mdIcon: paperPlaneSharp,
  },
  {
    title: 'Cadastro de Categorias',
    labelMenu: 'Categorias',
    url: '/Categorias',
    // iosIcon: archiveOutline,
    // mdIcon: archiveSharp,
  },
  {
    title: 'Cadastro de Baterias',
    labelMenu: 'Baterias',
    url: '/Baterias',
    // iosIcon: warningOutline,
    // mdIcon: warningSharp,
  },
  {
    title: 'Cadastro de Filiação',
    labelMenu: 'Filiações',
    url: '/Filiacoes',
    //iosIcon: heartOutline,
    //mdIcon: heartSharp,
  },
  {
    title: 'Cadastro de Juizes',
    labelMenu: 'Juizes',
    url: '/Juizes',
    //iosIcon: heartOutline,
    //mdIcon: heartSharp,
  },
  {
    title: 'Cadastro de Atletas',
    labelMenu: 'Atletas',
    url: '/Atletas',
    // iosIcon: trashOutline,
    // mdIcon: trashSharp,
  },
  
];
  if (!store.getters.getUser) {
    // If authentication is required but the user is not authenticated, redirect to login
    router.replace('login');
  }
/*
firebase.auth().onAuthStateChanged((user) => {
  const isAuthenticated = !!user;
  if (!isAuthenticated) {
    // If authentication is required but the user is not authenticated, redirect to login
    router.replace('login');
  } else if (isAuthenticated) {
    // If authentication is not required but the user is authenticated, redirect to dashboard
    router.replace('Home');
  }
});*/


const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
//let atributoCompartilhado = store.state.atributoCompartilhado;
const path = window.location.pathname;
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.url.toLowerCase() === path.toLowerCase());
}



//EventBus.config.globalProperties.$on('atualizarAtributo', atualizarAtributo);

</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
