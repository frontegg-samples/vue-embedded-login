import { createApp } from 'vue'
import App from './App.vue'
import { Frontegg } from '@frontegg/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { sanboxContextOptions } from './config/sanboxContextOptions'
import AccountInfo from './view/AccountInfo.vue'
import AppWelcome from './view/AppWelcome.vue'

import './assets/base.css'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { name: 'Welcome', path: '/', component: AppWelcome },
    {
      name: 'Home',
      path: '/home',
      component: AccountInfo,
    },
  ],
})

const app = createApp(App)

app.use(router)
app.use(Frontegg, {
  contextOptions: sanboxContextOptions,
  authOptions: {
    keepSessionAlive: true
  },
  hostedLoginBox: false,
  customLoader: true,
  router,
})

app.mount('#app')
