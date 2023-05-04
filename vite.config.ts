import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'src/styles/variables/_vuetify.scss',
      },
    }),
    Pages({}),
    Layouts(),
    Components({
      dirs: ['src/@core/components'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia'],
      vueTemplate: true,
    }),
    DefineOptions(),
  ],
  define: { 
    'process.env': {
      APP_MODE: 'dev',
      BACK_END_DEV_URI: 'http://localhost:4000/graphql',
      FRONT_END_DEV: 'http://localhost:8080',
      BACK_END_PROD_URI: 'https://impottva-server.onrender.com/graphql',
      BACK_END_URI: 'http://localhost:4000/graphql',
      REST_API_PORT: '4000',
      EMAIL_JS_SERVICE: 'service_dy7692t',
      EMAIL_JS_KEY: '5k2MPmd8tQYpBR97T',
      EMAIL_JS_SUBSCRIPTION_TEMPLATE: 'template_csodw8i',
      EMAIL_JS_INVITATION_TEMPLATE: 'template_ydj1zrn',
      APP_SOCKET_ENDPOINT: 'http://localhost:3000',
    }  
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: [
      './src/**/*.vue',
    ],
  },
})
