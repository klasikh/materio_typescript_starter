<script setup>
  import CustomLayout from '@/layouts/components/CustomLayout.vue'

  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter, useRoute } from 'vue-router'
  import { mapGetters, mapState, useStore } from 'vuex';
  import validator from 'validator';
  // import { mapState, mapGetters, mapMutations, mapActions } from '@/store/map-state'
  import { AXIOS_GET_USER_CONF } from "@/queries/axios-queries";
  // import bcrypt from 'bcryptjs';
  
  // GLOBAL CONST
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const user = computed(() => store.state.auth.authData)
  
  // COMPUTED
  const error = computed(() => store.state.auth.error)
  const loading = computed(() => store.state.auth.loading)
  const accountValidation = (validCode) => store.dispatch('auth/validCode', validCode)
  const loginStatus = computed(() => store.getters['auth/getLoginStatus'])
  
  // DATA
  let pass = ref('')

  // FUNCTIONS
  const getUserInfos = async () => {
      const userInfos = await axios.post(
                          process.env.BACK_END_URI,
                          {
                            "query": AXIOS_GET_USER_CONF,
                          },
                          { headers: { 'Content-Type': 'application/json' } }
                      )
      return userInfos.data.data.getUser
  }

  let theUser = ref(await getUserInfos())

  function goToDashboard() {
    router.push({ name: 'dashboard' })
  }

</script>

<template>
  <CustomLayout>
    <template v-slot:MainContent>

      <div class="auth-wrapper d-flex align-center justify-center pa-4" style="margin-top: -120px;">
        <div class="text-center justify-content-center align-center" style="margin-top: 10%; margin-left: 20%; margin-right: 20%;">
          <!-- <v-icon size="200">mdi-cash-multiple</v-icon>
          <h2 class="text-none mb-4" style="color: #06a997;">Bienvenue NUMERO_IFU</h2> -->
          <p class="text-center mb-5 text-xl" style=" margin-left: 10%; margin-right: 10%">
            Bravo, votre compte a été créé avec succès. Votre nom d'utilisateur est votre numéro IFU (<b>{{ theUser.crackload }}</b>). Votre mot de passe est <b>{{ theUser.load }}</b> Cliquez sur le bouton <strong>Se connecter</strong> pour commencer le paiement de votre imp$ot foncier.Veuillez conserver vos informations précieusement et ne les partager avec personne. 
          </p>
          <div class="d-flex text-center justify-center align-center mx-auto">
            <VBtn
              text
              class="text-white"
              @click="goToDashboard"
            >
              Se connecter
            </VBtn>
          </div>
        </div>
      </div>

    </template>
  </CustomLayout>
</template>

<style lang="scss">

</style>

