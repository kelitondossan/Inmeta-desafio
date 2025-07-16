<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
        // Primary
        'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary' && !disabled,
        // Secondary
        'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-indigo-500': variant === 'secondary' && !disabled,
        // Danger
        'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': variant === 'danger' && !disabled,
        // Link
        'border-transparent text-indigo-600 dark:text-indigo-400 bg-transparent hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-800': variant === 'link' && !disabled,
      }
    ]"
    v-bind="$attrs"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'link'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    loading: false
  }
)
</script> 