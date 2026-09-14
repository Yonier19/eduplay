<script setup lang="ts">
interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  rows?: number
  id?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  rows: 4,
  id: () => `textarea-${Math.random().toString(36).slice(2, 9)}`
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div class="base-textarea-wrapper">
    <label v-if="label" :for="id" class="base-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <textarea
      :id="id"
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      class="base-textarea"
    />
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<style scoped>
.base-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #FFFFFF;
}

.required {
  color: #F44336;
}

.base-textarea {
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  resize: vertical;
}

.base-textarea::placeholder {
  color: #AAB3C5;
}

.base-textarea:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #6D3DF5;
  box-shadow: 0 0 0 3px rgba(109, 61, 245, 0.1);
}

.base-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-text {
  font-size: 0.8rem;
  color: #F44336;
  margin: 0;
}
</style>
