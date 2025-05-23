import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import registerGlobalComponents from './utils/globalComponents.js';

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.config.devtools = false;

registerGlobalComponents(app);

app.mount('#app')
