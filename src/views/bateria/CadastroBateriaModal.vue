<!-- CadastrocategoriaEdicaoModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:80%; --width: 80%;">

        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Bateria</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
          <!--<ion-item v-if="objetoEdicao.id && objetoEdicao.id!=0">
            <ion-label>Código {{ objetoEdicao.id }}</ion-label>
          </ion-item>-->
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Descrição" v-model="objetoEdicao.descricao" required></ion-input>
          </ion-item>
         
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Inscrição"  v-model="objetoEdicao.valorInscricao" required></ion-input>
          </ion-item>
  
          <ion-item>  
            <ion-input style="margin-right: 5px; width: 450px;" :maxlength="2"  label="Idade"  v-model="objetoEdicao.idade" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label>Selecione a regra para idade</ion-label><br/>
            <ion-select style="margin-right: 5px; width: 450px;" v-model="objetoEdicao.regra">
                <ion-select-option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label+(objetoEdicao.idade==0?"":" "+objetoEdicao.idade) }}
                </ion-select-option>
            </ion-select>
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
  import Categoria from '../../model/Categoria';

  export default {    
    
    props: ['isModalOpen','objetoEdicao','isReadOnly'],
    emits: ['fechar-modal', 'salvarEdicao'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,IonLabel,
    IonButtons, IonInput, IonItem,
    IonSelect, IonSelectOption, IonText,
    Categoria
  },
    data() {
      return {
        seuModelo: '',
        selectedOption: null,
        options: [
        { label: 'Até', value: 'Até' },
        { label: 'A partir de', value: 'A partir de' },
        { label: 'Open Amador', value: 'Open Amador' },
        { label: 'Open Pro', value: 'Open Pro' },
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
      }
    }
  
    
  }; 
  
  </script>