<template>
  <section class="journey">
    <div class="container">

      <!-- Big section header — Robin style -->
      <div class="journey-header reveal">
        <span class="pill pill-yellow">The Story</span>
        <h2 class="journey-big-title">MY<br />JOURNEY.</h2>
        <p class="journey-intro">
          Not a straight line. More like a series of questions I kept chasing.
        </p>
      </div>

      <!-- Chapters -->
      <div class="chapters">
        <div
          v-for="(chapter, i) in journeyChapters"
          :key="chapter.id"
          class="chapter reveal"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Number -->
          <div class="chapter-num">
            <span>{{ chapter.number }}</span>
          </div>

          <!-- Content -->
          <div class="chapter-content">
            <div class="chapter-top">
              <div>
                <h3 class="chapter-title">{{ chapter.title }}</h3>
                <p class="chapter-sub">{{ chapter.subtitle }}</p>
              </div>
              <span class="chapter-period pill pill-default">{{ chapter.period }}</span>
            </div>

            <p class="chapter-desc">{{ chapter.description }}</p>

            <!-- Highlight callout -->
            <div class="chapter-callout">
              <span class="callout-icon">↗</span>
              <p>{{ chapter.highlight }}</p>
            </div>

            <!-- Tags -->
            <div class="chapter-tags">
              <span
                v-for="(tag, j) in chapter.tags"
                :key="tag"
                class="pill"
                :class="tagColor(j)"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import SectionHeader from '../shared/SectionHeader.vue'
import { journeyChapters } from '../../data/journey.js'

const colors = ['pill-yellow', 'pill-green', 'pill-pink', 'pill-default']
function tagColor(i) {
  return colors[i % colors.length]
}
</script>

<style scoped>
.journey {
  padding-block: var(--space-24);
  background: var(--bg);
}

/* Header */
.journey-header {
  margin-bottom: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.journey-big-title {
  font-size: var(--text-6xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--text);
  margin-top: var(--space-4);
}

.journey-intro {
  font-size: var(--text-lg);
  color: var(--text-muted);
  max-width: 420px;
}

/* Chapters */
.chapters {
  display: flex;
  flex-direction: column;
}

.chapter {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: var(--space-8);
  padding-block: var(--space-10);
  border-top: 1px solid var(--border);
  position: relative;
}

.chapter:last-child {
  border-bottom: 1px solid var(--border);
}

/* Number column */
.chapter-num {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 4px;
}

.chapter-num span {
  font-size: var(--text-xs);
  font-weight: 900;
  letter-spacing: 0.1em;
  color: var(--yellow);
  text-transform: uppercase;
}

/* Content */
.chapter-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.chapter-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.chapter-title {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: var(--space-1);
}

.chapter-sub {
  font-size: var(--text-base);
  color: var(--text-muted);
  font-weight: 500;
}

.chapter-period {
  flex-shrink: 0;
}

.chapter-desc {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.85;
  max-width: 700px;
}

/* Highlight callout */
.chapter-callout {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--yellow);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
}

.chapter-callout p {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.65;
}

.callout-icon {
  color: var(--yellow);
  font-size: var(--text-sm);
  flex-shrink: 0;
  margin-top: 1px;
}

/* Tags */
.chapter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (max-width: 640px) {
  .chapter {
    grid-template-columns: 1fr;
  }

  .chapter-num {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
  }

  .chapter-title {
    font-size: var(--text-2xl);
  }
}
</style>
