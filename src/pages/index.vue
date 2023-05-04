<script setup>
  import CustomLayout from '@/layouts/components/CustomLayout.vue'

  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter, useRoute } from 'vue-router'
  import { mapGetters, mapState, useStore } from 'vuex';
  import validator from 'validator';
  import axios from "axios";
  // import got from 'got';
  // import { mapState, mapGetters, mapMutations, mapActions } from '@/store/map-state'
  import { AXIOS_LOGIN_USER, AXIOS_REGISTER_USER } from "@/queries/axios-queries";

  // GLOBAL CONST
  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  const loginStatus = computed(() => store.getters['auth/getLoginStatus'])
  const actionLogin = (login) => store.dispatch('auth/login', login)
  const actionRegister = (register) => store.dispatch('auth/register', register)
  const error = computed(() => store.state.auth.error)
  const loading = computed(() => store.state.auth.loading)
  const registerError = computed(() => store.state.auth.registerError)
  const registerLoading = computed(() => store.state.auth.registerLoading)

  // computed properties
  // const { error, loading } = mapState()
  // const { loginStatus } = mapGetters()// commit/dispatch functions
  // const { login } = mapActions()

  // DATA
  let ifunumber = ref('')
  let password = ref('')
  let remember = ref(false)
  const ifunumberRules = ref([
    ifunumber => !!ifunumber || 'Champ obligatoire',
    // ifunumber => validator.isInt({min: 13, max:13}) || "Le numéro IFU ne doit pas dépasser 13 caractères"
  ])

  const passwordSignInRules = ref([
    password => !!password || "Le mot de passe est obligatoire",
    // password =>
    //   password.length >= 8 || "Le mot de passe doit contenir au moins 8 caractères"
  ])

  const isPasswordVisible = ref(false)
  const isFormValid = ref(true)

  // SIGNUP DATA
  const signupDialog = ref(false)
  let registerForm = ref(null)
  const ifunumberSignup = ref('')
  const phonenumberSignup = ref('')
  const emailSignup = ref('')
  const passwordSignup = ref('')
  const confirmationPasswordSignup = ref('')
  const privacyPolicies = ref(false)

  const isFormValidSignup = ref(true)
  const isSignupPasswordVisible = ref(false)

  let passwordOptions = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: true, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
  const passwordSignupRules = ref([
    password => !!password || "Le mot de passe est requis",
    // password => validator.isStrongPassword(password, [passwordOptions]) || "Le mot de passe est faible (doit contenir au moins 8 caractères comprenant au moins 1 majuscule, un miniscule, un chiffre et un caractère spécial)",
  ])

  const confirmSignupSignpRules = ref([
    password => !!password || "Le mot de passe est requis",
    // password => validator.isStrongPassword(password, [passwordOptions]) || "Le mot de passe est faible (doit contenir au moins 8 caractères comprenant au moins 1 majuscule, un miniscule, un chiffre et un caractère spécial)",
    confirmationPassword => validator.equals(passwordSignup.value, confirmationPassword) || "Les mots de passe ne sont pas identiques"
  ])

  // FUNCTIONS
  const loginUser = async () => {
    let ifuVal = ifunumber.value
    const graphqlQuery = {
      "query": AXIOS_LOGIN_USER,
      "variables" : {
        ifunumber: ifuVal.toString(), 
        password: password.value,
        rememberMe: remember.value,
      }
    };
    if(isFormValid) {
      await actionLogin(graphqlQuery);
      if(loginStatus.value === 'success'){
        router.push({ name: "dashboard" });
      }else{
        // alert('failed to login')
      }
    }
  }

  const registerUser = async () => {
    let ifuSignVal = ifunumberSignup.value
    let phonenumberVal = phonenumberSignup.value

    const graphqlRegisterQuery = {
      "query": AXIOS_REGISTER_USER,
      "variables" : {
        ifunumber: ifuSignVal.toString(), 
        phonenumber: phonenumberVal.toString(), 
        email: emailSignup.value,
        password: passwordSignup.value,
        isActivated: true,
      }
    };
    if(isFormValidSignup) {
      await actionRegister(graphqlRegisterQuery);
      // const codeRand = Math.floor(Math.random() * 99999);
      // const message = `Votre code de confirmation est : ${codeRand}`;
      // await axios.post(
      //   `https://edok-api.kingsmspro.org/api/v1/sms/send?from=DGI&to=${22966680696}&message=test frm APIdlr=1&type=0`,
      //   { 
      //     headers: { 
      //       'APIKEY': 'dCmJyBrPDWR2qVQ7v74Kq6XkOOgCTMlO', 
      //       'CLIENTID': 3577
      //       // 'APIKEY': 'dCmJyBrPDWR2qVQ7v74Kq6XkOOgCTMlO', 
      //       // 'CLIENTID': 3577 
      //       } 
      //   }
      // )

    //   const {data} = await got.post(`https://edok-api.kingsmspro.org/api/v1/sms/send?from=CREP&to=${22966680696}&message=${message}&dlr=1&type=0`, {
    //     headers: { 
    //       'Content-Type': 'application/json', 
    //       'APIKEY': 'dCmJyBrPDWR2qVQ7v74Kq6XkOOgCTMlO', 
    //       'CLIENTID': 3577 
    //     },
    //     json: {
    //       hello: 'world'
    //     }
    //   }).json();

    //   console.log(data);
    }
  }

  onMounted(() => {
    
  })

