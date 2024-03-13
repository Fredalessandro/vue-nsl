<template>
    <ion-app>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar @ionTabButtonClick="handleTabButtonClick" slot="top" class="left-aligned-tab-bar">
                <ion-tab-button v-if="store.getters.getUser" ref="diretor" tab="diretor">
                    <ion-label>Diretor de Provas</ion-label>
                    <!--<ion-icon :icon="iconEllipse"></ion-icon>-->
                </ion-tab-button>

                <ion-tab-button v-if="store.getters.getUser"  tab="evento">
                    <ion-label>Eventos</ion-label>
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
        iconSquare: square
    }
  },
  methods: {
    handleTabButtonClick(tabName) {
      // Perform actions when a tab button is clicked
      console.log(`Tab button "${tabName.detail.tab}" clicked`);
      tabName.selected = true;
      // Example: Redirect to the clicked tab's route
      this.router.push(`/${tabName.detail.tab}`);
    },
    async handleSignOut() {
      try {
        await auth.signOut(); // Sign out the user
        router.push('/login'); // Redirect to the login page
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },
  },
  mounted(){
    if (!store.getters.getUser) {
    // If authentication is required but the user is not authenticated, redirect to login
        router.replace('login');
    }
  }
  
});
</script>

<style scoped>
.left-aligned-tab-bar {
  justify-content: flex-start;
}
</style>