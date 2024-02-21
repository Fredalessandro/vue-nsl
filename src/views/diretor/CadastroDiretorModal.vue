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

    <ion-content  class="ion-padding">
        <ion-item v-if="objetoEdicao.id && objetoEdicao.id!=0">
          <ion-label>Código {{ objetoEdicao.id }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 400px;" :maxlength="50" label="Nome" v-model="objetoEdicao.nome" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="15"  label="Telefone" v-mask="'##-#####-####'" v-model="objetoEdicao.telefone" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-input style="margin-right: 5px; width: 400px;" :maxlength="250" label="E-mail" v-model="objetoEdicao.email" required></ion-input>
        </ion-item>
     
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
  IonSelect, IonSelectOption, IonText
} from '@ionic/vue'; 
import Diretor from '../../model/Diretor';

export default {    
  
  props: ['isModalOpen','objetoEdicao'],
  emits: ['fechar-modal', 'salvarEdicao'],
  components: {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
  IonButton, IonFooter,IonLabel,
  IonButtons, IonInput, IonItem,
  IonSelect, IonSelectOption, IonText,
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

</script>../../model/Diretor