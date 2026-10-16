<template>
  <div v-if="project" class="detail-view">

    <!-- Hero banner -->
    <div class="detail-hero">
      <img :src="project.thumbnail" :alt="project.title" />
      <div class="detail-hero-overlay">
        <div class="container">
          <div class="detail-hero-labels">
            <span class="pill pill-yellow">{{ project.type }}</span>
            <span class="pill pill-default">{{ project.year }}</span>
            <span class="pill" :class="project.status === 'completed' ? 'pill-green' : 'pill-pink'">
              {{ project.status }}
            </span>
          </div>
          <h1 class="detail-title">{{ project.title }}</h1>
        </div>
      </div>
    </div>

    <div class="container detail-content">

      <!-- Short desc + meta -->
      <div class="detail-lead reveal">
        <p class="detail-short">{{ project.shortDescription }}</p>
        <div class="detail-meta">
          <div v-if="project.role" class="meta-row">
            <span class="label meta-key">Role</span>
            <span class="meta-val">{{ project.role }}</span>
          </div>
          <div v-if="project.technologies?.length" class="meta-row">
            <span class="label meta-key">Built with</span>
            <div class="meta-tech">
              <span
                v-for="(t, i) in project.technologies"
                :key="t"
                class="pill"
                :class="i === 0 ? 'pill-yellow' : i === 1 ? 'pill-green' : 'pill-default'"
              >{{ t }}</span>
            </div>
          </div>
          <div class="meta-links" v-if="project.github || project.liveDemo">
            <a v-if="project.liveDemo" :href="project.liveDemo" target="_blank" class="detail-link pill pill-yellow">
              Live Demo ↗
            </a>
            <a v-if="project.github" :href="project.github" target="_blank" class="detail-link pill pill-default">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <!-- Story sections -->
      <div class="detail-body">
        <div class="story-block reveal" v-if="project.features?.length">
          <h2 class="story-heading">What it does</h2>
          <ul class="contribution-list">
            <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
        <div class="story-block reveal" v-if="project.results">
          <h2 class="story-heading">Results</h2>
          <p>{{ project.results }}</p>
        </div>
        <div class="story-block reveal" v-if="project.contributions?.length">
          <h2 class="story-heading">My contribution</h2>
          <ul class="contribution-list">
            <li v-for="contribution in project.contributions" :key="contribution">{{ contribution }}</li>
          </ul>
          <p class="contribution-note">Role inferred from my commits as rickyinnitdev within this group project.</p>
          <div class="commit-links">
            <a v-for="[label, hash] in project.contributionEvidence" :key="hash"
              :href="`${project.github}/commit/${hash}`" target="_blank" rel="noopener noreferrer">
              {{ label }} ↗
            </a>
          </div>
        </div>
        <div class="story-block reveal" v-if="project.fullDescription">
          <h2 class="story-heading">About the project</h2>
          <p>{{ project.fullDescription }}</p>
        </div>

        <div class="story-block reveal" v-if="project.challenges">
          <h2 class="story-heading">Challenges</h2>
          <p>{{ project.challenges }}</p>
        </div>

        <div class="story-block reveal" v-if="project.whatILearned">
          <h2 class="story-heading">What I learned</h2>
          <p>{{ project.whatILearned }}</p>
        </div>
      </div>

      <!-- Gallery -->
      <div class="detail-gallery reveal" v-if="project.gallery?.length">
        <h2 class="story-heading">Screenshots</h2>
        <div class="gallery-grid">
          <div
            v-for="(img, i) in project.gallery"
            :key="i"
            class="gallery-item"
            @click="openLight(img)"
            role="button"
            tabindex="0"
            @keydown.enter="openLight(img)"
          >
            <img :src="img" :alt="`${project.title} screenshot ${i + 1}`" loading="lazy" :style="{ objectFit: project.imageFit || 'cover' }" />
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="project-nav reveal">
        <a href="/work" class="nav-back">← All work</a>
        <div class="adj-projects">
          <a v-if="prevProject" :href="`/projects/${prevProject.slug}`" class="adj-link">
            ← {{ prevProject.title }}
          </a>
          <a v-if="nextProject" :href="`/projects/${nextProject.slug}`" class="adj-link">
            {{ nextProject.title }} →
          </a>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <div v-if="lightOpen" class="lightbox-back" @click="lightOpen = false">
      <img :src="lightSrc" :alt="project.title" class="light-img" />
      <button class="light-close" @click="lightOpen = false">✕</button>
    </div>
  </div>

  <div v-else class="not-found-block container">
    <h2>Project not found.</h2>
    <a href="/work">← Back to work</a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { projects } from '../data/projects.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()

