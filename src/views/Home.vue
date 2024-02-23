<!-- src/pages/Home.vue -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button @click="emitirEvento">Emitir Evento</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from 'vue';



export default {
  data() {
    return {
      mensagem: '',
    };
  },
  methods: {
    emitirEvento() {
      this.$store.commit('atualizarAtributo', 'Novo Valor');
    },
  },
};
</script>
