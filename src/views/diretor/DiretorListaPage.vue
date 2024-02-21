<!-- src/views/ListaDiretors.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Diretores de Prova</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchItems" ></ion-searchbar>
      
      <ion-grid >
        <ion-row class="ion-align-items-start">
          <ion-col size=0.5>id</ion-col>
          <ion-col >Nome</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col >E-mail</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(objeto, index) in filteredItems" :key="objeto.id" class="ion-align-items-start">
          <ion-row>
            <ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.id }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.nome }}</ion-col>
            <ion-col size=2 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.telefone }}</ion-col>  
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ objeto.email }}</ion-col>
            <ion-col size=0.8 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon @click="presentAlertConfirm(objeto)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(objeto)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small"></ion-icon>
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons  slot="end" >
          <ion-button class="round-button" @click="abrirModal(true)">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroDiretorModal  :is-modal-open="modalAberta" :objetoEdicao="this.objetoEdicao" @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
</ion-page>
</template>

<script >
import { alertController } from '@ionic/core'
import { ref,  onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, create, trash } from 'ionicons/icons';
import CadastroDiretorModal from '@/views/diretor/CadastroDiretorModal.vue';
import  FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';
import '../styles.css';
import Diretor from '../../model/Diretor';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroDiretorModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      iconEdit: create,
      searchTerm: '',
      isCheckedAll: false,
      filteredItems: [],
      items: [],
      objeto: new Diretor(null),
      objetoEdicao: new Diretor(),
      menuState: true,
      modalAberta: false,
      sequencia: Sequencia
    };
  },
   watch: {
    searchTerm: 'searchItems',
  },
  created() {
    this.fetchItems();
  },
  methods: {
    searchItems() {
      this.filteredItems = this.items.filter((item) =>
        item.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    fetchItems() {
      const itemsRef = FirebaseService.database.ref('Diretores');
      itemsRef.on('value', (snapshot) => {
        this.items = [];
        snapshot.forEach((childSnapshot) => {
          const item = {
            key: childSnapshot.key,
            ...childSnapshot.val(),
          };
          this.items.push(item);
        });
        this.searchItems();
      });
    },
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
        objeto.email
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local

        if (objeto.id != null) {
          await FirebaseService.updateData('Diretores/', objeto.id, objeto);
        } else {
          await FirebaseService.incrementarCodigo('diretor').then(value => {
            objeto.id = value;
            console.log('Incremento', objeto.id);

            FirebaseService.setData('Diretores/' + value, objeto);

          });
        }
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
      }

    },
    presentAlertConfirm(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão da Diretor '+objeto.nome+' ?',
          cssClass : 'default-alert',
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
                  FirebaseService.deleteData('Diretores/', objeto.id);
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
  },
}

</script>
<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* You might need to adjust the height based on your layout */
}

.centered-items {
  text-align: center;
  /* Additional styling for the centered content */
}
</style>