<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="app-main">
      <TopBar />
      
      <main class="app-content">
        <slot />
      </main>
    </div>

    <UploadGamePanel />
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import TopBar from '@/components/topbar/TopBar.vue'
import UploadGamePanel from '@/components/upload/UploadGamePanel.vue'
</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  width: 100%;
  height: 100dvh;
  min-height: 0;
  background: linear-gradient(135deg, #050B1A 0%, #071020 100%);
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.app-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
    height: 100dvh;
    overflow: hidden;
  }

  .app-main {
    min-width: 0;
    width: 100%;
  }
}
</style>
