<template>
  <div class="filter-bar">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="filter-btn"
      :class="{ active: modelValue === cat.id }"
      @click="$emit('update:modelValue', cat.id)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, default: 'all' },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-10);
}

.filter-btn {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 7px 18px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--border);
  color: var(--text-muted);
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.filter-btn.active {
  background: var(--yellow);
  color: #111111;
  border-color: var(--yellow);
}
</style>
