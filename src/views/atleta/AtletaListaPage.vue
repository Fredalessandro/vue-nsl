<!-- src/views/Listaobjetos.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="round-button" @click="paginaAnterio">
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Atletas {{ eventoSelecionado.evento }} local {{ eventoSelecionado.local }}</ion-title>
      </ion-toolbar>
      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="filterItems"></ion-searchbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col>Nome</ion-col>
          <ion-col >e-mail</ion-col>
          <ion-col >Telefone</ion-col>
          <ion-col >CPF</ion-col>
          <ion-col >Endereço</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems ? filteredItems : items" :key="objeto.key"
          class="ion-align-items-start">
         
            <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
              <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.nome }}</ion-col>
              <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.email }}</ion-col>
              <ion-col  style="text-align: center;"
                :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.telefone }}</ion-col>
              <ion-col  style="text-align: left;"
                :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.cpf }}</ion-col>
              <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
                {{ objeto.endereco + " - " + objeto.numero + ", " + objeto.bairro + ", " + objeto.cidade + ", " +
                objeto.uf
                }}</ion-col>
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
    <CadastroAtletaModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" @fechar-modal="fecharModal"
      @salvarEdicao="handleSalvar" />

  </ion-page>
</template>

<script >
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonBackButton, IonIcon,  IonFooter, IonButtons, IonCheckbox, IonLabel
} from '@ionic/vue';
import { add,document, create, trash,arrowBack, } from 'ionicons/icons';
import CadastroAtletaModal from '@/views/atleta/CadastroAtletaModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Atleta from '../../model/Atleta';
import { collection, query, orderBy, where, onSnapshot, getFirestore } from 'firebase/firestore';
import store from '@/store'; 
import { useRouter } from 'vue-router'
import Constantes from '../../Constantes';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox, IonBackButton, IonLabel,
    CadastroAtletaModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      iconBack: arrowBack,
      store: store,
      items: [],
      objetoEdicao: new Atleta(),
      modalAberta: false,
      isAdmin: (this.$store.getters.getDiretor && this.$store.getters.getDiretor.perfil == 'ADMIN'),
    };
  },
  setup() {
    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getDiretor && store.getters.getDiretor.perfil == 'ADMIN');


    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setAtletaSelecionado', { atletaSelecionado: objeto });
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
      const q = query(collection(db, Constantes.colecaoAtletas),orderBy('nome'), where('idEvento', '==', eventoSelecionado.id));

      // Observando alterações na coleção
      onSnapshot(q, (snapshot) => {
        items.value = [];
        snapshot.forEach((doc) => {
          const item = {
            key: doc.id,
            ...doc.data(),
          };
          if (!selectedItem.value) {
            store.dispatch('setAtletaSelecionado', { atletaSelecionado: item });
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
        let dadosEdicao = new Atleta(null);
        //dadosEdicao.idEvento = this.eventoSelecionado.id;
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
      let dadosEdicao = new Atleta(
        objeto.id,         
        objeto.nome,       
        objeto.apelidio,   
        objeto.email,      
        objeto.telefone,   
        objeto.cpf,        
        objeto.dataNascimento, 
        objeto.cep,            
        objeto.endereco,       
        objeto.numero,         
        objeto.complemento,    
        objeto.bairro,         
        objeto.cidade,         
        objeto.uf,             
        objeto.tipo,           
        objeto.rankNordestino, 
        objeto.rankEstadual   
      );
      this.objetoEdicao = dadosEdicao;
      this.objetoEdicao.idEvento = objeto.idEvento;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        //objeto.idEvento = this.eventoSelecionado.id;
        if (objeto.id) {
          await FirestoreService.set(Constantes.colecaoAtletas, objeto.id, objeto);
        } else {
          await FirestoreService.add(Constantes.colecaoAtletas, objeto);
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
          message: 'Exclusão da Atleta ' + objeto.nome + ' ?',
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
                  FirestoreService.remove(Constantes.colecaoAtletas, objeto.id);
                  this.searchDocuments();
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


