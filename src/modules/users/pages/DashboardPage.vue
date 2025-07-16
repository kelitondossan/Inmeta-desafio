<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Meu Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Gerencie suas cartas e trocas</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 dark:text-gray-300">
              Bem-vindo, {{ authStore.user?.name }}
            </span>
            <BaseButton
              variant="secondary"
              @click="authStore.logout(); router.push('/login')"
            >
              Sair
            </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Minhas Cartas -->
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">Minhas Cartas</h2>
              <BaseButton
                variant="primary"
                size="sm"
                @click="router.push('/')"
              >
                Adicionar Cartas
              </BaseButton>
            </div>
            
            <div v-if="cardStore.loading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
            </div>

            <div v-else-if="cardStore.userCards.length === 0" class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">Você ainda não tem cartas.</p>
              <BaseButton
                variant="link"
                class="mt-2"
                @click="router.push('/')"
              >
                Explorar cartas disponíveis
              </BaseButton>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="card in cardStore.userCards"
                :key="card.id"
                class="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
              >
                <img :src="card.imageUrl" :alt="card.name" class="w-full h-48 object-cover" />
                <div class="p-4">
                  <h3 class="font-medium text-gray-900 dark:text-white">{{ card.name }}</h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Minhas Trocas -->
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">Minhas Trocas</h2>
              <BaseButton
                variant="primary"
                size="sm"
                @click="router.push('/')"
              >
                Nova Troca
              </BaseButton>
            </div>

            <div v-if="tradeStore.loading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
            </div>

            <div v-else-if="tradeStore.trades.length === 0" class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">Você ainda não tem trocas.</p>
              <BaseButton
                variant="link"
                class="mt-2"
                @click="router.push('/')"
              >
                Explorar cartas para trocar
              </BaseButton>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="trade in tradeStore.trades"
                :key="trade.id"
                class="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img 
                      :src="trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.imageUrl" 
                      :alt="trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.name"
                      class="w-12 h-12 object-cover rounded" 
                    />
                    <div class="flex items-center space-x-2">
                      <span class="text-gray-900 dark:text-white">
                        {{ trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.name }}
                      </span>
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span class="text-gray-900 dark:text-white">
                        {{ trade.tradeCards.find(tc => tc.type === 'RECEIVING')?.card.name }}
                      </span>
                    </div>
                  </div>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  ]">
                    Pendente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import { useTradeStore } from '@/modules/trades/stores/useTradeStore'
import BaseButton from '@/shared/components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const cardStore = useCardStore()
const tradeStore = useTradeStore()

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await Promise.all([
        cardStore.fetchUserCards(),
        tradeStore.fetchTrades()
      ])
    } catch (error) {
      console.error('Failed to load user data:', error)
    }
  }
})
</script> 