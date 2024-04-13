<!-- CadastrocategoriaEdicaoModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:80%; --width: 80%;">

        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Juízes</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-list class="custom-content">
        <ion-item class="custom-bordered-list">
          <ion-input label="Nome" v-model="objetoEdicao.nome" type="text" required></ion-input>
        </ion-item>
        <ion-item class="custom-bordered-list">
          <ion-input label="Login" v-model="objetoEdicao.login" type="text" required></ion-input>
        </ion-item>
        <ion-item class="custom-bordered-list">
          <ion-input label="Email" v-model="objetoEdicao.email" type="email" required></ion-input>
        </ion-item>
        <ion-item class="custom-bordered-list">
          <ion-input label="Telefone" v-model="objetoEdicao.telefone" v-mask="'##-#####-####'" required></ion-input>
        </ion-item>
        <ion-item class="custom-bordered-list">
          <ion-input label="Senha" :maxlength="6" v-model="objetoEdicao.senha" type="text" required></ion-input>
        </ion-item>
        <ion-item class="custom-bordered-list">
          <ion-input label="Confirme a senha" :maxlength="6" v-model="objetoEdicao.confirmeSenha" type="text"
            required></ion-input>
        </ion-item>
        <ion-item>  
            <ion-checkbox v-model="objetoEdicao.ativo" @ionChange="handleChange">Ativo</ion-checkbox>
        </ion-item>  
          <ion-item>
            <ion-label>Selecione tipo juiz</ion-label><br/>
            <ion-select style="margin-right: 5px; width: 450px;" v-model="objetoEdicao.perfil">
                <ion-select-option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

      </ion-content>
      <ion-footer>
        <div class="ion-text-center" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="salvarEdicao">Salvar</ion-button>
        </div>    
      </ion-footer>
    </ion-modal>
  </template>
  
  <script >
  import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonFooter, IonButtons, IonInput , IonItem, IonLabel,
    IonSelect, IonSelectOption, IonText, IonCheckbox
} from '@ionic/vue'; 
  import Juiz from '../../model/Juiz';

  export default {    
    
    props: ['isModalOpen','objetoEdicao','isReadOnly'],
    emits: ['fechar-modal', 'salvarEdicao'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,IonLabel,
    IonButtons, IonInput, IonItem,
    IonSelect, IonSelectOption, IonText, IonCheckbox,
    Juiz
  },
    data() {
      return {
        seuModelo: '',
        selectedOption: null,
        options: [
        { label: 'JUIZ PRINCIPAL', value: 'JUIZ PRINCIPAL' },
        { label: 'JUIZ', value: 'JUIZ' }
        // Adicione mais opções conforme necessário
      ]
      };
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarEdicao() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvarEdicao', this.objetoEdicao);
        this.fecharModal();
      },
      handleChange(event){
      // This function will be called whenever the checkbox state changes
        this.objetoEdicao.ativo = event.detail.checked;
      }

    }
  
    
  }; 
  
  </script>