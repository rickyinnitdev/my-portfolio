<template>
  <div class="design-view">
    <div class="container">

      <!-- Big header -->
      <div class="page-header reveal">
        <span class="pill pill-pink">Design</span>
        <h1 class="page-big-title">GRAPHIC<br />DESIGN.</h1>
        <p class="page-desc">
          Visual work from 2020 to present — sports branding, menus, event posters,
          and product marketing. Click any piece to view it full size.
        </p>
      </div>

      <DesignGallery />

    </div>
  </div>
</template>

<script setup>
import DesignGallery from '../components/design/DesignGallery.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()
</script>

<style scoped>
.design-view {
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
  max-width: 520px;
  line-height: 1.75;
}

@media (max-width: 768px) {
  .page-big-title {
    font-size: clamp(2.5rem, 14vw, 5rem);
  }
}
</style>
