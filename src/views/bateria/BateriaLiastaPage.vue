<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons style="width: fit-content; font-size: large;" slot="start">
          <ion-button class="round-button" @click="paginaAnterio">  
            <ion-icon :icon="iconBack" style="color: white;" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title style="width: fit-content; font-size: large;">Categoria {{ categoriaSelecionada.descricao }}
        </ion-title>
      </ion-toolbar>

    </ion-header>
    <ion-content  class="container">
   
     <ion-grid v-for="(baterias, index) in items" :key="index" >
       <ion-row>
        <ion-col>
          {{ index }} 
        </ion-col>
       </ion-row>
       <ion-row v-for="objeto in baterias">
        <ion-grid>
          <ion-row>
              <ion-col  style="width: 40vw; height: auto; align-items: center;">
                    <ion-title style="text-align: left;">{{ objeto.descricao }}</ion-title> 
              </ion-col>
          </ion-row>
          <ion-row>    
              <ion-grid>
                  <ion-row class="ion-align-items-start" >
                      <ion-col size="1">Cor</ion-col>
                      <ion-col size="3">Atleta</ion-col>
                      <ion-col>Notas</ion-col>
                  </ion-row>
                  <ion-row style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }" >
                      <ion-col size="1"></ion-col>
                      <ion-col size="3"></ion-col>
                      <ion-col></ion-col>
                  </ion-row> 
                  <ion-row style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }" >
                      <ion-col size="1"></ion-col>
                      <ion-col size="3"></ion-col>
                      <ion-col></ion-col>
                  </ion-row>
                  <ion-row style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }" >
                      <ion-col size="1"></ion-col>
                      <ion-col size="3"></ion-col>
                      <ion-col></ion-col>
                  </ion-row>
                  <ion-row style="text-align: left;" :class="{ 'cor1': index % 2 === 0, 'cor2': index % 2 !== 0 }" >
                      <ion-col size="1"></ion-col>
                      <ion-col size="3"></ion-col>
                      <ion-col></ion-col>
                  </ion-row>
              </ion-grid>
        </ion-row>
       </ion-grid>
      </ion-row>
     </ion-grid>



</ion-content>
    <ion-footer class="ion-footer-fixed ion-padding" slot="end">
      <ion-toolbar class="right-aligned-toolbar">
        <ion-buttons slot="end">
          <div v-if="categoriaSelecionada && !categoriaSelecionada.bateriasGerada && isAdmin" class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="">
              <ion-icon :icon="iconDelete" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Excluir</ion-label>
          </div>
          <div v-if="categoriaSelecionada" class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="">
              <ion-icon :icon="iconEdit" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Editar</ion-label>
          </div>
          <div v-if="categoriaSelecionada && !categoriaSelecionada.bateriasGerada && isAdmin" class="label-container" style="margin-right: 30px;">
            <ion-button class="round-button" @click="">
              <ion-icon :icon="iconAdd" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Inserir</ion-label>
          </div>
          <div v-if="categoriaSelecionada && isAdmin" class="label-container">
            <ion-button class="round-button" @click="gerarBaterias(categoriaSelecionada)">
              <ion-icon :icon="iconSurfer" style="color: white;" size="large"></ion-icon>
            </ion-button>
            <ion-label class="bottom-label">Distribuir</ion-label>
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
  import { add, document, create, trash, arrowForward, arrowBack, refreshCircle, man } from 'ionicons/icons';
  import {IonPage, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonGrid, IonRow, IonCol, IonSearchbar, 
    IonButton, IonLabel, IonIcon, IonFooter, IonCardTitle,
    IonButtons, IonCard, IonCardContent,IonCardHeader} from '@ionic/vue';
  import  BateriaService  from '../../service/BateriaService';
  import  CategoriaService  from '../../service/CategoriaService';



  export default defineComponent({
  
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
      IonSearchbar, IonButton, IonIcon, IonFooter,IonCardTitle,
      IonButtons, IonLabel, IonCard,IonCardHeader, IonCardContent
       
    },
    data() {
      return {
        iconAdd: add,
        iconSurfer: man,
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
          if (!rounds.hasOwnProperty(item.round)) {
              rounds[item.round] = [item];
          } else {
            let objetos = rounds[item.round];
            objetos.push(item);
            rounds[item.round]=objetos;
          }
        });

        items.value = rounds;

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
              handler: async () => {
                try {
                  const dadosCategoria = 
                  {idEvento: objeto.idEvento, 
                   idCategoria: objeto._id, 
                   qtdAtletasBateria: objeto.qtdAtletasBateria, 
                   qtdAtletas: objeto.qtdAtletas,
                   atletas: objeto.atletas
                  }; 
                  BateriaService.gerarBateria(dadosCategoria).then(() => {
                    this.buscaRegistros();
                  });
                  objeto.bateriasGerada = true;
                  await CategoriaService.atualizarCategoria(objeto._id,objeto);
                  store.dispatch('setCategoriaSelecionada', { categoriaSelecionada: objeto });
                  
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