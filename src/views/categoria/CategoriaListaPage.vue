<!-- src/views/Listacategorias.vue -->
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
          <ion-col>Descrição</ion-col>
          <ion-col size=3>Regra aplicada para idade</ion-col>
          <ion-col size=0.80 style="text-align: center;"><ion-checkbox :v-model="isCheckedAll"></ion-checkbox></ion-col>
        </ion-row>
        <div v-for="(categoria, index) in dados" :key="categoria.id" class="ion-align-items-start">
          <ion-row>
            <ion-col size=0.5 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ categoria.id }}</ion-col>
            <ion-col style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{ categoria.descricao }}</ion-col>
            <ion-col size=3 style="text-align: left;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">{{categoria.regra+' '+ categoria.idade+' anos' }}</ion-col>
            <ion-col size=0.80 style="text-align: center;"
              :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }">
              <ion-checkbox :v-model="categoria.isChecked"></ion-checkbox>
            </ion-col>
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
    <CadastrocategoriaModal  :is-modal-open="modalAberta" @fechar-modal="fecharModal" @salvar-novoCategoria="handleSalvarCategoria" />
</ion-page>
</template>

<script >
import { ref,  onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
   IonSearchbar, IonButton, IonIcon,  IonFooter, IonButtons, IonCheckbox
} from '@ionic/vue';
import { add,document, trash } from 'ionicons/icons';
import CadastrocategoriaModal from '@/views/categoria/CadastrocategoriaModal.vue';
import  FirebaseService  from '@/database/FirebaseService.js';
import Sequencia from '@/model/Sequencia';
import '../styles.css';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
    IonSearchbar, IonButton, IonIcon, IonFooter,
    IonButtons, IonCheckbox,
    CadastrocategoriaModal
  },
  setup() {
    // Variável de estado para armazenar os dados
    
    const dados = ref([]);

    // Função para buscar os dados
    const fetchData = async () => {
      // Simule uma chamada à API ou use o FirebaseService
       //const result = await FirebaseService.getData('categorias');
       
       //dados.value = Object.values(result);
       //console.log(dados.value)

       const databaseRef = FirebaseService.database.ref('Categorias');

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
      categorias: [],
      menuState: true,
      modalAberta: false,
      sequencia : Sequencia
    };
  },
  computed: {
     filteredList() {
      try {
        // Obter todos os documentos do banco de dados local
        if (this.searchTerm.toLocaleLowerCase() === "") return this.categorias;
        const searchTermLower = this.searchTerm.toLocaleLowerCase();
        return this.categorias.filter(
          (item) => {
            if (item) {
              item.descricao.toLocaleLowerCase().includes(searchTermLower)
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
      //this.$router.push({ name: 'categoriaCadastro', params: { parametros:'$this.categorias'} });
    },
    fecharModal() {
      this.modalAberta = false;
    },
    async handleSalvarCategoria(categoria) {
      // Lógica para salvar o usuário
      try {
        // Gravar o documento no banco de dados local
       //postcategoria(categoria);

       
       await FirebaseService.incrementarCodigo('categoria').then(value =>{
             categoria.id = value;
             console.log('Incremento', categoria.id);
             categoria.atletas = [];
            /*const dadosParaGrava = {
                    id: categoria.id,
                    descricao: categoria.descricao,
                    idade: categoria.idade,
                    regra: categoria.regra
                    
            } */

            FirebaseService.setData('Categorias/'+value,categoria);

            categoria = null;

       });
      


      } catch (error) {
        console.error('Erro ao gravar localmente:', error);
      }
      // this.categorias.push(categoria);
      // console.log('Usuário salvo:', JSON.stringify(categoria));

    }},
}

</script>

