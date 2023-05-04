import { jwtDecrypt, tokenAlive } from "@/shared/jwtHelper";
import axios from "axios";
import router from '@/router/index';
import Toast from '@/@layouts/components/Toast/Toast';

const state = () => ({
  authData: {
    token: "",
    refreshToken: "",
    tokenExp: "",
    userId: "",
    ifuId: "",
    ifuNumber: "",
  },
  loginStatus: "",
  loading: false,
  registerLoading: false,
  error: null,
  registerError: null,
});

const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  getAuthData(state) {
    return state.authData;
  },
  isTokenActive(state) {
    if (!state.authData.tokenExp) {
      return false;
    }
    return tokenAlive(state.authData.tokenExp);
  },
};

const actions = {
  async login({ commit }, payload) {
    // console.log(payload)
    commit('clearError');
    commit("setLoading", true);
    const response = await axios.post(
        process.env.BACK_END_URI,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        // console.log(response.data);
        commit("setLoading", false);
        if(response.data.errors) {

          const err = response.data.errors[0]
          let error = err.message.replace('GraphQL error: ', '');
          if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
            error = "Erreur de connexion";
          }
          if(error == "Network Error") {
              error = "Une erreur s'est produite"
          }
          commit('setError', error);
          commit("setLoading", false);
        } else {
          commit("saveTokenData", response.data.data.loginUser);
          commit("setLoginStatu", "success");
          Toast.fire({icon: 'success', title: 'Connexion effectuée avec succès!', position:'top-right'});
        }
      })
      .catch((err) => {
        let error = err.message.replace('GraphQL error: ', '');
        if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
          error = "Erreur de connexion";
        }
        if(error == "Network Error") {
          error = "Une erreur s'est produite"
        }
        commit('setError', error);
        commit("setLoading", false);
        // console.log(error)
        // console.log(err);
        commit("setLoginStatu", "failed");
      });
  },
  async register({ commit }, payload) {
    // console.log(payload)
    commit('clearRegisterError');
    commit("setRegisterLoading", true);
    const response = await axios.post(
        process.env.BACK_END_URI,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(async (response) => {
        // console.log(response.data);
        commit("setRegisterLoading", false);
        if(response.data.errors) {

          const err = response.data.errors[0]
          let error = err.message.replace('GraphQL error: ', '');
          if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
            error = "Erreur de connexion";
          }
          if(error == "Network Error") {
              error = "Une erreur s'est produite"
          }
          commit('setRegisterError', error);
          commit("setRegisterLoading", false);
        } else {
          commit("saveTokenData", response.data.data.registerUser);
          commit("setLoginStatu", "success");
          // Toast.fire({icon: 'success', title: 'Inscription effectuée avec succès!', position:'top-right'});
          const codeRand = Math.floor(Math.random() * 99999);
          await axios.post(
            "https://edok-api.kingsmspro.org/api/v1/sms/send",
            { from: "CREP", to: response.data.data.registerUser.phonenumber, message: `Votre code de confirmation est : ${codeRand}`, dlr: 1, type: 0 },
            { headers: { 'Content-Type': 'application/json' } }
          )
          // router.push({ name: "codeValidation" });
          router.push({ name: "registerSuccess" });

        }
      })
      .catch((err) => {
        let error = err.message.replace('GraphQL error: ', '');
        if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
          error = "Erreur de connexion";
        }
        if(error == "Network Error") {
          error = "Une erreur s'est produite"
        }
        commit('setRegisterError', error);
        commit("setRegisterLoading", false);
        // console.log(error)
        // console.log(err);
        commit("setLoginStatu", "failed");
      });
  },
  async validCode({ commit }, payload) {
    // console.log(payload)
    commit('clearError');
    commit("setLoading", true);
    const response = await axios.post(
        process.env.BACK_END_URI,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        // console.log(response.data);
        commit("setLoading", false);
        if(response.data.errors) {

          const err = response.data.errors[0]
          let error = err.message.replace('GraphQL error: ', '');
          if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
            error = "Erreur de connexion";
          }
          if(error == "Network Error") {
              error = "Une erreur s'est produite"
          }
          commit('setError', error);
          commit("setLoading", false);
        } else {
          commit("saveTokenData", response.data.data.loginUser);
          commit("setLoginStatu", "success");
          Toast.fire({icon: 'success', title: 'Inscription effectuée avec succès!', position:'top-right'});
        }
      })
      .catch((err) => {
        let error = err.message.replace('GraphQL error: ', '');
        if(error == "Operation `users.findOne()` buffering timed out after 10000ms"){
          error = "Erreur de connexion";
        }
        if(error == "Network Error") {
          error = "Une erreur s'est produite"
        }
        commit('setError', error);
        commit("setLoading", false);
        // console.log(error)
        // console.log(err);
        commit("setLoginStatu", "failed");
      });
  },

  logoutUser({ commit }) {
    commit('clearUser');
    localStorage.setItem('refresh_token', '');
    Toast.fire({icon: 'error', title: 'Déconnecté avec succès!', position:'top-right'});
    router.push('/');
  },
};

const mutations = {
  setLoading: (state, value) => {
    state.loading = value;
  },
  setRegisterLoading: (state, value) => {
    state.registerLoading = value;
  },
  setError: (state, error) => {
      state.error = error;
  },
  setRegisterError: (state, registerError) => {
        state.registerError = registerError;
  },
  clearError: state => (state.error = null),
  clearRegisterError: state => (state.error = null),
  clearUser: state => {
    state.user = null;
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    state.authData = null;
  },
  saveTokenData(state, data) {
    const randNumber = Math.random()*10
    const randomNumber = Math.random()*8
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("refresh_token", randomNumber + data.token + randNumber);

    const jwtDecodedValue = jwtDecrypt(data.token);
    const newTokenData = {
      token: data.token,
      refreshToken: randomNumber + data.token + randNumber,
      tokenExp: jwtDecodedValue.exp,
      // userId: data.user._id,
      // userName: jwtDecodedValue.username,
    };

    // data.user._id = state.authData.userId;
    // data.user.ifuId._id = state.authData.ifuId;
    // data.user.ifunumber = state.authData.ifuNumber;

    state.authData = newTokenData;
  },
  saveTokensToStorage(state, data) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    const jwtDecodedValue = jwtDecrypt(data.access_token);
    console.log(jwtDecodedValue)

    const newTokenData = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      tokenExp: jwtDecodedValue.exp,
    };
    state.authData = newTokenData;
  },
  setLoginStatu(state, value) {
    state.loginStatus = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
