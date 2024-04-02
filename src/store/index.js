// store.js
import { createStore } from 'vuex';
import firebase from 'firebase/compat/app';

const store = createStore({
  state: {
    diretor: localStorage.getItem('diretor'),
    diretorSelecionado: localStorage.getItem('diretorSelecionado'),
    eventoSelecionado: localStorage.getItem('eventoSelecionado'),
    categoriaSelecionada: localStorage.getItem('categoriaSelecionada'),
    user: localStorage.getItem('user'), 
  },
  mutations: {
    setDiretor(state, obj) {
        state.diretor = obj;
        localStorage.setItem('diretor', state.diretor); 
    },
    setDiretorSelecionado(state, obj) {
      state.diretorSelecionado = obj;
      localStorage.setItem('diretorSelecionado', state.diretorSelecionado); 
    },
    setEventoSelecionado(state, obj) {
      state.eventoSelecionado = obj;
      localStorage.setItem('eventoSelecionado', state.eventoSelecionado); 
    },
    setCategoriaSelecionada(state, obj){
      state.categoriaSelecionada = obj;
      localStorage.setItem('categoriaSelecionada', state.categoriaSelecionada); 
    },
    setUser(state, obj) {
        state.user = obj;  
        localStorage.setItem('user',state.user); 
    }    
  },
  getters: {
    getDiretor : state => JSON.parse(state.diretor),
    getDiretorSelecionado: state => JSON.parse(state.diretorSelecionado),
    getEventoSelecionado: state => JSON.parse(state.eventoSelecionado),
    getCategoriaSelecionada: state => JSON.parse(state.categoriaSelecionada),
    getUser: state => JSON.parse(state.user)
  },
  actions: {
    setDiretor({ commit }, {diretor}) {
      commit('setDiretor', JSON.stringify(diretor));
    },
    setDiretorSelecionado({ commit }, {diretorSelecionado}) {
      commit('setDiretorSelecionado', JSON.stringify(diretorSelecionado));
    },
    setEventoSelecionado({ commit }, {eventoSelecionado}) {
      commit('setEventoSelecionado', JSON.stringify(eventoSelecionado));
    },
    setCategoriaSelecionada({ commit }, {categoriaSelecionada}) {
      commit('setCategoriaSelecionada', JSON.stringify(categoriaSelecionada));
    },
    setUser({ commit }, {user}) {
      commit('setUser', JSON.stringify(user));
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

          commit("setDiretor", null);
          localStorage.removeItem("diretor");
         
          commit("setDiretorSelecionado", null);
          localStorage.removeItem("diretorSelecionado");    

          commit("setEventoSelecionado", null);
          localStorage.removeItem("eventoSelecionado");
   
          commit("setCategoriaSelecionada", null);
          localStorage.removeItem("categoriaSelecionada");       

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