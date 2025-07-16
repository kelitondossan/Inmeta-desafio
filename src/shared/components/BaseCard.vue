<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="relative">
      <img :src="imageUrl" :alt="name" class="w-full h-48 object-cover" />
      <div v-if="$slots.overlay" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <slot name="overlay" />
      </div>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900">{{ name }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
      <div class="mt-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  description: string
  imageUrl: string
}

defineProps<Props>();</script> 