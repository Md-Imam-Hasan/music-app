import { createStore } from 'vuex';
import {
  // eslint-disable-next-line comma-dangle
  auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword
} from '../includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // getAuthModalState: (state) => state.authModalShow,
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });
      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      const userC = await signInWithEmailAndPassword(auth, payload.email, payload.password);
      if (userC) {
        commit('toggleAuth');
      }
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async signOut({ commit }) {
      await auth.signOut();
      commit('toggleAuth');
    },
  },
});
