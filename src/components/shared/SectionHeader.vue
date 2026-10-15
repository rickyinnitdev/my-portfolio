<template>
  <div class="section-header reveal" :class="{ center: center }">
    <p v-if="eyebrow" class="eyebrow label">{{ eyebrow }}</p>
    <h2 class="section-title">
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="description" class="section-desc">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  center: { type: Boolean, default: false },
})
</script>

<style scoped>
.section-header {
  margin-bottom: var(--space-12);
}

.section-header.center {
  text-align: center;
  max-width: 600px;
  margin-inline: auto;
  margin-bottom: var(--space-12);
}

.eyebrow {
  margin-bottom: var(--space-4);
  color: var(--accent);
}

.section-title {
  font-size: var(--text-4xl);
  letter-spacing: -0.04em;
  color: var(--text);
  line-height: 1.05;
}

.section-desc {
  margin-top: var(--space-4);
  font-size: var(--text-lg);
  color: var(--text-muted);
  max-width: 520px;
}

.center .section-desc {
  margin-inline: auto;
}
</style>
