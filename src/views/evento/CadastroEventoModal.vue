<!-- CadastroevntoEdicaoModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:40%; --width: 80%;">

        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Eventos</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
          <ion-item v-if="evntoEdicao.id && evntoEdicao.id!=0">
            <ion-label>Código {{ evntoEdicao.id }}</ion-label>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="14"  label="Evento" oninvalid="" v-mask="'###.###.###-##'" v-model="evntoEdicao.cpf" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="14"  label="Local" oninvalid="" v-mask="'###.###.###-##'" v-model="evntoEdicao.cpf" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Dt. Inicio" type="date" v-model="evntoEdicao.dataNascimento" required></ion-input>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Dt. Final"  type="date" v-model="evntoEdicao.dataNascimento" required></ion-input>
          </ion-item>
  
      </ion-content>
      <ion-footer>
        <div class="ion-text-center" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="salvarevntoEdicao">Salvar</ion-button>
        </div>    
      </ion-footer>
    </ion-modal>
  </template>
  
  <script >
  import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonButtons, IonInput, IonItem, IonLabel  
} from '@ionic/vue'; 
  
  export default {    
    
    props: ['isModalOpen','evntoEdicao'],
    emits: ['fechar-modal', 'salvar-evntoEdicao'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,
    IonButtons, IonInput, IonItem, IonLabel
  },
    data() {
      return {
         // Instância de um novo Eventos
        seuModelo: ''
      };
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarevntoEdicao() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvar-novoUsuario', this.evntoEdicao);
        this.fecharModal();
      },
    }
    
  }; 
  
  </script>
  <style scoped>
  .custom-modal {
  --width: 80%; /* Set your custom width here */
  --heigth: auto;
  }
  </style>