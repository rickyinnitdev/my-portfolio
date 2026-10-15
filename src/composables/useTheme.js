import { ref, onMounted } from 'vue'

// Shared reactive state (module-level singleton)
const isDark = ref(true)
const themeReady = ref(false)
let transitionTimer

export function useTheme() {
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('kimheng-theme', dark ? 'dark' : 'light') } catch {}
    isDark.value = dark
  }

  function toggleTheme() {
    document.documentElement.classList.add('theme-changing')
    applyTheme(!isDark.value)
    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => document.documentElement.classList.remove('theme-changing'), 250)
  }

  function initTheme() {
    // The head script already applied the theme before the page painted.
    isDark.value = document.documentElement.dataset.theme === 'dark'
    themeReady.value = true
    requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'))
  }

  onMounted(initTheme)

  return { isDark, themeReady, toggleTheme, initTheme }
}
