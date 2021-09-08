import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import './assets/tailwind.css';
import Icon from './directives/icon';
import { auth } from './includes/firebase';
import VeeValidaionPlugin from './includes/validation';
import router from './router';
import store from './store';

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(VeeValidaionPlugin);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
