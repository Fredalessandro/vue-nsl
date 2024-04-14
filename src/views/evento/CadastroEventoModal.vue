<!-- CadastroobjetoEdicaoModal.vue -->

<template>
  <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:80%; --width: 80%;">

      
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro de Evento</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="fecharModal">Fechar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content  class="ion-padding">
        <!--<ion-item v-if="objetoEdicao.id && objetoEdicao.id!=0">
          <ion-label>Código {{ objetoEdicao.id }}</ion-label>
        </ion-item>-->

        <ion-item>
          <ion-input style="margin-right: 5px; width: 350px;" :maxlength="40" label="Evento" v-model="objetoEdicao.evento" required></ion-input>
        </ion-item>
       
        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Local" v-model="objetoEdicao.local" required></ion-input>
        </ion-item>
        
        <ion-item>       
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Periodo de " type="date" :readonly="!isReadOnly" v-model="objetoEdicao.dataInicio" required></ion-input>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="A " type="date" :readonly="!isReadOnly" v-model="objetoEdicao.dataFinal" required></ion-input>
        </ion-item>       
        
        <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Valor Inscrição"  v-model="objetoEdicao.valorInscricao" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Atletas Por Bateria"  v-model="objetoEdicao.qtdAtletasBateria" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Qtd. Ondas Surfadas"  v-model="objetoEdicao.qtdOndaSurfada" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Tempo por bateria"  v-model="objetoEdicao.tempoBateria" required></ion-input>
          </ion-item>

          
        <ion-item>
          <ion-label>Status</ion-label><br/>
          <ion-select style="margin-right: 5px; width: 450px;" v-model="objetoEdicao.status">
              <!--<ion-select-option v-for="option in options" :key="option.value" :value="option.value">
              </ion-select-option>-->
              <ion-select-option value="Aguardando">Aguardando</ion-select-option>
              <ion-select-option value="Iniciado">Iniciado</ion-select-option>
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
import Evento from '../../model/Evento';

export default {    
  
  props: ['isModalOpen','objetoEdicao','isReadOnly'],
  emits: ['fechar-modal', 'salvarEdicao'],
  components: {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
  IonButton, IonFooter,IonLabel,
  IonButtons, IonInput, IonItem,
  IonSelect, IonSelectOption, IonText,
  Evento
},
  data() {
    return {
      seuModelo: '',
      selectedOption: null,
      options: [
      { label: 'Aguardando', value: 'Aguardando' },
      { label: 'Iniciado',   value: 'Iniciado' },
      { label: 'Pausa',   value: 'Pausa' },
      { label: 'Finalizado', value: 'Finalizado' },
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