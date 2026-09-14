<template>
  <form @submit.prevent="handleSubmit" class="game-upload-form">
    <div class="form-section">
      <h3 class="section-heading">Información del Juego</h3>

      <BaseInput
        v-model="form.name"
        label="Nombre del juego"
        placeholder="Ej. Aventura Matemática"
        required
        :error="errors.name"
      />

      <BaseTextarea
        v-model="form.description"
        label="Descripción"
        placeholder="Describe brevemente tu juego educativo..."
        required
        :rows="4"
        :error="errors.description"
      />
    </div>

    <div class="form-section">
      <h3 class="section-heading">Clasificación</h3>

      <div class="form-row">
        <BaseSelect
          v-model="form.category"
          label="Categoría"
          :options="categoryOptions"
          required
          :error="errors.category"
        />

        <BaseSelect
          v-model="form.subject"
          label="Nivel Educativo"
          :options="subjectOptions"
          required
          :error="errors.subject"
        />
      </div>

      <div class="form-row">
        <BaseSelect
          v-model="form.age"
          label="Edad Recomendada"
          :options="ageOptions"
          required
          :error="errors.age"
        />

        <BaseSelect
          v-model="form.platform"
          label="Plataforma"
          :options="platformOptions"
        />
      </div>

      <BaseSelect
        v-model="form.difficulty"
        label="Dificultad"
        :options="difficultyOptions"
        required
        :error="errors.difficulty"
      />

      <p class="filter-hint">
        Estos campos permiten filtrar los juegos por categoría, nivel, edad,
        plataforma, dificultad y etiquetas.
      </p>
    </div>

    <div class="form-section">
      <h3 class="section-heading">Archivos</h3>

      <div class="file-upload-group">
        <div class="file-upload-box">
          <UploadCloudIcon :size="32" class="upload-icon" />
          <p class="upload-label">Código del Juego</p>
          <p class="upload-hint">Archivo HTML ejecutable</p>
          <input
            type="file"
            accept=".html,.htm"
            class="file-input"
            @change="handleGameFileChange"
          />
        </div>

        <div class="file-upload-box">
          <ImageIcon :size="32" class="upload-icon" />
          <p class="upload-label">Imagen de Portada</p>
          <p class="upload-hint">PNG, JPG (mínimo 400x300px)</p>
          <input
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleCoverImageChange"
          />
        </div>
      </div>

      <p v-if="form.gameFile" class="selected-file">
        Archivo seleccionado: {{ form.gameFile.name }}
      </p>
      <p v-if="errors.gameFile" class="file-error">
        {{ errors.gameFile }}
      </p>

      <div class="tags-input-container">
        <label class="base-label">Etiquetas (opcional)</label>
        <div class="tags-list">
          <span
            v-for="(tag, index) in form.tags"
            :key="index"
            class="tag"
          >
            {{ tag }}
            <button
              type="button"
              class="tag-remove"
              @click="form.tags.splice(index, 1)"
            >
              ×
            </button>
          </span>
        </div>
        <input
          v-model="tagInput"
          type="text"
          placeholder="Añade una etiqueta y presiona Enter"
          class="tags-input"
          @keydown.enter="addTag"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameUploadForm } from '@/composables/useGameUploadForm'
import {
  categoryOptions,
  subjectOptions,
  ageOptions,
  platformOptions,
  difficultyOptions
} from '@/data/games'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { UploadCloudIcon, ImageIcon } from 'lucide-vue-next'

const { form, errors } = useGameUploadForm()
const tagInput = ref('')

const handleGameFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && /\.html?$/i.test(file.name)) {
    form.gameFile = file
  } else {
    form.gameFile = null
    errors.gameFile = 'Selecciona un archivo HTML válido'
  }
}

const handleCoverImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.coverImage = file
  }
}

const addTag = () => {
  if (tagInput.value.trim()) {
    form.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const handleSubmit = () => {
  // El botón de publicar manejará esto
  console.log('Formulario preparado para publicar')
}
</script>

<style scoped>
.game-upload-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-heading {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.filter-hint {
  margin: -0.25rem 0 0;
  color: #AAB3C5;
  font-size: 0.8rem;
  line-height: 1.5;
}

.file-upload-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.file-upload-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-upload-box:hover {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(109, 61, 245, 0.5);
}

.upload-icon {
  color: #6D3DF5;
}

.upload-label {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FFFFFF;
}

.upload-hint {
  margin: 0;
  font-size: 0.8rem;
  color: #AAB3C5;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.selected-file,
.file-error {
  margin: -0.5rem 0 0;
  font-size: 0.8rem;
}

.selected-file {
  color: #7ee787;
}

.file-error {
  color: #ff8a80;
}

.tags-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #FFFFFF;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 2rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 0.375rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: rgba(109, 61, 245, 0.2);
  border: 1px solid rgba(109, 61, 245, 0.3);
  border-radius: 0.375rem;
  font-size: 0.85rem;
  color: #8B5CF6;
}

.tag-remove {
  background: none;
  border: none;
  color: #8B5CF6;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
}

.tag-remove:hover {
  opacity: 0.7;
}

.tags-input {
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.tags-input::placeholder {
  color: #AAB3C5;
}

.tags-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #6D3DF5;
}

@media (max-width: 768px) {
  .form-row,
  .file-upload-group {
    grid-template-columns: 1fr;
  }
}
</style>
