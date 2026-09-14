<template>
  <div class="logo-platform">
    <div class="logo-icon">
      <Gamepad2Icon :size="24" />
    </div>
    <div class="logo-text">
      <h2 class="logo-title">PlayEdu</h2>
      <p class="logo-subtitle">Aprende jugando</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gamepad2Icon } from 'lucide-vue-next'
</script>

<style scoped>
.logo-platform {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%);
  border-radius: 0.5rem;
  color: white;
}

.logo-text {
  flex: 1;
}

.logo-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
}

.logo-subtitle {
  margin: 0;
  font-size: 0.7rem;
  color: #AAB3C5;
}
</style>
