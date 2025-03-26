<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { ref, onMounted } from 'vue'
import { ContextHolder } from '@frontegg/vue'

const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: 'https://sandbox.frontegg.com',
  clientId: '9af126b9-c35f-4e2d-a3f1-c261e22aaf4a',
  appId: 'xxxx',
} as const

export default {
  setup() {
    const isDefaultCredentials = ref(false)

    onMounted(() => {
      const context = ContextHolder.for(undefined as any).getContext()
      const baseUrl = context.baseUrl
      const clientId = context.clientId

      isDefaultCredentials.value =
        clientId === DEFAULT_SANDBOX_CONTEXT.clientId && baseUrl === DEFAULT_SANDBOX_CONTEXT.baseUrl
    })

    return {
      isDefaultCredentials,
    }
  },
}
</script>

<template>
  <div :class="['signup-banner', { show: isDefaultCredentials }]">
    <div class="container signup-banner-wrapper">
      <p class="signup-banner-text">
        This sample uses Frontegg's default credentials. Sign up to use your own configurations.
        <a href="https://portal.frontegg.com/signup" target="_blank" rel="noreferrer"> Sign up </a>
      </p>
      <div class="reference-links">
        <a
          href="https://developers.frontegg.com/"
          target="_blank"
          rel="noreferrer"
          class="visit-doc"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="#373739"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6667 10.6667H1.33333V1.33333H6V0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V6H10.6667V10.6667ZM7.33333 0V1.33333H9.72667L3.17333 7.88667L4.11333 8.82667L10.6667 2.27333V4.66667H12V0H7.33333Z"
              />
            </svg>
          Visit Docs
        </a>
        <div class="third-party-links">
          <a href="https://github.com/frontegg" target="_blank" rel="noreferrer" class="icon-link">
            <img src="/icons/github.svg" alt="github" />
          </a>
          <a
            href="https://join.slack.com/t/frontegg-community/shared_invite/zt-e1oxi1vn-SZErBZcwHcbgj4vrwRIp5A"
            target="_blank"
            rel="noreferrer"
            class="icon-link"
          >
            <img src="/icons/slack.svg" alt="slack" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-banner {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 32px 0;
  box-shadow: 0px 1px 4px 0px #7a7c813d;
  background-color: var(--classic-white);
  display: none;
}
.signup-banner.show {
  display: block;
}

.signup-banner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.signup-banner-text {
  width: fit-content;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 100%;
  font-weight: 600;
  color: var(--classic-grey-800);
  background-color: var(--classic-light-info);
}
.signup-banner-text a {
  color: var(--classic-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;
}
.signup-banner-text a:hover,
.signup-banner-text a:active {
  color: var(--classic-darker-primary);
}

.reference-links {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
}

.third-party-links {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.visit-doc {
  color: var(--classic-grey-800);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;
  display: flex;
  gap: 8px;
  align-items: center;
}

.visit-doc svg {
  transition: all 0.3s ease;
}

.visit-doc:hover,
.visit-doc:active,
.visit-doc:hover svg,
.visit-doc:active svg {
  fill: var(--classic-primary);
  color: var(--classic-primary);
}

.icon-link {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25%;
  background-color: transparent;
  transition: background-color 0.3s ease;
}
.icon-link:hover {
  background-color: var(--classic-grey-100);
}
</style>
