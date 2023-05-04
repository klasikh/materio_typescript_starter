import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

// import AuthGuard from '@/AuthGuard';
import NotFoundPage from '@/pages/[...all].vue'

import Home from '@/pages/index.vue'

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: 'Accueil',
        // layout: 'homenosidebar',
        // preloading: true,
      },
    },
    {
      // path: '/:catchAll(.*)*',
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundPage,
      meta: {
        title: 'Erreur 404',
        // preloading: 'true',
      },
    },
]


const projectName = "DGI - MoMoPay TFU";

let router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    // document.getElementById('app').scrollIntoView({behavior:'smooth'});
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
});

router.afterEach((to) => {
  document.title = projectName + " - " + to.meta.title
})

export default router
