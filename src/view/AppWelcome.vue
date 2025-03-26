<script lang="ts">
import { useFrontegg } from '@frontegg/vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { authState } = useFrontegg()

    const router = useRouter()

    watch(
      () => authState.isAuthenticated,
      (isAuthenticated) => {
        if (isAuthenticated) {
          router.push('/account')
        }
      },
      { immediate: true }
    )

    const goToLogin = () => {
      router.push('/account/login')
    }

    return {
      goToLogin,
    }
  },
}
</script>

<template>
  <section class="section-screen">
    <div class="section-card welcome-card">
      <img src="/hug.png" alt="Welcome" width="56" height="56" />
      <div class="welcome-texts">
        <h1 class="welcome-title">Welcome!</h1>
        <p class="welcome-text">
          This is Frontegg's sample app that will let you experiment with our authentication flows.
        </p>
      </div>
      <button class="primary-button" @click="goToLogin">Sign in</button>
    </div>
  </section>
</template>
