<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { useFrontegg } from '@frontegg/vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { authState } = useFrontegg()
    const router = useRouter();

    const logout = () => {
      router.push("/account/logout");
    }

    return {
      logout,
      authState,
    }
  },
}
</script>

<template>
  <header class="header">
    <div class="container header-wrapper">
      <div class="logo-wrapper">
        <a href="https://frontegg.com/" target="_blank" rel="noreferrer">
          <img src="/logo.svg" width="170" height="32" alt="frontegg" />
        </a>
        <div class="vue-logo">
          <img src="/vue.png" width="25" height="25" alt="Vue" />
        </div>
      </div>
      <button v-if="authState.isAuthenticated" class="secondary-button" @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: 40px 0;
  box-shadow: 0px 1px 4px 0px #7a7c813d;
  background-color: var(--classic-white);
}

.header-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
}

.vue-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
