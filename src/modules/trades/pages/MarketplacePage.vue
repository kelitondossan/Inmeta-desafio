<template>
  <div class="min-h-screen relative">
    <!-- Background Animations -->
    <UniverseBackground />
    <YugiImage />

    <!-- Content -->
    <div class="relative z-10 min-h-screen">
      <header class="sticky top-0 z-30 bg-gray-900/50 backdrop-blur-xl border-b border-white/10">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Marketplace de Cartas
              </h1>
              <p class="mt-1 text-sm text-gray-400">Encontre e troque suas cartas favoritas</p>
            </div>
            <div class="flex items-center space-x-4">
             
              <template v-if="authStore.isAuthenticated">
                <router-link
                  to="/dashboard"
                  class="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Minhas Cartas
                </router-link>
                <BaseButton
                  variant="primary"
                  class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  @click="router.push('/dashboard')"
                >
                  Meu Dashboard
                </BaseButton>
              </template>
              <template v-else>
                <BaseButton
                  variant="primary"
                  class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  @click="router.push('/login')"
                >
                  Entrar
                </BaseButton>
                <BaseButton
                  variant="secondary"
                  class="bg-white/10 hover:bg-white/20 text-white transition-colors"
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
          <!-- Cards Grid with Virtualization -->
          <div 
            v-if="availableCards.length > 0" 
            ref="parentRef"
            class="h-[calc(100vh-200px)] overflow-auto hide-scrollbar"
          >
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div
                v-for="(card, index) in availableCards"
                :key="card.id"
                class="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105 border border-white/10"
                @click="showCardDetails(card)"
              >
                <div class="relative aspect-[3/4] overflow-hidden">
                  <img 
                    :src="card.imageUrl" 
                    :alt="card.name"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p class="text-white text-sm line-clamp-3">{{ card.description }}</p>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {{ card.name }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- Infinite Scroll Trigger -->
            <div 
              ref="loadMoreTrigger"
              class="h-10 w-full"
              v-if="cardStore.hasMore"
            >
              <div v-if="cardStore.loadingMore" class="flex justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!cardStore.loading && availableCards.length === 0" class="text-center py-8">
            <div class="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-lg mx-auto">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p class="mt-4 text-gray-400">Nenhuma carta disponível para troca no momento.</p>
              <BaseButton
                variant="link"
                class="mt-2 text-indigo-400 hover:text-indigo-300"
                @click="fetchCards"
              >
                Atualizar lista
              </BaseButton>
            </div>
          </div>

          <!-- Initial Loading State -->
          <div v-else-if="cardStore.loading && !cardStore.loadingMore" class="flex justify-center items-center min-h-[400px]">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <CardDetailsModal
      v-model="showDetailsModal"
      :card="selectedCard"
      :show-trade-button="authStore.isAuthenticated && !userOwnsSelectedCard"
      :show-add-button="authStore.isAuthenticated && !userOwnsSelectedCard"
      @trade="handleTradeClick(selectedCard)"
      @card-added="handleCardAdded"
    />

    <BaseModal
      v-if="showTradeModal"
      :model-value="showTradeModal"
      @update:model-value="(value) => showTradeModal = value"
      title="Propor Nova Troca"
      class="bg-gray-900/95 backdrop-blur-xl"
    >
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-white mb-2">Carta Desejada</h4>
          <div 
            v-if="selectedCard" 
            class="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-white/10"
            tabindex="0"
            role="region"
            aria-label="Carta selecionada para receber"
          >
            <div class="w-12 h-16 flex items-center justify-center">
              <img :src="selectedCard.imageUrl" :alt="selectedCard.name" class="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <p class="text-sm font-medium text-white">{{ selectedCard.name }}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-white mb-2">Selecione sua carta para troca</h4>
          <div v-if="loadingStore.isLoading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          </div>
          <div v-else-if="userCards.length === 0" class="text-center py-4">
            <p class="text-gray-400">Você ainda não tem cartas para trocar.</p>
            <BaseButton
              variant="link"
              class="mt-2 text-indigo-400 hover:text-indigo-300"
              @click="closeTradeModal(); showDetailsModal = false"
            >
              Adicionar Cartas Primeiro
            </BaseButton>
          </div>
          <div 
            v-else 
            class="space-y-2 max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Lista de cartas disponíveis para troca"
          >
            <div
              v-for="card in userCards"
              :key="card.id"
              class="flex items-center justify-between space-x-2 p-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
              @click="selectUserCard(card)"
              @keydown.enter="selectUserCard(card)"
              @keydown.space.prevent="selectUserCard(card)"
              role="option"
              :aria-selected="selectedUserCard?.id === card.id"
              tabindex="0"
            >
              <div class="flex items-center space-x-2">
                <div class="w-12 h-16 flex items-center justify-center">
                  <img :src="card.imageUrl" :alt="card.name" class="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <p class="text-sm font-medium text-white">{{ card.name }}</p>
                </div>
              </div>
              <input
                type="radio"
                :checked="selectedUserCard?.id === card.id"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/20"
                tabindex="-1"
                :aria-label="'Selecionar carta ' + card.name"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <BaseButton
            variant="secondary"
            class="bg-white/10 hover:bg-white/20 text-white"
            @click="closeTradeModal"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            variant="primary"
            :disabled="!canProposeTrade || loadingStore.isLoading"
            :loading="proposingTrade"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            @click="proposeTrade"
          >
            Propor Troca
          </BaseButton>
        </div>
      </div>
    </BaseModal>

    <BaseModal
      v-if="showLoginPrompt"
      :model-value="showLoginPrompt"
      @update:model-value="(value) => showLoginPrompt = value"
      title="Faça login para continuar"
      class="bg-gray-900/95 backdrop-blur-xl"
    >
      <div class="space-y-4">
        <p class="text-gray-300">
          Para propor trocas de cartas, você precisa estar logado.
        </p>
        <div class="flex justify-end space-x-2">
          <BaseButton
            variant="secondary"
            class="bg-white/10 hover:bg-white/20 text-white"
            @click="closeLoginPrompt"
          >
            Depois
          </BaseButton>
          <BaseButton
            variant="primary"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
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
import { ref, computed, onMounted, watch, shallowRef, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import { useTradeStore } from '@/modules/trades/stores/useTradeStore'
import { useLoadingStore } from '@/shared/stores/useLoadingStore'
import { useTheme } from '@/composables/useTheme'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { useIntersectionObserver } from '@vueuse/core'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import CardDetailsModal from '@/modules/cards/components/CardDetailsModal.vue'
import UniverseBackground from '@/shared/components/UniverseBackground.vue'
import YugiImage from '@/shared/components/YugiImage.vue'
import type { Card } from '@/modules/auth/types'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const cardStore = useCardStore()
const tradeStore = useTradeStore()
const loadingStore = useLoadingStore()
const { isDark, toggleTheme } = useTheme()

// Usando shallowRef para objetos grandes
const showTradeModal = ref(false)
const showLoginPrompt = ref(false)
const showDetailsModal = ref(false)
const selectedCard = shallowRef<Card | null>(null)
const selectedUserCard = shallowRef<Card | null>(null)
const proposingTrade = ref(false)

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
    loadingStore.startLoading()
    await cardStore.fetchCards()
    await loadUserData()
  } catch (error) {
    console.error('Failed to fetch cards:', error)
  } finally {
    loadingStore.stopLoading()
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

// Computed properties
const availableCards = computed(() => cardStore.cards)
const userCards = computed(() => cardStore.userCards)

const userOwnsSelectedCard = computed(() => {
  if (!selectedCard.value) return false
  return cardStore.userCards.some(card => card.id === selectedCard.value?.id)
})

const canProposeTrade = computed(() => {
  return selectedCard.value && selectedUserCard.value
})

// Referência para o container de virtualização
const parentRef = ref<HTMLElement | null>(null)
const rowVirtualizer = useVirtualizer({
  count: computed(() => cardStore.cards.length).value,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 300,
  overscan: 5,
  getItemKey: (index: number) => cardStore.cards[index]?.id || index.toString()
})

// Intersection Observer para carregar mais cards
const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop: stopObserver } = useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !loadingStore.isLoading && cardStore.hasMore) {
      loadMore()
    }
  },
  { threshold: 0.5 }
)

