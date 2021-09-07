import { Howl } from 'howler';
import { createStore } from 'vuex';
import {
  // eslint-disable-next-line comma-dangle
  auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword
} from '../includes/firebase';
import helper from '../includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong: (state, payload) => {
      state.currentSong = {};
      state.sound = {};
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
    },
  },
  getters: {
    // getAuthModalState: (state) => state.authModalShow,
    playing(state) {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
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
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
  },
});
