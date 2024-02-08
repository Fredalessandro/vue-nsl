<!-- src/views/Listacategorias.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Categorias</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchItems" ></ion-searchbar>
      
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col size=0.5>id</ion-col>
          <ion-col>Descrição</ion-col>
          <ion-col size=3>Regra aplicada para idade</ion-col>
          <ion-col size=0.80 style="text-align: center;">Ação</ion-col>
        </ion-row>
        <div v-for="(categoria, index) in filteredItems" :key="categoria.id" class="ion-align-items-start">
          <ion-row>
            <ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ categoria.id }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ categoria.descricao }}</ion-col>
            <ion-col size=3 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{categoria.regra+' '+ categoria.idade+' anos' }}</ion-col>
            <ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon @click="presentAlertConfirm(categoria)" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="small"></ion-icon>
              <ion-icon @click="handleRowClick(categoria)" :icon="iconEdit" style="color: rgrgb(10, 9, 9);"  size="small"></ion-icon>
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
    <CadastroCategoriaModal  :is-modal-open="modalAberta" :categoriaEdicao="this.categoriaEdicao" @fechar-modal="fecharModal" @salvarEdicao="handleSalvar" />
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
import CadastroCategoriaModal from '@/views/categoria/CadastrocategoriaModal.vue';
import  FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';
import '../styles.css';
import Categoria from '../../model/Categoria';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroCategoriaModal
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
      categoria: new Categoria(null),
      categoriaEdicao: new Categoria(),
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
        item.descricao.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    fetchItems() {
      const itemsRef = FirebaseService.database.ref('Categorias');
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
        let dadosEdicao = new Categoria(null);  
        this.categoriaEdicao = dadosEdicao;
      } 
      this.modalAberta = true; 
    },
    fecharModal() {
      this.modalAberta = false;
    },
    handleRowClick(categoria) {
      // Your click event handling logic goes here
      console.log('Row clicked! ' + categoria.nome);
      let dadosEdicao = new Categoria(
        categoria.id,
        categoria.descricao,
        categoria.idade,
        categoria.regra,
        null
      );
      this.categoriaEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(categoria) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local

        if (categoria.id != null) {
          await FirebaseService.updateData('Categorias/', categoria.id, categoria);
        } else {
          await FirebaseService.incrementarCodigo('categoria').then(value => {
            categoria.id = value;
            console.log('Incremento', categoria.id);

            FirebaseService.setData('Categorias/' + value, categoria);

          });
        }
      } catch (error) {
        console.error('Erro ao gravar localmente=', error);
      }

    },
    presentAlertConfirm(categoria) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Exclusão da categoria '+categoria.descricao+' ?',
          cssClass : 'default-alert',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: blah => {
                console.log('Confirm Cancel:', categoria.nome)
              },
            },
            {
              text: 'Sim',
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local
                  FirebaseService.deleteData('Categorias/', categoria.id);
                } catch (error) {
                  console.error('Erro ao delete registro:', error);
                }
                console.log('Confirm Okay', categoria.descricao)
              },
            },
          ],
        })
        .then(a => a.present())
    },
  },
}

</script>

