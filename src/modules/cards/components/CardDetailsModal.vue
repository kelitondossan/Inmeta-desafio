<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="card?.name || ''"
  >
    <div class="space-y-6">
      <div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
        <img 
          :src="card?.imageUrl" 
          :alt="card?.name"
          class="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h4>
          <p class="mt-1 text-base text-gray-900 dark:text-white">{{ card?.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</h4>
            <p class="mt-1 text-base text-gray-900 dark:text-white">{{ card?.type }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Raridade</h4>
            <p class="mt-1 text-base text-gray-900 dark:text-white">{{ card?.rarity }}</p>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <BaseButton
            v-if="showAddButton"
            variant="primary"
            :loading="isAddingCard"
            @click="onAddToCollection"
          >
            Adicionar à Minha Coleção
          </BaseButton>
          <BaseButton
            v-if="showTradeButton"
            variant="primary"
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
import { ref, computed } from 'vue'
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

const onTrade = () => {
  emit('trade')
  emit('update:modelValue', false)
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
    emit('update:modelValue', false)
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