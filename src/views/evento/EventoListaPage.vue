<!-- src/views/ListaEventos.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="round-button" @click="paginaAnterio">
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ diretorSelecionado.nome }} Evento</ion-title>

        
        <ion-buttons slot="end">
        
          <div class="label-container" style="margin-right: 30px;">
          <ion-button class="round-button" @click="handleSignOut">
            <ion-icon :icon="iconExit" style="color: white;" size="large"></ion-icon>
          </ion-button>
          <ion-label class="bottom-label">Sair</ion-label>
        </div>
        </ion-buttons>
      </ion-toolbar>
        <!--<ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm" @ionInput="filterItems"></ion-searchbar>-->
     

    </ion-header>

    <ion-content class="ion-padding">

      <ion-grid>

        <ion-row class="ion-align-items-start">

          <ion-col size=2>Evento</ion-col>
          <ion-col size=2>Local</ion-col>
          <ion-col>Vl.Inscrição</ion-col>
          <ion-col>Ondas Surfadas</ion-col>
          <ion-col>Tempo da Bateria</ion-col>
          <ion-col size=2>Periodo</ion-col>
          <ion-col>Status</ion-col>

        </ion-row>
 
        <div v-for="(objeto, index) in items" :key="objeto.id"
          class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem._id === objeto._id }">
            <ion-col size=2 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.evento }}</ion-col>
            <ion-col size=2 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.local }}</ion-col>
            <ion-col style="text-align: right;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.valorInscricao }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.qtdOndaSurfada }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.tempoBateria }}</ion-col>
            <ion-col size=2 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            convertDDMMYYYY(objeto.dataInicio) + ' a ' + convertDDMMYYYY(objeto.dataFinal) }}</ion-col>
            <ion-col style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.status }}</ion-col>
          </ion-row>
        </div>

      </ion-grid>

    </ion-content>

    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div v-if="selectedItem" class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="paginaJuizes">
              <ion-icon :icon="iconJulge" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Juízes</ion-label>
          </div>
          <div v-if="selectedItem" class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="paginaAtleta">
              <ion-icon :icon="iconSurfer" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Atletas</ion-label>
          </div>
          <div v-if="isAdmin && selectedItem" class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button"
              @click="presentAlertConfirm(selectedItem)">
              <ion-icon :icon="iconDelete" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Excluir</ion-label>
          </div>
          <div v-if="isAdmin && selectedItem" class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button"
              @click="handleRowClick(selectedItem)">
              <ion-icon :icon="iconEdit" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Editar</ion-label>
          </div>
          <div v-if="isAdmin && !selectedItem" class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button" @click="abrirModal(true)">
              <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Inserir</ion-label>
          </div>
          <div v-if="selectedItem" class="label-container">
            <ion-button class="round-button" @click="proximaPagina">
              <ion-icon :icon="iconRigth" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Categorias</ion-label>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    
    <CadastroEventoModal :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" :isReadOnly="isAdmin"
      @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />

  </ion-page>

</template>

