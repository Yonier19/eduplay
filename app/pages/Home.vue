<template>
  <div class="home-page">
    <GameHero />
    <GameExplorer />
  </div>
</template>

<script setup lang="ts">
import GameHero from '@/components/home/GameHero.vue'
import GameExplorer from '@/components/games/GameExplorer.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