const props = defineProps({ slug: { type: String, required: true } })
const lightOpen = ref(false)
const lightSrc = ref('')

const project = computed(() => projects.find((p) => p.slug === props.slug))
const idx = computed(() => projects.findIndex((p) => p.slug === props.slug))
const prevProject = computed(() => idx.value > 0 ? projects[idx.value - 1] : null)
const nextProject = computed(() => idx.value < projects.length - 1 ? projects[idx.value + 1] : null)

function openLight(src) {
  lightSrc.value = src
  lightOpen.value = true
}
</script>

<style scoped>
.contribution-list { padding-left: 1.25rem; color: var(--text-muted); line-height: 1.9; }
.contribution-list li + li { margin-top: var(--space-3); }
.contribution-note { margin-top: var(--space-5); font-size: var(--text-sm); }
.commit-links { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-3); font-size: var(--text-sm); }
.commit-links a { text-decoration: underline; text-underline-offset: 4px; }
.detail-view {
  padding-bottom: var(--space-24);
  min-height: 100svh;
}

/* Hero */
.detail-hero {
  position: relative;
  height: 55vh;
  min-height: 360px;
  overflow: hidden;
  margin-bottom: 0;
}

.detail-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.35);
}

.detail-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-12);
}

.detail-hero-labels {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.detail-title {
  font-size: var(--text-5xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #F5F0E8;
  max-width: 800px;
  line-height: 0.95;
}

/* Content */
.detail-content {
  padding-top: var(--space-12);
}

/* Lead */
.detail-lead {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-10);
  align-items: start;
  margin-bottom: var(--space-16);
  padding-bottom: var(--space-10);
  border-bottom: 1px solid var(--border);
}

.detail-short {
  font-size: var(--text-xl);
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 400;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.meta-key { color: var(--text-faint); }

.meta-val {
  font-size: var(--text-sm);
  color: var(--text-muted);
  font-weight: 500;
}

.meta-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.meta-links { display: flex; gap: var(--space-2); flex-wrap: wrap; }

.detail-link {
  font-size: var(--text-xs);
  font-weight: 700;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.detail-link:hover { opacity: 0.75; }

/* Story */
.detail-body {
  max-width: 680px;
  margin-bottom: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.story-block p {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.9;
}

.story-heading {
  font-size: var(--text-2xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border);
}

/* Gallery */
.detail-gallery {
  margin-bottom: var(--space-16);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.gallery-item {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-lg);
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img { transform: scale(1.05); }

/* Nav */
.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.nav-back {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.nav-back:hover { color: var(--text); }

.adj-projects { display: flex; gap: var(--space-6); }

.adj-link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.adj-link:hover { color: var(--yellow); }

/* Lightbox */
.lightbox-back {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  cursor: pointer;
}

.light-img {
  max-width: 1000px;
  width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius);
  cursor: default;
}

.light-close {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  z-index: 301;
  padding: var(--space-2);
}

.light-close:hover { color: #fff; }

.not-found-block {
  padding-top: calc(var(--nav-height) + var(--space-16));
  padding-bottom: var(--space-24);
}

@media (max-width: 768px) {
  .detail-lead {
    grid-template-columns: 1fr;
  }

  .detail-title {
    font-size: clamp(2rem, 10vw, 4rem);
  }
}
</style>
