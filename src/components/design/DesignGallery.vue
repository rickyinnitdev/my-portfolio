<template>
  <div class="gallery-wrap">
    <ProjectFilter
      v-model="activeCategory"
      :categories="designCategories"
    />

    <div class="masonry-grid">
      <TransitionGroup name="g">
        <div
          v-for="(item, i) in filteredDesigns"
          :key="item.id"
          class="m-item"
          @click="openLightbox(item)"
          role="button"
          tabindex="0"
          :aria-label="`View ${item.title}`"
          @keydown.enter="openLightbox(item)"
        >
          <img :src="item.src" :alt="item.title" loading="lazy" />
          <div class="m-overlay">
            <p class="m-title">{{ item.title }}</p>
            <span class="pill pill-yellow m-type">{{ item.type }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>

  <Lightbox
    v-if="lightboxOpen"
    :item="activeItem"
    :items="filteredDesigns"
    @close="closeLightbox"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectFilter from '../projects/ProjectFilter.vue'
import Lightbox from './Lightbox.vue'
import { designs, designCategories } from '../../data/designs.js'

const activeCategory = ref('all')
const lightboxOpen = ref(false)
const activeItem = ref(null)

const filteredDesigns = computed(() =>
  activeCategory.value === 'all'
    ? designs
    : designs.filter((d) => d.category === activeCategory.value)
)

function openLightbox(item) {
  activeItem.value = item
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  activeItem.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.masonry-grid {
  columns: 3;
  column-gap: var(--space-4);
}

@media (max-width: 1024px) { .masonry-grid { columns: 2; } }
@media (max-width: 560px)  { .masonry-grid { columns: 1; } }

.m-item {
  break-inside: avoid;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  transition: transform var(--transition), box-shadow var(--transition);
}

.m-item:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow);
}

.m-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.m-item:hover img { transform: scale(1.04); }

.m-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
  opacity: 0;
  transition: opacity var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-5);
  gap: var(--space-2);
}

[data-theme="light"] .m-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 50%, transparent 100%);
}

.m-item:hover .m-overlay { opacity: 1; }

.m-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: #F5F0E8;
  line-height: 1.2;
}

.m-type { font-size: var(--text-xs); }

/* TransitionGroup */
.g-enter-active,
.g-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.g-enter-from,
.g-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
