<template>
  <div class="skill-group reveal">
    <div class="sg-label">
      <span class="pill pill-yellow">{{ group.label }}</span>
      <p class="sg-desc">{{ group.description }}</p>
    </div>
    <div class="sg-skills">
      <span
        v-for="(skill, i) in group.skills"
        :key="skill"
        class="skill-pill pill"
        :class="pillColor(i)"
      >{{ skill }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ group: { type: Object, required: true } })

const colors = ['pill-default', 'pill-default', 'pill-green', 'pill-default', 'pill-pink', 'pill-default']
function pillColor(i) {
  return colors[i % colors.length]
}
</script>

<style scoped>
.skill-group {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-8);
  padding-block: var(--space-8);
  border-top: 1px solid var(--border);
  align-items: start;
}

.sg-label {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.sg-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.65;
}

.sg-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-content: flex-start;
}

.skill-pill {
  cursor: default;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.skill-pill:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .skill-group { grid-template-columns: 1fr; gap: var(--space-4); }
}
</style>