// Debounce para o carregamento de mais cards
let loadMoreTimeout: NodeJS.Timeout | null = null
const loadMore = async () => {
  if (loadingStore.isLoading || !cardStore.hasMore) return
  
  if (loadMoreTimeout) {
    clearTimeout(loadMoreTimeout)
  }
  
  loadMoreTimeout = setTimeout(async () => {
    try {
      loadingStore.startLoading()
      await cardStore.fetchCards(cardStore.currentPage + 1)
      // Pré-carrega imagens das novas cartas
      preloadImages(cardStore.cards.slice(-12))
    } catch (error) {
      console.error('Failed to load more cards:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }, 300)
}

// Cache de imagens
const preloadImages = (cards: Card[]) => {
  cards.forEach(card => {
    if (card.imageUrl) {
      const img = new Image()
      img.src = card.imageUrl
    }
  })
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
    loadingStore.startLoading()
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
    loadingStore.stopLoading()
  }
}

const showCardDetails = (card: Card) => {
  console.log('Showing card details:', card.name)
  selectedCard.value = card
  showDetailsModal.value = true
}

const handleCardAdded = async () => {
  // Recarrega as cartas do usuário após adicionar uma nova
  if (authStore.isAuthenticated) {
    await cardStore.fetchUserCards()
  }
}

// Adiciona um watcher para debug
watch(() => showDetailsModal.value, (newValue) => {
  console.log('MarketplacePage showDetailsModal changed:', newValue)
})

watch(() => selectedCard.value, (newValue) => {
  console.log('MarketplacePage selectedCard changed:', newValue?.name)
})

onMounted(async () => {
  if (localStorage.getItem('token')) {
    try {
      loadingStore.startLoading()
      await authStore.fetchMe()
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      authStore.logout()
    } finally {
      loadingStore.stopLoading()
    }
  }
  await fetchCards()
  // Pré-carrega imagens das primeiras cartas
  preloadImages(cardStore.cards)
})

onUnmounted(() => {
  if (loadMoreTimeout) {
    clearTimeout(loadMoreTimeout)
  }
  stopObserver()
})
</script>

<style scoped>
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

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* Hide scrollbar but keep functionality */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;             /* Chrome, Safari and Opera */
}

/* Scrollbar customization */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-indigo-600::-webkit-scrollbar-thumb {
  background-color: theme('colors.indigo.600');
  border-radius: theme('borderRadius.full');
}

.scrollbar-track-gray-800::-webkit-scrollbar-track {
  background-color: theme('colors.gray.800');
}

/* Optimize animations */
.group {
  will-change: transform;
}

img {
  backface-visibility: hidden;
}
</style> 