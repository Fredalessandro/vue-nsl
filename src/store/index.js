// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    atributoCompartilhado: 'Valor Inicial',
  },
  mutations: {
    atualizarAtributo(state, novoValor) {
      state.atributoCompartilhado = novoValor;
    },
  },
});
