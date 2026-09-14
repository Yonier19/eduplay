<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  options: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  id?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  id: () => `select-${Math.random().toString(36).slice(2, 9)}`
})

const modelValue = defineModel<string | number>({ default: '' })
</script>

<template>
  <div class="base-select-wrapper">
    <label v-if="label" :for="id" class="base-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <select
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      :required="required"
      class="base-select"
    >
      <option value="">
        {{ placeholder || 'Seleccionar...' }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<style scoped>
.base-select-wrapper {
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

.base-select {
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.625rem center;
  padding-right: 2rem;
}

.base-select:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #6D3DF5;
  box-shadow: 0 0 0 3px rgba(109, 61, 245, 0.1);
}

.base-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-select option {
  background-color: #050B1A;
  color: #FFFFFF;
}

.error-text {
  font-size: 0.8rem;
  color: #F44336;
  margin: 0;
}
</style>
