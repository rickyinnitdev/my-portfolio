<template>
  <Teleport to="body">
    <div
      class="lightbox-backdrop"
      @click.self="$emit('close')"
      @keydown.escape="$emit('close')"
      tabindex="-1"
      ref="backdropRef"
      role="dialog"
      aria-modal="true"
      :aria-label="`Viewing ${item.title}`"
    >
      <div class="lightbox">
        <!-- Close -->
        <button class="lb-close" @click="$emit('close')" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Prev / Next -->
        <button
          v-if="items.length > 1"
          class="lb-nav lb-prev"
          @click="prev"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 2L5 10L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          v-if="items.length > 1"
          class="lb-nav lb-next"
          @click="next"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 2L15 10L7 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Image -->
        <div class="lb-image-wrap">
          <Transition name="lb-fade" mode="out-in">
            <img
              :key="currentItem.id"
              :src="currentItem.src"
              :alt="currentItem.title"
              class="lb-image"
            />
          </Transition>
        </div>

        <!-- Caption -->
        <div class="lb-caption">
          <p class="lb-title">{{ currentItem.title }}</p>
          <p class="lb-type label">{{ currentItem.type }}</p>
          <p v-if="items.length > 1" class="lb-counter label">
            {{ currentIndex + 1 }} / {{ items.length }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  items: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])

const backdropRef = ref(null)
const currentIndex = ref(props.items.findIndex((i) => i.id === props.item.id) ?? 0)

const currentItem = computed(() => props.items[currentIndex.value] ?? props.item)

function prev() {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : props.items.length - 1
}

function next() {
  currentIndex.value =
    currentIndex.value < props.items.length - 1 ? currentIndex.value + 1 : 0
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  backdropRef.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.lightbox {
  position: relative;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.lb-close {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  color: var(--text-muted);
  padding: var(--space-2);
  transition: color var(--transition-fast);
  z-index: 201;
}

.lb-close:hover {
  color: var(--text);
}

.lb-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  padding: var(--space-4);
  transition: color var(--transition-fast);
  z-index: 201;
}

.lb-nav:hover {
  color: var(--text);
}

.lb-prev { left: var(--space-4); }
.lb-next { right: var(--space-4); }

.lb-image-wrap {
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-image {
  max-height: 75vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: var(--radius);
}

.lb-caption {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  justify-content: center;
}

.lb-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text);
}

.lb-type {
  color: var(--text-muted);
}

.lb-counter {
  color: var(--text-faint);
  margin-left: auto;
}

/* Transition */
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}
</style>
