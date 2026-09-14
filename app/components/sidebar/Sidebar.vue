<template>
  <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
    <LogoPlatform />
    
    <ProfileCard />

    <nav class="sidebar-menu">
      <NavigationItem
        to="/"
        label="Inicio"
        :icon="HomeIcon"
        :active="true"
      />
      <NavigationItem
        to="/library"
        label="Biblioteca"
        :icon="BookOpenIcon"
      />
      <NavigationItem
        to="/my-games"
        label="Mis Juegos"
        :icon="Gamepad2Icon"
      />
      <NavigationItem
        to="/settings"
        label="Configuración"
        :icon="SettingsIcon"
      />
    </nav>

    <div class="sidebar-footer">
      <BaseButton
        variant="ghost"
        size="sm"
        @click="collapseSidebar"
        class="collapse-button"
      >
        <ChevronLeftIcon v-if="!sidebarCollapsed" :size="18" />
        <ChevronRightIcon v-else :size="18" />
        <span v-if="!sidebarCollapsed">Ocultar menú</span>
      </BaseButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import LogoPlatform from './LogoPlatform.vue'
import ProfileCard from './ProfileCard.vue'
import NavigationItem from './NavigationItem.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  HomeIcon,
  BookOpenIcon,
  Gamepad2Icon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'

const { sidebarCollapsed, collapseSidebar } = useSidebar()
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 2rem);
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
  border-radius: 0.75rem;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1rem 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
}

.collapse-button {
  width: 100%;
}

/* Scrollbar personalizado */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
}
</style>
