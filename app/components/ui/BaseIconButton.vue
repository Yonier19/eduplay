<template>
  <button
    :class="[
      'base-icon-button',
      `size-${size}`
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.base-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  color: #FFFFFF;
  padding: 0.375rem;
}

.base-icon-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.base-icon-button:focus-visible {
  outline: 2px solid #6D3DF5;
  outline-offset: 2px;
}

.base-icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.size-sm {
  width: 2rem;
  height: 2rem;
}

.size-md {
  width: 2.5rem;
  height: 2.5rem;
}

.size-lg {
  width: 3rem;
  height: 3rem;
}
</style>
