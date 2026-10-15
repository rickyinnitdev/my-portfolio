<template>
  <div class="skill-group reveal">
    <div class="sg-label">
      <span class="pill pill-yellow">{{ group.label }}</span>
      <p class="sg-desc">{{ group.description }}</p>
      <button class="motion-toggle" type="button" :aria-pressed="paused" @click="paused = !paused">
        {{ paused ? 'Play motion ↗' : 'Pause motion Ⅱ' }}
      </button>
    </div>
    <div class="sg-skills" :class="{ paused, reverse: ['frameworks', 'data'].includes(group.id) }">
      <div class="skill-track" :style="{ animationDuration: `${group.skills.length * 3.5 + 12}s` }">
        <div v-for="copy in 2" :key="copy" class="skill-set" :aria-hidden="copy === 2 ? 'true' : undefined">
          <span v-for="(skill, i) in group.skills" :key="skill" class="skill-pill pill" :class="pillColor(i)">{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ group: { type: Object, required: true } })
const paused = ref(false)

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
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
  padding-block: 8px;
  mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 24px), transparent);
}

.skill-track {
  display: flex;
  width: max-content;
  animation: skill-glide 40s linear infinite;
}

.skill-set {
  display: flex;
  flex-shrink: 0;
  min-width: 100cqw;
  justify-content: space-around;
  gap: var(--space-2);
  padding-right: var(--space-2);
}

.skill-pill { white-space: nowrap; }
.reverse .skill-track { animation-direction: reverse; }
.sg-skills:hover .skill-track, .paused .skill-track { animation-play-state: paused; }
.motion-toggle { align-self: flex-start; color: var(--text-muted); font-size: 10px; background: transparent; border: 1px solid var(--border); border-radius: 20px; padding: 5px 9px; cursor: pointer; }
.motion-toggle:hover { color: var(--text); border-color: var(--border-strong); }
@keyframes skill-glide { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .sg-skills { mask-image: none; overflow: visible; container-type: normal; }
  .skill-track { animation: none; width: auto; }
  .skill-set { min-width: 0; flex-wrap: wrap; justify-content: flex-start; }
  .skill-set[aria-hidden="true"], .motion-toggle { display: none; }
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
