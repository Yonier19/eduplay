<template>
  <div class="search-bar">
    <SearchIcon :size="18" class="search-icon" />
    <input
      :value="props.modelValue"
      type="text"
      placeholder="Buscar juegos educativos..."
      class="search-input"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  flex: 1;
  max-width: 400px;
  transition: all 0.2s ease;
}

.search-bar:focus-within {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #6D3DF5;
  box-shadow: 0 0 0 3px rgba(109, 61, 245, 0.1);
}

.search-icon {
  color: #AAB3C5;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
}

.search-input::placeholder {
  color: #AAB3C5;
}
</style>
