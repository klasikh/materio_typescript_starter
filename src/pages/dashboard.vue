<script setup>
  import CustomLayout from '@/layouts/components/CustomLayout.vue'

  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter, useRoute } from 'vue-router'
  import { mapGetters, mapState, useStore } from 'vuex';
  import validator from 'validator';

  // GLOBAL CONST
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const user = computed(() => store.state.auth.authData)
  // console.log(user.value)
  function beginPayment() {
    router.push({ name: "beginPayment" })
  }
</script>

<template>
  <CustomLayout>
    <template v-slot:MainContent>
      <div class="auth-wrapper d-flex align-center justify-center pa-4 mb-8" style="margin-top: -120px;">
        <div class="text-center justify-content-center align-center" style="margin-top: 10%; margin-left: 20%; margin-right: 20%;">
          <v-icon size="200">mdi-cash-multiple</v-icon>
          <h2 class="text-none mb-4" style="color: #06a997;">Bienvenue NUMERO_IFU</h2>
          <p class="text-center mb-5" style=" margin-left: 10%; margin-right: 10%">
            Payez facilement et sans vous déplacer vers un centre des impôts, vos impôts fonciers.
          </p>
          <div class="d-flex text-center justify-center align-center mx-auto">
            <VBtn
                class="btn-secondary text-none me-5"
                style="background-color: #fff; color: gray"
              >
                A propos
              </VBtn>
              <VBtn
                class="primary ms-5 text-none"
                @click="beginPayment"
              >
                Commencer
              </VBtn>
          </div>
        </div>
        
      </div>
    
    </template>
  </CustomLayout>
</template>

<style lang="scss">

</style>

