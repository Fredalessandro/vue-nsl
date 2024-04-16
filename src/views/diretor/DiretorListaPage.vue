<!-- src/views/ListaDiretors.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Diretores de Prova</ion-title>
        <ion-buttons slot="end">
          <ion-button class="round-button" @click="handleSignOut">
            <ion-icon :icon="iconExit" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm"
          @ionInput="filterItems"></ion-searchbar>
      </ion-toolbar>

    </ion-header>
    <ion-content class="ion-padding">

      <ion-grid>
        <ion-row >
          <ion-col>Nome</ion-col>
          <ion-col style="width: 2px;">Login</ion-col>
          <ion-col>E-mail</ion-col>
          <ion-col>Telefone</ion-col>
          <ion-col>Senha</ion-col>
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
              objeto.senha }}</ion-col>
            <ion-col  style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.ativo?'Sim':'Não' }}</ion-col>    
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer v-if="isAdmin" class="ion-footer-fixed ion-padding" slot="end">
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
          <div v-if="selectedItem" class="label-container">
            <ion-button class="round-button" @click="proximaPagina">
              <ion-icon :icon="iconRigth" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Evento</ion-label>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroDiretorModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
  </ion-page>
</template>

<script>
import '../styles.css';
import { alertController } from '@ionic/core';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons, IonLabel
} from '@ionic/vue';
import { ref, defineComponent, onMounted, computed } from 'vue';
import { add, document, create, trash, arrowForward, arrowBack, exit } from 'ionicons/icons';
import CadastroDiretorModal from '@/views/diretor/CadastroDiretorModal.vue';
import { useRouter } from 'vue-router'
import store from '@/store';
import UsuarioService from '../../service/UsuarioService';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons,IonBackButton, IonLabel,
    CadastroDiretorModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      iconRigth: arrowForward,
      iconBack: arrowBack,
      iconExit: exit,
      searchTerm: '',
      store: store,
      items:[],
      objetoEdicao: {},
      modalAberta: false
    };
  },
  setup() {

    const router= useRouter(); 
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getUsuario && store.getters.getUsuario.tipo == 'ADMIN');

    const selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setDiretorSelecionado', { diretorSelecionado: objeto });
    };

    const proximaPagina = async () => {
      router.push({path:'evento', replace: true });
    }

    // Carregue a lista ao iniciar a página
    onMounted(async () => {

      buscaRegistros();

    });

    const buscaRegistros = async () => {
        items.value = [];
        items.value = await UsuarioService.getUsuariosByAttribute('tipo=DIRETOR');
        if (items.value) {
            if (!store.getters.getCategoriaSelecionada) {
                 selectedItem.value = items.value[0];
                 store.dispatch('setDiretorSelecionado', { diretorSelecionado: items.value[0] });
             } else selectedItem.value = store.getters.getCategoriaSelecionada;
        }
    }  

    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items.value?items.value.filter(item => item.nome.toLowerCase().includes(term) ||
        item.telefone.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)):[];
    });

    

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return {isAdmin, searchTerm,  selectedItem, items, selectRow, proximaPagina, filterItems, buscaRegistros };

  },

  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = {
          nome: '',
          login: '',
          email: '',
          telefone: '',
          tipo: 'DIRETOR',
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
          
          objeto.tipo = 'DIRETOR';
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
    async handleSignOut() {
            await this.$store.dispatch('signOut',{user:null,diretor:null})
                .then(() => {
                    this.$router.replace('/login'); // redirect to the feed
                }).catch(error => {
                    console.error('Error add data:', error);
                    alert(error.message);
                });
        },
  }
});

</script>
