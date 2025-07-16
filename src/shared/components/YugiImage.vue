<template>
  <div class="yugi-container">
    <div class="millennium-puzzle">
      <svg viewBox="0 0 100 100" class="puzzle-svg">
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
  </div>
</template>

<style scoped>
.yugi-container {
  position: fixed;
  bottom: -20px;
  right: 20px;
  width: 200px;
  height: 200px;
  z-index: 1;
  pointer-events: none;
  transform: translateY(60%);
  transition: transform 0.3s ease;
}

.yugi-container:hover {
  transform: translateY(55%);
}

.millennium-puzzle {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  animation: float 3s ease-in-out infinite;
}

.puzzle-svg {
  width: 100%;
  height: 100%;
}

.puzzle-outline {
  fill: none;
  stroke: #ffd700;
  stroke-width: 2;
  filter: drop-shadow(0 0 5px #ffd700);
}

.puzzle-inner {
  fill: linear-gradient(45deg, #ffd700, #ff8c00);
  opacity: 0.8;
}

.puzzle-eye {
  fill: #ffffff;
  filter: drop-shadow(0 0 3px #ffffff);
  animation: glow 2s ease-in-out infinite;
}

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
</style> 