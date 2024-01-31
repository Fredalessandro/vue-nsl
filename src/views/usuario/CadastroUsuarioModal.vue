<!-- CadastronovoUsuarioModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:40%; --width: 80%;">

        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Usuário</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
          <ion-item v-if="novoUsuario.id && novoUsuario.id!=0">
            <ion-label>Código {{ novoUsuario.id }}</ion-label>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="14"  label="CPF" oninvalid="" v-mask="'###.###.###-##'" v-model="novoUsuario.cpf" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" :maxlength="40"  label="Nome" v-model="novoUsuario.nome" required></ion-input>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Dt. Nascimento" type="date" v-model="novoUsuario.dataNascimento" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="15"  label="Telefone" v-mask="'##-#####-####'" v-model="novoUsuario.telefone" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" label="Email" v-model="novoUsuario.email" type="email" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="9" @ion-blur="consultarCep"  label="CEP" v-mask="'#####-###'" v-model="novoUsuario.cep" required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Endereço"       v-model="novoUsuario.endereco"      required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="6"   label="Numero"         v-model="novoUsuario.numero"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 15%;"     :maxlength="20"  label="Complemento"    v-model="novoUsuario.complemento"   required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="30"  label="Bairro"       v-model="novoUsuario.bairro"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Cidade"       v-model="novoUsuario.cidade"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="2"   label="UF"           v-model="novoUsuario.uf"        required></ion-input>
          </ion-item>

      </ion-content>
      <ion-footer>
        <div class="ion-text-center" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="salvarnovoUsuario">Salvar</ion-button>
        </div>    
      </ion-footer>
    </ion-modal>
  </template>
  
  <script >
  import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonButtons, IonInput  
} from '@ionic/vue'; 
  import Usuario from '../../model/Usuario';
  import {CepService} from '@/service/CepService';


  export default {    
    
    props: ['isModalOpen'],
    emits: ['fechar-modal', 'salvar-novoUsuario'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,
    IonButtons, IonInput
  },
    data() {
      return {
        novoUsuario: new Usuario(), // Instância de um novo usuário
        seuModelo: ''
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
      async consultarCep() {
      try {
        const resultadoCep = await CepService.consultarCep(this.novoUsuario.cep);
        this.novoUsuario.endereco = resultadoCep.logradouro;
        this.novoUsuario.bairro = resultadoCep.bairro;
        this.novoUsuario.cidade = resultadoCep.localidade;
        this.novoUsuario.uf     = resultadoCep.uf;
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
      }
    }}
    
  }; 
  
  </script>
  <style scoped>
  .custom-modal {
  --width: 80%; /* Set your custom width here */
  --heigth: auto;
  }
  </style>../../service/CepService