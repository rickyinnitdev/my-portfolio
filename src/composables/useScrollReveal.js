import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer = null
  let timer = null

  const init = () => {
    if (typeof window === 'undefined') return

    if (!('IntersectionObserver' in window)) return
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (document.documentElement.classList.contains('welcome-playing')) return
            if (!entry.target.classList.contains('visible') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              entry.target.animate([
                { opacity: 0, transform: 'translateY(32px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ], { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
            }
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0 }
    )

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    // slight delay so DOM is fully painted
    timer = setTimeout(init, 80)
    document.addEventListener('portfolio-ready', init)
  })

  onUnmounted(() => {
    clearTimeout(timer)
    document.removeEventListener('portfolio-ready', init)
    if (observer) observer.disconnect()
  })

  return { init }
}
