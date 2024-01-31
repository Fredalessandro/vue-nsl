<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Categorias</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Categoria</ion-label>
            <ion-input v-model="categoria.descricao" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Faixa de </ion-label>
            <ion-input v-model="categoria.faixaInicial" type="number" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">A</ion-label>
            <ion-input v-model="categoria.faixaFinal" type="number" required>Anos</ion-input>
          </ion-item>
  
          <!-- Adicione outros campos como CPF, endereço, bairro, cidade, estado, senha e confirmação de senha aqui -->
  
          <ion-item>
            <ion-button expand="full" @click="cadastrarcategoria">Cadastrar</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonHeader, IonTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        categoria: {
          descricao: '',
          faixaInicial: '',
          faixaFinal: '',
          // Adicione outros campos aqui
        },
      };
    },
    methods: {
      cadastrarcategoria() {
        // Adicione aqui a lógica para cadastrar o categoria (por exemplo, usando Firebase, API, etc.)
        console.log('categoria cadastrado:', this.categoria);
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
  </style>