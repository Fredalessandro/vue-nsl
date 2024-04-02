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
      <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm" @ionInput="filterItems"></ion-searchbar>
    </ion-toolbar>
    
  </ion-header>
    <ion-content class="ion-padding">


      <ion-grid>
        <ion-row class="ion-align-items-start">
          <!--<ion-col size=0.5>id</ion-col>-->
          <ion-col>Nome</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col>E-mail</ion-col>
           <!--<ion-col size=0.80 style="text-align: center;">Ação</ion-col>-->
        </ion-row>
        <div v-for="(objeto, index) in filteredItems?filteredItems:items" :key="objeto.id" class="ion-align-items-start">
          <ion-row @click="selectRow(objeto)" class="rowSelect" :class="{ 'rowSelected': selectedItem === objeto }">
            <!--<ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>-->
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.nome }}</ion-col>
            <ion-col size=2 style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.telefone }}</ion-col>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{
        objeto.email }}</ion-col>
            <!--<ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon v-if="eventoSelecionado.status == 'Aguardando'" @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small"></ion-icon>
            </ion-col>-->
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer v-if="isAdmin" class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons  slot="end" >
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
        <div class="label-container">
          <ion-button v-if="selectedItem" class="round-button" @click="proximaPagina">
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
import { alertController } from '@ionic/core';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonSearchbar, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons, IonLabel
} from '@ionic/vue';
import { ref, defineComponent, onMounted, computed } from 'vue';
import { add, document, create, trash, arrowForward, arrowBack, exit } from 'ionicons/icons';
import CadastroDiretorModal from '@/views/diretor/CadastroDiretorModal.vue';
import FirestoreService from '@/database/FirestoreService.js';
import '../styles.css';
import Diretor from '../../model/Diretor';
import { useRouter } from 'vue-router'
import { firebase } from '@/firebase.js';
import store from '@/store';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';

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
      diretor: this.$store.getters.getDiretor,
      collectionName: 'Diretores/',
      objetoEdicao: new Diretor(),
      modalAberta: false
    };
  },
  setup() {

    const router= useRouter(); 
    const diretorSelecionado = store.getters.getDiretorSelecionado;
    const collectionName =  'Diretores/';
    const searchTerm = ref('');
    const items = ref([]);
    const isAdmin = (store.getters.getDiretor && store.getters.getDiretor.perfil == 'ADMIN');


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
      const db = getFirestore();
      const q = query(collection(db, collectionName),where('perfil', '!=', 'ADMIN'));
      
      // Observando alterações na coleção
      onSnapshot(q, (snapshot) => {
        items.value = [];
        snapshot.forEach((doc) => {
          const item = {
            key: doc.id,
            ...doc.data(),
          };
          if (!selectedItem.value) {
            selectedItem.value = item;
            store.dispatch('setDiretorSelecionado', { diretorSelecionado: item });
          }  
          items.value.push(item);
        });
      });


    });

    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items?items.value.filter(item => item.nome.toLowerCase().includes(term) ||
        item.telefone.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return {isAdmin, searchTerm,  selectedItem, selectRow, proximaPagina, diretorSelecionado, items, filteredItems, filterItems };

  },

  methods: {
    abrirModal(novo) {
      if (novo) {
        let dadosEdicao = new Diretor(null);
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
      let dadosEdicao = new Diretor(
        objeto.id,
        objeto.nome,
        objeto.telefone,
        objeto.email,
        objeto.perfil
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        if (objeto.id) {
          await FirestoreService.set(this.collectionName, objeto.id, objeto);
        } else {
          objeto.perfil = 'OPERADOR';
          await firebase
            .auth() // get the auth api
            .createUserWithEmailAndPassword(objeto.email, '011277') // need .value because ref()
            .then((data) => {

              console.log('Successfully registered!');

            })
            .catch(error => {
              console.log(error.code)
              alert(error.message);
            });

          await FirestoreService.add(this.collectionName, objeto);
          await firebase
            .auth().sendPasswordResetEmail(objeto.email)
            .then((data) => {
              // Password reset email sent successfully
              console.log("Password reset email " + objeto.email + " sent successfully");
            })
            .catch((error) => {
              // Handle errors
              console.error("Error sending password reset email:", error);
            });
        }
        this.fetchItens();
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
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local
                  FirestoreService.remove(this.collectionName, objeto.id);
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
