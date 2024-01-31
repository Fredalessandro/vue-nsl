<!-- FooterBar.vue -->

<template>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="handleButtonClick('Button 1')">Button 1</ion-button>
          <ion-button @click="handleButtonClick('Button 2')">Button 2</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script >
  import { IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      IonFooter,
      IonToolbar,
      IonButtons,
      IonButton,
    },
    emits: ['fechar-modal', 'salvar-usuario'],
    methods: {
      handleButtonClick(buttonName) {
        console.log(`Clicked ${buttonName}`);
        // Add your custom logic here
      },
    },
  });
  </script>
  