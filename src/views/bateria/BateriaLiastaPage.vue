<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="round-button" @click="paginaAnterio">
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Evento {{ eventoSelecionado.evento }} Categoria {{ categoriaSelecionada.descricao }} </ion-title>
      </ion-toolbar>
      <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm"
        @ionInput="filterItems"></ion-searchbar>
    </ion-header>
    <ion-content class="ion-padding">
        <Organograma :dadosBaterias="dadosBaterias"/>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div class="label-container" style="margin-right: 30px;">
          <ion-button class="round-button" @click="">
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
        <div  v-if="categoriaSelecionada" class="label-container">
          <ion-button class="round-button" @click="gerarBaterias(categoriaSelecionada)">
            <ion-icon :icon="iconGenerate" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Gerar</ion-label>
        </div>  
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    </ion-page>
  </template>
  
  <script>
  import { alertController } from '@ionic/core'
  import Constantes from '../../Constantes';
  import Organograma from '../components/Organograma.vue';
  import { useRouter } from 'vue-router' 
  import store from '@/store';
  import { ref, defineComponent, computed, onMounted, watch } from 'vue';
  import { collection, query, orderBy, where, onSnapshot, getFirestore } from 'firebase/firestore';
  import { add, document, create, trash, arrowForward, arrowBack, refreshCircle } from 'ionicons/icons';
  import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSearchbar, IonButton, IonLabel, IonIcon, IonFooter, IonButtons, IonCard, IonCardContent} from '@ionic/vue';
import FirestoreService from '../../database/FirestoreService';
import { BateriaService } from '../../service/BateriaService';

  export default defineComponent({
    name: 'BateriaOrganograma',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
      IonSearchbar, IonButton, IonIcon, IonFooter,
      IonButtons, IonLabel, IonCard, IonCardContent,
        Organograma,
       
    },
    data() {
      return {
        iconAdd: add,
        iconDocumet: document,
        iconDelete: trash,
        iconEdit: create,
        iconRigth: arrowForward,
        iconBack: arrowBack,
        iconGenerate: refreshCircle,
        items: []
      }
    },
    setup() {
        
    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const categoriaSelecionada = store.getters.getCategoriaSelecionada;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getDiretor && store.getters.getDiretor.perfil == 'ADMIN');
    const dadosBaterias = ref([]);

    const selectedItem = ref();

    watch(dadosBaterias);

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
     // store.dispatch('setBateriaSelecionada', { categoriaSelecionada: objeto });
    };

    const proximaPagina = async () => {
      router.push({ path: 'bateria', replace: true });
    }

    const paginaAnterio = async () => {
      router.push({ path: 'categoria', replace: true });
    }

    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      //await searchDocuments();
      const db = getFirestore();
      const q  = query(collection(db, Constantes.colecaoBaterias),orderBy('sequencia'), where('idCategoria', '==', categoriaSelecionada.id));

      // Observando alterações na coleção
      onSnapshot(q, (snapshot) => {
        items.value = [];
        dadosBaterias.value =[];
        snapshot.forEach((doc) => {
          const item = {
            key: doc.id,
            ...doc.data(),
          };
          if (!selectedItem.value) {
            //store.dispatch('setBateriaSelecionada', { bateriaSelecionada: item });
            selectedItem.value = item;
          }
          
          items.value.push(item);
          if (dadosBaterias[item.round]) {
              const baterias = dadosBaterias[item.round];
              baterias.push(item);
            } else {
              dadosBaterias[item.round] = [item];
            }

        });
        
      });
      
      

    });
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items?items.value.filter(item => item.descricao.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return { isAdmin, searchTerm, selectedItem, selectRow, proximaPagina, paginaAnterio, filterItems, filteredItems, eventoSelecionado, categoriaSelecionada, dadosBaterias };

  },
  methods:{
    gerarBaterias(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Gerar da Baterias ' + objeto.descricao + ' ?',
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
                  FirestoreService.removeAll(Constantes.colecaoBaterias,'idCategoria','==',objeto.id)
                  const baterias = BateriaService.gerarBaterias(objeto.qtdAtletasBateria,objeto.qtdAtletas);
                  baterias.forEach(bateria => {
                    bateria.idEvento = objeto.idEvento;
                    bateria.idCategoria = objeto.id;
                    FirestoreService.add(Constantes.colecaoBaterias,bateria);
                  });
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
  },
  });
  </script>