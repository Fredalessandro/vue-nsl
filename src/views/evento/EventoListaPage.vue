<!-- src/views/ListaUsuarios.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Usuários</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="searchItems" ></ion-searchbar>
      
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col size=0.5>id</ion-col>
          <ion-col>Evento</ion-col>
          <ion-col size=3>Local</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col size=1.08>CPF</ion-col>
          <ion-col size=0.80 style="text-align: center;"><ion-checkbox :v-model="isCheckedAll"></ion-checkbox></ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="text-align: left;">Endereço</ion-col>
        </ion-row>
        <div v-for="(usuario, index) in filteredItems" :key="usuario.key" class="ion-align-items-start">
          <ion-row @click="handleRowClick(usuario)">
            <IonRippleEffect></IonRippleEffect>
            <ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ usuario.id }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ usuario.nome }}</ion-col>
            <ion-col size=3 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ usuario.email }}</ion-col>
            <ion-col size=2 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ usuario.telefone }}</ion-col>
            <ion-col size=1.08 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ usuario.cpf }}</ion-col>
            <ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-icon @click="" :icon="iconDelete" style="color: rgb(249, 9, 9);" size="10px"></ion-icon>
              <!--<ion-button :size="3" class="round-button" @click="handleFabButtonClick('Button 1')">
                <ion-checkbox :v-model="usuario.isChecked"></ion-checkbox>
                  <ion-icon :icon="iconDelete" style="color: black;" size="10px"></ion-icon>
               </ion-button>-->
            </ion-col>
          </ion-row>
          <ion-row @click="handleRowClick(usuario)">
            <IonRippleEffect></IonRippleEffect>
            <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              {{ usuario.endereco + ", " + usuario.bairro + ", " + usuario.cidade + ", " + usuario.uf }}</ion-col>
          </ion-row>
        </div>
      </ion-grid>
    </ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons  slot="end" >
          <ion-button class="round-button" @click="handleFabButtonClick('Button 1')">
            <ion-icon :icon="iconDelete" style="color: black;" size="large"></ion-icon>
          </ion-button>
          <ion-button class="round-button" @click="abrirModal()">
            <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <CadastroUsuarioModal :is-modal-open="modalAberta" :usuarioEdicao="usuario" @fechar-modal="fecharModal"
      @salvar-novoUsuario="handleSalvarUsuario" />
</ion-page>
</template>

<script >
import { ref,  onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon, IonFooter, IonButtons, IonCheckbox, IonRippleEffect, IonCard
} from '@ionic/vue';
import { add,document, trash } from 'ionicons/icons';
import CadastroUsuarioModal from '@/views/usuario/CadastroUsuarioModal.vue';
import  FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';
import Usuario from '../../model/Usuario';
import '../styles.css';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox, IonRippleEffect, IonCard,
    CadastroUsuarioModal
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      searchTerm: '',
      isCheckedAll: false,
      filteredItems: [],
      items: [],
      usuario: new Usuario(null),
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
      const itemsRef = FirebaseService.database.ref('Usuarios');
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
    handleDeleteClick(idUsuario) {
      console.log('Delete clicked! ' + idUsuario);
    },
    abrirModal() {
      this.modalAberta = true;
      //this.$router.push({ name: 'UsuarioCadastro', params: { parametros:'$this.usuarios'} });
    },
    fecharModal() {
      this.modalAberta = false;
    },
    handleRowClick(usuario) {
      // Your click event handling logic goes here
      console.log('Row clicked! ' + usuario.nome);
      this.usuario = usuario;
      this.abrirModal();
    },
    async handleSalvarUsuario(usuario) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local

        if (usuario.id != null) {
          await FirebaseService.updateData('Usuarios/', usuario.id, usuario);
        } else {
          await FirebaseService.incrementarCodigo('usuario').then(value => {
            usuario.id = value;
            console.log('Incremento', usuario.id);

            FirebaseService.setData('Usuarios/' + value, usuario);

          });
        }
      } catch (error) {
        console.error('Erro ao gravar localmente:', error);
      }
      // this.usuarios.push(usuario);
      // console.log('Usuário salvo:', JSON.stringify(usuario));

    }
  },
}

</script>


