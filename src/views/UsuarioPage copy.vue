<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Usuário</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Nome</ion-label>
            <ion-input v-model="usuario.nome" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="usuario.email" type="email" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Telefone</ion-label>
            <ion-input v-model="usuario.telefone" type="tel" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Senha</ion-label>
            <ion-input v-model="usuario.senha" :type="showPassword ? 'text' : 'password' " required></ion-input>
            <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" slot="end" @click="togglePasswordVisibility"></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Confirma Senha</ion-label>
            <ion-input v-model="usuario.confirmarSenha" :type="showPassword ? 'text' : 'password' " required></ion-input>
            <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" slot="end" @click="togglePasswordVisibility"></ion-icon>
          </ion-item>
  
          <!-- Adicione outros campos como CPF, endereço, bairro, cidade, estado, senha e confirmação de senha aqui -->
  
          <ion-item>
            <ion-button expand="full" @click="cadastrarUsuario">Cadastrar</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonHeader, IonTitle } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
  
  export default defineComponent({
    data() {
      return {
        usuario: {
          nome: '',
          email: '',
          telefone: '',
          senha: '',
          confirmarSenha: ''
          // Adicione outros campos aqui
        },
      };
    },setup() {
    const password = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      password,
      showPassword,
      togglePasswordVisibility,
      eyeOutline,
      eyeOffOutline,
    };
  },
    methods: {
      cadastrarUsuario() {
        // Adicione aqui a lógica para cadastrar o usuário (por exemplo, usando Firebase, API, etc.)
        console.log('Usuário cadastrado:', this.usuario);
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
  },
  );
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados aqui se necessário */
  </style>