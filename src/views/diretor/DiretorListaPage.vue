<!-- src/views/ListaDiretors.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Diretores de Prova</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="updateSearch" ></ion-searchbar>
      
      <ion-grid >
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col >Nome</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col >E-mail</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems" :key="objeto.id" class="ion-align-items-start">
          <ion-row>
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.nome }}</ion-col>
            <ion-col size=2 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.telefone }}</ion-col>  
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.email }}</ion-col>
            <ion-col size=0.8 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small"></ion-icon>
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons  slot="end" >
          <ion-button class="round-button" @click="abrirModal(true)">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroDiretorModal  :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
</ion-page>
</template>

<script >
import { alertController } from '@ionic/core';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, create, trash } from 'ionicons/icons';
import CadastroDiretorModal from '@/views/diretor/CadastroDiretorModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import Sequencia from '@/model/Sequencia';
import '../styles.css';
import Diretor from '../../model/Diretor';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroDiretorModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      searchTerm: '',
      items: [],
      objetoEdicao: new Diretor(),
      modalAberta: false,
      sequencia: Sequencia
    };
  },
  mounted() {
    const db = getFirestore();
    const itemsCollection = collection(db, 'Diretores/'); // Replace with your Firestore collection name

    const q = query(itemsCollection, orderBy('nome')); // Add any additional query conditions

    onSnapshot(q, (snapshot) => {
      this.items = [];
      snapshot.forEach((doc) => {
        this.items.push({ id: doc.id, ...doc.data() });
      });
    });
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.nome.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
  }, 
  methods: {
    updateSearch(event) {
      this.searchTerm = event.detail.value;
    },
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = new Diretor(null);  
        this.objetoEdicao = dadosEdicao;
      } 
      this.modalAberta = true; 
    },
    fecharModal() {
      this.modalAberta = false;
    },
    handleRowClick(objeto) {
      // Your click event handling logic goes here
      console.log('Row clicked! ' + objeto.nome);
      let dadosEdicao = new Diretor(
        objeto.id,
        objeto.nome,
        objeto.telefone,
        objeto.email
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
          const collectionName = 'Diretores';
          if (objeto.id) {
            await FirestoreService.set(collectionName,objeto.id,objeto);
          } else {
            await FirestoreService.add(collectionName, objeto);
          }
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
      }

    },
    presentAlertConfirm(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão da Diretor '+objeto.nome+' ?',
          cssClass : 'default-alert',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: blah => {
                console.log('Confirm Cancel:', objeto.nome)
              },
            },
            {
              text: 'Sim',
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local
                  const collectionName = 'Diretores';
                  FirestoreService.remove(collectionName,objeto.id);
                } catch (error) {
                  console.error('Erro ao delete registro:', error);
                }
                console.log('Confirm Okay', objeto.nome)
              },
            },
          ],
        })
        .then(a => a.present())
    },
  }  
}

</script>
<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* You might need to adjust the height based on your layout */
}

.centered-items {
  text-align: center;
  /* Additional styling for the centered content */
}
</style>