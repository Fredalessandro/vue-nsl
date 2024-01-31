<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{bateria.round}}</ion-card-title>
        <ion-card-subtitle>{{bateria.descricao}}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list >
          <ion-item>
            <ion-thumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </ion-thumbnail>
            <ion-label>Item</ion-label>
          </ion-item>
        </ion-list>  
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
    import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
    import { defineComponent } from 'vue';

  export default defineComponent ({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    props: {
      bateria: {
        type: Object,
        required: true
      }
    }
  });
  </script>