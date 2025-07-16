<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Marketplace de Cartas</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Encontre e troque suas cartas favoritas</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                v-if="isDark"
                class="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            <template v-if="authStore.isAuthenticated">
              <router-link
                to="/dashboard"
                class="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Minhas Cartas
              </router-link>
              <BaseButton
                variant="primary"
                @click="router.push('/dashboard')"
              >
                Meu Dashboard
              </BaseButton>
            </template>
            <template v-else>
              <BaseButton
                variant="primary"
                @click="router.push('/login')"
              >
                Entrar
              </BaseButton>
              <BaseButton
                variant="secondary"
                @click="router.push('/register')"
              >
                Criar Conta
              </BaseButton>
            </template>
          </div>
        </div>
      </div>
    </header>

    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="availableCards.length === 0" class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">Nenhuma carta disponível para troca no momento.</p>
          <BaseButton
            variant="link"
            class="mt-2"
            @click="fetchCards"
          >
            Atualizar lista
          </BaseButton>
        </div>

        <!-- Cards Grid -->
        <div v-else class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="(card, index) in availableCards"
              :key="card.id"
              class="group bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer"
              :style="{ animationDelay: `${index * 100}ms` }"
              @click="showCardDetails(card)"
            >
              <div class="relative">
                <img 
                  :src="card.imageUrl" 
                  :alt="card.name" 
                  class="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105" 
                />
                <div 
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                >
                  <p class="text-white text-sm line-clamp-3">{{ card.description }}</p>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ card.name }}</h3>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div v-if="cardStore.hasMore" class="mt-8 flex justify-center">
            <BaseButton
              variant="secondary"
              :loading="cardStore.loadingMore"
              :disabled="cardStore.loadingMore"
              @click="loadMore"
              class="group relative transform transition-all duration-300 hover:scale-105"
            >
              <span :class="{ 'opacity-0': cardStore.loadingMore }">
                Carregar Mais
              </span>
              <div
                v-if="cardStore.loadingMore"
                class="absolute inset-0 flex items-center justify-center"
              >
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
              </div>
            </BaseButton>
          </div>
        </div>
      </div>
    </main>

    <!-- Card Details Modal -->
    <CardDetailsModal
      v-model="showDetailsModal"
      :card="selectedCard"
      :show-trade-button="authStore.isAuthenticated && !userOwnsSelectedCard"
      :show-add-button="authStore.isAuthenticated && !userOwnsSelectedCard"
      @trade="handleTradeClick(selectedCard)"
      @card-added="handleCardAdded"
    />

    <!-- Trade Modal -->
    <BaseModal
      v-if="showTradeModal"
      :model-value="showTradeModal"
      @update:model-value="(value) => showTradeModal = value"
      title="Propor Nova Troca"
    >
      <div class="space-y-4 dark:bg-gray-800">
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Carta Desejada</h4>
          <div v-if="selectedCard" class="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <img :src="selectedCard.imageUrl" :alt="selectedCard.name" class="w-12 h-12 object-cover rounded" />
            <div>
              <p class="text-sm font-medium dark:text-white">{{ selectedCard.name }}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Selecione sua carta para troca</h4>
          <div v-if="loading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
          </div>
          <div v-else-if="userCards.length === 0" class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Você ainda não tem cartas para trocar.</p>
            <BaseButton
              variant="link"
              class="mt-2"
              @click="closeTradeModal(); showDetailsModal = false"
            >
              Adicionar Cartas Primeiro
            </BaseButton>
          </div>
          <div v-else class="space-y-2 max-h-60 overflow-y-auto">
            <div
              v-for="card in userCards"
              :key="card.id"
              class="flex items-center justify-between space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              @click="selectUserCard(card)"
            >
              <div class="flex items-center space-x-2">
                <img :src="card.imageUrl" :alt="card.name" class="w-12 h-12 object-cover rounded" />
                <div>
                  <p class="text-sm font-medium dark:text-white">{{ card.name }}</p>
                </div>
              </div>
              <input
                type="radio"
                :checked="selectedUserCard?.id === card.id"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <BaseButton
            variant="secondary"
            @click="closeTradeModal"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            variant="primary"
            :disabled="!canProposeTrade"
            :loading="proposingTrade"
            @click="proposeTrade"
          >
            Propor Troca
          </BaseButton>
        </div>
      </div>
    </BaseModal>

    <!-- Login Prompt Modal -->
    <BaseModal
      v-if="showLoginPrompt"
      :model-value="showLoginPrompt"
      @update:model-value="(value) => showLoginPrompt = value"
      title="Faça login para continuar"
    >
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Para propor trocas de cartas, você precisa estar logado.
        </p>
        <div class="flex justify-end space-x-2">
          <BaseButton
            variant="secondary"
            @click="closeLoginPrompt"
          >
            Depois
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="goToLogin"
          >
            Fazer Login
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import { useTradeStore } from '@/modules/trades/stores/useTradeStore'
import { useTheme } from '@/composables/useTheme'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import CardDetailsModal from '@/modules/cards/components/CardDetailsModal.vue'
import type { Card } from '@/modules/auth/types'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const cardStore = useCardStore()
const tradeStore = useTradeStore()
const { isDark, toggleTheme } = useTheme()

