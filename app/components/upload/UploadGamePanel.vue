<template>
  <Teleport to="body">
    <transition name="panel-slide">
      <div v-if="uploadPanelOpen" class="upload-panel-overlay">
        <div class="upload-panel" role="dialog" aria-modal="true">
          <div class="panel-header">
            <div>
              <h2>Nuevos juegos</h2>
              <p>Describe, clasifica y prueba tu juego antes de publicarlo.</p>
            </div>
            <BaseIconButton
              @click="closePanel"
              aria-label="Cerrar panel"
            >
              <XIcon :size="24" />
            </BaseIconButton>
          </div>

          <div class="panel-content">
            <GameUploadForm />
            <PublicationSettings />
            <div class="preview-section">
              <div>
                <h3>Vista previa</h3>
                <p>Sube un archivo HTML para ejecutarlo en una ventana segura.</p>
              </div>

              <BaseButton
                variant="secondary"
                size="md"
                :disabled="!gameFile || isPreviewOpen"
                @click="openPreview"
              >
                <PlayIcon :size="18" />
                {{ isPreviewOpen ? 'Vista previa abierta' : 'Probar juego' }}
              </BaseButton>
            </div>
            <PublicationActions />
          </div>
        </div>

        <div
          v-if="isPreviewOpen"
          class="preview-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Vista previa del juego"
        >
          <div class="preview-window">
            <div class="preview-header">
              <div>
                <h2>Probando: {{ form.name || 'Nuevo juego' }}</h2>
                <span>{{ gameFile?.name }}</span>
              </div>

              <BaseIconButton
                @click="closePreview"
                aria-label="Cerrar vista previa"
              >
                <XIcon :size="24" />
              </BaseIconButton>
            </div>

            <iframe
              :src="previewUrl"
              class="preview-frame"
              sandbox="allow-forms allow-modals allow-pointer-lock allow-scripts"
              title="Vista previa del juego"
            />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useUploadPanel } from '@/composables/useUploadPanel'
import GameUploadForm from './GameUploadForm.vue'
import PublicationSettings from './PublicationSettings.vue'
import PublicationActions from './PublicationActions.vue'
import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useGameUploadForm } from '@/composables/useGameUploadForm'
import { PlayIcon, XIcon } from 'lucide-vue-next'

const { uploadPanelOpen, closeUploadPanel } = useUploadPanel()
const { form } = useGameUploadForm()
const isPreviewOpen = ref(false)
const previewUrl = ref('')

const gameFile = computed(() => {
  return form.gameFile?.name.toLowerCase().endsWith('.html')
    ? form.gameFile
    : null
})

const openPreview = () => {
  if (!gameFile.value) return

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  previewUrl.value = URL.createObjectURL(gameFile.value)
  isPreviewOpen.value = true
}

const closePanel = () => {
  closePreview()
  closeUploadPanel()
}

const closePreview = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }

  isPreviewOpen.value = false
}

watch(
  () => form.gameFile,
  file => {
    if (file && /\.html?$/i.test(file.name)) {
      openPreview()
    } else if (!file) {
      closePreview()
    }
  },
)

onUnmounted(closePreview)
</script>

<style scoped>
.upload-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.upload-panel {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  background-color: #0a1220;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
}

.panel-header p,
.preview-section p {
  margin: 0.35rem 0 0;
  color: #AAB3C5;
  font-size: 0.85rem;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.preview-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(36, 149, 255, 0.08);
  border: 1px solid rgba(36, 149, 255, 0.2);
  border-radius: 0.75rem;
}

.preview-section h3 {
  margin: 0;
  color: #FFFFFF;
  font-size: 0.95rem;
}

.preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.preview-window {
  display: flex;
  flex-direction: column;
  width: min(1100px, 96vw);
  height: min(760px, 92dvh);
  overflow: hidden;
  background: #0A1220;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-header h2 {
  margin: 0;
  color: #FFFFFF;
  font-size: 1rem;
}

.preview-header span {
  display: block;
  margin-top: 0.25rem;
  color: #AAB3C5;
  font-size: 0.8rem;
}

.preview-frame {
  flex: 1;
  width: 100%;
  min-height: 0;
  border: 0;
  background: #FFFFFF;
}

/* Transition */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.3s ease;
}

.panel-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .upload-panel {
    width: 95%;
    max-width: none;
    max-height: 100vh;
    border-radius: 0.75rem 0.75rem 0 0;
  }

  .upload-panel-overlay {
    align-items: flex-end;
  }

  .preview-section {
    align-items: stretch;
    flex-direction: column;
  }

  .preview-window {
    width: 100%;
    height: 94dvh;
  }
}
</style>
