<template>
  <router-link
    :to="to"
    class="nav-item"
    :class="{ active }"
  >
    <span class="nav-icon">
      <component :is="icon" :size="20" />
    </span>
    <span class="nav-label">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
import type { FunctionalComponent, SVGAttributes } from 'vue'

interface Props {
  to: string
  label: string
  icon: FunctionalComponent<SVGAttributes>
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #AAB3C5;
  text-decoration: none;
  border-radius: 0.5rem;
  border-left: 3px solid transparent;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  margin: 0.25rem 0.5rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}

.nav-item.active {
  background-color: rgba(109, 61, 245, 0.2);
  color: #8B5CF6;
  border-left-color: #8B5CF6;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-label {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
