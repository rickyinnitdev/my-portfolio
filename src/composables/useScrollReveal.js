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
  })

  onUnmounted(() => {
    clearTimeout(timer)
    if (observer) observer.disconnect()
  })

  return { init }
}
