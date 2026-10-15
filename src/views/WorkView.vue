<template>
  <div class="work-view">
    <div class="container">

      <!-- Big header -->
      <div class="page-header reveal">
        <span class="pill pill-pink">Work</span>
        <h1 class="page-big-title">THINGS<br />I'VE BUILT.</h1>
        <p class="page-desc">
          Projects across web, desktop applications, and more.
          Each one something I had to figure out as I went.
        </p>
      </div>

      <ProjectFilter v-model="activeCategory" :categories="categories" />

      <TransitionGroup name="grid-item" tag="div" class="projects-grid">
        <ProjectCard
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :project="project"
          class="reveal"
          :style="{ transitionDelay: `${(i % 3) * 80}ms` }"
        />
      </TransitionGroup>

      <div v-if="filteredProjects.length === 0" class="empty-state reveal">
        <p class="empty-main">Nothing here yet.</p>
        <p class="empty-hint label">More work is on the way.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ProjectFilter from '../components/projects/ProjectFilter.vue'
import ProjectCard from '../components/projects/ProjectCard.vue'
import { projects, categories } from '../data/projects.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const { init } = useScrollReveal()
const activeCategory = ref('all')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})

watch(activeCategory, () => setTimeout(init, 100))
</script>

<style scoped>
.work-view {
  padding-top: calc(var(--nav-height) + var(--space-16));
  padding-bottom: var(--space-24);
  min-height: 100svh;
}

.page-header {
  margin-bottom: var(--space-12);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.page-big-title {
  font-size: var(--text-6xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--text);
  margin-top: var(--space-4);
}

.page-desc {
  font-size: var(--text-lg);
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.75;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

.grid-item-enter-active,
.grid-item-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.grid-item-enter-from,
.grid-item-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.empty-state {
  padding: var(--space-16) 0;
  text-align: center;
}

.empty-main {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-muted);
}

.empty-hint {
  margin-top: var(--space-2);
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .page-big-title {
    font-size: clamp(2.5rem, 14vw, 5rem);
  }
}
</style>
