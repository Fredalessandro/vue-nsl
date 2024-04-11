<!-- CadastroobjetoEdicaoModal.vue -->

<template>
  <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:80%; --width: 80%;">
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro de Diretor de Prova</ion-title>
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
      </ion-list>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
      <div class="ion-text-center" >
        <ion-button @click="salvarEdicao">Salvar</ion-button>
      </div>
    </ion-footer>
  </ion-modal>
</template>

<script >
import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonFooter, IonButtons, IonInput , IonItem, IonLabel,
  IonSelect, IonSelectOption, IonText,IonList,IonCheckbox
} from '@ionic/vue'; 
import Diretor from '../../model/Diretor';

export default {    
  
  props: ['isModalOpen','objetoEdicao','isReadOnly'],
  emits: ['fechar-modal', 'salvarEdicao'],
  components: {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
  IonButton, IonFooter,IonLabel,
  IonButtons, IonInput, IonItem,
  IonSelect, IonSelectOption, IonText, IonList, IonCheckbox,
  Diretor
},
  data() {
    return {
      seuModelo: '',
      selectedOption: null

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
    }
  }

  
}; 

</script>