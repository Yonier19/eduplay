<template>
  <section class="game-explorer">
    <div class="explorer-header">
      <div class="header-left">
        <h2 class="section-title">Explora juegos educativos</h2>
      </div>

      <div class="header-right">
        <BaseSelect
          v-model="sortBy"
          :options="sortOptions"
          placeholder="Ordenar por..."
        />

        <div class="view-toggle">
          <BaseIconButton
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            aria-label="Vista de cuadrícula"
          >
            <Grid2X2Icon :size="18" />
          </BaseIconButton>
          <BaseIconButton
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
            aria-label="Vista de lista"
          >
            <ListIcon :size="18" />
          </BaseIconButton>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="games-grid">
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
      />
    </div>

    <!-- List View -->
    <div v-else class="games-list">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="game-list-item"
      >
        <img :src="game.image" :alt="game.title" class="list-item-image" />
        <div class="list-item-content">
          <div class="list-item-header">
            <h3>{{ game.title }}</h3>
            <BaseBadge variant="secondary" size="sm">
              {{ game.category }}
            </BaseBadge>
          </div>
          <p>{{ game.description }}</p>
          <div class="list-item-footer">
            <div class="game-rating">
              <StarIcon :size="16" class="star-icon" />
              {{ game.rating }}
            </div>
            <div class="game-players">
              <UsersIcon :size="16" />
              {{ game.players }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="load-more-container">
      <BaseButton variant="secondary" size="md">
        Cargar más juegos
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/useGames'
import GameCard from './GameCard.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import {
  Grid2X2Icon,
  ListIcon,
  StarIcon,
  UsersIcon
} from 'lucide-vue-next'

const { filteredGames, sortBy, viewMode } = useGames()

const sortOptions = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'popular', label: 'Más populares' },
  { value: 'rated', label: 'Mejor valorados' }
]
</script>

<style scoped>
.game-explorer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.explorer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header-left {
  flex: 1;
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.25rem;
}

.view-toggle button {
  color: #AAB3C5;
}

.view-toggle button.active {
  color: #8B5CF6;
  background-color: rgba(109, 61, 245, 0.2);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-list-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.game-list-item:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}

.list-item-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.list-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-item-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.list-item-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
}

.list-item-content p {
  margin: 0;
  font-size: 0.85rem;
  color: #AAB3C5;
}

.list-item-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #AAB3C5;
  margin-top: auto;
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

.load-more-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

@media (max-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .explorer-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    width: 100%;
  }

  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .game-list-item {
    grid-template-columns: 100px 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .list-item-image {
    width: 100px;
    height: 70px;
  }
}
</style>