<script>
import '../styles.css';
import { alertController } from '@ionic/core';
import { people, add, document, create, trash, man, arrowForward, arrowBack, exit } from 'ionicons/icons';
import { ref, defineComponent, onMounted, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons, IonLabel
} from '@ionic/vue';
import store from '@/store';
import { useRouter } from 'vue-router'
import CadastroEventoModal from '@/views/evento/CadastroEventoModal.vue';
import EventoService from '../../service/EventoService';
import DataUtil from '../../utils/DataUtil';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonBackButton, IonIcon, IonFooter,
    IonButtons, IonLabel,
    CadastroEventoModal
  },
  data() {
    return {
      iconJulge: people,
      iconSurfer: man,
      iconAdd: add,
      iconDocumet: document,
      iconRigth: arrowForward,
      iconBack: arrowBack,
      iconExit: exit,
      store: store,
      iconDelete: trash,
      iconEdit: create,
      items: [],
      objetoEdicao: {},
      modalAberta: false,

    };
  },
  setup() {
    const router = useRouter();
    const diretorSelecionado = store.getters.getDiretorSelecionado;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getUsuario && store.getters.getUsuario.tipo == 'ADMIN');


    let selectedItem = ref();

    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setEventoSelecionado', { eventoSelecionado: objeto });
    };

  
    const paginaJuizes = async () => {
      router.push({ path: 'juiz', replace: true });
    }
    const paginaAtleta = async () => {
      router.push({ path: 'atleta', replace: true });
    }

    const proximaPagina = async () => {
      router.push({ path: 'categoria', replace: true });
    }

    const paginaAnterio = async () => {
      router.push({ path: 'diretor', replace: true });
    }

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
      // Carregue a lista ao iniciar a página
      buscaRegistros();
    });
    
    const buscaRegistros = async () => {
        items.value = []; 
        const data = await EventoService.getEventosByAttribute(`idUsuario=${diretorSelecionado._id}`);
        items.value = data.filter(filter=>filter.status!='Finalizado');
        if (items.value) {
            if (!store.getters.getCategoriaSelecionada) {
                 selectedItem.value = items.value[0];
                 store.dispatch('setEventoSelecionado', { eventoSelecionado: items.value[0] });
            } else {
                 selectedItem.value = store.getters.getCategoriaSelecionada;
            }
        }
    }  

    return { isAdmin, searchTerm, selectedItem, 
      selectRow, proximaPagina, paginaAnterio, paginaJuizes, paginaAtleta,  buscaRegistros,
      diretorSelecionado, inicio, final, items };

  },
  methods: {
    convertDDMMYYYY(data) {
        return DataUtil.ConvertDDMMYYYY(data)
    },
    abrirModal(novo) {
      if (novo) {
        const lista = this.items;
        const documentFound = lista.find(evento => evento.idUsuario === this.diretorSelecionado._id);

        // Verificando se o documento foi encontrado
        if (documentFound) {

          return alertController
            .create({
              header: 'Confirma!',
              message: 'Já existe evento cadastrado.',
              cssClass: 'default-alert',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                  handler: blah => {
                    console.log('Confirm Cancel:', objeto.nome)
                  },
                }],
            }).then(a => a.present())
        }
        let dadosEdicao = {
            idUsuario : this.diretorSelecionado._id,
            evento    : '',
            local     : '',
            dataInicio: null,
            dataFinal : null,
            status    : 'Aguardando',
            valorInscricao    : 0,
            qtdAtletasBateria : 4,
            qtdOndaSurfada    : 10,
            tempoBateria      : 30,
            cores: []
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
      console.log('Row clicked! ' + objeto.evento);
      let dadosEdicao = {
        _id      : objeto._id,
       idUsuario : this.diretorSelecionado._id,
       evento    : objeto.evento,
       local     : objeto.local,
       dataInicio: objeto.dataInicio,
       dataFinal : objeto.dataFinal,
       status    : objeto.status,
       valorInscricao    : objeto.valorInscricao,
       qtdAtletasBateria : objeto.qtdAtletasBateria,
       qtdOndaSurfada    : objeto.qtdOndaSurfada,
       tempoBateria      : objeto.tempoBateria, 
       cores : objeto.cores    
      };
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto._id) {
          //await FirestoreService.set(Constantes.colecaoEventos, objeto.id, objeto);
          const evento = await EventoService.atualizarEvento(objeto._id, objeto)
        } else {
          
          const evento = await EventoService.createEvento({
            idUsuario : this.diretorSelecionado._id,
            evento    : objeto.evento,
            local     : objeto.local,
            dataInicio: objeto.dataInicio,
            dataFinal : objeto.dataFinal,
            status    : objeto.status,
            valorInscricao    : objeto.valorInscricao,
            qtdAtletasBateria : objeto.qtdAtletasBateria,
            qtdOndaSurfada    : objeto.qtdOndaSurfada   ,
            tempoBateria      : objeto.tempoBateria, 
            cores : objeto.cores
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
              handler: async () => {
                try {

                  await EventoService.removeEvento(objeto._id);
                  store.dispatch('setEventoSelecionado', { eventoSelecionado: null });
                  store.dispatch('setCategoriaSelecionada', { categoriaSelecionada: null });
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
    async handleSignOut() {
      await this.$store.dispatch('signOut', { user: null, diretor: null })
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
