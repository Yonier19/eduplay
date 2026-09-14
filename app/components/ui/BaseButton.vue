<template>
  <button
    :class="[
      'base-button',
      `variant-${variant}`,
      `size-${size}`,
      { disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  font-family: inherit;
  white-space: nowrap;
}

.base-button:focus-visible {
  outline: 2px solid #6D3DF5;
  outline-offset: 2px;
}

/* Variants */
.variant-primary {
  background-color: #6D3DF5;
  color: white;
}

.variant-primary:hover:not(.disabled) {
  background-color: #8B5CF6;
  box-shadow: 0 4px 12px rgba(109, 61, 245, 0.4);
}

.variant-secondary {
  background-color: #2495FF;
  color: white;
}

.variant-secondary:hover:not(.disabled) {
  background-color: #3BA3FF;
}

.variant-ghost {
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.variant-ghost:hover:not(.disabled) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.variant-danger {
  background-color: #F44336;
  color: white;
}

.variant-danger:hover:not(.disabled) {
  background-color: #E53935;
}

/* Sizes */
.size-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  gap: 0.375rem;
}

.size-md {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  gap: 0.5rem;
}

.size-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  gap: 0.625rem;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
