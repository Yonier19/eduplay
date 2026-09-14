<script setup lang="ts">
interface Props {
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  id?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  id: () => `input-${Math.random().toString(36).slice(2, 9)}`
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="base-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :id="id"
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="base-input"
    />
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<style scoped>
.base-input-wrapper {
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

.base-input {
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.base-input::placeholder {
  color: #AAB3C5;
}

.base-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #6D3DF5;
  box-shadow: 0 0 0 3px rgba(109, 61, 245, 0.1);
}

.base-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-text {
  font-size: 0.8rem;
  color: #F44336;
  margin: 0;
}
</style>
