<template>
  <header class="topbar">
    <SearchBar v-model="searchQuery" />
    
    <div class="topbar-actions">
      <BaseButton variant="ghost" size="md">
        <FilterIcon :size="18" />
        <span>Filtrar</span>
      </BaseButton>

      <BaseButton
        variant="primary"
        size="md"
        @click="openUploadPanel"
      >
        <UploadCloudIcon :size="18" />
        <span>Nuevos juegos</span>
      </BaseButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/useGames'
import { useUploadPanel } from '@/composables/useUploadPanel'
import SearchBar from './SearchBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  FilterIcon,
  UploadCloudIcon
} from 'lucide-vue-next'

const { searchQuery } = useGames()
const { openUploadPanel } = useUploadPanel()
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .topbar {
    flex-wrap: wrap;
  }

  .topbar-actions {
    width: 100%;
  }
}
</style>
