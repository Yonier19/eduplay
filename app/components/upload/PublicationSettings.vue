<template>
  <div class="publication-settings">
    <h3 class="section-heading">Configuración de Publicación</h3>

    <div class="settings-group">
      <label class="setting-item">
        <span class="setting-label">
          <LockIcon :size="18" />
          Visibilidad
        </span>
        <BaseSelect
          v-model="form.visibility"
          :options="visibilityOptions"
        />
      </label>
    </div>

    <div class="settings-group">
      <label class="setting-item">
        <BaseSwitch v-model="form.comments" />
        <span class="setting-label">
          <MessageCircleIcon :size="18" />
          Permitir comentarios
        </span>
      </label>

      <label class="setting-item">
        <BaseSwitch v-model="form.ratings" />
        <span class="setting-label">
          <StarIcon :size="18" />
          Permitir calificaciones
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameUploadForm } from '@/composables/useGameUploadForm'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'
import {
  LockIcon,
  MessageCircleIcon,
  StarIcon
} from 'lucide-vue-next'

const { form } = useGameUploadForm()

const visibilityOptions = [
  { value: 'public', label: 'Público' },
  { value: 'private', label: 'Privado' }
]
</script>

<style scoped>
.publication-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
}

.section-heading {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #FFFFFF;
  font-weight: 500;
  flex: 1;
}
</style>
