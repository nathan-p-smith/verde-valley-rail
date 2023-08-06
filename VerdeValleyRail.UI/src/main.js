import './scss/app.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/lara-light-indigo/theme.css";

app.use(PrimeVue);

app.mount('#app')
