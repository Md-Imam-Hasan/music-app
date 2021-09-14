import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import './assets/tailwind.css';
import Icon from './directives/icon';
import { auth } from './includes/firebase';
import i18n from './includes/i18n';
import VeeValidaionPlugin from './includes/validation';
import GlobalComponents from './includes/_globals';
import './registerServiceWorker';
import router from './router';
import store from './store';

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidaionPlugin);
    app.use(GlobalComponents);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
