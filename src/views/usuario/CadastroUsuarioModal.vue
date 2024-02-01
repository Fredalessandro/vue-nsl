<!-- CadastrousuarioEdicaoModal.vue -->

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
          <ion-item v-if="usuarioEdicao.id && usuarioEdicao.id!=0">
            <ion-label>Código {{ usuarioEdicao.id }}</ion-label>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="14"  label="CPF" oninvalid="" v-mask="'###.###.###-##'" v-model="usuarioEdicao.cpf" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" :maxlength="40"  label="Nome" v-model="usuarioEdicao.nome" required></ion-input>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Dt. Nascimento" type="date" v-model="usuarioEdicao.dataNascimento" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="15"  label="Telefone" v-mask="'##-#####-####'" v-model="usuarioEdicao.telefone" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" label="Email" v-model="usuarioEdicao.email" type="email" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="9" @ion-blur="consultarCep"  label="CEP" v-mask="'#####-###'" v-model="usuarioEdicao.cep" required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Endereço"       v-model="usuarioEdicao.endereco"      required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="6"   label="Numero"         v-model="usuarioEdicao.numero"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 15%;"     :maxlength="20"  label="Complemento"    v-model="usuarioEdicao.complemento"   required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="30"  label="Bairro"       v-model="usuarioEdicao.bairro"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Cidade"       v-model="usuarioEdicao.cidade"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="2"   label="UF"           v-model="usuarioEdicao.uf"        required></ion-input>
          </ion-item>

      </ion-content>
      <ion-footer>
        <div class="ion-text-center" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="salvarUsuarioEdicao">Salvar</ion-button>
        </div>    
      </ion-footer>
    </ion-modal>
  </template>
  
  <script >
  import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonButtons, IonInput, IonItem, IonLabel  
} from '@ionic/vue'; 
  import Usuario from '../../model/Usuario';
  import {CepService} from '@/service/CepService';


  export default {    
    
    props: ['isModalOpen','usuarioEdicao'],
    emits: ['fechar-modal', 'salvar-usuarioEdicao'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,
    IonButtons, IonInput, IonItem, IonLabel
  },
    data() {
      return {
         // Instância de um novo usuário
        seuModelo: ''
      };
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarUsuarioEdicao() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvar-novoUsuario', this.usuarioEdicao);
        this.fecharModal();
      },
      async consultarCep() {
      try {
        const resultadoCep = await CepService.consultarCep(this.usuarioEdicao.cep);
        this.usuarioEdicao.endereco = resultadoCep.logradouro;
        this.usuarioEdicao.bairro = resultadoCep.bairro;
        this.usuarioEdicao.cidade = resultadoCep.localidade;
        this.usuarioEdicao.uf     = resultadoCep.uf;
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