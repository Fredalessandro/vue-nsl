<!-- src/views/Listacategorias.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="round-button" @click="paginaAnterio">
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Juízes {{ eventoSelecionado.evento }} local {{ eventoSelecionado.local }}</ion-title>
      </ion-toolbar>
      <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm"
        @ionInput="filterItems"></ion-searchbar>
    </ion-header>
    <ion-content class="ion-padding">



      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col>Juiz</ion-col>
          <ion-col>Login</ion-col>
          <ion-col>Senha</ion-col>
          <ion-col>Tipo</ion-col>
          <ion-col>Ativo</ion-col>
          <!--<ion-col size=0.80 style="text-align: center;">Ação</ion-col>-->
        </ion-row>
        <div v-for="(objeto, index) in filteredItems ? filteredItems : items" :key="objeto.id"
          class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.nome }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.login }}</ion-col>
            <ion-col  style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.senha }}</ion-col>
            <ion-col  style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.tipo }}</ion-col>
            <ion-col  style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.ativo?'Sim':'Não' }}</ion-col>  
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div class="label-container" style="margin-right: 30px;">
          <ion-button class="round-button" @click="presentAlertConfirm(selectedItem)">
            <ion-icon :icon="iconDelete" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Excluir</ion-label>
          </div>
          <div class="label-container" style="margin-right: 30px;">
          <ion-button class="round-button" @click="handleRowClick(selectedItem)">
            <ion-icon :icon="iconEdit" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Editar</ion-label>
          </div>
          <div class="label-container" style="margin-right: 30px;">
          <ion-button class="round-button" @click="abrirModal(true)">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Inserir</ion-label>
        </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroJuizModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
  </ion-page>
</template>

<script>
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonLabel, IonIcon, IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add, document, create, trash, arrowForward, arrowBack } from 'ionicons/icons';
import CadastroJuizModal from '@/views/juiz/CadastroJuizModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Juiz from '../../model/Juiz';
import { collection, query, orderBy, where, onSnapshot, getFirestore } from 'firebase/firestore';
import store from '@/store';
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonLabel,
    CadastroJuizModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      iconRigth: arrowForward,
      iconBack: arrowBack,
      collectionName: 'Juizes',
      store: store,
      searchTerm: '',
      items: [],
      objetoEdicao: new Juiz(),
      modalAberta: false,
      isAdmin: (this.$store.getters.getDiretor && this.$store.getters.getDiretor.perfil == 'ADMIN'),
    };
  },
  setup() {
    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const collectionName = 'Juizes';
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getDiretor && store.getters.getDiretor.perfil == 'ADMIN');


    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setJuizSelecionado', { juizSelecionado: objeto });
    };

    const proximaPagina = async () => {
      router.push({ path: 'baterias', replace: true });
    }

    const paginaAnterio = async () => {
      router.push({ path: 'evento', replace: true });
    }

    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      //await searchDocuments();
      const db = getFirestore();
      const q = query(collection(db, collectionName),orderBy('nome'), where('idEvento', '==', eventoSelecionado.id));

      // Observando alterações na coleção
      onSnapshot(q, (snapshot) => {
        items.value = [];
        snapshot.forEach((doc) => {
          const item = {
            key: doc.id,
            ...doc.data(),
          };
          if (!selectedItem.value) {
            store.dispatch('setJuizSelecionado', { juizSelecionado: item });
            selectedItem.value = item;
          }
          items.value.push(item);
        });
      });

    });
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items?items.value.filter(item => item.nome.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return { isAdmin, searchTerm, selectedItem, selectRow, proximaPagina, paginaAnterio, filterItems, filteredItems, eventoSelecionado, items};

  },
  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = new Juiz(null);
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
      let dadosEdicao = new Juiz(
        objeto.idEvento,
        objeto.id,
        objeto.nome,
        objeto.login,
        objeto.senha,
        objeto.tipo,
        objeto.ativo
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
          message: 'Exclusão da Juiz ' + objeto.nome + ' ?',
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
                  const collectionName = 'Juizes';
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