</script>

<template>
  <CustomLayout>
    <template v-slot:MainContent>

      <div class="px-15 pt-12 pb-10 text-center" style="background-color: #06a997; width: 100%">
        <div style="margin-left: 15%; margin-right: 15%;">
          <h2 class="text-none" style="color: white; font-weight: 400">Bienvenue sur la plateforme de paiement par MoMo de la Taxe Foncière Unique (TFU - Foncier bâti et non bâti)</h2>
        </div>
      </div>
      <div class="auth-wrapper d-flex align-center justify-center pa-4" style="margin-top: -30px;">

      <VCard
        class="auth-card pa-4 pt-7"
        max-width="448"
      >
        <VLayout v-if="error" row wrap small class="mx-3 text-white col-12">
          <span mx3 small>
            <form-error-alert :message="error"></form-error-alert>
          </span>
        </VLayout>
        <VCardText>
          
          <VForm v-model="isFormValid" lazy-validation @submit.prevent="loginUser">
            <VRow>
              <!-- ifunumber -->
              <VCol cols="12">
                <VTextField
                  v-model="ifunumber"
                  label="Numéro Contribuable ou Numéro IFU*"
                  type="number"
                  :rules="ifunumberRules"
                  id="inputifu"
                  required
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Mot de passe*"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :rules="passwordSignInRules"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  required
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                  <VCheckbox
                    v-model="remember"
                    label="Se souvenir de moi"
                  />

                  <a
                    class="ms-2 mb-1"
                    href="javascript:void(0)"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  class="text-white"
                  :loading="loading"
                  :disabled="!isFormValid"
                >
                  <span slot="loader" class="custom-loader text-white" color="#fff">
                    <VIcon light>cached</VIcon>
                  </span>
                  Se connecter
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Vous n'avez pas de compte ?</span>
                <VBtn
                  text
                  class="primary ms-2 text-none bg-none"
                  variant="plain"
                  @click="signupDialog = true"
                >
                  Créer un compte
                </VBtn>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
        </VCard>
        
      <VDialog
        v-model="signupDialog"
        persistent
      >
        <div class="auth-wrapper d-flex align-center justify-center pa-4">

          <VCard
            class="auth-card pa-4 pt-7"
            max-width="448"
          >
            <VBtn
              text
              class="text-secondary text-none bg-none"
              variant="plain"
              style="float:right"
              @click="signupDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </VBtn>
            <VCardItem class="justify-center ms-10">
              <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
                Créer un compte
              </VCardTitle>
            </VCardItem>
            <VLayout v-if="registerError" row wrap small class="mx-3 text-white col-12">
              <span mx3 small>
                <form-error-alert :message="registerError"></form-error-alert>
              </span>
            </VLayout>
            <VCardText>
              <VForm v-model="isFormValidSignup" lazy-validation @submit.prevent="registerUser">
                <VRow>
                <!-- ifunumber -->
                  <VCol cols="12">
                    <VTextField
                      v-model="ifunumberSignup"
                      label="Numéro Contribuable ou Numéro IFU*"
                      type="number"
                      required
                    />
                  </VCol>
                  <!-- phonenumber -->
                  <VCol cols="12">
                    <VTextField
                      v-model="phonenumberSignup"
                      label="Numéro de téléphone*"
                      required
                    />
                  </VCol>
                  <!-- email -->
                  <VCol cols="12">
                    <VTextField
                      v-model="emailSignup"
                      label="Email"
                      type="email"
                    />
                  </VCol>

                  <!-- password -->
                  <VCol cols="12">
                    <VTextField
                      v-model="passwordSignup"
                      label="Mot de passe*"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :rules="passwordSignupRules"
                      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                      required
                    />
                  </VCol>

                  <!-- confirm password -->
                  <VCol cols="12">
                    <VTextField
                      v-model="confirmationPasswordSignup"
                      label="Confirmation du mot de passe*"
                      :type="isSignupPasswordVisible ? 'text' : 'password'"
                      :rules="confirmSignupSignpRules"
                      :append-inner-icon="isSignupPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="isSignupPasswordVisible = !isSignupPasswordVisible"
                      required
                    />
                  </VCol>

                  <!-- submit -->
                  <VCol cols="12">
                    <VBtn
                      block
                      type="submit"
                      :loading="registerLoading"
                      :disabled="!isFormValidSignup"
                    >
                      <span slot="loader" class="custom-loader text-white" color="#fff">
                        <VIcon light>cached</VIcon>
                      </span>
                      Créer votre compte
                    </VBtn>
                  </VCol>

                  <!-- login instead -->
                  <VCol
                    cols="12"
                    class="text-center text-base"
                  >
                    <span>Avez-vous déjà un compte ?</span>
                    <VBtn
                      variant="text"
                      class="primary ms-2 text-none"
                      @click="signupDialog = false"
                    >
                      Se connecter
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </div>

      </VDialog>
      
      </div>

    </template>
  </CustomLayout>
</template>

<style lang="scss">

</style>

