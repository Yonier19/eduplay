<template>
  <section class="game-hero">
    <div class="hero-content">
      <h1 class="hero-title">
        Comparte tu juego educativo
        <br>
        con el mundo
      </h1>
      
      <p class="hero-description">
        Sube tu juego educativo y ayuda a miles de
        <br>
        estudiantes a aprender jugando.
      </p>

      <BaseButton
        variant="primary"
        size="lg"
        @click="openUploadPanel"
      >
        <UploadCloudIcon :size="20" />
        <span>Subir Juego Educativo</span>
      </BaseButton>
    </div>

    <div class="hero-illustration">
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="illustration">
        <!-- Gamepad -->
        <g class="gamepad">
          <rect x="50" y="100" width="300" height="150" rx="20" fill="none" stroke="#6D3DF5" stroke-width="3"/>
          <circle cx="100" cy="140" r="15" fill="none" stroke="#2495FF" stroke-width="2"/>
          <rect x="250" y="130" width="30" height="30" rx="5" fill="none" stroke="#F97316" stroke-width="2"/>
          <circle cx="310" cy="120" r="10" fill="none" stroke="#22C55E" stroke-width="2"/>
        </g>

        <!-- Cloud -->
        <g class="cloud">
          <path d="M 250 50 Q 280 40 300 60 Q 320 45 340 60 L 340 90 Q 320 100 300 100 Q 280 110 260 100 Q 240 105 230 85 Z" 
                fill="rgba(36, 149, 255, 0.2)" stroke="#2495FF" stroke-width="2"/>
        </g>

        <!-- Book -->
        <g class="book">
          <rect x="20" y="200" width="60" height="80" rx="3" fill="none" stroke="#8B5CF6" stroke-width="2"/>
          <line x1="35" y1="200" x2="35" y2="280" stroke="#8B5CF6" stroke-width="2"/>
          <line x1="50" y1="205" x2="65" y2="205" stroke="#8B5CF6" stroke-width="1"/>
          <line x1="50" y1="220" x2="65" y2="220" stroke="#8B5CF6" stroke-width="1"/>
        </g>

        <!-- Stars -->
        <circle cx="150" cy="40" r="2" fill="#F97316" opacity="0.6"/>
        <circle cx="180" cy="60" r="1.5" fill="#22C55E" opacity="0.6"/>
        <circle cx="320" cy="150" r="1.5" fill="#2196F3" opacity="0.6"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUploadPanel } from '@/composables/useUploadPanel'
import BaseButton from '@/components/ui/BaseButton.vue'
import { UploadCloudIcon } from 'lucide-vue-next'

const { openUploadPanel } = useUploadPanel()
</script>

<style scoped>
.game-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(109, 61, 245, 0.15) 0%, rgba(36, 149, 255, 0.1) 100%);
  border: 1px solid rgba(109, 61, 245, 0.3);
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;
}

.hero-description {
  font-size: 1rem;
  color: #AAB3C5;
  margin: 0;
  line-height: 1.6;
}

.hero-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.illustration {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 25px rgba(109, 61, 245, 0.2));
}

.gamepad {
  animation: float 3s ease-in-out infinite;
}

.cloud {
  animation: float 4s ease-in-out infinite;
  animation-delay: 0.5s;
}

.book {
  animation: float 3.5s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .game-hero {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-illustration {
    min-height: 200px;
  }
}
</style>
