<template>
  <section class="featured">
    <div class="container">

      <!-- Big section header — like Robin's "FEATURED WORKS" -->
      <div class="featured-header reveal">
        <span class="pill pill-green">Selected Work</span>
        <h2 class="featured-big-title">FEATURED<br />WORKS.</h2>
      </div>

      <!-- Project list -->
      <div class="featured-list">
        <a
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :href="`/projects/${project.slug}`"
          class="featured-item reveal"
          :style="{ transitionDelay: `${i * 120}ms` }"
        >
          <!-- Large image -->
          <div class="fi-image">
            <img
              :src="project.thumbnail"
              :alt="project.title"
              loading="lazy"
              :style="{ objectFit: project.imageFit || 'cover' }"
            />
            <div class="fi-image-hover">
              <span class="view-btn">View project ↗</span>
            </div>
          </div>

          <!-- Project info below image -->
          <div class="fi-info">
            <div class="fi-meta">
              <span class="label fi-date">{{ project.year }}</span>
              <div class="fi-tags">
                <span
                  v-for="(tech, j) in project.technologies.slice(0, 2)"
                  :key="tech"
                  class="pill pill-default"
                >{{ tech }}</span>
              </div>
            </div>
            <h3 class="fi-title">{{ project.title }}</h3>
            <p class="fi-desc">{{ project.shortDescription }}</p>
          </div>
        </a>
      </div>

      <!-- All work link -->
      <div class="featured-footer reveal">
        <a href="/work" class="all-link">
          <span class="all-link-text">View all work</span>
          <span class="all-link-icon pill pill-yellow">→</span>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { projects } from '../../data/projects.js'

const featuredProjects = computed(() => projects.filter((p) => p.featured))
</script>

<style scoped>
.featured {
  padding-block: var(--space-24);
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

/* Header */
.featured-header {
  margin-bottom: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.featured-big-title {
  font-size: var(--text-6xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--text);
  margin-top: var(--space-4);
}

/* Project list — two column grid */
.featured-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

/* Each project item */
.featured-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  text-decoration: none;
}

/* Image */
.fi-image {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  border: 1px solid var(--border);
}

.fi-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-item:hover .fi-image img {
  transform: scale(1.04);
}

.fi-image-hover {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.featured-item:hover .fi-image-hover {
  opacity: 1;
}

.view-btn {
  font-size: var(--text-base);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}

/* Info */
.fi-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.fi-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.fi-date {
  color: var(--text-faint);
}

.fi-tags {
  display: flex;
  gap: var(--space-2);
}

.fi-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  transition: color var(--transition-fast);
}

.featured-item:hover .fi-title {
  color: var(--yellow);
}

.fi-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.7;
}

/* Footer */
.featured-footer {
  display: flex;
  justify-content: flex-start;
}

.all-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  transition: gap var(--transition-fast);
}

.all-link:hover {
  gap: var(--space-5);
}

.all-link-text {
  color: var(--text);
}

/* Mobile */
@media (max-width: 768px) {
  .featured-list {
    grid-template-columns: 1fr;
  }

  .featured-big-title {
    font-size: clamp(2.5rem, 14vw, 5rem);
  }
}
</style>
