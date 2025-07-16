<template>
  <div class="yugioh-cards">
    <div
      v-for="card in cards"
      :key="card.id"
      class="card"
      :style="{
        backgroundImage: `url(${card.imageUrl})`,
        animationDelay: `${Math.random() * 5}s`
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCards } from '@/modules/cards/services/cardService'
import type { Card } from '@/modules/auth/types'

const cards = ref<Card[]>([])

const fetchRandomCards = async () => {
  try {
    const response = await getCards({ page: 1, rpp: 5 })
    cards.value = response.list
  } catch (error) {
    console.error('Erro ao buscar cartas:', error)
    // Em caso de erro, use cartas padrão
    cards.value = Array(5).fill(null).map((_, index) => ({
      id: String(index),
      name: 'Default Card',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjAgMjBoMTEwdjE4MEgyMHoiIGZpbGw9IiNmZmQ3MDAiLz48L3N2Zz4=',
      description: 'Carta padrão'
    }))
  }
}

onMounted(() => {
  fetchRandomCards()
})
</script>

<style scoped>
.yugioh-cards {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.card {
  position: absolute;
  width: 150px;
  height: 220px;
  background-size: cover;
  background-position: center;
  animation: float 20s infinite linear;
  opacity: 0.1;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.card:hover {
  opacity: 0.3;
}

@keyframes float {
  0% {
    transform: translate(-100%, -100%) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  90% {
    opacity: 0.1;
  }
  100% {
    transform: translate(200%, 200%) rotate(720deg);
    opacity: 0;
  }
}

.card:nth-child(1) { top: 10%; left: 20%; animation-duration: 25s; }
.card:nth-child(2) { top: 30%; left: 60%; animation-duration: 22s; }
.card:nth-child(3) { top: 50%; left: 40%; animation-duration: 28s; }
.card:nth-child(4) { top: 70%; left: 80%; animation-duration: 24s; }
.card:nth-child(5) { top: 90%; left: 10%; animation-duration: 26s; }
</style> 