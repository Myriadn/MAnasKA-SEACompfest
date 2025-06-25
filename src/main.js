import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initApiSecurity } from './utils/apiSecurity'

// Initialize API security before any requests are made
initApiSecurity()

// Create pinia instance with persistence plugin
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create app instance
const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')
