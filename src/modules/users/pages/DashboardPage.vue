<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-300">
    <!-- Header com efeito de vidro -->
    <header class="sticky top-0 z-30 bg-white/10 backdrop-blur-lg border-b border-white/10">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meu Dashboard
            </h1>
            <p class="mt-1 text-sm text-gray-400">Gerencie suas cartas e trocas</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-300">
              Bem-vindo, {{ authStore.user?.name }}
            </span>
            <BaseButton
              variant="secondary"
              class="hover:bg-red-600 hover:text-white transition-colors duration-300"
              @click="authStore.logout(); router.push('/login')"
            >
              Sair
            </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <main class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Cards de Estatísticas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-indigo-500/20 rounded-lg">
                <svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-300">Total de Cartas</h3>
                <p class="text-2xl font-bold text-white">{{ cardStore.userCards.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-purple-500/20 rounded-lg">
                <svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-300">Trocas Ativas</h3>
                <p class="text-2xl font-bold text-white">{{ tradeStore.trades.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-pink-500/20 rounded-lg">
                <svg class="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-300">Trocas Pendentes</h3>
                <p class="text-2xl font-bold text-white">{{ tradeStore.trades.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center">
              <div class="p-3 bg-green-500/20 rounded-lg">
                <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-300">Trocas Concluídas</h3>
                <p class="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Seções Principais -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Minhas Cartas -->
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-white flex items-center">
                <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Minhas Cartas
              </h2>
              <BaseButton
                variant="primary"
                size="sm"
                class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                @click="router.push('/')"
              >
                Adicionar Cartas
              </BaseButton>
            </div>
            
            <div v-if="cardStore.loading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>

            <div v-else-if="cardStore.userCards.length === 0" class="text-center py-8">
              <div class="bg-white/5 rounded-lg p-6">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p class="mt-4 text-gray-400">Você ainda não tem cartas.</p>
                <BaseButton
                  variant="link"
                  class="mt-2 text-indigo-400 hover:text-indigo-300"
                  @click="router.push('/')"
                >
                  Explorar cartas disponíveis
                </BaseButton>
              </div>
            </div>

            <div v-else class="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="card in cardStore.userCards"
                  :key="card.id"
                  class="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105 border border-white/10"
                  @click="showCardDetails(card)"
                >
                  <div class="relative aspect-[3/4] overflow-hidden">
                    <img 
                      :src="card.imageUrl" 
                      :alt="card.name" 
                      class="w-full h-full object-contain" 
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p class="text-white text-sm line-clamp-3">{{ card.description }}</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">{{ card.name }}</h3>
                    <div class="flex justify-end mt-2">
                      <BaseButton
                        variant="danger"
                        size="sm"
                        class="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
                        @click.stop="handleDeleteCard(card.id)"
                      >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Minhas Trocas -->
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-white flex items-center">
                <svg class="w-6 h-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Minhas Trocas
              </h2>
              <BaseButton
                variant="primary"
                size="sm"
                class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                @click="router.push('/')"
              >
                Nova Troca
              </BaseButton>
            </div>

            <div v-if="tradeStore.loading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>

            <div v-else-if="tradeStore.trades.length === 0" class="text-center py-8">
              <div class="bg-white/5 rounded-lg p-6">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <p class="mt-4 text-gray-400">Você ainda não tem trocas.</p>
                <BaseButton
                  variant="link"
                  class="mt-2 text-purple-400 hover:text-purple-300"
                  @click="router.push('/')"
                >
                  Explorar cartas para trocar
                </BaseButton>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="trade in tradeStore.trades"
                :key="trade.id"
                class="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102 border border-white/5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <img 
                        :src="trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.imageUrl" 
                        :alt="trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.name"
                        class="w-16 h-16 object-cover rounded-lg" 
                      />
                      <div class="absolute inset-0 ring-2 ring-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-white group-hover:text-purple-400 transition-colors">
                        {{ trade.tradeCards.find(tc => tc.type === 'OFFERING')?.card.name }}
                      </span>
                      <svg class="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span class="text-white group-hover:text-purple-400 transition-colors">
                        {{ trade.tradeCards.find(tc => tc.type === 'RECEIVING')?.card.name }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                      Pendente
                    </span>
                    <BaseButton
                      variant="danger"
                      size="sm"
                      class="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
                      @click="handleDeleteTrade(trade.id)"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Card Details Modal -->
    <CardDetailsModal
      v-model="showDetailsModal"
      :card="selectedCard"
      :show-trade-button="false"
      :show-add-button="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import { useTradeStore } from '@/modules/trades/stores/useTradeStore'
import BaseButton from '@/shared/components/BaseButton.vue'
import CardDetailsModal from '@/modules/cards/components/CardDetailsModal.vue'
import type { Card } from '@/modules/auth/types'
import { useToast } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const cardStore = useCardStore()
const tradeStore = useTradeStore()
const toast = useToast()

const showDetailsModal = ref(false)
const selectedCard = ref<Card | null>(null)

const showCardDetails = (card: Card) => {
  selectedCard.value = card
  showDetailsModal.value = true
}

const handleDeleteTrade = async (tradeId: string) => {
  try {
    await tradeStore.deleteTrade(tradeId)
    toast.success('Troca cancelada com sucesso! 🗑️', {
      timeout: 3000,
      position: 'top-right' as POSITION,
      icon: '✅'
    })
  } catch (error) {
    console.error('Failed to delete trade:', error)
    toast.error('Não foi possível cancelar a troca. Tente novamente.', {
      timeout: 4000,
      position: 'top-right' as POSITION,
      icon: '❌'
    })
  }
}

const handleDeleteCard = async (cardId: string) => {
  try {
    await cardStore.deleteCard(cardId)
    toast.success('Carta removida com sucesso! 🗑️', {
      timeout: 3000,
      position: 'top-right' as POSITION,
      icon: '✅'
    })
  } catch (error) {
    console.error('Failed to delete card:', error)
    toast.error('Não foi possível remover a carta. Tente novamente.', {
      timeout: 4000,
      position: 'top-right' as POSITION,
      icon: '❌'
    })
  }
}

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

<style scoped>
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
  border: 2px solid transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(139, 92, 246, 0.7);
}
</style> 