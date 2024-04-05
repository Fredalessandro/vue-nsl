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
        <ion-buttons v-if="isAdmin" slot="end">
          <ion-button class="round-button" @click="handleSignOut">
            <ion-icon :icon="iconExit" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!--<ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm" @ionInput="filterItems"></ion-searchbar>-->
      </ion-toolbar>

    </ion-header>

    <ion-content class="ion-padding">

      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col size=4>Evento</ion-col>
          <ion-col>Local</ion-col>
          <ion-col size=2>Periodo</ion-col>
          <ion-col size=2>Status</ion-col>
          <!--<ion-col size=0.80 style="text-align: center;">Ação</ion-col>-->
        </ion-row>
        <div v-for="(objeto, index) in items" :key="objeto.id"
          class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col size=4 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.evento }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.local }}</ion-col>
            <ion-col size=2 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.dataInicio + ' a ' + objeto.dataFinal }}</ion-col>
            <ion-col size=2 style="text-align: center;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
            objeto.status }}</ion-col>
            <!--<ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon v-if="eventoSelecionado.status == 'Aguardando'" @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small"></ion-icon>
            </ion-col>-->
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="paginaJuizes">
              <ion-icon :icon="iconJulge" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Juízes</ion-label>
          </div>
          <div class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="paginaAtleta">
              <ion-icon :icon="iconSurfer" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Atletas</ion-label>
          </div>
          <div v-if="isAdmin" class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button"
              @click="presentAlertConfirm(selectedItem)">
              <ion-icon :icon="iconDelete" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Excluir</ion-label>
          </div>
          <div  class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button"
              @click="handleRowClick(selectedItem)">
              <ion-icon :icon="iconEdit" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Editar</ion-label>
          </div>
          <div v-if="isAdmin" class="label-container" style="margin-right: 30px;">
            <ion-button  class="round-button" @click="abrirModal(true)">
              <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Inserir</ion-label>
          </div>
          <div class="label-container">
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
import { alertController } from '@ionic/core';
import { people, add, document, create, trash, man, arrowForward, arrowBack, exit } from 'ionicons/icons';
import CadastroEventoModal from '@/views/evento/CadastroEventoModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Evento from '../../model/Evento';
import Categoria from '../../model/Categoria';
import Juiz from '../../model/Juiz';
import Atleta from '../../model/Atleta';
import { ref, defineComponent, onMounted, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons, IonLabel
} from '@ionic/vue';
import store from '@/store';
import { mapState } from 'vuex';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';
import { useRouter } from 'vue-router'
import { BateriaService } from '@/service/BateriaService.js';
import Constantes from '../../Constantes';
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
      objetoEdicao: new Evento(),
      modalAberta: false,

    };
  },
  computed: {
    ...mapState(['diretor', 'diretorSelecionado', 'user']),
  },
  setup() {
    const router = useRouter();
    const diretorSelecionado = store.getters.getDiretorSelecionado;
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getDiretor && store.getters.getDiretor.perfil == 'ADMIN');


    const selectedItem = ref();

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
      //await searchDocuments();
      const db = getFirestore();
      const q = query(collection(db, Constantes.colecaoEventos), where('idDiretor', '==', diretorSelecionado.id), where('status', '!=', status));

      // Observando alterações na coleção
      onSnapshot(q, (snapshot) => {
        items.value = [];
        snapshot.forEach((doc) => {
          const item = {
            key: doc.id,
            ...doc.data(),
          };
          //items.value.push({ id: doc.id, data: doc.data() });
          if (!selectedItem.value) {
            store.dispatch('setEventoSelecionado', { eventoSelecionado: item });
            selectedItem.value = item;
          }
          items.value.push(item);
        });
      });

    });

    return { isAdmin, searchTerm, selectedItem, 
      selectRow, proximaPagina, paginaAnterio, paginaJuizes, paginaAtleta,
      diretorSelecionado, inicio, final, items };

  },
  methods: {
    abrirModal(novo) {
      if (novo) {
        const lista = this.items;
        const documentFound = lista.find(evento => evento.idDiretor === this.diretorSelecionado.id);

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
        let dadosEdicao = new Evento();
        dadosEdicao.idDiretor = this.diretorSelecionado.id;
        dadosEdicao.status = 'Aguardando'
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
      let dadosEdicao = new Evento(
        objeto.idDiretor,
        objeto.id,
        objeto.evento,
        objeto.local,
        objeto.dataInicio,
        objeto.dataFinal,
        objeto.status
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto.id) {
          await FirestoreService.set(Constantes.colecaoEventos, objeto.id, objeto);
        } else {
          
          objeto.idDiretor = this.diretorSelecionado.id;
          const data = await FirestoreService.add(Constantes.colecaoEventos, objeto);
          
          let categorias = Categoria.categorias;
          
          categorias.forEach(element => {
            element.idEvento = data.id;
            const baterias = BateriaService.gerarBaterias(element.qtdAtletasBateria,element.qtdAtletas);
            FirestoreService.addCategoria(Constantes.colecaoCategorias, element, baterias);
          });

          let juizes = Juiz.juizes;
          
          juizes.forEach(element => {
            element.idEvento = data.id;
            FirestoreService.add(Constantes.colecaoJuizes, element);
          });

         let atletas = Atleta.atletas;
          
          atletas.forEach(element => {
            element.idEvento = data.id;
            FirestoreService.add(Constantes.atletas, element);
          });

        }
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
        alert(error.message);
      }

    },
    presentAlertConfirm(objeto) {

      /*if (FirestoreService.checkCollectionExistence(CategorConstantes.colecaoCategorias, 'idEvento', '==', objeto.id)) {

        return alertController
          .create({
            header: 'Confirma!',
            message: 'Evento ' + objeto.evento + ' tem categorias relacionadas.',
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
      }*/

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
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local

                  FirestoreService.remove(Constantes.colecaoEventos, objeto.id);
                  store.dispatch('setEventoSelecionado', { eventoSelecionado: null });
                  
                  FirestoreService.removeAll(Constantes.colecaoBaterias,'idEvento','==',objeto.id)

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
