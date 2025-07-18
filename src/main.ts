import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './assets/main.css'

const app = createApp(App)

// Configuração do Toast
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true
}

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

// Configuração global para o HeadlessUI
app.config.globalProperties.$headlessui = {
  dialog: {
    defaultOpen: false,
    defaultInitialFocus: undefined
  }
}

app.mount('#app') 