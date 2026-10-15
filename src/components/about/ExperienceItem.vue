<template>
  <div class="exp-item reveal">
    <div class="exp-left">
      <span class="exp-period label">{{ item.period }}</span>
      <span class="exp-type-badge label" :class="item.type">{{ typeLabel }}</span>
    </div>
    <div class="exp-right">
      <h4 class="exp-role">{{ item.role }}</h4>
      <p class="exp-company">{{ item.company || item.institution }}</p>
      <p v-if="item.note" class="exp-note">{{ item.note }}</p>
      <ul v-if="item.contributions" class="exp-list">
        <li v-for="c in item.contributions" :key="c">{{ c }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const typeLabel = computed(() => {
  const map = {
    work: 'Work',
    freelance: 'Freelance',
    university: 'University',
    education: 'Education',
  }
  return map[props.item.type] || props.item.type
})
</script>

<style scoped>
.exp-item {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: var(--space-6) var(--space-8);
  padding-block: var(--space-8);
  border-top: 1px solid var(--border);
  align-items: start;
}

.exp-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: 2px;
}

.exp-period {
  color: var(--text-faint);
}

.exp-type-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  width: fit-content;
}

.exp-type-badge.work { border-color: rgba(200, 184, 154, 0.3); color: var(--accent); }
.exp-type-badge.freelance { border-color: var(--border); }
.exp-type-badge.university { border-color: var(--border); }
.exp-type-badge.education { border-color: var(--border); }

.exp-right {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exp-role {
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text);
}

.exp-company {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.exp-note {
  font-size: var(--text-sm);
  color: var(--text-faint);
  font-style: italic;
}

.exp-list {
  margin-top: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exp-list li {
  font-size: var(--text-sm);
  color: var(--text-muted);
  padding-left: var(--space-4);
  position: relative;
}

.exp-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--text-faint);
}

@media (max-width: 640px) {
  .exp-item {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .exp-left {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
  }
}
</style>
