<!-- CadastronovoCategoriaModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:40%; --width: 40%;">

        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Categorias</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
          <ion-item v-if="novoCategoria.id && novoCategoria.id!=0">
            <ion-label>Código {{ novoCategoria.id }}</ion-label>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Descrição" v-model="novoCategoria.descricao" required></ion-input>
          </ion-item>
         
  
          <ion-item>  
            <ion-input style="margin-right: 5px; width: 450px;" :maxlength="2"  label="Idade" v-mask="'##'" v-model="novoCategoria.idade" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label>Selecione a regra para idade</ion-label><br/>
            <ion-select style="margin-right: 5px; width: 450px;" v-model="novoCategoria.regra">
                <ion-select-option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label+" "+novoCategoria.idade }}
                </ion-select-option>
            </ion-select>
          </ion-item>

      </ion-content>
      <ion-footer>
        <div class="ion-text-center" style="margin-bottom: 2%;position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="salvarnovoCategoria">Salvar</ion-button>
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
    
    props: ['isModalOpen'],
    emits: ['fechar-modal', 'salvar-novoCategoria'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter,IonLabel,
    IonButtons, IonInput, IonItem,
    IonSelect, IonSelectOption, IonText
  },
    data() {
      return {
        novoCategoria: new Categoria(), // Instância de um novo usuário
        seuModelo: '',
        selectedOption: null,
        options: [
        { label: 'Até', value: 'Até' },
        { label: 'A partir de ', value: 'A partir de' },
        // Adicione mais opções conforme necessário
      ]
      };
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarnovoCategoria() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvar-novoCategoria', this.novoCategoria);
        this.fecharModal();
        this.novoCategoria = new Categoria();
      }
    }
  
    
  }; 
  
  </script>
  <style scoped>
  .custom-modal {
  --width: 80%; /* Set your custom width here */
  --heigth: auto;
  }
  </style>