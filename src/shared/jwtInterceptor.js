import axios from "axios";
import store from '@/store/index';
import { AXIOS_REFRESH_TOKEN } from "@/queries/axios-queries";

const jwtInterceptor = axios.create({});


jwtInterceptor.interceptors.request.use((config) => {
    const authData = store.getters["auth/getAuthData"];
    if (authData == null) {
      return config;
    }
  
    config.headers.common["Authorization"] = `bearer ${authData.token}`;
    return config;
  });
  
  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        const authData = store.getters["auth/getAuthData"];
        
        const payload = {
          "query": AXIOS_REFRESH_TOKEN,
          "variables" : {
            access_token: authData.token,
            refresh_token: authData.refreshToken,
          }
        };
  
        var response = await axios.post(
          process.env.BACK_END_URI,
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        );
        // console.log(response.data.data.refreshToken)
        await store.dispatch("auth/saveTokensToStorage", response.data.data.refreshToken);
        error.config.headers[
          "Authorization"
        ] = `bearer ${response.data.data.refreshToken.access_token}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  export default jwtInterceptor;
