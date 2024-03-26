<!-- src/views/ListaEventos.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ diretorSelecionado.nome }} Eventos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchDocuments"></ion-searchbar>

      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col size=4>Evento</ion-col>
          <ion-col>Local</ion-col>
          <ion-col size=2>Periodo</ion-col>
          <ion-col size=2>Status</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredDocuments" :key="objeto.id" class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col size=4 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
          objeto.evento }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
          objeto.local }}</ion-col>
            <ion-col size=2 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
          objeto.dataInicio + ' a ' + objeto.dataFinal }}</ion-col>
            <ion-col size=2 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
          objeto.status }}</ion-col>
            <ion-col size=0.8 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon v-if="isAdmin" @click="presentAlertConfirm(objeto)" :icon="iconDelete"
                style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon v-if="isAdmin" @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"
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
    <CadastroEventoModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
  </ion-page>
</template>

<script>
import { alertController } from '@ionic/core';
import { add, document, create, trash } from 'ionicons/icons';
import CadastroEventoModal from '@/views/evento/CadastroEventoModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Evento from '../../model/Evento';
import { ref, defineComponent, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonIcon, IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import store from '@/store';
import { mapState } from 'vuex';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroEventoModal, store
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      collectionName: 'Eventos/',
      store: store,
      iconDelete: trash,
      iconEdit: create,
      items: [],
      objetoEdicao: new Evento(),
      modalAberta: false,
      diretorSelecionado: this.$store.getters.getDiretorSelecionado,
      isAdmin: (this.$store.getters.getDiretor && this.$store.getters.getDiretor.perfil == 'ADMIN'),
    };
  },
  computed: {
    ...mapState(['diretor', 'diretorSelecionado', 'user'])
  },
  setup() {
    const diretorSelecionado = store.getters.getDiretorSelecionado;
    const collectionName =  'Eventos/';
    const searchTerm = ref('');
    const filteredDocuments = ref([]);
    const searchDocuments = async () => {


      try {

        // Chame o serviço para buscar a coleção filtrada pelo termo de pesquisa
        if (store.getters.getDiretor.perfil == 'ADMIN') {
           const searchResults = await FirestoreService.searchCollectionEventos(collectionName, diretorSelecionado.id ,searchTerm.value.trim());
           filteredDocuments.value = searchResults;
        } else {
           const searchResults = await FirestoreService.searchCollectionEventosStatus(collectionName, diretorSelecionado.id, 'Aguardando', searchTerm.value.trim());
           filteredDocuments.value = searchResults;
        }


      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
      
    };

    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setEventoSelecionado', { eventoSelecionado: objeto });
    };

    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      await searchDocuments();
    });

    return { searchTerm, filteredDocuments, searchDocuments, selectedItem, selectRow, diretorSelecionado };

  },
  methods: {
    updateSearch(event) {
      this.searchTerm = event.detail.value;
    },
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = new Evento(null);
        dadosEdicao.idDiretor = this.diretorSelecionado.id;
        dadosEdicao.status = 'Aguardando'
        this.objetoEdicao = dadosEdicao;
      }
      this.modalAberta = true;
    },
    fecharModal() {
      this.modalAberta = false;
    },
    handleRowClick(objeto) {
      // Your click event handling logic goes here
      console.log('Row clicked! ' + objeto.evento);
      let dadosEdicao = new Evento(
        objeto.id,
        objeto.evento,
        objeto.local,
        objeto.dataInicio,
        objeto.dataFinal,
        'Aguardando'
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto.id) {
          await FirestoreService.set(collectionName, objeto.id, objeto);
        } else {
          objeto.idDiretor = this.diretorSelecionado.id;
          await FirestoreService.add(this.collectionName, objeto);
        }
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
        alert(error.message);
      }

    },
    presentAlertConfirm(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão do Evento ' + objeto.evento + ' ?',
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
                  const collectionName = '/Eventos';
                  FirestoreService.remove(collectionName, objeto.id);
                  this.searchDocuments();
                } catch (error) {
                  console.error('Erro ao delete registro:', error);
                }
                console.log('Confirm Okay', objeto.evento)
              },
            },
          ],
        })
        .then(a => a.present())
    },
  }
});


</script>
