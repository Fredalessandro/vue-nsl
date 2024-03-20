<template>
    <ion-app>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar @ionTabButtonClick="handleTabButtonClick" slot="top" class="left-aligned-tab-bar">
                
                <ion-tab-button v-if="(store.getters.getUser && store.getters.getDiretor.perfil === 'ADMIN')"  tab="diretor">
                    <ion-label>Diretor de Provas</ion-label>
                    <!--<ion-icon :icon="iconEllipse"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button v-if="(store.getters.getUser)"   tab="evento">
                    <ion-label>Eventos</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button v-if="(store.getters.getUser)"   tab="categoria">
                    <ion-label>Categorias</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>
                
               <ion-tab-button ref="bateria"  tab="bateria">
                    <ion-label>Baterias</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button ref="altleta"  tab="atleta">
                    <ion-label>Atletas</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button ref="juizes"  tab="juizes">
                    <ion-label>Filiações</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button v-if="store.getters.getUser"  tab="logout">
                    <ion-label>Sair do Sistema</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button v-if="!store.getters.getUser"  tab="login">
                    <ion-label>Entrar no Sistema</ion-label>
                    <!--<ion-icon :icon="iconSquare"></ion-icon>-->
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-app>
</template>
  
  <script>
  import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ellipse,square } from 'ionicons/icons';
  import store from './store';


  export default defineComponent({
  components: {
    IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    IonHeader, IonToolbar, IonButtons, IonButton
  },
  data() {
    return {
        router:  useRouter(),
        iconEllipse: ellipse,
        iconSquare: square,
        store: store,
        diretor: this.$store.getters.getDiretor,
        user: this.$store.getters.getUser,
        isObjetoLinha : this.$store.getters.getObjetoLina,
    }
  },
  methods: {
    handleTabButtonClick(tabName) {
      // Perform actions when a tab button is clicked
      console.log(`Tab button "${tabName.detail.tab}" clicked`);
      tabName.selected = true;
      // Example: Redirect to the clicked tab's route
      if(this.user) {
        this.$router.push({ path: `/${tabName.detail.tab}`, replace: true });
      } else {
        this.$router.push({ path: '/login',replace: true });
      }
      
    },
    isLogado(){
        return this.user;
    }
  },
  mounted(){
          if (!store.getters.getUser) {
              // If authentication is required but the user is not authenticated, redirect to login
              this.$router.replace('login');
          }
          
  }
})
</script>

<style scoped>
.left-aligned-tab-bar {
  justify-content: flex-start;
}
</style>