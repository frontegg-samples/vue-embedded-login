<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { AdminPortal } from '@frontegg/vue'
import getInitials from '../utils/getInitials'
import TenantsDropdown from './TenantsDropdown.vue'
import { useAuthState, mapAuthActions } from '@frontegg/vue'
import { ref, watch } from 'vue'
import CopyToClipboardButton from './CopyToClipboardButton.vue'

export default {
  components: {
    TenantsDropdown,
    CopyToClipboardButton,
  },
  setup() {
    const { tenantsState } = useAuthState()

    const activeTenant = ref(tenantsState.activeTenant)
    const membersCount = ref(0)
    const isLoadingMembers = ref(true)

    const openAccountSettings = () => {
      window.location.href = '#/admin-box/account'
      AdminPortal.show()
    }

    const handleSwitchTenant = (tenant: any) => {
      mapAuthActions('switchTenant')({
        tenantId: tenant.tenantId,
        callback: (res: any) => {
          if (res) {
            activeTenant.value = tenant
          }
        },
      })
    }

    watch(
      activeTenant,
      () => {
        isLoadingMembers.value = true
        if (!activeTenant.value) {
          isLoadingMembers.value = false
          return
        }
        mapAuthActions('loadUsers')({
          pageOffset: 0,
          pageSize: 100,
          callback: (res) => {
            membersCount.value = res?.length || 0
            isLoadingMembers.value = false
          },
        })
      },
      { immediate: true },
    )

    return {
      tenantsState,
      activeTenant,
      membersCount,
      isLoadingMembers,
      openAccountSettings,
      handleSwitchTenant,
      getInitials,
    }
  },
}
</script>

<template>
  <div v-if="activeTenant" class="tenant-card">
    <div class="tenant-title-wrapper">
      <div class="tenant-title">
        <div class="tenant-logo">
          <div class="initials">
            {{ getInitials(activeTenant.name) }}
          </div>
        </div>
        <p class="tenant-name">{{ activeTenant.name }}</p>
      </div>
      <TenantsDropdown
        :items="tenantsState.tenants"
        :selected="activeTenant"
        @select="handleSwitchTenant"
      />
    </div>
    <div class="tenant-info">
      <div class="tenant-info-item">
        <p class="tenant-info-item-title">ID</p>
        <div class="tenant-info-copy-wrapper">
          <p class="tenant-info-item-value ellipsis">
            {{ activeTenant.id }}
          </p>
          <CopyToClipboardButton :text="activeTenant.id" />
        </div>
      </div>

      <div class="tenant-info-item">
        <p class="tenant-info-item-title">Members</p>
        <p class="tenant-info-item-value">{{ isLoadingMembers ? 'Loading...' : membersCount }}</p>
      </div>

      <div class="tenant-info-item">
        <p class="tenant-info-item-title">Creator</p>
        <p class="tenant-info-item-value">
          {{ (activeTenant as any).creatorEmail || 'system' }}
        </p>
      </div>
    </div>
    <button class="secondary-button edit-button" @click="openAccountSettings">Edit account</button>
  </div>
</template>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
