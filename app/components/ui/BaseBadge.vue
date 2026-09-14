<template>
  <span
    :class="[
      'base-badge',
      `variant-${variant}`,
      `size-${size}`
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 9999px;
  font-size: 0.75rem;
}

/* Variants */
.variant-primary {
  background-color: #6D3DF5;
  color: white;
}

.variant-secondary {
  background-color: #2495FF;
  color: white;
}

.variant-success {
  background-color: #22C55E;
  color: white;
}

.variant-warning {
  background-color: #F97316;
  color: white;
}

.variant-error {
  background-color: #F44336;
  color: white;
}

.variant-info {
  background-color: #2196F3;
  color: white;
}

/* Sizes */
.size-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
}

.size-md {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.size-lg {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}
</style>
