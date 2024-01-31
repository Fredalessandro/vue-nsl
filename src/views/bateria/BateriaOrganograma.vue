<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Baterias</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <!-- Your main content here -->
        <Organograma/>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import Organograma from '../components/Organograma.vue';
  
  export default {
    name: 'BateriaOrganograma',
    components: {
        Organograma,
    },
  };
  </script>