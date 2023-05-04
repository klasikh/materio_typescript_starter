import { createRouter, createWebHistory } from "vue-router";
import { AXIOS_REFRESH_TOKEN } from "@/queries/axios-queries";

import NotFoundPage from '@/pages/[...all].vue'

import Home from '@/pages/index.vue'
import Dashboard from "@/pages/dashboard.vue";
import BeginPayment from "@/pages/beginPayment.vue";
import RegisterSuccess from "@/pages/registerSuccess.vue";
import store from "@/store";
import axios from 'axios';

const routes = [
  { path: "/", component: Home, meta: { title: 'Accueil', requiredAuth: false } },
  // { path: "/login", component: Login, meta: { requiredAuth: false } },
  { path: "/mon_espace", name: "dashboard", component: Dashboard, meta: { title: 'Mon espace', requiredAuth: true } },
  { path: "/payer_tfu", name: "beginPayment", component: BeginPayment, meta: { title: 'Commencer un paiement', requiredAuth: true } },
  { path: "/register_success", name: "registerSuccess", component: RegisterSuccess, meta: { title: 'Inscription réussie', requiredAuth: false } },
  { path: "/:pathMatch(.*)*", component: NotFoundPage, meta: { title: 'Erreur 404', requiredAuth: false } },
];

const projectName = "DGI - MoMoPay TFU";

export const routeConfig = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    // document.getElementById('app').scrollIntoView({behavior:'smooth'});
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
});

routeConfig.afterEach((to) => {
  document.title = projectName + " - " + to.meta.title
})

routeConfig.beforeEach(async (to, from, next) => {
  // console.log(store.getters["auth/getAuthData"].token);
  if (!store.getters["auth/getAuthData"].token) {
    localStorage.getItem("access_token", '');
    localStorage.getItem("refresh_token", '');
    // if (access_token) { 
    //   const data = {
    //     access_token: access_token,
    //     refresh_token: refresh_token,
    //   };
    //   store.commit("auth/saveTokenData", data);
    // }
    // return next({ path: "/" });
    
  }
  let auth = store.getters["auth/isTokenActive"];
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  if (!auth && access_token) {
      const payload = {
        "query": AXIOS_REFRESH_TOKEN,
        "variables" : {
          access_token: access_token,
          refresh_token: refresh_token,
        }
      };

      var refreshResponse = await axios.post(
        process.env.BACK_END_URI,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      // console.log(refreshResponse.data)
      store.commit("auth/saveTokensToStorage", refreshResponse.data.data.refreshToken);
      auth = true;
  }
  
  if (auth && !to.meta.requiredAuth) {
    return next({ name: "dashboard" });
  } else if (!auth && to.meta.requiredAuth) {
    return next({ path: "/" });
  } 

  return next();
});
