<!-- src/views/ListaUsuarios.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Usuários</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-searchbar placeholder="Pesquisar" v-model="searchTerm" @ionInput="search"></ion-searchbar>
      
      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col size=0.5>id</ion-col>
          <ion-col>Nome</ion-col>
          <ion-col size=3>e-mail</ion-col>
          <ion-col size=2>Telefone</ion-col>
          <ion-col size=1.08>CPF</ion-col>
          <ion-col size=0.80 style="text-align: center;"><ion-checkbox :v-model="isCheckedAll"></ion-checkbox></ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="text-align: left;">Endereço</ion-col>
        </ion-row>
        <div v-for="(usuario, index) in dados" :key="usuario.id" class="ion-align-items-start">
          <ion-row>
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
              <ion-checkbox :v-model="usuario.isChecked"></ion-checkbox>
              <!--<ion-button :size="3" class="round-button" @click="handleFabButtonClick('Button 1')">
                  <ion-icon :icon="iconDelete" style="color: black;" size="10px"></ion-icon>
               </ion-button>-->
            </ion-col>
          </ion-row>
          <ion-row>
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
    <CadastroUsuarioModal  :is-modal-open="modalAberta" @fechar-modal="fecharModal" @salvar-novoUsuario="handleSalvarUsuario" />
</ion-page>
</template>

<script >
import { ref,  onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, trash } from 'ionicons/icons';
import CadastroUsuarioModal from '@/views/usuario/CadastroUsuarioModal.vue';
import  FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastroUsuarioModal
  },
  setup() {
    // Variável de estado para armazenar os dados
    
    const dados = ref([]);

    // Função para buscar os dados
    const fetchData = async () => {
      // Simule uma chamada à API ou use o FirebaseService
       //const result = await FirebaseService.getData('Usuarios');
       
       //dados.value = Object.values(result);
       //console.log(dados.value)

       const databaseRef = FirebaseService.database.ref('Usuarios');

        // Use o listener 'on' para observar alterações em tempo real
        databaseRef.on('value', (snapshot) => {
          const dadosFirebase = snapshot.val();
          console.log('Dados do Firebase em tempo real:', dadosFirebase);

          dados.value = dadosFirebase;
          
        });
      // Exemplo com dados fictícios
      /*setTimeout(() => {
        dados.value = [
          { id: 1, nome: 'Item 1' },
          { id: 2, nome: 'Item 2' },
          // ... outros dados
        ];
      }, 1000);*/
    };

    // Chamada à função fetchData após a montagem do componente
    onMounted(fetchData);

    // Retorna dados para serem usados no template
    return {
      dados,
    };
  },
  data() {
    return {
      iconAdd: add,
      iconDocumet: document,
      iconDelete: trash,
      searchTerm: '',   
      isCheckedAll: false,  
      usuarios: [],
      menuState: true,
      modalAberta: false,
      sequencia : Sequencia
    };
  },
  computed: {
     filteredList() {
      try {
        // Obter todos os documentos do banco de dados local
        if (this.searchTerm.toLocaleLowerCase() === "") return this.usuarios;
        const searchTermLower = this.searchTerm.toLocaleLowerCase();
        return this.usuarios.filter(
          (item) => {
            if (item) {
              item.nome.toLocaleLowerCase().includes(searchTermLower)
              //item.email.toLocaleLowerCase().includes(searchTermLower) ||
              //item.endereco.toLocaleLowerCase().includes(searchTermLower) ||
              //item.bairro.toLocaleLowerCase().includes(searchTermLower) ||
              //item.cidade.toLocaleLowerCase().includes(searchTermLower) ||
              //item.uf.toLocaleLowerCase().includes(searchTermLower)
            }
          }

        );
      } catch (error) {
        console.error('Erro ao ler localmente:', error);
        return [];
      }

    },
  },
  methods: {
    search() {
      // Handle search logic if needed
    },
    handleFabClick() {
      // Logic to be executed when the footer button is clicked
    },
    // eslint-disable-next-line no-unused-vars
    handleFabButtonClick(valeu){

    },
    abrirModal() {
      this.modalAberta = true;
      //this.$router.push({ name: 'UsuarioCadastro', params: { parametros:'$this.usuarios'} });
    },
    fecharModal() {
      this.modalAberta = false;
    },
    async handleSalvarUsuario(usuario) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local
       //postUsuario(usuario);

       
       await FirebaseService.incrementarCodigo().then(value =>{
             usuario.id = value;
             console.log('Incremento', usuario.id);

            const dadosParaGrava = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    telefone: usuario.telefone,
                    cpf: usuario.cpf,
                    dataNascimento: usuario.dataNascimento,
                    cep: usuario.cep,
                    endereco: usuario.endereco,
                    numero: usuario.numero,
                    complemento: usuario.complemento,
                    bairro: usuario.bairro,
                    cidade: usuario.cidade,
                    uf: usuario.uf
            } 

            FirebaseService.setData('Usuarios/'+value,dadosParaGrava);

       });
      


      } catch (error) {
        console.error('Erro ao gravar localmente:', error);
      }
      // this.usuarios.push(usuario);
      // console.log('Usuário salvo:', JSON.stringify(usuario));

    }},
}

</script>

<style scoped>
/* Adicione estilos personalizados aqui se necessário */


ion-col {
  background-color: #128cf7;
  border: solid 1px rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  text-align: center;
  height: 30px;
}

.cor1 {
  background-color: #f9fcfba4;
  /* Cor da linha ímpar, ajuste conforme necessário */
  color: rgb(0, 0, 0);
  /* Cor do texto na linha ímpar, ajuste conforme necessário */
}

.cor2 {
  background-color: rgb(0, 175, 244);
  /* Cor da linha par, ajuste conforme necessário */
  color: rgb(255, 255, 255);
  /* Cor do texto na linha par, ajuste conforme necessário */
}

.ion-footer-fixed {
  position: sticky;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border: 2px;
  border-color: black;
  width: auto;
}

.right-aligned-toolbar {
  justify-content: flex-end;
}

.round-button {
  border-radius: 50%;
  border-width: 2px;
  border-color: black;
  margin-left: 20px;
  width: 50px;
  height: 50px;
  font-size: 8px; /* Adjust font size as needed */
  background-color: #128cf7; /* White text color */
  
}

</style>
