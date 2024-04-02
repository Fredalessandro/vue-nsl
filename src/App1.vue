<template>
    <ion-app>
      <ion-nav ref="nav" />
      <ion-router-outlet></ion-router-outlet>
        <!--<ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar @ionTabButtonClick="handleTabButtonClick" slot="top" class="left-aligned-tab-bar">
                
                <ion-tab-button v-if="(diretor && diretor.perfil == 'ADMIN') && user"  tab="diretor">
                    <ion-label>Diretores de Provas</ion-label>
                </ion-tab-button>

                <ion-tab-button v-if="(diretor && diretor.perfil == 'ADMIN') && user" tab="evento">
                    <ion-label>Eventos</ion-label>
                </ion-tab-button>

                <ion-tab-button v-if="user" tab="logout">
                    <ion-label>Sair do Sistema</ion-label>
                </ion-tab-button>

                <ion-tab-button v-if="!user" tab="login">
                    <ion-label>Entrar no Sistema</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>-->
    </ion-app>
</template>
  
  <script>
  import { IonApp, IonNav,IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ellipse,square } from 'ionicons/icons';
  import { mapState } from 'vuex';

  export default defineComponent({
  components: {
    IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    IonHeader, IonToolbar, IonButtons, IonButton, IonNav
  },
  data() {
    return {
        router:  useRouter(),
        iconEllipse: ellipse,
        iconSquare: square,
    }
  },
  computed: {
    ...mapState(['diretor','diretorSelecionado','user'])
  },
  setup() {
    const nav = ref(null);

    // Função para voltar para a página anterior
    const goBack = () => {
      if (nav.value.canGoBack()) {
        nav.value.goBack();
      }
    };

    return {
      nav,
      goBack
    };
  },
  methods: {
    handleTabButtonClick(tabName) {
      // Perform actions when a tab button is clicked
      console.log(`Tab button "${tabName.detail.tab}" clicked`);
      tabName.selected = true;
      // Example: Redirect to the clicked tab's route
      this.$router.push({ path: `/${tabName.detail.tab}`, replace: true });      
    }
  },
})
</script>

<style scoped>
.left-aligned-tab-bar {
  justify-content: flex-start;
}
</style>