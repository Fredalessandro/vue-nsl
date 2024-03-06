// src/store/index.js

import { createStore } from 'vuex';
import {firebase} from '../firebase.js';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signInWithEmailAndPassword({ commit }, { email, password }) {
      try {
        // Sign in with email and password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Set the user in session
        commit('setUser', user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error) {
        console.error('Error signing in:', error.message);
        throw error;
      }
    },
  },
  getters: {
    getUser: (state) => {
      // Tente obter o usuário do estado da loja
      const userFromStore = state.user;
  
      // Se não estiver presente no estado da loja, tente obtê-lo do localStorage
      const userFromLocalStorage = localStorage.getItem('user');
  
      // Retorne o usuário do estado da loja ou do localStorage, convertendo de volta para o formato de objeto JSON
      return userFromStore || (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
    },
  },
});
