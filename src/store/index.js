// src/store/index.js

import { createStore } from 'vuex';
import { auth } from '../firebase';

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
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Set the user in session
        commit('setUser', user);

        return user;
      } catch (error) {
        console.error('Error signing in:', error.message);
        throw error;
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
