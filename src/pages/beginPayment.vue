<template>
  <div class="mt-5">
    <Suspense>
      <BeginPaymentComponent></BeginPaymentComponent>
      <!-- loading state -->
      <template #fallback>
        <!-- <div :loading="loading" class="auth-wrapper d-flex align-center justify-center pa-4" style="margin-top: -120px;">
          <span class="custom-loader text-white" color="#fff"> -->
            <VIcon light>cached</VIcon>
          <!-- </span> -->
        <!-- Chargement... -->
        <!-- </div> -->
      </template>
    </Suspense>
  </div>
</template>
<script setup lang="ts">
  import BeginPaymentComponent from "@/pages/Components/BeginPaymentComponent.vue"
  const loading = ref(true)
</script>
<script lang="scss">
  
</script>