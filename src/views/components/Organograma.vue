<template>
  <ion-page>
    <ion-content class="container">
   
        <div v-for="(baterias, index) in dadosBaterias" :key="index" >
          <ion-grid>
            <ion-row v-for="bateria in baterias" style="height: auto;" class="item">
              <ion-col  style="width: 40vw; height: auto; align-items: center;"> <!-- Define o tamanho e o offset para centralizar -->
                <ion-card>
                  <ion-card-header>
                      <ion-card-title>{{bateria.round + " " + bateria.descricao }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                        <ion-label>Item</ion-label>
                        <ion-label>Item</ion-label>
                        <ion-label>Item</ion-label>
                        <ion-label>Item</ion-label>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>

      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle,
  IonList,
  IonItem,
  IonThumbnail
} from "@ionic/vue";

export default defineComponent( {
  name: "Organograma",
  props: {
    dadosBaterias: {
      type: Array, // Especifica que dadosBaterias deve ser um array
      required: true // Opcional: indica que a propriedade é obrigatória
    }
  },  
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonLabel,
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
    IonList,
    IonItem,
    IonThumbnail
  },
  setup(props) {
    // Agora você pode acessar dadosBaterias dentro de setup()
    console.log(props.dadosBaterias);

    // Se você precisar usar dadosBaterias em algum lugar além do setup, retorne-o do setup()
    return {
      dadosBaterias: props.dadosBaterias
    };
  }
})
</script>

<style scoped>
.item {
  padding: 1vw; /* Define o padding proporcionalmente ao tamanho da tela */
  text-align: right;
  
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: right;
  height: auto;
}

.node {
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100px;
}

.president {
  background-color: #3498db;
  color: #fff;
}

.vp {
  background-color: #2ecc71;
  color: #fff;
}

.supervisor {
  background-color: #f39c12;
  color: #fff;
}

.manager {
  background-color: #e74c3c;
  color: #fff;
}
</style>
