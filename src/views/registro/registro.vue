  <template>
    <ion-page>
     <ion-content class="ion-padding">
         <ion-list class="custom-content">
             <ion-item class="custom-bordered-list custom-title">
                 <ion-title>Criar Usuário</ion-title>
             </ion-item>
             <ion-item class="custom-bordered-list">
                 <ion-input   label="Nome" v-model="nome" type="text"
                     required></ion-input>
             </ion-item>
             <ion-item class="custom-bordered-list">
                 <ion-input   label="Telefone" v-model="telefone" v-mask="'##-#####-####'" 
                     required></ion-input>
             </ion-item>
             <ion-item class="custom-bordered-list">
                 <ion-input   label="Email" v-model="email" type="email"
                     required></ion-input>
             </ion-item>
             <ion-item class="custom-bordered-list">
                 <ion-input  label="Senha" :maxlength="8" v-model="senha" type="password"
                     required></ion-input>
             </ion-item>
             <ion-item class="custom-bordered-list">
                 <ion-input  label="Confirme a senha" :maxlength="8" v-model="confirmeSenha" type="password"
                     required></ion-input>
             </ion-item>
             <!--<ion-item class="custom-bordered-bottom">
                 <ion-button @click="signInWithGoogle" class="custom-button">
                     <ion-icon :icon="googleLogo" class="google-logo"></ion-icon>
                      Fazer login com o Google
                 </ion-button>
             </ion-item>-->  
             <ion-item class="no-bottom-border">
               <ion-button @click="cancel" class="custom-button">Cancelar</ion-button>
               <ion-button @click="register" class="custom-button">Salvar</ion-button>
             </ion-item>  
         </ion-list>
      </ion-content>    
    </ion-page> 
 </template>
   
 <script>
 import { ref } from 'vue'
 import {
  IonPage, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput
  } from '@ionic/vue';
  import {firebase} from '../../firebase.js';
  import FirestoreService from '@/database/FirestoreService.js';
  import { useRouter } from 'vue-router' // import router
  import 'ionicons/icons';
  import Diretor from '../../model/Diretor';
  import store from '../../store/index.js';
export default {
  components: {
    IonPage, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonInput,
    Diretor
  },
  data() {
    return {
    nome: 'ALESSANDRO',
    telefone: '81984147601',
    email: 'fredalessandro@gmail.com',
    senha: '31281704',
    confirmeSenha: '31281704',
    router: useRouter(), // get a reference to our vue router   
  }},
  methods: {
   async register(){
    try {
      firebase
        .auth() // get the auth api
        .createUserWithEmailAndPassword(this.email, this.senha) // need .value because ref()
        .then((data) => {
          
          console.log('Successfully registered!');
          
        })
        .catch(error => {
          console.log(error.code)
          alert(error.message);
      });

        
        const collectionName = 'Diretores';

        const diretor = await FirestoreService.add(collectionName, new Diretor(null,this.nome,this.telefone,this.email,'OPERADOR',null));
        
        await this.$store.dispatch('setDiretorStorage', { diretor : diretor.id})
        .then(()=>{
          this.router.push('Login'); // redirect to the feed
          window.location.reload();
        }).catch(error => {
          console.error('Error add data:', error);
          alert(error.message);
        });

      } catch(error)  {
        console.error('Error add data:', error);
      };
    },
    cancel(){
        this.router.push({name:'Home'});
        window.location.reload();
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
   max-width: 80%; /* Ajuste conforme necessário */
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
 </style> ../../store/index.old/index.js../../store/index.js.old/index.js