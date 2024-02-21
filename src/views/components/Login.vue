<!-- Login.vue -->
<template>
   <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Atletas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div>
        <button @click="signInWithGoogle">Sign in with Google</button>
      </div>
    </ion-content>
    </ion-page>  
</template>

<script>
import { IonPage, IonTitle, IonContent, IonToolbar, IonHeader } from '@ionic/vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    IonPage, IonContent, IonTitle, IonToolbar, IonHeader
    },
  methods: {
    async signInWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        // User is signed in.
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>