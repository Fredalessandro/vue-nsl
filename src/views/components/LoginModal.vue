<!-- src/components/LoginModal.vue -->
<template>
    <ion-modal :is-open="showModal" @closed="dismissModal">
      <ion-content>
        <ion-button @click="loginWithGoogle">Login with Google</ion-button>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button @click="loginWithEmail">Login with Email</ion-button>
      </ion-content>
    </ion-modal>
  </template>
  
  <script>
  import { ref } from 'vue';
  //import { signInWithGoogle, signInWithEmailAndPassword } from '../../service/authService';
  
  export default {
    props: ['showModal'],
    setup(props, { emit }) {
      const email = ref('');
      const password = ref('');
  
      const dismissModal = () => {
        emit('closed');
      };
  
      const loginWithGoogle =  () => {
        try {
          //await signInWithGoogle();
          let provider = new firebase.auth.GoogleAuthProvider();
          firebase
                  .auth()
                  .signInWithPopup(provider)
                  .then((result) => {
                    let token = result.credential.accessToken;
                    let user = result.user;
                      console.log(token) // Token
                      console.log(user) // User that was authenticated
                  })
                  .catch((err) => {
                    console.log(err); // This will give you all the information needed to further debug any errors
                  });
          dismissModal();
        } catch (error) {
          console.error('Google login error:', error);
        }
      };
  
      const loginWithEmail = async () => {
        try {
          //await signInWithEmailAndPassword(email.value, password.value);
          dismissModal();
        } catch (error) {
          console.error('Email/password login error:', error);
        }
      };
  
      return { email, password, loginWithGoogle, loginWithEmail, dismissModal };
    },
  };
  </script>
  