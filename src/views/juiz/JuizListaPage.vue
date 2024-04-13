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
        <ion-row >
          <ion-col>Nome</ion-col>
          <ion-col style="width: 2px;">Login</ion-col>
          <ion-col>E-mail</ion-col>
          <ion-col>Telefone</ion-col>
          <ion-col>Senha</ion-col>
          <ion-col>Tipo</ion-col>
          <ion-col>Ativo</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in items" :key="objeto._id">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem._id === objeto._id }">
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.nome }}</ion-col>
            <ion-col   style="width: 2px; text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.login }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.email }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.telefone }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
              objeto.perfil }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
              objeto.senha }}</ion-col>
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
import '../styles.css';
import { alertController } from '@ionic/core'
import { ref, defineComponent, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonLabel, IonIcon, IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add, document, create, trash, arrowForward, arrowBack } from 'ionicons/icons';
import CadastroJuizModal from '@/views/juiz/CadastroJuizModal.vue';
import store from '@/store';
import { useRouter } from 'vue-router'
import UsuarioService from '../../service/UsuarioService';

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
      objetoEdicao: {},
      modalAberta: false,
      isAdmin: (this.$store.getters.getUsuario && this.$store.getters.getUsuario.tipo == 'ADMIN'),
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

      buscaRegistros();

    });

    const buscaRegistros = async () => {
      items.value = [];
      const parametros = ['tipo=JUIZ'];
      items.value = await UsuarioService.getUsuariosByAttribute(parametros);
      if (items.value) {
        if (!store.getters.getCategoriaSelecionada)
          selectedItem.value = items.value[items.value.length - 1];
        else selectedItem.value = store.getters.getCategoriaSelecionada;
      }
    }  
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items.value?items.value.filter(item => item.nome.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return { isAdmin, searchTerm, selectedItem, selectRow, proximaPagina, paginaAnterio, filterItems, buscaRegistros, filteredItems, eventoSelecionado, items};

  },
  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = {
          nome: '',
          login: '',
          email: '',
          telefone: '',
          tipo: '',
          senha:'',
          ativo:true
        }
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
      let dadosEdicao = {
        _id: objeto._id,
        nome:objeto.nome,
        login:objeto.login,
        telefone:objeto.telefone,
        email:objeto.email,
        tipo:objeto.tipo,
        senha:objeto.senha,
        ativo:objeto.ativo
      }
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto._id) {
          const usuario = await UsuarioService.atualizarUsuario(objeto._id, objeto)
          
        } else {

          const usuario = await UsuarioService.createUsuario({
            nome: objeto.nome,
            login: objeto.login,
            email: objeto.email,
            telefone: objeto.telefone,
            tipo: objeto.tipo,
            senha: objeto.senha,
            ativo: objeto.ativo
          });

        }

        buscaRegistros;

      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
        alert(error.message);
      }

    },
    async presentAlertConfirm(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão do Juiz ' + objeto.nome + ' ?',
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
                  // Gravar o documento no banco de dados local
                 await UsuarioService.removeUsuario(objeto._id);
                  buscaRegistros();
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
