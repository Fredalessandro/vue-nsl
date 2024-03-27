// store.js
import { createStore } from 'vuex';
import firebase from 'firebase/compat/app';

const store = createStore({
  state: {
    diretor: {},
    diretorSelecionado: {},
    eventoSelecionado:{},
    categoriaSelecionada:{},
    user: {} 
  },
  mutations: {
    setDiretor(state, obj) {
        state.diretor = obj;
    },
    setDiretorSelecionado(state, obj) {
      state.diretorSelecionado = obj;
    },
    setEventoSelecionado(state, obj) {
      state.eventoSelecionado = obj;
    },
    setCategoriaSelecionada(state, obj){
      state.categoriaSelecionada = obj;
    },
    setUser(state, obj) {
        state.user = obj;  
    }    
  },
  getters: {
    getDiretor: state => state.diretor,
    getDiretorSelecionado: state => state.diretorSelecionado,
    getEventoSelecionado: state => state.eventoSelecionado,
    getCategoriaSelecionada: state => state.categoriaSelecionada,
    getUser: state => state.user
  },
  actions: {
    setDiretor({ commit }, {diretor}) {
      commit('setDiretor', diretor);
    },
    setDiretorSelecionado({ commit }, {diretorSelecionado}) {
      commit('setDiretorSelecionado', diretorSelecionado);
    },
    setEventoSelecionado({ commit }, {eventoSelecionado}) {
      commit('setEventoSelecionado', eventoSelecionado);
    },
    setCategoriaSelecionada({ commit }, {categoriaSelecionada}) {
      commit('setCategoriaSelecionada', categoriaSelecionada);
    },
    setUser({ commit }, {user}) {
      commit('setUser', user);
    },
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
        })
        .catch((error) => {
          // An error happened
          console.error("Error signing out:", error.message);
        });
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  },
}});

export default store;