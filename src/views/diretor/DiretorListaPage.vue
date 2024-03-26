<!-- src/views/ListaDiretors.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Diretores de Prova</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchDocuments"></ion-searchbar>
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col>Nome</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col>E-mail</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredDocuments" :key="objeto.id" class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.nome }}</ion-col>
            <ion-col size=2 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.telefone }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.email }}</ion-col>
            <ion-col size=0.8 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon v-if="isAdmin" @click="presentAlertConfirm(objeto)" :icon="iconDelete"
                style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"
                size="small"></ion-icon>
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer v-if="isAdmin" class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <ion-button class="round-button" @click="abrirModal(true)">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroDiretorModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
  </ion-page>
</template>

<script>
import { alertController } from '@ionic/core';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonIcon, IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { ref, defineComponent, onMounted } from 'vue';
import { add, document, create, trash } from 'ionicons/icons';
import CadastroDiretorModal from '@/views/diretor/CadastroDiretorModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Diretor from '../../model/Diretor';
import { firebase } from '@/firebase.js';
import store from '@/store';

export default defineComponent({
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
      store: store,
      diretor: this.$store.getters.getDiretor,
      isAdmin: (this.$store.getters.getDiretor && this.$store.getters.getDiretor.perfil == 'ADMIN'),
      collectionName: 'Diretores/',
      objetoEdicao: new Diretor(),
      modalAberta: false
    };
  },
  setup() {

    const collectionName = 'Diretores/';
    const searchTerm = ref('');
    const filteredDocuments = ref([]);
    const searchDocuments = async () => {
      try {

        // Chame o serviço para buscar a coleção filtrada pelo termo de pesquisa
        const searchResults = await FirestoreService.searchCollectionDiretores(collectionName, searchTerm.value.trim());
        const diretor = store.getters.getDiretor;
        const filtro = (diretor.perfil === 'ADMIN' ? searchResults : searchResults.filter(documento => documento.id == diretor.id));

        filteredDocuments.value = filtro;

      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
    };



    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setDiretorSelecionado', { diretorSelecionado: objeto });
    };

    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      await searchDocuments();
    });

    return { searchTerm, filteredDocuments, searchDocuments, selectedItem, selectRow };

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
        objeto.email,
        objeto.perfil
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto.id) {
          await FirestoreService.set(this.collectionName, objeto.id, objeto);
        } else {
          objeto.perfil = 'OPERADOR';
          await firebase
            .auth() // get the auth api
            .createUserWithEmailAndPassword(objeto.email, '011277') // need .value because ref()
            .then((data) => {

              console.log('Successfully registered!');

            })
            .catch(error => {
              console.log(error.code)
              alert(error.message);
            });

          await FirestoreService.add(this.collectionName, objeto);
          await firebase
            .auth().sendPasswordResetEmail(objeto.email)
            .then((data) => {
              // Password reset email sent successfully
              console.log("Password reset email " + objeto.email + " sent successfully");
            })
            .catch((error) => {
              // Handle errors
              console.error("Error sending password reset email:", error);
            });
        }
        this.fetchItens();
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
        alert(error.message);
      }

    },
    async presentAlertConfirm(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão do Diretor ' + objeto.nome + ' ?',
          cssClass: 'default-alert',
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
                  FirestoreService.remove(this.collectionName, objeto.id);
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
});

</script>
