<template>
   <ion-page>
    <ion-content class="ion-padding">
        <ion-list class="custom-content">
            <ion-item class="custom-bordered-list custom-title">
                <ion-title>Login do Sistema</ion-title>
            </ion-item>
            <ion-item class="custom-bordered-list">
                <ion-input   label="login" :maxlength="60" v-model="login" required></ion-input>
            </ion-item>
            <ion-item class="custom-bordered-list">
                <ion-input  label="Password" :maxlength="6" v-model="senha" type="password"  required></ion-input>
            </ion-item>
            <ion-item class="custom-bordered-list">  
                <ion-checkbox v-model="offline" @ionChange="handleChange">offline</ion-checkbox>
            </ion-item>  
            <ion-item class="no-bottom-border" style="align">
                <ion-button @click="signIn" class="custom-button">Entrar</ion-button>
            </ion-item>

            <!--<ion-item class="custom-bordered-bottom">
                <ion-button @click="signInWithGoogle" class="custom-button">
                    <ion-icon :icon="googleLogo" class="google-logo"></ion-icon>
                     Fazer login com o Google
                </ion-button>
            </ion-item>-->  
            <ion-item class="no-bottom-border">
              <ion-button @click="register" class="custom-button">Criar Usuário</ion-button>
            </ion-item>  
        </ion-list>
     </ion-content>    
    </ion-page> 
</template>
  
<script>
import { ref } from 'vue';
import { IonPage, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput,IonCheckbox } from '@ionic/vue';
import { useRouter } from 'vue-router' // import router
import 'ionicons/icons';
import FirestoreService from '@/database/FirestoreService';
import store from '@/store';
import Constantes from '../../Constantes';
import UsuarioService from '../../service/UsuarioService';

export default {
  components: {
    IonPage, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput, IonCheckbox, store
  },
  data() {
    return {login: ref(''),
    senha: ref(''),
    router: useRouter(),
    offline: false, // get a reference to our vue router
    googleLogo: ref('logo-google.svg')};    
  },
  methods: {
    handleChange(event){
      // This function will be called whenever the checkbox state changes
        this.offline = event.detail.checked;
      },
    async signIn() {
      
      try {
      /**const user = this.offline? await FirestoreService.executeQuery(Constantes.colecaoUserLocal, 'email', '==', this.email):
        await this.$store.dispatch('signInWithEmailAndPassword', {
            email: this.email,
            password: this.password,
        });*/
      
      //  const data =  await FirestoreService.executeQuery('Diretores/', 'email', '==', user.email);
      /*const data =  await FirestoreService.executeQuery('Diretores/', 'email', '==', user.email);
      
      console.log('Data :', data);
      
      await this.$store.dispatch('setDiretor', { diretor : data});
      await this.$store.dispatch('setDiretorSelecionado', { diretorSelecionado : data});*/

      const usuario = await UsuarioService.checkLogin({login: this.login, senha: this.senha});
      await this.$store.dispatch('setUsuario', { usuario : usuario});
      this.router.push({path:usuario.tipo=='ADMIN'?'diretor':'evento', replace: true });
      } catch (error) {
        console.error('Error signing in:', error.message);
        alert(error.message);
      }

    },
    async signInWithGoogle(){
       /**try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider); // User is signed in.
            const user = result.user;

            console.log('Successfully signed in with Google:', user);
        } catch (error) {
            console.error(error.message);
        }*/
    },
    register(){
        this.router.push({ path: 'registro', replace: true });
    }
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
  width: 60vh;/* Adjust the button width as needed */
  margin: auto; /* Set the height to 100% of the viewport height */
}
.custom-title {
  --background: #2b08f3;
  color: #fff;
  text-align: center;
}


.custom-bordered-list {
  border: 1px solid #000; /* Adapte a largura e a cor da borda conforme necessário */
  border-radius: 8px; /* Adapte o raio da borda conforme necessário */
  margin-bottom: 8px; /* Adapte a margem inferior conforme necessário */
}
.custom-bordered-bottom {
  border-bottom: 1px solid #000; /* Adapte a largura e a cor da borda conforme necessário */
}
.no-border {
  border: 0px solid transparent; /* Adapte a largura e a cor da borda conforme necessário */
  /* Adapte a margem inferior conforme necessário */
}

.no-bottom-border {
  --inner-border-width: 0; /* Set the inner border width to 0 to remove the bottom border */
}

.horizontal-line {
  border-top: 1px solid #000; /* Adjust the line color and style as needed */
  width: 100%; /* Adjust the line width as needed */
  margin: 32px 0 32px 0; /* Adjust the margin as needed */
}
.custom-button {
  text-transform: none;
  width: auto; /* Adjust the button width as needed */
  margin: auto; /* Center the button horizontally within the item */
}


/* Estilo para o ícone do Google */

.google-logo {
color: linear-gradient( #FF0000 0%, #FFFF00 25%, #05C1FF 50%, #FFFF00 75%, #FF0000 100%);
-webkit-text-fill-color: transparent;
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