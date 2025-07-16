<template>
  <div :class="{ 'dark': isDark }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
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