<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Marketplace de Cartas</h1>
            <p class="mt-1 text-sm text-gray-500">Encontre e troque suas cartas favoritas</p>
          </div>
          <div class="flex items-center space-x-4">
            <BaseButton
              v-if="!authStore.isAuthenticated"
              @click="$router.push('/login')"
            >
              Login
            </BaseButton>
            <template v-else>
              <BaseButton
                variant="secondary"
                @click="$router.push('/dashboard')"
              >
                Minhas Cartas
              </BaseButton>
              <BaseButton
                variant="primary"
                @click="openCreateTrade"
              >
                Nova Troca
              </BaseButton>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Trades List -->
        <div v-if="!tradeStore.loading" class="space-y-6">
          <div v-for="trade in tradeStore.trades" :key="trade.id" class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  Troca proposta por {{ trade.user.name }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ new Date(trade.createdAt).toLocaleDateString() }}
                </p>
              </div>
              <BaseButton
                v-if="authStore.user?.id === trade.userId"
                variant="danger"
                @click="deleteTrade(trade.id)"
              >
                Cancelar Troca
              </BaseButton>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Oferecendo</h4>
                <div class="space-y-2">
                  <div
                    v-for="card in trade.tradeCards.filter(tc => tc.type === 'OFFERING')"
                    :key="card.id"
                    class="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                  >
                    <img :src="card.card.imageUrl" alt="Card" class="w-12 h-12 object-cover rounded" />
                    <div>
                      <p class="text-sm font-medium">{{ card.card.name }}</p>
                      <p class="text-xs text-gray-500">{{ card.card.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Recebendo</h4>
                <div class="space-y-2">
                  <div
                    v-for="card in trade.tradeCards.filter(tc => tc.type === 'RECEIVING')"
                    :key="card.id"
                    class="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                  >
                    <img :src="card.card.imageUrl" alt="Card" class="w-12 h-12 object-cover rounded" />
                    <div>
                      <p class="text-sm font-medium">{{ card.card.name }}</p>
                      <p class="text-xs text-gray-500">{{ card.card.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>

        <!-- Load More -->
        <div v-if="tradeStore.hasMore && !tradeStore.loading" class="mt-8 flex justify-center">
          <BaseButton
            variant="secondary"
            @click="loadMore"
          >
            Carregar Mais
          </BaseButton>
        </div>
      </div>
    </main>

    <!-- Create Trade Modal -->
    <BaseModal
      v-if="showTradeModal"
      title="Criar Nova Troca"
      :model-value="showTradeModal"
      @update:model-value="showTradeModal = $event"
      @close="closeCreateTrade"
    >
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-2">Selecione as cartas para oferecer</h4>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="card in userCards"
              :key="card.id"
              class="p-2 border rounded cursor-pointer"
              :class="{ 'border-indigo-500 bg-indigo-50': selectedOfferingCards.includes(card.id) }"
              @click="toggleOfferingCard(card.id)"
            >
              <img :src="card.imageUrl" alt="Card" class="w-full h-32 object-cover rounded" />
              <p class="text-sm font-medium mt-1">{{ card.name }}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-2">Selecione as cartas que deseja receber</h4>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="card in availableCards"
              :key="card.id"
              class="p-2 border rounded cursor-pointer"
              :class="{ 'border-indigo-500 bg-indigo-50': selectedReceivingCards.includes(card.id) }"
              @click="toggleReceivingCard(card.id)"
            >
              <img :src="card.imageUrl" alt="Card" class="w-full h-32 object-cover rounded" />
              <p class="text-sm font-medium mt-1">{{ card.name }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <BaseButton
            variant="secondary"
            @click="closeCreateTrade"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            :disabled="!canCreateTrade"
            @click="createTrade"
          >
            Criar Troca
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/useAuthStore'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import { useTradeStore } from '@/modules/trades/stores/useTradeStore'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const cardStore = useCardStore()
const tradeStore = useTradeStore()

const showTradeModal = ref(false)
const selectedOfferingCards = ref<string[]>([])
const selectedReceivingCards = ref<string[]>([])

// Computed properties
const userCards = computed(() => cardStore.userCards)
const availableCards = computed(() => cardStore.cards.filter(card => !userCards.value.some(uc => uc.id === card.id)))
const canCreateTrade = computed(() => selectedOfferingCards.value.length > 0 && selectedReceivingCards.value.length > 0)

// Methods
const loadMore = () => {
  tradeStore.fetchTrades(tradeStore.currentPage + 1)
}

const openCreateTrade = () => {
  showTradeModal.value = true
  cardStore.fetchUserCards()
  cardStore.fetchCards()
}

const closeCreateTrade = () => {
  showTradeModal.value = false
  selectedOfferingCards.value = []
  selectedReceivingCards.value = []
}

const toggleOfferingCard = (cardId: string) => {
  const index = selectedOfferingCards.value.indexOf(cardId)
  if (index === -1) {
    selectedOfferingCards.value.push(cardId)
  } else {
    selectedOfferingCards.value.splice(index, 1)
  }
}

const toggleReceivingCard = (cardId: string) => {
  const index = selectedReceivingCards.value.indexOf(cardId)
  if (index === -1) {
    selectedReceivingCards.value.push(cardId)
  } else {
    selectedReceivingCards.value.splice(index, 1)
  }
}

const createTrade = async () => {
  try {
    await tradeStore.createTrade({
      offeringCardId: selectedOfferingCards.value[0],
      receivingCardId: selectedReceivingCards.value[0]
    })
    closeCreateTrade()
  } catch (error) {
    console.error('Failed to create trade:', error)
  }
}

const deleteTrade = async (tradeId: string) => {
  try {
    await tradeStore.deleteTrade(tradeId)
  } catch (error) {
    console.error('Failed to delete trade:', error)
  }
}

// Lifecycle hooks
onMounted(async () => {
  await tradeStore.fetchTrades()
})
</script> 