const loading = ref(false)
const loadingMore = ref(false)
const showTradeModal = ref(false)
const showLoginPrompt = ref(false)
const showDetailsModal = ref(false)
const selectedCard = ref<Card | null>(null)
const selectedUserCard = ref<Card | null>(null)
const proposingTrade = ref(false)

const availableCards = computed(() => cardStore.cards)
const userCards = computed(() => cardStore.userCards)

const userOwnsSelectedCard = computed(() => {
  if (!selectedCard.value) return false
  return cardStore.userCards.some(card => card.id === selectedCard.value?.id)
})

const canProposeTrade = computed(() => {
  return selectedCard.value && selectedUserCard.value
})

const loadUserData = async () => {
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
}

const fetchCards = async () => {
  try {
    loading.value = true
    await cardStore.fetchCards()
    await loadUserData()
  } catch (error) {
    console.error('Failed to fetch cards:', error)
  } finally {
    loading.value = false
  }
}

// Watch for authentication state changes
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    loadUserData()
  } else {
    // Limpa os dados do usuário quando deslogado
    cardStore.$reset()
    tradeStore.$reset()
  }
})

const loadMore = async () => {
  if (loadingMore.value) return
  
  try {
    loadingMore.value = true
    await cardStore.fetchCards(cardStore.currentPage + 1)
  } catch (error) {
    console.error('Failed to load more cards:', error)
  } finally {
    loadingMore.value = false
  }
}

const handleTradeClick = (card: Card | null) => {
  if (!card || !authStore.isAuthenticated) {
    showLoginPrompt.value = true
    return
  }
  
  // Verifica se o usuário já tem a carta
  if (userOwnsSelectedCard.value) {
    // TODO: Mostrar mensagem de erro ou feedback
    return
  }
  
  selectCardForTrade(card)
}

const closeLoginPrompt = () => {
  showLoginPrompt.value = false
}

const goToLogin = () => {
  router.push({ 
    name: 'login',
    query: { redirect: router.currentRoute.value.fullPath }
  })
}

const closeTradeModal = () => {
  showTradeModal.value = false
  selectedCard.value = null
  selectedUserCard.value = null
}

const selectCardForTrade = (card: Card) => {
  selectedCard.value = card
  showTradeModal.value = true
}

const selectUserCard = (card: Card) => {
  selectedUserCard.value = card
}

const proposeTrade = async () => {
  if (!selectedCard.value || !selectedUserCard.value) return

  try {
    proposingTrade.value = true
    await tradeStore.createTrade({
      receivingCardId: selectedCard.value.id,
      offeringCardId: selectedUserCard.value.id
    })
    toast.success('Troca proposta com sucesso! 🤝', {
      timeout: 3000,
      position: 'top-right' as POSITION,
      icon: '🔄'
    })
    closeTradeModal()
  } catch (error) {
    console.error('Failed to propose trade:', error)
    toast.error('Não foi possível propor a troca. Tente novamente.', {
      timeout: 4000,
      position: 'top-right' as POSITION,
      icon: '❌'
    })
  } finally {
    proposingTrade.value = false
  }
}

const showCardDetails = (card: Card) => {
  selectedCard.value = card
  showDetailsModal.value = true
}

const handleCardAdded = async () => {
  // Recarrega as cartas do usuário após adicionar uma nova
  if (authStore.isAuthenticated) {
    await cardStore.fetchUserCards()
  }
}

onMounted(async () => {
  // Verifica se o token existe e recarrega os dados do usuário
  if (localStorage.getItem('token')) {
    try {
      await authStore.fetchMe()
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      // Se falhar ao carregar dados do usuário, faz logout
      authStore.logout()
    }
  }
  fetchCards()
})
</script> 