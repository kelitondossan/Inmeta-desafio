<template>
  <div class="universe-background">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="nebula"></div>
  </div>
</template>

<style scoped>
.universe-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  overflow: hidden;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
}

.stars::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 170px 90px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 150px 10px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 30px 130px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 110px 150px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80px 120px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 200px 95px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 4s ease-in-out infinite;
  opacity: 0.8;
}

.twinkling {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 10px 10px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 150px 150px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 60px 170px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 175px 180px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 195px 95px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 95px 145px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 15px 225px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 165px 45px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0));
  background-size: 200px 200px;
  animation: twinkle 3s alternate infinite;
  opacity: 0.6;
}

.nebula {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  animation: rotate 100s infinite linear;
  background: 
    radial-gradient(ellipse at center,
      rgba(63, 94, 251, 0.15) 0%,
      rgba(252, 70, 107, 0.15) 25%,
      rgba(63, 94, 251, 0.15) 50%,
      rgba(252, 70, 107, 0.15) 75%,
      rgba(63, 94, 251, 0.15) 100%
    );
  mix-blend-mode: screen;
  opacity: 0.4;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 