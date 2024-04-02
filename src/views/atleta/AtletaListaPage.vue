<!-- src/views/Listaobjetos.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/evento" />
      </ion-buttons>
      <ion-title>Atletas</ion-title>
    </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchDocuments"></ion-searchbar>
      
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col size=0.5>id</ion-col>
          <ion-col>Nome</ion-col>
          <ion-col size=3>e-mail</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col size=1.08>CPF</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="text-align: left;">Endereço</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems" :key="objeto.key" class="ion-align-items-start">
          <ion-row>
            <ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.nome }}</ion-col>
            <ion-col size=3 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.email }}</ion-col>
            <ion-col size=2 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.telefone }}</ion-col>
            <ion-col size=1.08 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.cpf }}</ion-col>
            <ion-col size=0.80 style="text-align: center;margin-block: initial;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }" class="ion-justify-content-between">
              <ion-icon @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small" class="custom-icon-action"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small" class="custom-icon-action"></ion-icon>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              {{ objeto.endereco + " - "+ objeto.numero +", "+ objeto.bairro + ", " + objeto.cidade + ", " + objeto.uf }}</ion-col>
          </ion-row>
        </div>
      </ion-grid>
     
      
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons  slot="end" >
          <ion-button class="round-button" @click="presentAlertConfirm(selectedItem)">
            <ion-icon :icon="iconDelete" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-button class="round-button" @click="handleRowClick(selectedItem)">
            <ion-icon :icon="iconEdit" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-button class="round-button" @click="abrirModal(true)">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
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
   IonSearchbar, IonButton, IonBackButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, create, trash } from 'ionicons/icons';
import CadastroAtletaModal from '@/views/atleta/CadastroAtletaModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Atleta from '../../model/Atleta';
import { mapState } from 'vuex';
import store from '@/store'; 
import { format } from 'date-fns';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox, IonBackButton,
    CadastroAtletaModal
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


