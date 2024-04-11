// store.js
import { createStore } from "vuex";
import firebase from "firebase/compat/app";

const store = createStore({
  state: {
    diretor: localStorage.getItem("diretor"),
    diretorSelecionado: localStorage.getItem("diretorSelecionado"),
    eventoSelecionado: localStorage.getItem("eventoSelecionado"),
    categoriaSelecionada: localStorage.getItem("categoriaSelecionada"),
    bateriaSelecionada: localStorage.getItem("bateriaSelecionada"),
    juizSelecionado: localStorage.getItem("juizSelecionado"),
    atletaSelecionado: localStorage.getItem("atletaSelecionado"),
    usuario: localStorage.getItem("usuario"),
  },
  mutations: {
    setDiretor(state, obj) {
      state.diretor = obj;
      localStorage.setItem("diretor", state.diretor);
    },
    setDiretorSelecionado(state, obj) {
      state.diretorSelecionado = obj;
      localStorage.setItem("diretorSelecionado", state.diretorSelecionado);
    },
    setEventoSelecionado(state, obj) {
      state.eventoSelecionado = obj;
      localStorage.setItem("eventoSelecionado", state.eventoSelecionado);
    },
    setCategoriaSelecionada(state, obj) {
      state.categoriaSelecionada = obj;
      localStorage.setItem("categoriaSelecionada", state.categoriaSelecionada);
    },
    setBateriaSelecionada(state, obj) {
      state.bateriaSelecionada = obj;
      localStorage.setItem("bateriaSelecionada", state.bateriaSelecionada);
    },
    setJuizSelecionado(state, obj) {
      state.juizSelecionado = obj;
      localStorage.setItem("juizSelecionado", state.juizSelecionado);
    },
    setAtletaSelecionado(state, obj) {
      state.atletaSelecionado = obj;
      localStorage.setItem("atletaSelecionado", state.atletaSelecionado);
    },
    setUsuario(state, obj) {
      state.usuario = obj;
      localStorage.setItem("usuario", state.usuario);
    },
  },
  getters: {
    getDiretor: (state) => JSON.parse(state.diretor),
    getDiretorSelecionado: (state) => JSON.parse(state.diretorSelecionado),
    getEventoSelecionado: (state) => JSON.parse(state.eventoSelecionado),
    getCategoriaSelecionada: (state) => JSON.parse(state.categoriaSelecionada),
    getJuizSelecionado: (state) => JSON.parse(state.juizSelecionado),
    getAtletaSelecionado: (state) => JSON.parse(state.atletaSelecionado),
    getUsuario: (state) => JSON.parse(state.usuario),
  },
  actions: {
    setDiretor({ commit }, { diretor }) {
      commit("setDiretor", JSON.stringify(diretor));
    },
    setDiretorSelecionado({ commit }, { diretorSelecionado }) {
      commit("setDiretorSelecionado", JSON.stringify(diretorSelecionado));
    },
    setEventoSelecionado({ commit }, { eventoSelecionado }) {
      commit("setEventoSelecionado", JSON.stringify(eventoSelecionado));
    },
    setCategoriaSelecionada({ commit }, { categoriaSelecionada }) {
      commit("setCategoriaSelecionada", JSON.stringify(categoriaSelecionada));
    },
    setBateriaSelecionada({ commit }, { bateriaSelecionada }) {
      commit("setBateriaSelecionada", JSON.stringify(bateriaSelecionada));
    },
    setJuizSelecionado({ commit }, { juizSelecionado }) {
      commit("setJuizSelecionado", JSON.stringify(juizSelecionado));
    },
    setAtletaSelecionado({ commit }, { atletaSelecionado }) {
      commit("setAtletaSelecionado", JSON.stringify(atletaSelecionado));
    },
    setUsuario({ commit }, { usuario }) {
      commit("setUsuario", JSON.stringify(usuario));
    },
    async signInWithEmailAndPassword({ commit }, { email, password }) {
      try {
        // Sign in with email and password
        const usuarioCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const usuario = usuarioCredential.user;

        // Set the Usuario in session
        commit("setUsuario", usuario);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        return usuario;
      } catch (error) {
        console.error("Error signing in:", error.message);
        throw error;
      }
    },

    async createUserWithEmailAndPassword({ commit }, { email, password }) {
      try {
        const UsuarioCredential = await firebase
          .auth() // get the auth api
          .createUserWithEmailAndPassword(this.email, this.senha); // need .value because ref()
        const Usuario = UsuarioCredential.Usuario;
        return Usuario;
      } catch (error) {
        console.error("Error signing in:", error.message);
        throw error;
      }
    },
    async signOut({ commit }, { Usuario, diretor }) {
      try {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            // Sign-out successful
            console.log("User signed out");

            commit("setUsuario", null);
            localStorage.removeItem("usuario");

            commit("setDiretor", null);
            localStorage.removeItem("diretor");

            commit("setDiretorSelecionado", null);
            localStorage.removeItem("diretorSelecionado");

            commit("setEventoSelecionado", null);
            localStorage.removeItem("eventoSelecionado");

            commit("setCategoriaSelecionada", null);
            localStorage.removeItem("categoriaSelecionada");

            commit("setBateriaSelecionada", null);
            localStorage.removeItem("bateriaSelecionada");

            commit("setJuizSelecionado", null);
            localStorage.removeItem("juizSelecionado");

            commit("setAtletaSelecionado", null);
            localStorage.removeItem("atletaSelecionado");
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
  },
});

export default store;
