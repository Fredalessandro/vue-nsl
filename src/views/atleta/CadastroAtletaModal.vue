<!-- CadastroobjetoEdicaoModal.vue -->

<template>
    <ion-modal :is-open="isModalOpen" @ionModalDidDismiss="fecharModal" style="--height:80%; --width: 80%;">
        
      <ion-header>
        <ion-toolbar>
          <ion-title>Cadastro de Usuário</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fecharModal">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
          <!--<ion-item v-if="objetoEdicao.id && objetoEdicao.id!=0">
            <ion-label>Código {{ objetoEdicao.id }}</ion-label>
          </ion-item>-->
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="14"  label="CPF" oninvalid="" v-mask="'###.###.###-##'" v-model="objetoEdicao.cpf" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" :maxlength="40"  label="Nome" v-model="objetoEdicao.nome" required></ion-input>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="10"  label="Dt. Nascimento" type="date" v-model="objetoEdicao.dataNascimento" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-input style="margin-right: 5px; width: 250px;" :maxlength="15"  label="Telefone" v-mask="'##-#####-####'" v-model="objetoEdicao.telefone" required></ion-input>
            <ion-input style="margin-right: 5px; width: 450px;" label="Email" v-model="objetoEdicao.email" type="email" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="9" @ion-blur="consultarCep"  label="CEP" v-mask="'#####-###'" v-model="objetoEdicao.cep" required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Endereço"       v-model="objetoEdicao.endereco"      required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="6"   label="Numero"         v-model="objetoEdicao.numero"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 15%;"     :maxlength="20"  label="Complemento"    v-model="objetoEdicao.complemento"   required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input style="margin-right: 5px;  width: 250px;"   :maxlength="30"  label="Bairro"       v-model="objetoEdicao.bairro"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 450px;"   :maxlength="50"  label="Cidade"       v-model="objetoEdicao.cidade"        required></ion-input>
            <ion-input style="margin-right: 5px;  width: 150px;"   :maxlength="2"   label="UF"           v-model="objetoEdicao.uf"        required></ion-input>
          </ion-item>
          <ion-radio-group v-model="objetoEdicao.sexo">
          <ion-item>
            <ion-label>Masculino</ion-label>
            <ion-radio slot="start" value="Masculino"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>Feminino</ion-label>
            <ion-radio slot="start" value="Feminino"></ion-radio>
          </ion-item>
        </ion-radio-group>
          <ion-item>  
            <ion-checkbox v-model="objetoEdicao.profissional" @ionChange="handleChangeProfissonal">Profissional</ion-checkbox>
          </ion-item>  
          <ion-item>  
            <ion-checkbox v-model="objetoEdicao.cabecaChave" @ionChange="handleChangeCabecaChave">Cabeça de Chave</ion-checkbox>
          </ion-item>  
          <ion-item>  
            <ion-checkbox v-model="objetoEdicao.isento" @ionChange="handleChangeIsento">Isento</ion-checkbox>
          </ion-item> 
      </ion-content>
      <ion-footer fixed>
        <div class="ion-text-center" style=" bottom: 0; width: 100%;">
            <ion-button @click="salvarEdicao">Salvar</ion-button>
        </div>    
      </ion-footer>

    </ion-modal>
  </template>
  
  <script >
  import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, 
    IonButtons, IonInput, IonItem, IonLabel, IonCheckbox, IonRadioGroup, IonRadio  
} from '@ionic/vue'; 
  import Usuario from '../../model/Usuario';
  import {CepService} from '@/service/CepService';


  export default {    
    props: ['isModalOpen','objetoEdicao'],
    emits: ['fechar-modal', 'salvarEdicao'],
    components: {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,  
    IonButton, IonFooter, IonRadioGroup, IonRadio,
    IonButtons, IonInput, IonItem, IonLabel, IonCheckbox,
    Usuario
  },
    data() {
      return {
         // Instância de um novo usuário
        seuModelo: '',
      }
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      salvarEdicao() {
        // Valide os campos ou realize a lógica de salvamento
        this.$emit('salvarEdicao', this.objetoEdicao);
        this.fecharModal();
      },
      async consultarCep() {
      try {
        const resultadoCep = await CepService.consultarCep(this.objetoEdicao.cep);
        this.objetoEdicao.endereco = resultadoCep.logradouro;
        this.objetoEdicao.bairro = resultadoCep.bairro;
        this.objetoEdicao.cidade = resultadoCep.localidade;
        this.objetoEdicao.uf     = resultadoCep.uf;
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
      }
    },
    handleChangeProfissional(event){
      // This function will be called whenever the checkbox state changes
        this.objetoEdicao.profissional = event.detail.checked;
    },
    handleChangeAtivo(event) {
      // This function will be called whenever the checkbox state changes
      this.objetoEdicao.ativo = event.detail.checked;
    },
    handleChangeIsento(event) {
      // This function will be called whenever the checkbox state changes
      this.objetoEdicao.isento = event.detail.checked;
    }
  },    
  setup() {
      const sexoSelecionado = ref(null);

      const showSelectedGender = () => {
        console.log("Selected gender:", objetoEdicao.sexo);
      };

      return {
        sexoSelecionado,
        showSelectedGender
      };
    }

    
  }; 
  
  </script>
