<template>
  <LoadingOverlay :show="loadingStore.isLoading" />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import LoadingOverlay from '@/shared/components/LoadingOverlay.vue'
import { useLoadingStore } from '@/shared/stores/useLoadingStore'

const loadingStore = useLoadingStore()
</script>

<style>
/* Global component styles can be added here */
html.dark {
  color-scheme: dark;
}

#app {
  min-height: 100vh;
}
</style> 