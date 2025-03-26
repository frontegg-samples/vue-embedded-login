<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import getInitials from '../utils/getInitials'

interface Tenant {
  id: string
  name: string
  tenantId: string
}

export default {
  props: {
    items: {
      type: Array as () => Tenant[],
      required: true,
    },
    selected: {
      type: Object as () => Tenant,
      required: true,
    },
  },
  setup(_, { emit }) {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLDivElement | null>(null)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    const handleSelect = (item: Tenant) => {
      emit('select', item)
      isOpen.value = false
    }

    return {
      isOpen,
      dropdownRef,
      handleSelect,
      getInitials
    }
  },
}
</script>

<template>
  <div ref="dropdownRef">
    <button class="dropdown-button" @click="isOpen = !isOpen">
      <img src="/icons/unfold-more.svg" alt="Other tenants" />
    </button>
    <div :class="['dropdown-menu', { show: isOpen }]">
      <button
        v-for="item in items"
        :key="item.id"
        :class="['dropdown-item', { active: selected?.id === item.id }]"
        @click="handleSelect(item)"
      >
        <div class="dropdown-item-content">
          <div class="initials">{{ getInitials(item.name) }}</div>
          {{ item.name }}
        </div>

        <img v-if="selected?.id === item.id" src="/icons/checkmark.svg" alt="Selected tenant" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  display: none;
  z-index: 1000;
  width: 100%;
  box-shadow: 0px 4px 24px 0px #2f334b14;
  border-radius: 8px;
  background-color: var(--classic-white);
  padding: 4px 0;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  width: 100%;
  border: none;
  background-color: transparent;
}

.dropdown-item-content {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: var(--classic-grey-900);
}

.dropdown-item:hover {
  background: var(--classic-grey-100);
}

.dropdown-item.active {
  color: var(--classic-primary);
}
</style>
