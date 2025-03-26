<script lang="ts">
import { ref } from 'vue'
import { AdminPortal, useFrontegg, useFronteggAuthGuard } from '@frontegg/vue'
import getInitials from '../utils/getInitials'
import TenantInfo from '../components/TenantInfo.vue'

export default {
  components: {
    TenantInfo,
  },
  setup() {
    const { authState } = useFrontegg()

    useFronteggAuthGuard()
    
    const showInitials = ref(false)

    const openAdminBox = () => {
      window.location.href = '#/admin-box'
      AdminPortal.show()
    }

    const handleImageError = (e: Event) => {
      const target = e.target as HTMLImageElement
      showInitials.value = true
      target.style.display = 'none'
    }

    return {
      authState,
      openAdminBox,
      showInitials,
      handleImageError,
      getInitials,
    }
  },
}
</script>

<template>
  <section class="section-screen">
    <div class="section-card account-card">
      <div class="title-wrapper">
        <h1 class="title">Hello, {{ authState?.user?.name }}!</h1>
        <button class="primary-button fit-content" @click="openAdminBox">
          Self-service portal
        </button>
      </div>
      <div class="tenants-wrapper">
        <div class="tenant-card">
          <div class="tenant-title">
            <div class="tenant-logo">
              <img
                v-if="authState?.user?.profilePictureUrl && !showInitials"
                :src="authState.user.profilePictureUrl"
                alt="Welcome"
                width="24"
                height="24"
                @error="handleImageError"
              />
              <div v-else class="initials">{{ getInitials(authState?.user?.name || '') }}</div>
            </div>
            <p class="tenant-name">{{ authState?.user?.name }}</p>
          </div>
          <div class="tenant-info">
            <div class="tenant-info-item">
              <p class="tenant-info-item-title">Name</p>
              <p class="tenant-info-item-value">{{ authState?.user?.name }}</p>
            </div>
            <div class="tenant-info-item">
              <p class="tenant-info-item-title">Email</p>
              <p class="tenant-info-item-value">{{ authState?.user?.email }}</p>
            </div>
            <div class="tenant-info-item">
              <p class="tenant-info-item-title">Roles</p>
              <p class="tenant-info-item-value">
                {{ authState?.user?.roles?.map((x) => x.name).join(', ') }}
              </p>
            </div>
          </div>
          <button class="secondary-button edit-button" @click="openAdminBox">Edit user</button>
        </div>
        <TenantInfo />
      </div>
    </div>
  </section>
</template>

<style scoped>
.account-card {
  width: 720px;
  display: flex;
  gap: 40px;
  flex-direction: column;
}

.account-card .title-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.account-card .title-wrapper .title {
  font-size: 26px;
  font-weight: 600;
  color: var(--grey-900);
}

.tenants-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .tenants-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

</style>
