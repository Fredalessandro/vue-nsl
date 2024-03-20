// src/store/index.js

import { createStore } from 'vuex';
import { getFirestore, doc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import {firebase} from '../firebase.js';
import FirestoreService from '@/database/FirestoreService.js';

export default createStore({
  state: {
    user: null,
    diretor: null,
    objetoLinha : null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setDiretor(state, diretor) {
      state.diretor = diretor;
    },
    setObjetoLinha(state, objetoLinha) {
      state.objetoLinha = objetoLinha;
    }
  },
  actions: {
    async signInWithEmailAndPassword({ commit }, { email, password }) {
      try {
        // Sign in with email and password
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Set the user in session
        commit("setUser", user);
        localStorage.setItem("user", JSON.stringify(user));        

        return user;  

      } catch (error) {
        console.error("Error signing in:", error.message);
        throw error;
      }
    },
    async setDiretorStorage({ commit }, { diretor }) {
      try {
        // Sign in with email and password

        // Set the user in session
        commit("setDiretor", diretor);
        localStorage.setItem("diretor", JSON.stringify(diretor));
        return diretor;
      } catch (error) {
        console.error("Error setDiretorStorage in:", error.message);
        throw error;
      }
    },
    async setObjetoLinha({ commit }, { objetoLinha }) {
      try {
        // Sign in with email and password

        // Set the user in session
        commit("setObjetoLinha", objetoLinha);
        //localStorage.setItem("objetoLinha", JSON.stringify(objetoLinha));

        return objetoLinha;
      } catch (error) {
        console.error("Error setObjetoLinha in:", error.message);
        throw error;
      }
    },
  async createUserWithEmailAndPassword({ commit }, { email, password }) {
    try {
      const userCredential = await firebase
        .auth() // get the auth api
        .createUserWithEmailAndPassword(this.email, this.senha); // need .value because ref()
        const user = userCredential.user;
      return user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  },
  
  async signOut({commit},{user,diretor}) {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful
          console.log("User signed out");
          commit("setUser", null);
          localStorage.removeItem("user");

          // Set the director in session
          commit("setDiretor", null);
          localStorage.removeItem("diretor");
          // Redirect or perform any other action after sign-out
        })
        .catch((error) => {
          // An error happened
          console.error("Error signing out:", error.message);
        });
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  }},
  methods: {
   async getDiretorFromDatabase() {
      const userFromLocalStorage = localStorage.getItem("user");
         
          const db = getFirestore();

          const collectionName = 'Diretores';

          const itemsCollection = collection(db, collectionName); // Replace with your Firestore collection name

          const q = await query(itemsCollection); // Add any additional query conditions

          let diretor = null;

          try {
              onSnapshot(q, (snapshot) => {

                  //this.items = [];

                  snapshot.forEach((doc) => {

                      diretor = { id: doc.id, ...doc.data() };

                      if (diretor.email === userFromLocalStorage.email) {
                          console.log('diretor: ', diretor);
                          store.dispatch('setDiretorStorage', { diretor: diretor })
                              .then((value) => {

                              }).catch(error => {
                                  console.error('Error add data:', error);
                              });
                          return diretor;    
                      }

                  });

              });
              return null;
          } catch (error) {
              console.error(error.message);
          }
    }
  },
  getters: {
    getUser: (state) => {
      // Tente obter o usuário do estado da loja
      const userFromStore = state.user;

      // Se não estiver presente no estado da loja, tente obtê-lo do localStorage
      const userFromLocalStorage = localStorage.getItem("user");

      // Retorne o usuário do estado da loja ou do localStorage, convertendo de volta para o formato de objeto JSON
      return (
        userFromStore ||
        (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null)
      );
    },
    getDiretor: (state) => {
      // Tente obter o usuário do estado da loja
      const diretorFromStore = state.diretor;

      // Se não estiver presente no estado da loja, tente obtê-lo do localStorage
      const diretorFromLocalStorage = localStorage.getItem("diretor");

      // Retorne o usuário do estado da loja ou do localStorage, convertendo de volta para o formato de objeto JSON
      const diretorFromFirestore = FirestoreService.get('Diretores', diretorFromLocalStorage)
      return (
        diretorFromStore ||
        (diretorFromLocalStorage ? JSON.parse(diretorFromLocalStorage) : null)
      );
    },
    getObjetoLinha: (state) => {
      // Tente obter o usuário do estado da loja
      const objetoLinhaFromStore = state.objetoLinha;
      console.log('objetoLinhaFromStore: ', objetoLinhaFromStore);
      // Retorne o usuário do estado da loja ou do localStorage, convertendo de volta para o formato de objeto JSON
      return objetoLinhaFromStore;
    },
  }
});
