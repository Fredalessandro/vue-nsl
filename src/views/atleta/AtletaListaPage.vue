<!-- src/views/Listaobjetos.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Atletas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchItems" ></ion-searchbar>
      
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
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon, IonFooter, IonButtons, IonCheckbox, IonRippleEffect, IonCard
} from '@ionic/vue';
import { add,document, create, trash } from 'ionicons/icons';
import CadastroAtletaModal from '@/views/atleta/CadastroAtletaModal.vue';
import FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';
import Atleta from '../../model/Atleta';
import '../styles.css';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox, IonRippleEffect, IonCard,
    CadastroAtletaModal
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
      objeto: new Atleta(null),
      objetoEdicao: new Atleta(),
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
      const itemsRef = FirebaseService.database.ref('Atletas');
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
        let dadosEdicao = new Atleta(null);  
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
      let dadosEdicao = new objeto(
        objeto.id,
        objeto.nome,
        objeto.email,
        objeto.telefone,
        objeto.cpf,
        objeto.dataNascimento,
        objeto.cep,
        objeto.endereco,
        objeto.numero,
        objeto.complemento,
        objeto.bairro,
        objeto.cidade,
        objeto.uf,
        objeto.tipo
      );
      this.objetoEdicao = dadosEdicao;
      this.abrirModal(false);
    },
    async handleSalvar(objeto) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local

        if (objeto.id != null) {
          await FirebaseService.updateData('Atletas/', objeto.id, objeto);
        } else {
          await FirebaseService.incrementarCodigo('atleta').then(value => {
            objeto.id = value;
            console.log('Incremento', objeto.id);

            FirebaseService.setData('Atletas/' + value, objeto);

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
          message: 'Exclusão do usuário '+objeto.nome+' ?',
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
                  FirebaseService.deleteData('Atletas/', objeto.id);
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


