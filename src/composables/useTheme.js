import { ref, onMounted } from 'vue'

// Shared reactive state (module-level singleton)
const isDark = ref(true)

export function useTheme() {
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem('kimheng-theme', dark ? 'dark' : 'light') } catch {}
    isDark.value = dark
  }

  function toggleTheme() {
    applyTheme(!isDark.value)
  }

  function initTheme() {
    let saved
    try { saved = localStorage.getItem('kimheng-theme') } catch {}
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
    }
  }

  onMounted(initTheme)

  return { isDark, toggleTheme, initTheme }
}
