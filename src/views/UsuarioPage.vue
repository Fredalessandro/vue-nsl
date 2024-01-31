<template>
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Cadastro de Usuário</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-content class="ion-padding">
       
         <ion-item v-if="novoUsuario.id != 0">
           <ion-label>Código {{ novoUsuario.id }}</ion-label>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Nome</ion-label>
           <ion-input v-model="novoUsuario.nome" required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Email</ion-label>
           <ion-input v-model="novoUsuario.email" type="email" required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Telefone</ion-label>
           <ion-input v-model="novoUsuario.telefone" type="tel" required></ion-input>
         </ion-item>

         <ion-item>
             <ion-label position="floating">CPF</ion-label>
             <ion-input v-model="novoUsuario.cpf" type="number" required></ion-input>
         </ion-item>

         <ion-item>
             <ion-label position="fixed">Data Nascimento</ion-label>
             <ion-input v-model="novoUsuario.cpf" type="date" required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">CEP</ion-label>
           <ion-input v-model="novoUsuario.cep" type="number" required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Endereço</ion-label>
           <ion-input v-model="novoUsuario.endereco"  required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Numero</ion-label>
           <ion-input v-model="novoUsuario.numero"  required></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Complemento</ion-label>
           <ion-input v-model="novoUsuario.complemento"></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Bairro</ion-label>
           <ion-input v-model="novoUsuario.bairro"></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">Cidade</ion-label>
           <ion-input v-model="novoUsuario.cidade"></ion-input>
         </ion-item>

         <ion-item>
           <ion-label position="floating">UF</ion-label>
           <ion-input v-model="novoUsuario.uf"></ion-input>
         </ion-item>

           <div class="grid-container">
            <ion-grid>
              <ion-row width="25%">
                <ion-col size="6">
                  <ion-button expand="block" @click="salvarnovoUsuario">Salvar</ion-button>
                </ion-col>
                <ion-col size="6">
                  <ion-button expand="block" @click="cancelaNovoUsuario">Cancelar</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
           </div> 

     </ion-content>
      </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import Usuario from '../model/Usuario'


  export default defineComponent({
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      Usuario,
    },
    props: ['isModalOpen'],
    emits: ['fechar-modal', 'salvar-novoUsuario'],
    data() {
      return {
        novoUsuario: new Usuario(), // Instância de um novo usuário
      };
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarnovoUsuario() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvar-novoUsuario', this.novoUsuario);
        this.fecharModal();
      },
      cancelaNovoUsuario() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvar-novoUsuario', this.novoUsuario);
        this.fecharModal();
      },
    },
    
  });
  </script>
  
  <style scoped>
  /* Adicione estilos personalizados aqui se necessário */
  .grid-container {
  max-width: 600px; /* Adjust the desired width */
  margin: 0 auto;   /* Center the container, if needed */
}
  </style>