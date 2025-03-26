<script lang="ts">
import { useFrontegg } from '@frontegg/vue'
import AppHeader from './components/AppHeader.vue'
import SignupBanner from './components/SignupBanner.vue'
export default {
  components: {
    AppHeader,
    SignupBanner,
  },
  setup() {
    const { fronteggLoaded } = useFrontegg()

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
