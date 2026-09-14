<template>
  <RouterView v-if="route.path === '/login'" />
  <AppLayout v-else>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  min-height: 100%;
  height: 100dvh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #050B1A 0%, #071020 100%);
  color: #FFFFFF;
  overflow: hidden;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(17, 22, 33, 0.7);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.8);
  border-radius: 999px;
  border: 2px solid rgba(17, 22, 33, 0.8);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 153, 255, 0.95);
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(129, 140, 248, 0.8) rgba(17, 22, 33, 0.7);
}

/* Utilities */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}
</style>