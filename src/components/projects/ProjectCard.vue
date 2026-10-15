<template>
  <a :href="`/projects/${project.slug}`" class="project-card">
    <!-- Thumbnail -->
    <div class="card-image">
      <img :src="project.thumbnail" :alt="project.title" loading="lazy" :style="{ objectFit: project.imageFit || 'cover' }" />
      <div class="card-overlay">
        <span class="overlay-text">View ↗</span>
      </div>
    </div>

    <!-- Info -->
    <div class="card-body">
      <div class="card-meta">
        <span class="pill pill-default">{{ project.type }}</span>
        <span class="card-year label">{{ project.year }}</span>
      </div>
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.shortDescription }}</p>
      <div class="card-tech">
        <span
          v-for="(tech, i) in project.technologies"
          :key="tech"
          class="pill"
          :class="techColor(i)"
        >{{ tech }}</span>
      </div>
    </div>
  </a>
</template>

<script setup>
defineProps({ project: { type: Object, required: true } })

const colors = ['pill-yellow', 'pill-green', 'pill-pink']
function techColor(i) {
  return i < colors.length ? colors[i] : 'pill-default'
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
}

.card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-surface);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.project-card:hover .card-overlay { opacity: 1; }

.overlay-text {
  font-size: var(--text-base);
  font-weight: 700;
  color: #fff;
}

.card-body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-year { color: var(--text-faint); }

.card-title {
  font-size: var(--text-xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  transition: color var(--transition-fast);
}

.project-card:hover .card-title { color: var(--yellow); }

.card-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
