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

    <ion-content class="ion-padding">
      <!--<ion-item v-if="objetoEdicao.id && objetoEdicao.id!=0">
          <ion-label>Código {{ objetoEdicao.id }}</ion-label>
        </ion-item>-->
      <ion-list>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 350px;" :maxlength="40" label="Evento"
            v-model="objetoEdicao.evento" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Local" v-model="objetoEdicao.local"
            required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10" label="Periodo de " type="date"
            :readonly="!isReadOnly" v-model="objetoEdicao.dataInicio" required></ion-input>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10" label="A " type="date"
            :readonly="!isReadOnly" v-model="objetoEdicao.dataFinal" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="40" label="Valor Inscrição"
            v-model="objetoEdicao.valorInscricao" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Atletas Por Bateria"
            v-model="objetoEdicao.qtdAtletasBateria" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Qtd. Ondas Surfadas"
            v-model="objetoEdicao.qtdOndaSurfada" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input style="margin-right: 5px; width: 250px;" :maxlength="2" label="Tempo por bateria"
            v-model="objetoEdicao.tempoBateria" required></ion-input>
        </ion-item>


        <ion-item>
          <ion-label>Status</ion-label><br />
          <ion-select style="margin-right: 5px; width: 450px;" v-model="objetoEdicao.status">
            <!--<ion-select-option v-for="option in options" :key="option.value" :value="option.value">
              </ion-select-option>-->
            <ion-select-option value="Aguardando">Aguardando</ion-select-option>
            <ion-select-option value="Iniciado">Iniciado</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          
          <div :style="{ width:  '12%'}" v-for="(cor, index) in cores" :key="index" class="row-colors-checkbox">
            <input type="color" v-model="selectedColor" @input="handleColorInput">
            <!--<ion-checkbox :style="{ '--checkbox-background': cor,'--checkbox-background-checked': cor.value,'--border-width':2}" @click="handleCheckboxClick(cor.value)" 
                        :checked="objetoEdicao.cores.includes(cor.value)"></ion-checkbox>-->
          </div>
          <!--<ion-grid>
            <ion-row>
              <ion-col style="background-color: white;" v-for="(cor, index) in cores" :key="index">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-label>{{ cor.label }}</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-checkbox @click="handleCheckboxClick(cor.value)"
                        :checked="objetoEdicao.cores.includes(cor.value)"></ion-checkbox>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-col>
            </ion-row>
          </ion-grid>-->
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
  IonSelect, IonSelectOption, IonText,IonList,IonCheckbox
} from '@ionic/vue'; 



export default {    
  
  props: ['isModalOpen','objetoEdicao','isReadOnly'],
  emits: ['fechar-modal', 'salvarEdicao'],
  components: {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
  IonButton, IonFooter,IonLabel,
  IonButtons, IonInput, IonItem,
  IonSelect, IonSelectOption, IonText, IonList,IonCheckbox
},
  data() {
    return {
      seuModelo: '',
      selectedOption: null,
      options: [
        { label: 'Aguardando', value: 'Aguardando' },
        { label: 'Iniciado', value: 'Iniciado' },
        { label: 'Pausa', value: 'Pausa' },
        { label: 'Finalizado', value: 'Finalizado' },
        // Adicione mais opções conforme necessário
      ],
      cores : [{label:'Preta', value: '#000000'},
              { label:'Branca', value: '#FFFFFF', },
              { label:'Azul', value: '#0000FF', },
              { label:'Verde', value: '#008000', },
              { label:'Amarela', value: '#FFFF00', },
              { label:'Vermelha', value: '#FF0000', },
              { label:'Marom', value: '#800000' }]
      ,
      selectedItems: [],
      isOpen: false,
      selectedColor: '#000000'
  }},
  methods: {
    handleColorChange(color) {
      this.selectedColor = color.hex;
      // Faça o que quiser com a cor selecionada
      console.log('Cor selecionada:', color.hex);
    },
    fecharModal() {
      this.$emit('fechar-modal');
    },
    colorCheck(index) {{
        return this.cores[index].value;
    }},
    salvarEdicao() {
      // Valide os campos ou realize a lógica de salvamento
      this.$emit('salvarEdicao', this.objetoEdicao);
      this.fecharModal();
    },
    handleCheckboxClick(item) {
      if (this.objetoEdicao.cores.includes(item)) {
        // Se o item já estiver selecionado, remova-o do array
        this.objetoEdicao.cores = this.objetoEdicao.cores.filter(selected => selected !== item);
        console.log('Removido '+item);
      } else {
        // Caso contrário, adicione-o ao array
        this.objetoEdicao.cores.push(item);
        console.log('Inserido '+item);
      }
    }
  }
}; 

</script>
<style scoped>
.custom-checkbox::part(checkbox) {
  border: 2px solid #000; /* Cor e largura da borda */
}
</style>