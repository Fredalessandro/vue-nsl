<template>
  <ion-page>
    <ion-content class="ion-padding">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <div v-for="(baterias, index) in this.dadosBaterias" class="ion-align-items-start">
            <ion-col size="6">
              <ion-grid class="ion-padding">
                <ion-row v-for="bateria in baterias" class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
                  <ion-col>
                    <ion-card>
                      <ion-card-content>
                        <ion-title>{{bateria.descricao}}</ion-title>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </div>
        </ion-row>
     
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, onMounted } from "vue";
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
  IonCardContent
} from "@ionic/vue";

export default {
  name: "Organograma",
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
    IonCardContent
  },
  setup() {
    const dados = ref([]);
    dados.valeu = dadosBaterias;
    return { dadosBaterias };
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
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
