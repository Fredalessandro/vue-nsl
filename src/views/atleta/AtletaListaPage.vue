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
          <ion-col size="3">e-mail</ion-col>
          <ion-col >Telefone</ion-col>
          <ion-col >Dt. Nascimento</ion-col>
          <ion-col style="width: auto;">CPF</ion-col>
          <ion-col >Cidade - Estado</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems ? filteredItems : items" :key="objeto.key"
          class="ion-align-items-start">
         
            <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
              <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.nome }}</ion-col>
              <ion-col size="3" style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.email }}</ion-col>
              <ion-col  style="text-align: center;"
                :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.telefone }}</ion-col>
            <ion-col  style="text-align: center;"
                :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            ConvertDDMMYYYY(objeto.dataNascimento)+" => "+calcularIdade(objeto)+" anos " }}</ion-col>
              <ion-col style="width: auto; text-align: center;"
                :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.cpf }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
                {{ objeto.cidade + " - " +
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
import '../styles.css';
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonBackButton, IonIcon,  IonFooter, IonButtons, IonCheckbox, IonLabel
} from '@ionic/vue';
import { add,document, create, trash,arrowBack, } from 'ionicons/icons';
import CadastroAtletaModal from '@/views/atleta/CadastroAtletaModal.vue';
import store from '@/store'; 
import { useRouter } from 'vue-router'
import AtletaService from '../../service/AtletaService';
import DataUtil from '../../utils/DataUtil';


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
      objetoEdicao: {},
      modalAberta: false,
    };
  },
  setup() {

    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getUsuario && store.getters.getUsuario.tipo == 'ADMIN');

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

      buscaRegistros();

    });

    const buscaRegistros = async () => {
      items.value = [];
      const parametros = [];
      items.value = await AtletaService.getAtletasByAttribute(parametros);
      if (items.value) {
        if (!store.getters.getAtletaSelecionada) {
          selectedItem.value = items.value[0];
          store.dispatch('setAtletaSelecionado', { atletaSelecionado: items.value[0] });
        } else selectedItem.value = store.getters.getAtletaSelecionada;
      }
    }  
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items?items.value.filter(item => item.nome.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    const ConvertDDMMYYYY = (dataOriginal) => {
          return DataUtil.ConvertDDMMYYYY(dataOriginal);
    };

    const calcularIdade = (objeto) => {
          return DataUtil.calcularIdade(objeto);
    };

    return { isAdmin, searchTerm, selectedItem, 
      selectRow, proximaPagina, paginaAnterio, filterItems, buscaRegistros, ConvertDDMMYYYY, calcularIdade,
      filteredItems, eventoSelecionado, items};

  },
  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = {
          idEvento:objeto.idEvento,
          nome    : '',
          apelidio: '',
          email   : '',
          telefone: '',
          cpf     : '',
          dataNascimento: null,
          cep     : '',
          endereco: '',
          numero  : '',
          complemento: '',
          bairro  : '',
          cidade  : '',
          uf      : '',
          rankNordestino: 0,
          rankEstadual: 0,
          idadeAno: 0,
          cabecaChave: false,
          profisional: false,
          isento: false
        };
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
        _id: objeto._id,
       idEvento: objeto.idEvento,
       nome    : objeto.nome    ,
       apelidio: objeto.apelidio,
       email   : objeto.email   ,
       telefone: objeto.telefone,
       cpf     : objeto.cpf     ,
       dataNascimento: objeto.dataNascimento,
       cep     : objeto.cep     ,
       endereco: objeto.endereco,
       numero  : objeto.numero  ,
       complemento: objeto.complemento,
       bairro  : objeto.bairro,
       cidade  : objeto.cidade,
       uf      : objeto.uf    ,
       rankNordestino: objeto.rankNordestino,
       rankEstadual: objeto.rankEstadual,
       idadeAno: objeto.idadeAno,
       cabecaChave: objeto.cabecaChave,
       profisional: objeto.profisional,
       isento: objeto.isento
      };
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {

        if (objeto._id) {
          const atleta = await AtletaService.atualizarAtleta(objeto._id, objeto) 
        } else {
          const atleta = await AtletaService.createAtleta({
                idEvento: objeto.idEvento,
                nome    : objeto.nome    ,
                apelidio: objeto.apelidio,
                email   : objeto.email   ,
                telefone: objeto.telefone,
                cpf     : objeto.cpf     ,
                dataNascimento: objeto.dataNascimento,
                cep     : objeto.cep     ,
                endereco: objeto.endereco,
                numero  : objeto.numero  ,
                complemento: objeto.complemento,
                bairro  : objeto.bairro,
                cidade  : objeto.cidade,
                uf      : objeto.uf    ,
                rankNordestino: objeto.rankNordestino,
                rankEstadual: objeto.rankEstadual,
                idadeAno: objeto.idadeAno,
                cabecaChave: objeto.cabecaChave,
                profisional: objeto.profisional,
                isento: objeto.isento
          });

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
              handler: async () => {
                try {
                  await UsuarioService.removeUsuario(objeto._id);
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


