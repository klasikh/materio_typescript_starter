/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
// import router from '@/router'
import * as appRouter from '@/router/appRouter.js';
import store from '@/store/index.js'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
// global error component
import FormErrorAlert from '@/@layouts/components/Form/FormErrorAlert.vue';

loadFonts()

const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.component('form-error-alert', FormErrorAlert)
app.use(appRouter.routeConfig)
app.use(store)
app.mount('#app')
