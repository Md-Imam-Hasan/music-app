import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import './assets/tailwind.css';
import VeeValidaionPlugin from './includes/validation';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VeeValidaionPlugin);

app.mount('#app');