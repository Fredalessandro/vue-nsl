<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Evento</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Evento</ion-label>
            <ion-input v-model="evento.descricao" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Local do Evento</ion-label>
            <ion-input v-model="evento.local" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Data de Inicio do Evento</ion-label>
            <br>
            <ion-input v-model="evento.inicio" type="date" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label position="floating">Data de Inicio do Evento</ion-label>
            <br>
            <ion-input v-model="evento.final" type="date" required></ion-input>
          </ion-item>
         
              <ion-item>
                <ion-radio-group v-model="evento.status" class="horizontal-radio-group" value="A">
                <ion-row class="ion-justify-content-between">
                  <ion-item>
                    <ion-label style="margin-right: 8px;">Iniciado</ion-label>
                    <ion-radio value="I"></ion-radio>
                  </ion-item>

                  <ion-item>
                    <ion-label style="margin-right: 8px;">Aguardando Janela </ion-label>
                    <br/>
                    <ion-radio value="A"></ion-radio>
                  </ion-item>

                  <ion-item>
                    <ion-label style="margin-right: 8px;">Finalizado </ion-label>
                    <br/>
                    <ion-radio value="F"></ion-radio>
                  </ion-item>
                </ion-row>
              </ion-radio-group>
            
            </ion-item>
          <!-- Adicione outros campos como CPF, endereço, bairro, cidade, estado, senha e confirmação de senha aqui -->
  
          <ion-item>
            <ion-button expand="full" @click="cadastrarevento">Cadastrar</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonHeader, IonTitle, IonRadio, IonRadioGroup } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        evento: {
          descricao: '',
          local: '',
          inicio: '',
          final: '',
          status: ''
          // Adicione outros campos aqui
        },
      };
    },
    methods: {
      cadastrarevento() {
        // Adicione aqui a lógica para cadastrar o evento (por exemplo, usando Firebase, API, etc.)
        console.log('evento cadastrado:', this.evento);
      },
    },
    components: {
      IonButton,
      IonContent,
      IonInput,
      IonItem,
      IonLabel,
      IonList,
      IonPage,
      IonToolbar,
      IonHeader,
      IonTitle,
    },
  });
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados aqui se necessário */
  .horizontal-radio-group {
  .radio-button-inner {
    flex: 0 0 auto;
  }
}
  </style>