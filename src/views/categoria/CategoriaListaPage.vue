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
        <ion-title>Categorias {{ eventoSelecionado.evento }} local {{ eventoSelecionado.local }}</ion-title>
      </ion-toolbar>
      <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm"
        @ionInput="filterItems"></ion-searchbar>
    </ion-header>
    <ion-content class="ion-padding">



      <ion-grid>
        <ion-row class="ion-align-items-start">

          <ion-col>Descrição</ion-col>
          <ion-col>Valor Inscrição</ion-col>
          <ion-col>Atletas por Bateria</ion-col>
          <ion-col>Quantidades de Atletas</ion-col>
          <ion-col>Qtd.Ondas</ion-col>
          <ion-col>Tempo</ion-col>
          <ion-col>Regra</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems ? filteredItems : items" :key="objeto._id"
          class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem._id === objeto._id }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.descricao }}</ion-col>
            <ion-col style="text-align: right;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.valorInscricao }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.qtdAtletasBateria }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.qtdAtletas }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.qtdOndaSurfada }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.tempoBateria }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ (objeto.idade==0?"Sem regra":objeto.regra + ' ' +  objeto.idade + ' anos')
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
        <div  v-if="selectedItem" class="label-container">
          <ion-button class="round-button" @click="proximaPagina">
            <ion-icon :icon="iconRigth" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Baterias</ion-label>
        </div>  
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroCategoriaModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
  </ion-page>
</template>

<script>
import '../styles.css';
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonLabel, IonIcon, IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add, document, create, trash, arrowForward, arrowBack } from 'ionicons/icons';
import CadastroCategoriaModal from '@/views/categoria/CadastroCategoriaModal.vue';
import store from '@/store';
import { useRouter } from 'vue-router'
import CategoriaService from '../../service/CategoriaService';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonLabel,
    CadastroCategoriaModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      iconRigth: arrowForward,
      iconBack: arrowBack,
      store: store,
      searchTerm: '',
      objetoEdicao: {},
      modalAberta: false
    };
  },
  setup() {
    
    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getUsuario && store.getters.getUsuario.perfil == 'ADMIN');


    const selectedItem = ref();


    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setCategoriaSelecionada', { categoriaSelecionada: objeto });
    };

    const proximaPagina = async () => {
      router.push({ path: 'bateria', replace: true });
    }

    const paginaAnterio = async () => {
      router.push({ path: 'evento', replace: true });
    }

    // Carregue a lista ao iniciar a página
    onMounted(async () => {
      // Carregue a lista ao iniciar a página
      buscaRegistros();
    });
    
    const buscaRegistros = async () => {
        items.value = []; 
        items.value = await CategoriaService.getCategoriasByAttribute(`idEvento=${eventoSelecionado._id}`);

          if (items.value) {
            if (!store.getters.getCategoriaSelecionada) {
                 selectedItem.value = items.value[items.value.length-1];
                 store.dispatch('setCategoriaSelecionada', { categoriaSelecionada: items.value[items.value.length-1] });
            } else selectedItem.value = store.getters.getCategoriaSelecionada;
          }
    } 
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items.value?items.value.filter(item => item.descricao.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return { isAdmin, searchTerm, selectedItem, 
      selectRow, proximaPagina, paginaAnterio, filterItems, buscaRegistros, 
      filteredItems, eventoSelecionado, items };

  },
  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = {
            idUsuario    : this.eventoSelecionado.idUsuario,
            idEvento     : this.eventoSelecionado._id,
            descricao    : '',
            idade        : 0,
            regra        : '',
            valorInscricao : this.eventoSelecionado.valorInscricao,
            qtdAtletasBateria : this.eventoSelecionado.qtdAtletasBateria,
            qtdAtletas : 16,
            qtdOndaSurfada : this.eventoSelecionado.qtdOndaSurfada,
            tempoBateria : this.eventoSelecionado.tempoBateria
        }
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
      let dadosEdicao = {
        _id          : objeto._id,
        idUsuario    : this.eventoSelecionado.idUsuario,
        idEvento     : this.eventoSelecionado._id,
        descricao    : objeto.descricao,
        idade        : objeto.idade,
        regra        : objeto.regra,
        valorInscricao : objeto.valorInscricao,
        qtdAtletasBateria : objeto.qtdAtletasBateria,
        qtdAtletas : objeto.qtdAtletas,
        qtdOndaSurfada : this.eventoSelecionado.qtdOndaSurfada,
        tempoBateria : this.eventoSelecionado.tempoBateria
      };
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto._id) {
          const categoria = await CategoriaService.atualizarCategoria(objeto._id, objeto)
        } else {
          
          const categoria = await CategoriaService.createCategoria({
            idUsuario    : this.eventoSelecionado.idUsuario,
            idEvento     : this.eventoSelecionado._id,
            descricao    : objeto.descricao,
            idade        : objeto.idade,
            regra        : objeto.regra,
            valorInscricao : objeto.valorInscricao,
            qtdAtletasBateria : objeto.qtdAtletasBateria,
            qtdAtletas : objeto.qtdAtletas,
            qtdOndaSurfada : objeto.qtdOndaSurfada,
            tempoBateria : objeto.tempoBateria 
          });

        }
        this.buscaRegistros();
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
              handler: async () => {
                try {
                  await CategoriaService.removeCategoria(objeto._id);
                  this.buscaRegistros();
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
