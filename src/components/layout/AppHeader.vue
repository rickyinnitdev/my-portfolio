<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">

      <!-- Logo -->
      <a href="/" class="logo" @click="closeMenu">
        <span>MK</span><span class="logo-dot">.</span>
      </a>

      <!-- Desktop nav -->
      <nav class="nav-desktop" aria-label="Main navigation">
        <a
          v-for="link in navLinks"
          :key="link.to"
          :href="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right controls -->
      <div class="header-controls">
        <!-- Traffic light dots — decorative / theme indicator -->
        <div class="theme-dots" aria-label="Toggle theme" @click="toggleTheme">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow" :class="{ active: !isDark }"></span>
          <span class="dot dot-green" :class="{ active: isDark }"></span>
        </div>

        <!-- Theme toggle button -->
        <button
          class="theme-toggle"
          :style="{ visibility: themeReady ? 'visible' : 'hidden' }"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <span class="toggle-track" :class="{ dark: isDark }">
            <span class="toggle-thumb">
              <!-- Sun -->
              <svg v-if="!isDark" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
              <!-- Moon -->
              <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </span>
          </span>
        </button>

        <!-- Contact pill -->
        <a href="mailto:m.kimheng.dev@gmail.com" class="nav-contact pill pill-yellow">
          Contact me
        </a>

        <!-- Mobile toggle -->
        <button
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="bar" :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-nav">
        <nav>
          <a
            v-for="link in navLinks"
            :key="link.to"
            :href="link.to"
            class="mobile-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <a
            href="mailto:m.kimheng.dev@gmail.com"
            class="mobile-link mobile-cta"
            @click="closeMenu"
          >
            Let's talk →
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useTheme } from '../../composables/useTheme.js'

const props = defineProps({ currentPath: { type: String, default: '/' } })
const isScrolled = ref(false)
const menuOpen = ref(false)
const { isDark, themeReady, toggleTheme } = useTheme()

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/design', label: 'Design' },
  { to: '/about', label: 'About' },
]

function isActive(path) {
  if (path === '/') return props.currentPath === '/'
  if (path === '/work' && props.currentPath.startsWith('/projects/')) return true
  return props.currentPath.startsWith(path)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  border-bottom: 1px solid transparent;
  transition: background var(--transition), border-color var(--transition);
}

.header.scrolled {
  background: var(--bg);
  border-bottom-color: var(--border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: var(--space-6);
}

/* Logo */
.logo {
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--text);
  display: flex;
  align-items: center;
  transition: opacity var(--transition-fast);
  flex-shrink: 0;
}

.logo:hover { opacity: 0.7; }

.logo-dot { color: var(--yellow); }

/* Desktop nav */
.nav-desktop {
  display: none;
  align-items: center;
  gap: var(--space-8);
  flex: 1;
  justify-content: center;
}

@media (min-width: 900px) {
  .nav-desktop { display: flex; }
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--yellow);
  transition: width var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text);
}

.nav-link.active::after,
.nav-link:hover::after {
  width: 100%;
}

/* Controls */
.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

/* Traffic light dots */
.theme-dots {
  display: none;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-pill);
}

@media (min-width: 560px) {
  .theme-dots { display: flex; }
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.dot-red    { background: #FF5F56; }
.dot-yellow { background: #FFBD2E; opacity: 0.35; }
.dot-green  { background: #27C93F; opacity: 0.35; }

.dot-yellow.active { opacity: 1; }
.dot-green.active  { opacity: 1; }

.theme-dots:hover .dot { transform: scale(1.2); }

/* Theme toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.toggle-track {
  display: flex;
  align-items: center;
  width: 44px;
  height: 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  border-radius: 100px;
  padding: 2px;
  transition: background var(--transition);
  cursor: pointer;
}

.toggle-track.dark {
  background: var(--bg-subtle);
}

.toggle-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  transition: transform var(--transition), background var(--transition);
  flex-shrink: 0;
}

.toggle-track.dark .toggle-thumb {
  transform: translateX(20px);
}

/* Contact pill */
.nav-contact {
  display: none;
  font-size: var(--text-xs);
  font-weight: 700;
  cursor: pointer;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.nav-contact:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

@media (min-width: 900px) {
  .nav-contact { display: inline-flex; }
}

/* Mobile toggle */
.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text);
}

@media (min-width: 900px) {
  .menu-toggle { display: none; }
}

.bar {
  display: block;
  position: relative;
  width: 20px;
  height: 1.5px;
  background: var(--text);
  transition: background var(--transition-fast);
}

.bar::before,
.bar::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.25s ease, top 0.25s ease, bottom 0.25s ease;
}

.bar::before { top: -6px; }
.bar::after  { bottom: -6px; }

.bar.open { background: transparent; }
.bar.open::before { top: 0; transform: rotate(45deg); }
.bar.open::after  { bottom: 0; transform: rotate(-45deg); }

/* Mobile nav */
.mobile-nav {
  position: fixed;
  inset: 0;
  top: var(--nav-height);
  background: var(--bg);
  padding: var(--space-10) var(--space-6);
  border-top: 1px solid var(--border);
  z-index: 99;
}

.mobile-nav nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mobile-link {
  font-size: var(--text-4xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-muted);
  padding-block: var(--space-2);
  transition: color var(--transition-fast);
}

.mobile-link:hover { color: var(--text); }

.mobile-cta {
  margin-top: var(--space-8);
  color: var(--yellow);
  font-size: var(--text-3xl);
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
