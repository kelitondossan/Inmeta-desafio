<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="card?.name || ''"
    class="bg-gray-900/95 backdrop-blur-xl"
  >
    <div class="space-y-6">
      <div class="flex justify-center">
        <div class="relative w-64 aspect-[3/4] overflow-hidden rounded-lg">
          <img 
            :src="card?.imageUrl" 
            :alt="card?.name"
            class="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-300">Descrição</h4>
          <p class="mt-1 text-base text-white">{{ card?.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-300">Tipo</h4>
            <p class="mt-1 text-base text-white">{{ card?.type || 'N/A' }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-300">Raridade</h4>
            <p class="mt-1 text-base text-white">{{ card?.rarity || 'N/A' }}</p>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <BaseButton
            v-if="showAddButton"
            variant="primary"
            :loading="isAddingCard"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="onAddToCollection"
          >
            Adicionar à Minha Coleção
          </BaseButton>
          <BaseButton
            v-if="showTradeButton"
            variant="primary"
            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            @click="onTrade"
          >
            Propor Troca
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import type { POSITION } from 'vue-toastification'
import type { Card } from '@/modules/auth/types'
import { useCardStore } from '@/modules/cards/stores/useCardStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const toast = useToast()
const cardStore = useCardStore()
const isAddingCard = ref(false)

const props = defineProps<{
  modelValue: boolean
  card: Card | null
  showTradeButton?: boolean
  showAddButton?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'trade': []
  'cardAdded': []
}>()

// Debug watcher
watch(() => props.modelValue, (newValue) => {
  console.log('CardDetailsModal modelValue changed:', newValue)
})

const onTrade = () => {
  emit('trade')
}

const onAddToCollection = async () => {
  if (!props.card) return
  
  try {
    isAddingCard.value = true
    await cardStore.addCards([props.card.id])
    toast.success('Carta adicionada à sua coleção com sucesso! 🎉', {
      timeout: 3000,
      position: 'top-right' as POSITION,
      icon: '✨'
    })
    emit('cardAdded')
  } catch (error) {
    console.error('Failed to add card:', error)
    toast.error('Não foi possível adicionar a carta. Tente novamente.', {
      timeout: 4000,
      position: 'top-right' as POSITION,
      icon: '❌'
    })
  } finally {
    isAddingCard.value = false
  }
}
</script> 