<template>
  <div class="publication-actions">
    <BaseButton
      variant="ghost"
      size="lg"
      @click="saveDraft"
      class="action-button"
    >
      <SaveIcon :size="18" />
      Guardar Borrador
    </BaseButton>

    <BaseButton
      variant="primary"
      size="lg"
      @click="publishGame"
      :disabled="isLoading"
      class="action-button"
    >
      <UploadCloudIcon :size="18" />
      <span v-if="!isLoading">Publicar Juego</span>
      <span v-else>Publicando...</span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameUploadForm } from '@/composables/useGameUploadForm'
import { useUploadPanel } from '@/composables/useUploadPanel'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  SaveIcon,
  UploadCloudIcon
} from 'lucide-vue-next'

const { form, validateForm, saveDraft } = useGameUploadForm()
const { setLoading, closeUploadPanel } = useUploadPanel()
const isLoading = ref(false)

const publishGame = async () => {
  if (!validateForm()) {
    console.error('El formulario tiene errores')
    return
  }

  isLoading.value = true
  setLoading(true)

  try {
    // Simular envío al servidor
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('¡Juego publicado exitosamente!', form)
    isLoading.value = false
    closeUploadPanel()
  } catch (error) {
    console.error('Error al publicar:', error)
    isLoading.value = false
  }
}
</script>

<style scoped>
.publication-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-button {
  width: 100%;
}

@media (max-width: 768px) {
  .publication-actions {
    grid-template-columns: 1fr;
  }
}
</style>
