<template>
  <div class="game-card">
    <div class="game-image-container">
      <img :src="game.image" :alt="game.title" class="game-image" />
      <div class="game-overlay">
        <BaseButton variant="primary" size="sm">
          <PlayIcon :size="16" />
          Jugar
        </BaseButton>
      </div>
    </div>

    <div class="game-content">
      <div class="game-header">
        <BaseBadge variant="secondary" size="sm">
          {{ game.category }}
        </BaseBadge>
        <BaseIconButton @click="openMenu">
          <MoreVerticalIcon :size="18" />
        </BaseIconButton>
      </div>

      <h3 class="game-title">{{ game.title }}</h3>
      
      <p class="game-description">
        {{ game.description }}
      </p>

      <div class="game-footer">
        <div class="game-rating">
          <StarIcon :size="16" class="star-icon" />
          <span>{{ game.rating }}</span>
        </div>
        <div class="game-players">
          <UsersIcon :size="16" />
          <span>{{ game.players }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/types/game'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import {
  PlayIcon,
  MoreVerticalIcon,
  StarIcon,
  UsersIcon
} from 'lucide-vue-next'

interface Props {
  game: Game
}

defineProps<Props>()

const openMenu = () => {
  console.log('Abrir menú de opciones')
}
</script>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.game-card:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-4px);
}

.game-image-container {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
}

.game-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  flex: 1;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.game-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
}

.game-description {
  margin: 0;
  font-size: 0.85rem;
  color: #AAB3C5;
  line-height: 1.4;
  flex: 1;
}

.game-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
  color: #AAB3C5;
}

.game-rating,
.game-players {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.star-icon {
  color: #F97316;
}

@media (max-width: 768px) {
  .game-card {
    border-radius: 0.5rem;
  }

  .game-content {
    gap: 0.5rem;
    padding: 0.75rem;
  }
}
</style>
