import './scss/app.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import "bootstrap/scss/bootstrap.scss";

import PrimeVue from 'primevue/config';

//Default Theme
//import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";

//Custom Theme
//import './scss/theme.css';

app.use(PrimeVue);

app.mount('#app')
