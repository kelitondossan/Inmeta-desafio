<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300">
      {{ label }}
    </label>
    <div class="relative rounded-lg">
      <input
        :id="id"
        ref="input"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        :class="[
          'block w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
          'placeholder-gray-400 dark:placeholder-gray-500',
          error
            ? 'border-red-300 dark:border-red-600 text-red-900 dark:text-red-300 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
            : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400',
          'bg-white dark:bg-gray-700 backdrop-blur-sm',
          'hover:border-indigo-400 dark:hover:border-indigo-500'
        ]"
      />
      <div v-if="error" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  label?: string
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()

const id = computed(() => props.label?.toLowerCase().replace(/\s+/g, '-') || 'input')
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

input {
  font-size: 1rem;
  letter-spacing: 0.025em;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.dark input:focus {
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}
</style> 