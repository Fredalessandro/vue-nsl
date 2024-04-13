<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="round-button" @click="paginaAnterio">
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Baterias : Evento {{ eventoSelecionado.evento }} Categoria {{ categoriaSelecionada.descricao }}
        </ion-title>
      </ion-toolbar>
      <ion-searchbar v-if="isAdmin" placeholder="Pesquisar" v-model="searchTerm"
        @ionInput="filterItems"></ion-searchbar>
    </ion-header>
    <ion-content class="container">
   
   <div v-for="(baterias, index) in rounds" :key="index" >
     <ion-grid class="ion-padding">
       <ion-row v-for="bateria in baterias" style="height: auto;" class="ion-padding" >
         <ion-col  style="width: 40vw; height: auto; align-items: center;"> <!-- Define o tamanho e o offset para centralizar -->
           <ion-card>
             <ion-card-header>
                  <ion-card-title style="text-align: left;">{{ bateria.descricao + " " +bateria.round   }}</ion-card-title>
            </ion-card-header>
             <ion-card-content>
              <ion-grid>
                  <ion-row class="ion-align-items-start" >
                      <ion-col size="3">Atleta</ion-col>
                      <ion-col>Notas</ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-start">
                      <ion-col size="3" style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                      <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-start">
                      <ion-col size="3" style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                      <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-start">
                      <ion-col size="3" style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                      <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-start">
                      <ion-col size="3" style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                      <ion-col style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }"></ion-col>
                  </ion-row>
              </ion-grid>
             </ion-card-content>
           </ion-card>
         </ion-col>
       </ion-row>
     </ion-grid>

 </div>

</ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="">
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
          <div v-if="categoriaSelecionada" class="label-container">
            <ion-button class="round-button" @click="gerarBaterias(categoriaSelecionada)">
              <ion-icon :icon="iconGenerate" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Gerar</ion-label>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
  
  <script>
  import { alertController } from '@ionic/core';
  import { useRouter } from 'vue-router' 
  import store from '@/store';
  import { ref, defineComponent, computed, onMounted, watch } from 'vue';
  import { add, document, create, trash, arrowForward, arrowBack, refreshCircle } from 'ionicons/icons';
  import {IonPage, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonGrid, IonRow, IonCol, IonSearchbar, 
    IonButton, IonLabel, IonIcon, IonFooter, IonCardTitle,
    IonButtons, IonCard, IonCardContent,IonCardHeader} from '@ionic/vue';
  import  BateriaService  from '../../service/BateriaService';




  export default defineComponent({
    name: 'BateriaOrganograma',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
      IonSearchbar, IonButton, IonIcon, IonFooter,IonCardTitle,
      IonButtons, IonLabel, IonCard,IonCardHeader, IonCardContent
       
    },
    data() {
      return {
        iconAdd: add,
        iconDocumet: document,
        iconDelete: trash,
        iconEdit: create,
        iconRigth: arrowForward,
        iconBack: arrowBack,
        iconGenerate: refreshCircle
      }
    },
    setup() {
        
    const router = useRouter();
    const eventoSelecionado = store.getters.getEventoSelecionado;
    const categoriaSelecionada = store.getters.getCategoriaSelecionada;
    const searchTerm = ref('');
    const items  = ref([]);
    const rounds = {};
    const isAdmin = (store.getters.getUsuario && store.getters.getUsuario.tipo == 'ADMIN');


    const selectedItem = ref();

    
    const selectRow = async (objeto) => {
      selectedItem.value = objeto;
      store.dispatch('setBateriaSelecionada', { bateriaSelecionada: objeto });
    };

    const proximaPagina = async () => {
      router.push({ path: 'bateria', replace: true });
    }

    const paginaAnterio = async () => {
      router.push({ path: 'categoria', replace: true });
    }

     // Carregue a lista ao iniciar a página
     onMounted(async () => {
      // Carregue a lista ao iniciar a página
      buscaRegistros();
    });
    
    const buscaRegistros = async () => {
        items.value  = [];
        const data = await BateriaService.getBateriasByAttribute(`idCategoria=${categoriaSelecionada._id}`);

        data.forEach((item)=>{
          if (!rounds.hasOwnProperty(item.seqRound)) {
              rounds[item.seqRound] = [item];
          } else {
            let objetos = rounds[item.seqRound];
            objetos.push(item);
            rounds[item.seqRound]=objetos;
          }
        });


    } 
    
    const filteredItems = computed(() => {
      const term = searchTerm.value.toLowerCase();
      // Filter items based on whether they include the search term
      return items.value?items.value.filter(item => item.descricao.toLowerCase().includes(term)):[];
    });

    const filterItems = event => {
      searchTerm.value = event.target.value;
    };

    return { isAdmin, searchTerm, selectedItem, selectRow, proximaPagina, paginaAnterio, filterItems, buscaRegistros , filteredItems, eventoSelecionado, categoriaSelecionada, items,rounds};

  },
  methods:{
    gerarBaterias(objeto) {
      return alertController
        .create({
          header: 'Confirma!',
          message: 'Gerar da Baterias ' + objeto.descricao + ' ?',
          cssClass: 'default-alert',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: blah => {
                console.log('Confirm Cancel:', objeto.descricao)
              },
            },
            {
              text: 'Sim',
              handler: () => {
                try {
                  // Gravar o documento no banco de dados local
                 
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
  },
  });
  </script>