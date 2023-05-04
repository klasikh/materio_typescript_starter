<script setup>
  import CustomLayout from '@/layouts/components/CustomLayout.vue'

  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter, useRoute } from 'vue-router'
  import { mapGetters, mapState, useStore } from 'vuex';
  import validator from 'validator';
  // import { mapState, mapGetters, mapMutations, mapActions } from '@/store/map-state'
  import { AXIOS_VALID_ACCOUNT } from "@/queries/axios-queries";

  // GLOBAL CONST
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const user = computed(() => store.state.auth.authData)
  
  const error = computed(() => store.state.auth.error)
  const loading = computed(() => store.state.auth.loading)
  const accountValidation = (validCode) => store.dispatch('auth/validCode', validCode)
  const loginStatus = computed(() => store.getters['auth/getLoginStatus'])

  // DATA
  const validCode = ref('')
  const isFormValid = ref(true)
  const validCodeRules = ref([
    code => !!code || 'Veuillez renseigner le code SVP.',
  ])
  
  const validatedCode = async () => {
    const graphqlQuery = {
      "query": AXIOS_VALID_ACCOUNT,
      "variables" : {
        userId: user._id,
        code: validCode.value,
        isActivated: true,
      }
    };
    if(isFormValid) {
      await accountValidation(graphqlQuery);
      if(loginStatus.value === 'success'){
        router.push({ name: "dashboard" });
      }else{
        // alert('failed to login')
      }
    }
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
          Veuillez valider votre compte en renseignant le code de confirmation que vous venez de recevoir par SMS.
        </p>
        <div class="d-flex text-center justify-center align-center mx-auto">
          <VForm v-model="isFormValid" lazy-validation @submit.prevent="validatedCode">
            <VRow>
              <!-- ifunumber -->
              <VCol cols="12">
                <VTextField
                  v-model="validCode"
                  label="Renseigne le code ici"
                  type="number"
                  :rules="validCodeRules"
                  required
                />
              </VCol>
              <!-- submit button -->
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
                Valider
              </VBtn>

            </VRow>
          </VForm>
        </div>
      </div>
    </div>
    
    </template>
  </CustomLayout>
</template>

<style lang="scss">

</style>

