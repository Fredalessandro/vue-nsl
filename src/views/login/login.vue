<template>
   <ion-page>
    <ion-content class="ion-padding">
        <ion-list class="custom-content">
            <ion-item>
                <ion-title class="custom-title">Login do Sistema</ion-title>
            </ion-item>
            <ion-item>
                <ion-input style="margin-right: 5px; " label="Email" v-model="email" type="email"
                    required></ion-input>
            </ion-item>
            <ion-item>
                <ion-input style="margin-right: 5px; " label="Password" v-model="password" type="password"
                    required></ion-input>
            </ion-item>
            <ion-item style="align: center;">
                <ion-button @click="signIn" class="custom-button">Entrar</ion-button>
            </ion-item>
            <ion-item>
                <ion-button @click="signInWithGoogle" class="custom-button">
                    <ion-icon :icon="'logo-google'" class="google-icon"></ion-icon>
                    Login com Google
                </ion-button>
            </ion-item>
        </ion-list>
     </ion-content>   
    </ion-page>
</template>
  
<script setup>
import { ref } from 'vue'
import firebase from 'firebase'
import { useRouter } from 'vue-router' // import router
import 'ionicons/icons';

const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router


const signIn = () => { // we also renamed this method
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
        .then((data) => {
            console.log('Successfully logged in!');
            router.push('') // redirect to the feed
        })
        .catch(error => {
            console.log(error.code)
            alert(error.message);
        });
}
const signInWithGoogle = () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider); // User is signed in.
    } catch (error) {
        console.error(error.message);
    }
}
</script>
<style scoped>

.custom-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  height: 100vh;
  max-width: 300px; /* Ajuste conforme necessário */
  width: 40vh;/* Adjust the button width as needed */
  margin: auto; /* Set the height to 100% of the viewport height */
}
.custom-title {
  text-align: center;
}
.custom-button {
  width: auto; /* Adjust the button width as needed */
  margin: auto; /* Center the button horizontally within the item */
}
/* Estilo para o ícone do Google */
.google-icon {
  margin-right: 8px; /* Espaçamento à direita do ícone */
}

.ion-page-login {
  margin-top: 20%;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.ion-content-login {
  width: 100%;
  text-align: center;
  margin: 16px;
}

.login-container {
  max-width: 300px; /* Ajuste conforme necessário */
  width: 100%;
}
</style> 