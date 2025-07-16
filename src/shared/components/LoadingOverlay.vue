<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <!-- Millennium Puzzle Animation -->
          <div class="millennium-puzzle mb-4">
            <svg viewBox="0 0 100 100" class="w-16 h-16">
              <path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                class="puzzle-outline"
              />
              <path
                d="M50 15 L85 33 L85 67 L50 85 L15 67 L15 33 Z"
                class="puzzle-inner"
              />
              <circle cx="50" cy="50" r="15" class="puzzle-eye" />
            </svg>
          </div>
          
          <!-- Loading Text -->
          <div class="loading-text">
            <span>C</span>
            <span>A</span>
            <span>R</span>
            <span>R</span>
            <span>E</span>
            <span>G</span>
            <span>A</span>
            <span>N</span>
            <span>D</span>
            <span>O</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<style scoped>
.millennium-puzzle {
  animation: float 2s ease-in-out infinite;
}

.puzzle-outline {
  fill: none;
  stroke: #ffd700;
  stroke-width: 2;
  filter: drop-shadow(0 0 5px #ffd700);
}

.puzzle-inner {
  fill: #ffd700;
  opacity: 0.8;
}

.puzzle-eye {
  fill: #ffffff;
  filter: drop-shadow(0 0 3px #ffffff);
  animation: glow 2s ease-in-out infinite;
}

.loading-text {
  @apply text-white text-xl font-medium mt-4;
}

.loading-text span {
  display: inline-block;
  animation: wave 1.5s infinite;
  animation-delay: calc(0.1s * var(--i));
}

.loading-text span:nth-child(1) { --i: 1; }
.loading-text span:nth-child(2) { --i: 2; }
.loading-text span:nth-child(3) { --i: 3; }
.loading-text span:nth-child(4) { --i: 4; }
.loading-text span:nth-child(5) { --i: 5; }
.loading-text span:nth-child(6) { --i: 6; }
.loading-text span:nth-child(7) { --i: 7; }
.loading-text span:nth-child(8) { --i: 8; }
.loading-text span:nth-child(9) { --i: 9; }
.loading-text span:nth-child(10) { --i: 10; }
.loading-text span:nth-child(11) { --i: 11; }
.loading-text span:nth-child(12) { --i: 12; }
.loading-text span:nth-child(13) { --i: 13; }

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%, 100% {
    filter: drop-shadow(0 0 3px #ffffff);
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 8px #ffffff);
    transform: scale(1.1);
  }
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style> 