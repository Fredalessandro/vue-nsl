<!-- src/views/Listacategorias.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ eventoSelecionado.evento }}, de {{ inicio }} a {{ final }}, local {{ eventoSelecionado.local }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchDocuments"></ion-searchbar>
      
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col>Descrição</ion-col>
          <ion-col>Inscrição</ion-col>
          <ion-col size=3>Regra aplicada para idade</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredDocuments" :key="objeto.id" class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.descricao }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.valorInscricao }}</ion-col>           
            <ion-col size=3 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{objeto.regra+' '+ objeto.idade+' anos' }}</ion-col>
            <ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon v-if="eventoSelecionado.status == 'Aguardando'" @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
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
    <CadastroCategoriaModal  :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin" @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
</ion-page>
</template>

<script >
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, create, trash } from 'ionicons/icons';
import CadastroCategoriaModal from '@/views/categoria/CadastroCategoriaModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Categoria from '../../model/Categoria';
import { mapState } from 'vuex';
import store from '@/store'; 
import { format } from 'date-fns';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroCategoriaModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      collectionName: 'Categorias',
      store: store,
      searchTerm: '',
      items: [],
      objetoEdicao: new Categoria(),
      modalAberta: false,
      isAdmin: (this.$store.getters.getDiretor && this.$store.getters.getDiretor.perfil == 'ADMIN'),
    };
  },
  computed: {
    ...mapState(['diretor', 'diretorSelecionado','eventoSelecionado', 'user'])
  },
  setup() {
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const collectionName =  'Categorias/';
    const searchTerm = ref('');
    const filteredDocuments = ref([]);
    const searchDocuments = async () => {


      try {

        // Chame o serviço para buscar a coleção filtrada pelo termo de pesquisa
        const searchResults = await FirestoreService.searchCollectionCategorias(collectionName, eventoSelecionado.id ,searchTerm.value.trim());
        filteredDocuments.value = searchResults;

      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
      
    };

    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setCategoriaSelecionada', { categoriaSelecionada: objeto });
    };
    const inicio = computed(() => {
      const date = new Date(eventoSelecionado.dataInicio);
      return date.toLocaleDateString('pt-BR'); // Altere para o seu local se necessário
    });
    const final = computed(() => {
      const date = new Date(eventoSelecionado.dataFinal);
      return date.toLocaleDateString('pt-BR'); // Altere para o seu local se necessário
    });
    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      await searchDocuments();
    });

    return { inicio, final, searchTerm, filteredDocuments, searchDocuments, selectedItem, selectRow, eventoSelecionado };

  },
  methods: {
    updateSearch(event) {
      this.searchTerm = event.detail.value;
    },
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = new Categoria(null);
        dadosEdicao.idEvento = this.eventoSelecionado.id;
        this.objetoEdicao = dadosEdicao;
      }
      this.modalAberta = true;
    },
    fecharModal() {
      this.modalAberta = false;
    },
    handleRowClick(objeto) {
      // Your click event handling logic goes here
      console.log('Row clicked! ' + objeto);
      let dadosEdicao = new Categoria(
        objeto.id,
        objeto.descricao,
        objeto.idade,
        objeto.regra,
        objeto.valorInscricao
      );
      this.objetoEdicao = dadosEdicao;
      this.objetoEdicao.idEvento = objeto.idEvento;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        objeto.idEvento = this.eventoSelecionado.id;
        if (objeto.id) {
          await FirestoreService.set(this.collectionName, objeto.id, objeto);
        } else {
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
          message: 'Exclusão da Categoria ' + objeto.descricao + ' ?',
          cssClass: 'default-alert',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: blah => {
                console.log('Confirm Cancel:', objeto.descricao)
              },
            },
            {
              text: 'Sim',
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local
                  const collectionName = 'Categorias';
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

