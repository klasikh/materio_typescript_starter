<script setup>
    import logoDGI from "@/assets/images/pages/logo2.png"
    import UserProfile from '@/layouts/components/UserProfile.vue'

    import footerImg from "@/assets/images/pages/footer_img.png"
    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    import { mapGetters, mapState, useStore } from 'vuex';
    import validator from 'validator';

    // GLOBAL CONST
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const user = computed(() => store.state.auth.authData)

    const menu = [
        { icon: 'mdi-cash', title: 'Payer ma TFU' },
        { icon: 'mdi-download', title: 'Télécharger la quittance TFU' },
    ]

    const user_token = localStorage.getItem('access_token')

</script>

<template>
  
  <div style="background-color: rgb(209, 200, 196)">

    <v-toolbar elevation-0 class="pt-3 pb-3" style="background-color: white">
      <v-toolbar-title>
        <router-link to="/" style="cursor: pointer; margin-left: 150px">
              <img :src="logoDGI" style="width: 190px; margin-top: 14px;" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" style="margin-right: 150px">
        <v-btn
          flat
          class="text-none"
          v-for="item in menu"
          :key="item.icon"
          :to="item.link"
        >
          <v-icon>{{ item.icon }}</v-icon> &nbsp;
          {{ item.title }}
        </v-btn>
              
        <UserProfile v-if="user && user_token" />

      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-btn
            flat
            class="text-none"
            v-for="item in menu"
            :key="item.icon"
            :to="item.link"
          >
            <v-icon>{{ item.icon }}</v-icon> &nbsp;
            {{ item.title }}
          </v-btn>
        </v-list>
      </v-menu>
    </v-toolbar>

    <div class="">
        <slot name="MainContent">
        </slot>
    </div>
    
      <!-- bg img -->
      <VImg
        class="auth-footer-mask d-md-block"
        :src="footerImg"
        style="position: fixed; z-index: 999"
      />
    </div>
</template>

<style lang="scss">
  @use "@core/scss/pages/page-auth.scss";

</style>
