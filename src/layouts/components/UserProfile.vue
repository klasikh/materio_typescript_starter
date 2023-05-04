<script setup lang="ts">
  import type { Anchor } from 'vuetify/lib/components'
  import avatar1 from '@/assets/images/avatars/avatar-1.png'
  import { computed, onMounted, reactive, ref, watch } from "vue";
  import { useRouter, useRoute } from 'vue-router'
  import { mapGetters, mapState, useStore } from 'vuex';
  import validator from 'validator';

  // GLOBAL CONST
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const user = computed(() => store.state.auth.authData)
  const actionLogout = () => store.dispatch('auth/logoutUser')

  const avatarBadgeProps = {
    dot: true,
    location: 'bottom right' as Anchor,
    offsetX: 3,
    offsetY: 3,
    color: 'success',
    bordered: true,
  }

  async function logout() {
    await actionLogout()
  }

</script>
 
<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      style="cursor: pointer;"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar
                    color="primary"
                    size="40"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              Admin
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />


          <!-- 👉 Logout -->
          <VListItem @click="logout" class="cursor-pointer">
            <template #prepend>
              <VIcon
                class="me-2 text-error"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle class="text-error">Se déconnecter</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
