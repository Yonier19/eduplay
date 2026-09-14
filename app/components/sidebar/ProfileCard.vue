<template>
  <div class="profile-card">
    <div class="profile-avatar">
      <UserIcon :size="32" />
    </div>
    <div class="profile-info">
      <h3 class="profile-name">Yonier Hdz</h3>
      <p class="profile-role">Estudiante</p>
      <BaseBadge variant="primary" size="sm">
        Nivel 12
      </BaseBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from 'lucide-vue-next'
import BaseBadge from '@/components/ui/BaseBadge.vue'
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgba(109, 61, 245, 0.1);
  border: 1px solid rgba(109, 61, 245, 0.2);
  border-radius: 0.75rem;
  margin: 1rem;
}

.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(109, 61, 245, 0.3);
  border-radius: 0.5rem;
  color: #8B5CF6;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
}

.profile-role {
  margin: 0.25rem 0 0.5rem 0;
  font-size: 0.8rem;
  color: #AAB3C5;
}
</style>
