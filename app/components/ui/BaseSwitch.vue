<script setup lang="ts">
interface Props {
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

const modelValue = defineModel<boolean>({ default: false })
</script>


<template>
  <div class="base-switch-wrapper">
    <label class="base-switch-label">
      <input
        v-model="modelValue"
        type="checkbox"
        :disabled="disabled"
        class="base-switch-input"
      />
      <span class="base-switch">
        <span class="base-switch-circle" />
      </span>
      <span v-if="label" class="base-switch-text">{{ label }}</span>
    </label>
  </div>
</template>


<style scoped>
.base-switch-wrapper {
  display: flex;
  align-items: center;
}

.base-switch-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.base-switch-input {
  display: none;
}

.base-switch {
  position: relative;
  display: inline-flex;
  width: 2.5rem;
  height: 1.375rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.base-switch-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1rem;
  height: 1rem;
  background-color: #FFFFFF;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.base-switch-input:checked + .base-switch {
  background-color: #6D3DF5;
  border-color: #6D3DF5;
}

.base-switch-input:checked + .base-switch .base-switch-circle {
  left: calc(100% - 2px - 1rem);
}

.base-switch-input:disabled + .base-switch {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-switch-text {
  color: #FFFFFF;
  font-size: 0.95rem;
  font-weight: 500;
}

.base-switch-label:has(input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
