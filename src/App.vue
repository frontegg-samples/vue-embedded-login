<script lang="ts">
import { useFrontegg, useFronteggAuthGuard } from '@frontegg/vue'
import AppHeader from './components/AppHeader.vue'
import SignupBanner from './components/SignupBanner.vue'
export default {
  components: {
    AppHeader,
    SignupBanner,
  },
  setup() {
    const { fronteggLoaded } = useFrontegg()

    // Uncomment to skip welcome page and redirect to login or app if authenticated
    // useFronteggAuthGuard()

    return {
      fronteggLoaded,
    }
  },
}
</script>

<template>
  <section v-if="fronteggLoaded">
    <AppHeader />
    <router-view></router-view>
    <SignupBanner />
  </section>
</template>
